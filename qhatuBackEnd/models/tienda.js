'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tiendaSchema = Schema(
  {
    categoria: String,
    comentarios: [
      {
        type: Schema.ObjectId,
        ref: 'comentarios',
      },
    ],
    comercianteId: { type: Schema.ObjectId, ref: 'comerciante' },
    imagen: String,
    informacionPuesto: String,
    numeroPuesto: String,
    productos: [
      {
        type: Schema.ObjectId,
        ref: 'producto',
      },
    ],
    valoracion: Number,
    visitas: { type: Number, default: 0 },
  },
  {
    collection: 'tiendas',
  }
);

module.exports = mongoose.model('tienda', tiendaSchema);
