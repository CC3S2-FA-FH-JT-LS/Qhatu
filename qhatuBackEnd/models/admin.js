'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var adminSchema = Schema(
  {
    contraseña: { type: String },
    nombre: { type: String },
  },
  {
    collection: 'admin',
  }
);

module.exports = mongoose.model('admin', adminSchema);
