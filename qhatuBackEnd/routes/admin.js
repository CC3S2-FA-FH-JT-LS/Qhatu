const express = require('express');
var api = express.Router();
const adminControllers = require('../controllers/admin');

api.get('/get-comerciantes', adminControllers.getComerciantes);
api.delete('/delete-comerciante', adminControllers.eliminarComerciante);

module.exports = api;
