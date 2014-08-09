'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose')
  , Student = mongoose.model('Student')
  , fs = require('fs')
  , _ = require('lodash');


// CREATE
exports.upload = function (req, res) {

    var oldPath = req.files.myFile.path;
    var separator = '/';
    var filename = oldPath.split(separator)[oldPath.split(separator).length-1];
    var newPath = [__dirname, '..' , '..', 'public', 'assets', 'img', 'uploads', '', filename].join(separator);

    var data = req.body || {};

    debugger;

    console.log('>>>>>');
    console.log('__dirname', __dirname);
    console.log('oldPath', oldPath);
    console.log('newPath: ', newPath);
    console.log('filename: ', filename);

    fs.rename(oldPath, newPath, function (err) {
        if (err === null) {

            data.photo =  {
              modificationDate: req.files.myFile.modifiedDate || new Date(),
              name: req.files.myFile.name || "???",
              size: req.files.myFile.size || 0,
              type: req.files.myFile.type || "???",
              filename: filename
            };

            debugger;
            var doc = new Student(data);

            console.log('Renaming file to ', req.files.myFile.name);

            doc.save(function (err) {

                var retObj = {
                    meta: {"action": "upload", 'timestamp': new Date(), filename: __filename},
                    doc: doc,
                    err: err
                };
                return res.send(retObj);
            });
        }
    });
}


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
  var file = req.files;
  debugger;
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
 Student.find()
  .sort('-created')
  .populate('user', 'name username')
  .populate('schools', 'name')
  .exec(function(err, students) {
    if (err) {
      return res.json(500, {
        error: 'Cannot list the students'
      });
    }
    res.json(students);

  });
};
