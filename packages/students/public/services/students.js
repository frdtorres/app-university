'use strict';

//Agreements service used for articles REST endpoint
angular.module('mean.students')
  // Factory  Projects
  .factory('Students', ['Restangular', function(Restangular) {
    return Restangular.service('students');
  }])
