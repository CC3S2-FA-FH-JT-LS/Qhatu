const express = require('express');
var api = express.Router();
const loginControllers = require('../controllers/login');

api.get('/login', loginControllers.login);

module.exports = api;
