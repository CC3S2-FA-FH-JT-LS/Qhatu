'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

//cargar rutas
const adminRouters = require('./routes/admin');
const comercianteRouters = require('./routes/comerciante');
const consumidorRouters = require('./routes/consumidor');
const registroRouters = require('./routes/registro');

//middlewares_ un metodo q se ejecute antes de llegar a un controlador
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//cors // configurar cabeceras http
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
app.use('/api', adminRouters);
app.use('/api', comercianteRouters);
app.use('/api', consumidorRouters);
app.use('/api', registroRouters);

//exportar
module.exports = app;
