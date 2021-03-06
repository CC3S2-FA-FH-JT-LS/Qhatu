'use strict';

const Tienda = require('../models/tienda');
const Producto = require('../models/producto');

exports.mostrarDetallesTienda = async (req, res) => {
  const tiendaId = req.query.tiendaId;

  try {
    const tienda = await Tienda.findByIdAndUpdate(
      tiendaId,
      {
        $inc: { visitas: 1 },
      },
      { new: true }
    )
      .populate('comercianteId')
      .exec();
    if (!tienda) {
      return res.status(500).json({
        ok: false,
        response: 'Ocurrio un error al buscar la tienda',
      });
    }
    return res.status(200).json({
      ok: true,
      response: tienda,
    });
  } catch (exception) {
    console.log('Segundo 500');

    return res.status(500).json({
      ok: false,
      message: `${exception}`,
    });
  }
};

exports.obtenerProductos = async (req, res) => {
  //cambio 3/2/21
  const tiendaId = req.query.tiendaId;
  try {
    const tienda = await Tienda.findById(tiendaId, { productos: 1 })
      .populate('productos')
      .exec();
    if (!tienda) {
      return res.status(500).json({
        ok: false,
        response: 'Ocurrio un error al buscar la tienda',
      });
    }
    return res.status(200).json({
      ok: true,
      response: tienda,
    });
  } catch (exception) {
    return res.status(500).json({
      ok: false,
      message: `${exception}`,
    });
  }
};

exports.obtenerComentarios = async (req, res) => {
  const tiendaId = req.query.tiendaId;

  try {
    const tienda = await Tienda.findById(tiendaId, { comentarios: 1 })
      .populate({ path: 'comentarios', populate: [{ path: 'consumidorId' }] })
      .exec();
    if (!tienda) {
      return res.status(500).json({
        ok: false,
        response: 'Ocurrio un error al buscar la tienda',
      });
    }
    return res.status(200).json({
      ok: true,
      response: tienda,
    });
  } catch (exception) {
    return res.status(500).json({
      ok: false,
      message: `${exception}`,
    });
  }
};

exports.contadorContacto = async (req, res) => {
  const tiendaId = req.body.tiendaId;

  try {
    const tienda = await Tienda.findByIdAndUpdate(tiendaId, {
      $inc: { contactos: 1 },
    }).exec();
    if (!tienda) {
      return res.status(500).json({
        ok: false,
        response: 'Ocurrio un error al buscar la tienda',
      });
    }
    return res.status(200).json({
      ok: true,
      response: 'Success',
    });
  } catch (exception) {
    return res.status(500).json({
      ok: false,
      message: `${exception}`,
    });
  }
};

exports.getOneProductoById = async (req, res) => {
  const productoId = req.params.productoId;

  try {
    const producto = await Producto.findById(productoId).exec();
    if (!producto) {
      return res.status(500).json({
        ok: false,
        response: 'Ocurrio un error al buscar el producto',
      });
    }

    return res.status(200).json({
      ok: true,
      response: producto,
    });
  } catch (exception) {}
};
