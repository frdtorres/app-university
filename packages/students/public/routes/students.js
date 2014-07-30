'use strict';

angular.module('mean.students').config(['$stateProvider',
  function($stateProvider) {
    
    $stateProvider
      .state('students example page', {
        url: '/students/example',
        templateUrl: 'students/views/index.html'
      })
      
      .state('create student', {
            url: '/students/create',
            templateUrl: 'students/views/create.html'
        })
  }
]);
