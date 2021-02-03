'use strict';

const Comerciante = require('../models/comerciante');
const Consumidor = require('../models/consumidor');

exports.login = async (req, res) => {
  console.log("You make a get request")
  const params = req.query;
  console.log(params)
  const nombreUsuario = params.nombreUsuario;
  const contraseña = params.password;
  let isConsumidor = true;
  let isComerciante = true;
  console.log(contraseña);

  try {
    const comerciante = await Comerciante.findOne({ nombreUsuario }).exec();
    const consumidor = await Consumidor.findOne({ nombreUsuario }).exec();

    if (!comerciante) {
      console.log('false 1');
      isComerciante = false;
    } else if (!consumidor) {
      console.log('false 2');
      isConsumidor = false;
    } else {
      return res.status(404).json({
        ok: false,
        response: 'No se encontró el usuario en la base de datos',
      });
    }

    if (isComerciante) {
      if (comerciante.contraseña === contraseña) {
        return res.status(200).json({
          ok: true,
          rol: 'comerciante',
          response: comerciante,
        });
      }
    }

    if (isConsumidor) {
      if (consumidor.contraseña === contraseña) {
        return res.status(200).json({
          ok: true,
          rol: 'consumidor',
          response: consumidor,
        });
      }
    }
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: `${exception}`,
    });
  }
};
