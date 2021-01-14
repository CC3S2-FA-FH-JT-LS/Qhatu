'use strict';

const Comentario = require('../models/comentario');
const Comerciante = require('../models/comerciante');
const Consumidor = require('../models/consumidor');
const Tienda = require('../models/tienda');

exports.buscarTienda = async (req, res) => {
  const params = req.body;
  const tienda = params.tienda;
  const filtro = params.filtro;
  // Filtro puede ser: nombre, producto, calificacion... etc.

  console.log(params);
  try {
    var re = new RegExp(tienda + '.*', 'g');
    const tiendas = await Comerciante.find({
      nombreTienda: { $in: [re] },
    }).exec();
    console.log(tiendas);
  } catch (exception) {}
};

exports.monstrarProductos = async (req, res) => {};

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
    console.log(antiguaValoracion);
    const totalValoraciones = tiendaActualizada1.comentarios.length;
    console.log(totalValoraciones);
    const nuevaValoracion = (
      (antiguaValoracion * (totalValoraciones - 1) + parseFloat(valoracion)) /
      totalValoraciones
    ).toFixed(2);
    console.log(nuevaValoracion);
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
  } catch (exception) {}
};
