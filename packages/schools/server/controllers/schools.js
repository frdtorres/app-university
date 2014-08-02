'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
 School = mongoose.model('School'),
  _ = require('lodash');


/**
 * Find school by id
 */
exports.school = function(req, res, next, id) {
 School.load(id, function(err, school) {
    if (err) return next(err);
    if (!school) return next(new Error('Failed to load school ' + id));
    req.school = school;
    next();
  });
};

/**
 * Create an school
 */
exports.create = function(req, res) {
  var school = new School(req.body);
  school.user = req.user;

  school.save(function(err) {
    if (err) {
      return res.json(500, {
        error: 'Cannot save the school'
      });
    }
    res.json(school);

  });
};

/**
 * Update an school
 */
exports.update = function(req, res) {
  var school = req.school;

  school = _.extend(school, req.body);

  school.save(function(err) {
    if (err) {
      return res.json(500, {
        error: 'Cannot update the school'
      });
    }
    res.json(school);

  });
};

/**
 * Delete an school
 */
exports.destroy = function(req, res) {
  var school = req.school;

  school.remove(function(err) {
    if (err) {
      return res.json(500, {
        error: 'Cannot delete the school'
      });
    }
    res.json(school);

  });
};

/**
 * Show an school
 */
exports.show = function(req, res) {
  res.json(req.school);
};

/**
 * List ofSchools
 */
exports.all = function(req, res) {
 School.find().sort('-created').populate('user', 'name username').exec(function(err, schools) {
    if (err) {
      return res.json(500, {
        error: 'Cannot list the schools'
      });
    }
    res.json(schools);

  });
};
