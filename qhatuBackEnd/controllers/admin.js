'use strict';

const Comentarios = require('../models/comentario');
const Comerciante = require('../models/comerciante');
const Tienda = require('../models/tienda');
//metodo de pruebas

exports.getComerciantes = async (req, res) => {
  try {
    const comerciantes = await Comerciante.find({}).exec();
    if (!comerciantes) {
      return res.status(400).json({
        ok: false,
        message: `Ocurrio un error al traer los comerciantes.`,
      });
    }
    return res.status(200).json({
      ok: true,
      message: comerciantes,
    });
  } catch (exception) {
    return res.status(500).json({
      ok: false,
      message: `${exception}`,
    });
  }
};

exports.eliminarComerciante = async (req, res) => {
  const comercianteId = req.body.comercianteId;

  try {
    const comercianteEliminado = await Comerciante.findByIdAndDelete(
      comercianteId
    ).exec();
    if (!comercianteEliminado) {
      return res.status(400).json({
        ok: false,
        message: `Ocurrio un error al tratar de eliminar el comerciante: ${comercianteId}`,
      });
    }
    const tiendaId = comercianteEliminado.tiendaId;
    const tiendaEliminada = await Tienda.findByIdAndDelete(tiendaId).exec();
    if (!tiendaEliminada) {
      return res.status(400).json({
        ok: false,
        message: `Ocurrio un error al tratar de eliminar la tienda: ${tiendaId}`,
      });
    }
    const comentarios = tiendaEliminada.comentarios;
    const comentariosEliminados = await Comentarios.deleteMany({
      _id: { $in: comentarios },
    }).exec();
    if (!comentariosEliminados) {
      return res.status(400).json({
        ok: false,
        message: `Ocurrio un error al tratar de eliminar los comentarios: ${comentarios}`,
      });
    }
    return res.status(200).json({
      ok: true,
      response: 'Success.',
    });
  } catch (exception) {
    return res.status(500).json({
      ok: false,
      message: `${exception}`,
    });
  }
};
