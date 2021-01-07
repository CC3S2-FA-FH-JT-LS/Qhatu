'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var consumidorSchema = Schema(
  {
    contraseña: String,
    imagen: String,
    nombre: String,
    nombreUsuario: String,
  },
  {
    collection: 'consumidores',
  }
);

module.exports = mongoose.model('consumidor', consumidorSchema);
