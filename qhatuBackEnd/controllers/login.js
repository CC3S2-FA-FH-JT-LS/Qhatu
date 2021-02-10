'use strict';

const Comerciante = require('../models/comerciante');
const Consumidor = require('../models/consumidor');
const jwt = require('../services/jwt');
const bcrypt = require('bcrypt');

exports.login = async (req, res) => {
  console.log('You make a get request');
  const params = req.query;
  console.log(params);
  const nombreUsuario = params.nombreUsuario;
  const contraseña = params.contraseña;
  let isConsumidor = true;
  let isComerciante = true;

  try {
    const comerciante = await Comerciante.findOne({ nombreUsuario }).exec();
    const consumidor = await Consumidor.findOne({ nombreUsuario }).exec();

    if (!comerciante) {
      isComerciante = false;
    } else if (!consumidor) {
      isConsumidor = false;
    } else {
      return res.status(404).json({
        ok: false,
        response: 'No se encontró el usuario en la base de datos',
      });
    }

    if (isComerciante) {
      if (bcrypt.compareSync(contraseña, comerciante.contraseña)) {
        return res.status(200).json({
          ok: true,
          rol: 'comerciante',
          comerciante,
          token: jwt.createTokenComerciante(comerciante),
        });
      } else {
        return res.status(200).json({
          ok: false,
          message: 'Contraseña incorrecta',
        });
      }
    }

    if (isConsumidor) {
      if (bcrypt.compareSync(contraseña, consumidor.contraseña)) {
        return res.status(200).json({
          ok: true,
          rol: 'consumidor',
          consumidor,
          token: jwt.createTokenConsumidor(consumidor),
        });
      } else {
        return res.status(200).json({
          ok: false,
          message: 'Contraseña incorrecta',
        });
      }
    }
  } catch (exception) {
    return res.status(500).json({
      ok: false,
      message: `${exception}`,
    });
  }
};
