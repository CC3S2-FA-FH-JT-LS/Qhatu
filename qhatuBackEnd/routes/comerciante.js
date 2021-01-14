const express = require('express');
var api = express.Router();
const comercianteControllers = require('../controllers/comerciante');

api.post('/add-producto', comercianteControllers.agregarProducto);

api.get(
  '/obtener-estadisticas-tienda',
  comercianteControllers.obtenerEstadisticasTienda
);

api.put('/update-producto', comercianteControllers.editarProducto);
api.put('/editar-cuenta', comercianteControllers.editarCuenta);

api.delete('/delete-producto', comercianteControllers.eliminarProducto);
api.delete(
  '/eliminar-cuenta-comerciante',
  comercianteControllers.eliminarCuenta
);

module.exports = api;
