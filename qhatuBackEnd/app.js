'use strict';

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

//cargar rutas
var consumidorRouters = require('./routes/consumidor');

//middlewares_ un metodo q se ejecute antes de llegar a un controlador
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//cors // configurar cabeceras http //Victor nos da este codigo en su pagina.
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method'
  );
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

  next();
});

//rutas
app.use('/api', consumidorRouters);
//exportar
module.exports = app;
