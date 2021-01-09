const express = require('express');
var api = express.Router();
const consumidorControllers = require('../controllers/consumidor');

api.post('/dejar-comentario', consumidorControllers.dejarComentario);

module.exports = api;
