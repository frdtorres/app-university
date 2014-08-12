'use strict';

angular.module('mean.students')
  .controller('StudentController', [
      '$scope',
      'Global',
      '$state',
      '$stateParams',
      'Students',
      'StudentsLocal',
      'Schools',
  function($scope, Global, $state, $stateParams, Students, StudentsLocal, Schools) {

      $scope.global = Global;

      $scope.find = function() {
          Students.getList().then(function(students) {
            // Add all categories into the factory StudentsLocal.
            StudentsLocal.set(students);
            $scope.students = StudentsLocal.all();
          });
      };

      $scope.findOne = function  () {
          var studentId = $stateParams.studentId;
          Students.one(studentId).get().then(function (student) {
              $scope.student = student;
          });

          // get all schools
          Schools.getList().then(function(schools) {
              // Add all categories into the factory SchoolsLocal.
            $scope.schools =schools;
          });
      };

      $scope.remove = function(id) {

          var student = StudentsLocal.get(id);
          student.customDELETE(id).then(function () {
            StudentsLocal.remove(id);
          });

      };

      // Filters

      $scope.orderByValue = function (val) {
          $scope.filterSelected = val;
      }

      $scope.predicate = '-code';
    }
  ])
  .controller('StudentViewController',
  [
    '$scope',
    '$stateParams',
    'Global',
    'Students',
    function($scope, $stateParams, Global, Students) {
      $scope.global = Global;

      var studentId = $stateParams.studentId;
      Students.one(studentId).get().then(function (student) {
          $scope.student = student;
      });

    }
  ])
  .controller('UploadControler', [
    '$scope',
    '$http',
    '$timeout',
    '$upload',
    '$state',
    'Schools',
    'Students',
    '$stateParams',
    function ($scope, $http, $timeout, $upload, $state, Schools, Students, $stateParams) {

      // Student object
      $scope.student = {};
      $scope.files = null;
      
      // Get param studentId if exist
      var studentId = $stateParams.studentId;
      
      if (studentId) {
          Students.one(studentId).get().then(function (student) {
           $scope.student = student;
           console.log(student);
          });

      };

      // Get all schools
      $scope.getSchools = function() {
        Schools.getList().then(function(schools) {
           // Add all categories into the factorySchoolsLocal.
           $scope.schools = schools;
         });
      };

      // Register student
      $scope.create = function() {
         if($scope.files){
           $scope.start(0, 'upload');
         };
      };

      $scope.update = function () {
          if($scope.files){
            
            $scope.start(0, 'upload/' + $scope.student._id);
          }else{
            $scope.student.customPUT($scope.student, $scope.student._id);
            $state.go('students');
          };
      };

      $scope.uploadRightAway = false;

      $scope.hasUploader = function (index) {
          return $scope.upload[index] != null;
      };

      $scope.abort = function (index) {
          $scope.upload[index].abort();
          $scope.upload[index] = null;
      };

      $scope.onFileSelect = function ($files) {

          // Provide files object to scope.
          $scope.files = $files;

          $scope.selectedFiles = [];
          $scope.progress = [];
          if ($scope.upload && $scope.upload.length > 0) {
              for (var i = 0; i < $scope.upload.length; i++) {
                  if ($scope.upload[i] != null) {
                      $scope.upload[i].abort();
                  }
              }
          }
          $scope.upload = [];
          $scope.uploadResult = [];
          $scope.selectedFiles = $files;
          $scope.dataUrls = [];
          for (var i = 0; i < $files.length; i++) {
              var $file = $files[i];
              if (window.FileReader && $file.type.indexOf('image') > -1) {
                  var fileReader = new FileReader();
                  fileReader.readAsDataURL($files[i]);
                  function setPreview(fileReader, index) {
                      fileReader.onload = function (e) {
                          $timeout(function () {
                              $scope.dataUrls[index] = e.target.result;
                          });
                      }
                  }

                  setPreview(fileReader, i);
              }
              $scope.progress[i] = -1;
              if ($scope.uploadRightAway) {
                  $scope.start(i);
              }
          }
      }

      $scope.start = function (index, url) {

          $scope.progress[index] = 0;

          $scope.upload[index] = $upload.upload({
              url: url,
              headers: {'myHeaderKey': 'myHeaderVal'},
              data: $scope.student,
              file: $scope.selectedFiles[index],
              fileFormDataName: 'myFile'
          }).then(function (response) {

              $scope.student = response.data.doc;
              $scope.uploadResult.push(response.data.result);

              // Redirec to student list
              $state.go('students');

          }, null, function (evt) {
              $scope.progress[index] = parseInt(100.0 * evt.loaded / evt.total);
          });
      }
  }]);
