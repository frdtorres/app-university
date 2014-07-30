'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
 Student = mongoose.model('Student'),
  _ = require('lodash');


/**
 * Find student by id
 */
exports.student = function(req, res, next, id) {
 Student.load(id, function(err, student) {
    if (err) return next(err);
    if (!student) return next(new Error('Failed to load student ' + id));
    req.student = student;
    next();
  });
};

/**
 * Create an student
 */
exports.create = function(req, res) {
  var student = new Student(req.body);
  student.user = req.user;

  student.save(function(err) {
    debugger;
    if (err) {
      return res.json(500, {
        error: 'Cannot save the student'
      });
    }
    res.json(student);

  });
};

/**
 * Update an student
 */
exports.update = function(req, res) {
  var student = req.student;

  student = _.extend(student, req.body);

  student.save(function(err) {
    if (err) {
      return res.json(500, {
        error: 'Cannot update the student'
      });
    }
    res.json(student);

  });
};

/**
 * Delete an student
 */
exports.destroy = function(req, res) {
  var student = req.student;

  student.remove(function(err) {
    if (err) {
      return res.json(500, {
        error: 'Cannot delete the student'
      });
    }
    res.json(student);

  });
};

/**
 * Show an student
 */
exports.show = function(req, res) {
  res.json(req.student);
};

/**
 * List ofStudents
 */
exports.all = function(req, res) {
 Student.find().sort('-created').populate('user', 'name username').exec(function(err, students) {
    if (err) {
      return res.json(500, {
        error: 'Cannot list the students'
      });
    }
    res.json(students);

  });
};
