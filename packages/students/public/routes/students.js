'use strict';

angular.module('mean.students').config(['$stateProvider',
    function($stateProvider) {
        $stateProvider.state('students example page', {
            url: '/students/example',
            templateUrl: 'students/views/index.html'
        });
    }
]);
