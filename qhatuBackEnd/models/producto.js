'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productoSchema = Schema(
  {
    estado: { type: String, required: true },
    descripcion: { type: String, required: true },
    imagen: { type: String },
    nombre: { type: String, required: true },
    precio: { type: Number, required: true },
  },
  {
    collection: 'productos',
  }
);

module.exports = mongoose.model('producto', productoSchema);
