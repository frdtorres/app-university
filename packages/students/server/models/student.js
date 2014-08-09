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
  photo: {                                // <--- nested document (not sub document)
    modificationDate: {type: Date},
    name: {type: String},
    size: {type: Number},
    type: {type: String},
    filename: {type: String}
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  schools: [{
    type: Schema.ObjectId,
    ref: 'School'
  }]
});

/**
 * Validations
 */
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
  })
  .populate('user', 'name username')
  .populate('schools', 'name')
  .exec(cb);
};

mongoose.model('Student', StudentSchema);
