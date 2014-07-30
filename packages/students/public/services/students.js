'use strict';

//Agreements service used for articles REST endpoint
angular.module('mean.students')
  // Factory  Projects
  .factory('Students', ['Restangular', function(Restangular) {
    return Restangular.service('students');
  }])
  // Factory  Local Projects
  .factory('StudentsLocal', function() {
    var _students = [];
    var _student = {};
    
    return {
      all: function () {
        return _students;
      },
      set: function (students) {
        _students = students;
      },
      get: function (id) {
        var _result;
        _students.forEach(function(student, index) {
          if(student._id == id) {
            _result = student;
          };
        });
        
        console.log(_result);
        return _result;
      },
      add: function (student) {
        _students.splice(0, 0, student);
      },
      remove: function (id) {
        _students.forEach(function(student, index) {
          if(student._id == id) {
            _students.splice(index, 1);
          };
        });
      },
      update: function(studentUpdated) {
        _students.forEach(function(student, index) {
          if(student._id == studentUpdated._id) {
            _students.splice(index, 1, studentUpdated);
            currentRule = null;
          };
        });
      }
    };
  })
  ;