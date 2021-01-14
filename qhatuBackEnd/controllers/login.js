'use strict';

const Comerciante = require('../models/comerciante');
const Consumidor = require('../models/consumidor');

//falta
exports.login = async (req, res) => {
  const params = req.body;
  const nombreUsuario = params.nombreUsuario;
  const password = params.password;
  try {
    const comerciante = await Comerciante.findOne({ nombreUsuario }).exec();
    const consumidor = await Consumidor.findOne({ nombreUsuario }).exec();

    if (!comerciante) {
    }
  } catch (error) {}
};
