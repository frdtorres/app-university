'use strict';

angular.module('mean.schools')
    .controller('SchoolController', [
        '$scope', 
        '$location',
        '$state',
        '$stateParams',
        'Global', 
        'Schools',
        'Restangular',
        'SchoolsLocal',
    function($scope, $location,  $state, $stateParams, Global, Schools, Restangular, SchoolsLocal) {
        
        $scope.global = Global;
        $scope.school = {};

        $scope.create = function() {
           Schools.post($scope.school).then(function (school) {
               $state.go('all schools');
           });
        };

        $scope.findOne = function  () {
            var schoolId = $stateParams.schoolId;
            Schools.one(schoolId).get().then(function (school) {
                $scope.school = school;
            });
        };
        $scope.find = function() {
           Schools.getList().then(function(schools) {
                // Add all categories into the factorySchoolsLocal.
             SchoolsLocal.set(schools);
              $scope.schools =SchoolsLocal.all();
            });
        };
        $scope.update = function () {
            $scope.school.customPUT($scope.school, $scope.school._id);
            $state.go('all schools');    
        };
        $scope.remove = function(id) {
          
            var school = SchoolsLocal.get(id);
            school.customDELETE(id).then(function () {
              SchoolsLocal.remove(id);
            });
        };
        // Filters

        $scope.orderByValue = function (val) {
            $scope.filterSelected = val;
        }

        $scope.predicate = '-code';

    }
])
.controller('ViewSchool', ['Schools','$stateParams','$scope', 'Students', function(Schools, $stateParams, $scope, Students){

    var schoolId = $stateParams.schoolId;

    Schools.one(schoolId).get().then(function (School) {
        $scope.Schools = School;
    });

    Students.getList("",{school:  schoolId}).then(function (Student) {
        $scope.Students = Student;
    });
    
}])

