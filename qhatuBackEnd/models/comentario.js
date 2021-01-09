'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var comentarioSchema = Schema(
  {
    consumidorId: {
      type: Schema.ObjectId,
      required: true,
      ref: 'consumidor',
    },
    valoracion: { type: Number, required: true },
    texto: String,
    tiendaId: {
      type: Schema.ObjectId,
      ref: 'tienda',
    },
  },
  {
    collection: 'comentarios',
  }
);

module.exports = mongoose.model('comentario', comentarioSchema);
