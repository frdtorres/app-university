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
    trim: true
  },
  telephone: {
    type: Number,
    trim: true
  },
  photo: {
    type: String,
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
StudentSchema.path('names').validate(function(names) {
  return names.length;
}, 'Este campo es obligatorio');

StudentSchema.path('fatherName').validate(function(fatherName) {
  return fatherName.length;
}, 'Este campo es obligatorio');

StudentSchema.path('motherName').validate(function(motherName) {
  return motherName.length;
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
