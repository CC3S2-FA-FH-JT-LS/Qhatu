'use strict';

const Comentarios = require('../models/comentario');
const Comerciante = require('../models/comerciante');
const Consumidor = require('../models/consumidor');
const Tienda = require('../models/tienda');

exports.registrarComerciante = async (req, res) => {
  const params = req.body;
  const contacto = params.contacto;
  const contraseña = params.contraseña;
  const nombre = params.nombre;
  const nombreTienda = params.nombreTienda;
  const nombreUsuario = params.nombreUsuario;

  const categoria = params.categoria;
  const imagen = params.imagen;
  const informacionPuesto = params.informacionPuesto;
  const numeroPuesto = params.numeroPuesto;

  try {
    const comerciante = new Comerciante();
    comerciante.contacto = contacto;
    comerciante.contraseña = contraseña;
    comerciante.nombre = nombre;
    comerciante.nombreUsuario = nombreUsuario;
    comerciante.nombreTienda = nombreTienda;
    const nuevoComerciante = await comerciante.save();

    const tienda = new Tienda();
    tienda.categoria = categoria;
    tienda.comercianteId = nuevoComerciante._id;
    tienda.imagen = imagen;
    tienda.informacionPuesto = informacionPuesto;
    tienda.numeroPuesto = numeroPuesto;
    const nuevaTienda = await tienda.save();

    const comercianteActualizado = await Comerciante.findByIdAndUpdate(
      nuevoComerciante._id,
      { tiendaId: nuevaTienda._id },
      { new: true }
    ).exec();
    return res.status(200).json({
      ok: true,
      comerciante: comercianteActualizado,
      tienda: nuevaTienda,
    });
  } catch (exception) {
    return res.status(500).json({
      ok: false,
      message: `${exception}`,
    });
  }
};
