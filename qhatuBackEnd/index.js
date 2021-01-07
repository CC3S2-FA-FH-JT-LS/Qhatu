'use strict';
var mongoose = require('mongoose');
var app = require('./app');
var port = 3800;

//Conexion Database
mongoose.Promise = global.Promise;
mongoose
  .connect(
    'mongodb+srv://userProyectoQhatu:softwareQhatu@yuma990.syj68.gcp.mongodb.net/qhatuDB?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    }
  )
  .then(() => {
    console.log('Conectado');

    //crear servidor
    app.listen(port, () => {
      console.log('Servidor corriendo en http://localhost:3800');
    });
  })
  .catch((err) => console.log(err));
