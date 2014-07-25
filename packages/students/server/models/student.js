'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;


/**
 * Student Schema
 */
var StudentSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  dni: {
    type: Number,
    required: true,
    trim: true
  },
  names: {
    type: String,
    required: true,
    trim: true
  },
  fatherName: {
    type: String,
    required: true,
    trim: true
  },
  motherName: {
    type: String,
    required: true,
    trim: true
  },
  address: {
    type: String,
    required: true,
    trim: true
  },
  telephone: {
    type: Number,
    required: true,
    trim: true
  },
  photo: {
    type: String,
    required: true,
    trim: true
  },

  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

/**
 * Validations
 */
StudentSchema.path('dni').validate(function(dni) {
  return !!dni;
}, 'Este campo es obligatorio');

StudentSchema.path('names').validate(function(names) {
  return !!names;
}, 'Este campo es obligatorio');

StudentSchema.path('fatherName').validate(function(fatherName) {
  return !!fatherName;
}, 'Este campo es obligatorio');

StudentSchema.path('motherName').validate(function(motherName) {
  return !!motherName;
}, 'Este campo es obligatorio');

/**
 * Statics
 */
StudentSchema.statics.load = function(id, cb) {
  this.findOne({
    _id: id
  }).populate('user', 'name username').exec(cb);
};

mongoose.model('Student', StudentSchema);
