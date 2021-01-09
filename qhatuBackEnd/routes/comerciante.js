const express = require('express');
var api = express.Router();
const comercianteControllers = require('../controllers/comerciante');

api.post('/add-producto', comercianteControllers.agregarProducto);

api.put('/update-producto', comercianteControllers.editarProducto);

api.delete('/delete-producto', comercianteControllers.eliminarProducto);

module.exports = api;
