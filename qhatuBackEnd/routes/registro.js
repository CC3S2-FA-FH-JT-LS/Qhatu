const express = require('express');
var api = express.Router();
const registroControllers = require('../controllers/registro');

api.post('/registrar-comerciante', registroControllers.registrarComerciante);
api.post('/registrar-consumidor', registroControllers.registrarConsumidor);

module.exports = api;
