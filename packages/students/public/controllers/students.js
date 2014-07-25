'use strict';

angular.module('mean.students').controller('StudentsController', ['$scope', 'Global', 'Students',
    function($scope, Global, Students) {
        $scope.global = Global;
        $scope.package = {
            name: 'students'
        };
    }
]);
