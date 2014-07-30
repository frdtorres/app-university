'use strict';

angular.module('mean.students')
    .controller('StudentController', [
        '$scope', 
        'Global', 
        '$state',
        '$stateParams',
        'Students',
        'Restangular',
        'StudentsLocal',
    function($scope, Global, $state, $stateParams, Students, Restangular, StudentsLocal) {
        
        $scope.global = Global;
        

        $scope.create = function() {
           Students.post($scope.student).then(function (student) {
               $state.go('all students');
           })
        };

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
        };

        $scope.update = function () {
            $scope.student.customPUT($scope.student, $scope.student._id);
            $state.go('all students');    
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
]);

