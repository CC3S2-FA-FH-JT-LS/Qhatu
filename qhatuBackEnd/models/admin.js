'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var adminSchema = Schema(
  {
    contraseña: { type: String, required: true },
    nombre: { type: String, required: true },
  },
  {
    collection: 'admin',
  }
);

module.exports = mongoose.model('admin', adminSchema);
