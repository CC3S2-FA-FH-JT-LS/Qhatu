'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var consumidorSchema = Schema(
  {
    contraseña: { type: String, required: true },
    imagen: { type: String, required: true },
    nombre: { type: String, required: true },
    nombreUsuario: { type: String, required: true },
  },
  {
    collection: 'consumidores',
  }
);

module.exports = mongoose.model('consumidor', consumidorSchema);
