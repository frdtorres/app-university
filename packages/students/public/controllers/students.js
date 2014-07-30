'use strict';

angular.module('mean.students')
    .controller('StudentController', [
        '$scope', 
        '$location',
        '$state',
        '$stateParams',
        'Global', 
        'Students',
        'Restangular',
    function($scope, $location,  $state, $stateParams, Global, Students, Restangular) {
        
        $scope.global = Global;
        $scope.student = {};

        $scope.create = function() {
           Students.post($scope.student).then(function (student) {
               $state.go('home');
           })
        };

    }
]);
