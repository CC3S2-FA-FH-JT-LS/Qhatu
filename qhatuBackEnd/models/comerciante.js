'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var comercianteSchema = Schema(
  {
    contacto: { type: String, required: true },
    contraseña: { type: String, required: true },
    nombre: { type: String, required: true },
    // 1/2/21 mod
    imagen: {type: String, required: true},
    fCreacion:{type: Object, required: true},
    // 1/2/21 mod
    nombreTienda: { type: String, required: true },
    nombreUsuario: { type: String, required: true },
    tiendaId: { type: Schema.ObjectId, ref: 'tienda' },
  },
  {
    collection: 'comerciantes',
  }
);

module.exports = mongoose.model('comerciante', comercianteSchema);
