'use strict';

//Agreements service used for articles REST endpoint
angular.module('mean.schools')
  // Factory  Projects
  .factory('Schools', ['Restangular', function(Restangular) {
    return Restangular.service('schools');
  }])
  // Factory  Local Projects
  .factory('SchoolsLocal', function() {
    var _schools = [];
    var _school = {};
    
    return {
      all: function () {
        return _schools;
      },
      set: function (schools) {
        _schools = schools;
      },
      get: function (id) {
        var _result;
        _schools.forEach(function(school, index) {
          if(school._id == id) {
            _result = school;
          };
        });
        
        console.log(_result);
        return _result;
      },
      add: function (school) {
        _schools.splice(0, 0, school);
      },
      remove: function (id) {
        _schools.forEach(function(school, index) {
          if(school._id == id) {
            _schools.splice(index, 1);
          };
        });
      },
      update: function(schoolUpdated) {
        _schools.forEach(function(school, index) {
          if(school._id == schoolUpdated._id) {
            _schools.splice(index, 1, schoolUpdated);
            currentRule = null;
          };
        });
      }
    };
  })
  ;
