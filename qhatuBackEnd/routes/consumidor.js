const express = require('express');
var api = express.Router();
const consumidorControllers = require('../controllers/consumidor');

api.post('/registrar-consumidor', consumidorControllers.registrarConsumidor);

module.exports = api;
