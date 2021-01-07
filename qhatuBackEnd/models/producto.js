'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productoSchema = Schema(
  {
    estado: String,
    descripcion: String,
    imagen: String,
    nombre: String,
    precio: Number,
  },
  {
    collection: 'productos',
  }
);

module.exports = mongoose.model('producto', productoSchema);
