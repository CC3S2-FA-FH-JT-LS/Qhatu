'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var comercianteSchema = Schema(
  {
    contacto: String,
    contraseña: String,
    nombre: String,
    nombreTienda: String,
    nombreUsuario: String,
    tiendaId: { type: Schema.ObjectId, ref: 'tienda' },
  },
  {
    collection: 'comerciantes',
  }
);

module.exports = mongoose.model('comerciante', comercianteSchema);
