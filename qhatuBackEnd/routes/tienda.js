const express = require('express');
var api = express.Router();
const tiendaControllers = require('../controllers/tienda');

api.post('/contador-contacto', tiendaControllers.contadorContacto);
api.get('/mostrar-detalles-tienda', tiendaControllers.mostrarDetallesTienda);
api.get('/obtener-productos', tiendaControllers.obtenerProductos);
api.get('/obtener-comentarios', tiendaControllers.obtenerComentarios);
api.get(
  '/obtener-producto-por-id/:productoId',
  tiendaControllers.getOneProductoById
);

module.exports = api;
