'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var comentarioSchema = Schema(
  {
    consumidorId: {
      type: Schema.ObjectId,
      ref: 'consumidor',
    },
    valoracion: Number,
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
