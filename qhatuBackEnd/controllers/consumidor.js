'use strict';

const Comentario = require('../models/comentario');
const Comerciante = require('../models/comerciante');
const Consumidor = require('../models/consumidor');
const Tienda = require('../models/tienda');

exports.buscarTienda = async (req, res) => {
  const params = req.body;
  const busqueda = params.busqueda;
  const filtro = params.filtro;
  // Filtro puede ser: nombre, producto, calificacion... etc.

  try {
    if (filtro === 'nombre') {
      const re = new RegExp(busqueda + '.*', 'g');
      const tiendas = await Comerciante.find({
        nombreTienda: { $in: [re] },
      }).exec();

      return res.status(200).json({
        ok: true,
        response: tiendas,
      });
    } else if (filtro === 'categoria') {
      const tiendas = await Tienda.find({
        categoria: busqueda,
      }).exec();

      return res.status(200).json({
        ok: true,
        response: tiendas,
      });
    } else if (filtro === 'calificacion') {
      const tiendas = await Tienda.find({}).sort('-valoracion').exec();

      return res.status(200).json({
        ok: true,
        response: tiendas,
      });
    }
  } catch (exception) {
    return res.status(500).json({
      ok: false,
      message: `${exception}`,
    });
  }
};

exports.dejarComentario = async (req, res) => {
  const params = req.body;
  const tiendaId = params.tiendaId;
  const consumidorId = params.consumidorId;
  const valoracion = params.valoracion;
  const texto = params.texto;

  try {
    const comentario = new Comentario();
    comentario.tiendaId = tiendaId;
    comentario.consumidorId = consumidorId;
    comentario.valoracion = valoracion;
    comentario.texto = texto;
    const nuevoComentario = await comentario.save();

    const tiendaActualizada1 = await Tienda.findByIdAndUpdate(
      tiendaId,
      {
        $push: { comentarios: nuevoComentario._id },
      },
      { new: true }
    ).exec();
    if (!tiendaActualizada1) {
      return res.status(400).json({
        ok: false,
        message: `Ocurrio un error actualizar la tienda: ${tiendaId}.`,
      });
    }
    const antiguaValoracion = tiendaActualizada1.valoracion;
    const totalValoraciones = tiendaActualizada1.comentarios.length;
    const nuevaValoracion = (
      (antiguaValoracion * (totalValoraciones - 1) + parseFloat(valoracion)) /
      totalValoraciones
    ).toFixed(2);
    const tiendaActualizada2 = await Tienda.findByIdAndUpdate(
      tiendaId,
      {
        valoracion: nuevaValoracion,
      },
      { new: true }
    ).exec();
    if (!tiendaActualizada2) {
      return res.status(400).json({
        ok: false,
        message: `Ocurrio un error actualizar la tienda: ${tiendaId}.`,
      });
    }
    return res.status(200).json({
      ok: true,
      response: 'Success.',
      nuevoComentario,
    });
  } catch (exception) {
    return res.status(500).json({
      ok: false,
      message: `${exception}`,
    });
  }
};
