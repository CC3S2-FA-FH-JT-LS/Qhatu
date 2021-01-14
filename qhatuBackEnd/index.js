'use strict';
var mongoose = require('mongoose');
var app = require('./app');
var port = 3800;

//Conexion Database
mongoose.Promise = global.Promise;
const urlDB =
  'mongodb+srv://userQhatu:softwareQhatu@qhatu.5zrri.mongodb.net/qhatuDB?retryWrites=true&w=majority';
//const urlDB = 'mongodb://localhost:27017/qhatuDB';

mongoose
  .connect(urlDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('Conectado');

    //crear servidor
    app.listen(port, () => {
      console.log('Servidor corriendo en http://localhost:3800');
    });
  })
  .catch((err) => console.log(err));
