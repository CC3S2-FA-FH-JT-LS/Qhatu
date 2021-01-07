const express = require('express');
var api = express.Router();
const comercianteControllers = require('../controllers/comerciante');

api.post('/registrar-comerciante', comercianteControllers.registrarComerciante);

module.exports = api;
