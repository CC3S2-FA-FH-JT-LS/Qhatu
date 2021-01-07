'use strict';

const Comentarios = require('../models/comentario');
const Comerciante = require('../models/comerciante');
const Consumidor = require('../models/consumidor');
const Tienda = require('../models/tienda');

exports.registrarConsumidor = async (req, res) => {
  const params = req.body;
  const nombre = params.nombre;
  const nombreUsuario = params.nombreUsuario;
  const contraseña = params.contraseña;
  const imagen = params.imagen;

  try {
    const consumidor = new Consumidor();
    consumidor.nombre = nombre;
    consumidor.nombreUsuario = nombreUsuario;
    consumidor.contraseña = contraseña;
    consumidor.imagen = imagen;
    const nuevoConsumidor = await consumidor.save();

    return res.status(200).json({
      ok: true,
      message: nuevoConsumidor,
    });
  } catch (exception) {
    return res.status(500).json({
      ok: false,
      message: `${exception}`,
    });
  }
};
