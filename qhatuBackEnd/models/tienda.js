'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tiendaSchema = Schema(
  {
    categoria: { type: String, required: true },
    comentarios: [
      {
        type: Schema.ObjectId,
        ref: 'comentario',
      },
    ],
    comercianteId: { type: Schema.ObjectId, ref: 'comerciante' },
    contactos: {
      type: Number,
      default: 0,
    },
    imagen: String,
    informacionPuesto: { type: String, required: true },
    numeroPuesto: { type: String, required: true },
    productos: [
      {
        type: Schema.ObjectId,
        ref: 'producto',
      },
    ],
    valoracion: { type: Number, default: 0 },
    visitas: { type: Number, default: 0 },
  },
  {
    collection: 'tiendas',
  }
);

module.exports = mongoose.model('tienda', tiendaSchema);
