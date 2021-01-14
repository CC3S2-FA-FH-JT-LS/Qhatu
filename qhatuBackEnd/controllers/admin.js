'use strict';

const Comentarios = require('../models/comentario');
const Comerciante = require('../models/comerciante');
const Consumidores = require('../models/consumidor');
const Producto = require('../models/producto');
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

exports.obtenerEstadisticasAdmin = async (req, res) => {
  try {
    const tiendas = await Tienda.find({}).exec();
    let visitas = 0;
    let contactos = 0;
    tiendas.forEach((element) => {
      visitas += element.visitas;
      contactos += element.contactos;
    });
    const consumidores = await Consumidores.countDocuments({}).exec();
    const comentarios = await Comentarios.countDocuments({}).exec();
    const productos = await Producto.countDocuments({}).exec();
    const estadisticas = {};
    estadisticas.comentarios = comentarios;
    estadisticas.comerciantes = tiendas.length;
    estadisticas.consumidores = consumidores;
    estadisticas.contactos = contactos;
    estadisticas.productos = productos;
    estadisticas.visitas = visitas;

    return res.status(200).json({
      ok: true,
      response: estadisticas,
    });
  } catch (exception) {
    return res.status(500).json({
      ok: false,
      message: `${exception}`,
    });
  }
};
