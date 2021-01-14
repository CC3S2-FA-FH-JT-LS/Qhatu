'use strict';

const Comentarios = require('../models/comentario');
const Comerciante = require('../models/comerciante');
const Consumidor = require('../models/consumidor');
const Tienda = require('../models/tienda');
const Producto = require('../models/producto');
const tienda = require('../models/tienda');

exports.agregarProducto = async (req, res) => {
  const params = req.body;
  const tiendaId = params.tiendaId;
  const estado = params.estado;
  const descripcion = params.descripcion;
  const nombre = params.nombre;
  const precio = params.precio;

  try {
    const producto = new Producto();
    producto.estado = estado;
    producto.descripcion = descripcion;
    producto.nombre = nombre;
    producto.precio = precio;

    const nuevoProducto = await producto.save();

    const tiendaActualizada = await Tienda.findByIdAndUpdate(
      tiendaId,
      {
        $push: { productos: nuevoProducto._id },
      },
      { new: true }
    ).exec();
    if (!tiendaActualizada) {
      return res.status(400).json({
        ok: false,
        message: `Ocurrio un error actualizar la tienda: ${tiendaActualizada}.`,
      });
    }
    return res.status(200).json({
      ok: true,
      tiendaActualizada,
      nuevoProducto,
    });
  } catch (exception) {
    return res.status(500).json({
      ok: false,
      message: `${exception}`,
    });
  }
};

exports.editarProducto = async (req, res) => {
  const params = req.body;
  const productoId = params.productoId;
  const update = params.update;

  try {
    const productoEditado = await Producto.findByIdAndUpdate(
      productoId,
      update,
      { new: true }
    ).exec();
    if (!productoEditado) {
      return res.status(400).json({
        ok: false,
        message: `Ocurrio un error al editar el producto: ${productoId}.`,
      });
    }
    return res.status(200).json({
      ok: true,
      productoEditado,
    });
  } catch (exception) {
    return res.status(500).json({
      ok: false,
      message: `${exception}`,
    });
  }
};

exports.eliminarProducto = async (req, res) => {
  const params = req.body;
  const productoId = params.productoId;
  const tiendaId = params.tiendaId;

  try {
    const tiendaActualizada = await Tienda.findByIdAndUpdate(
      tiendaId,
      {
        $pull: { productos: productoId },
      },
      { new: true }
    ).exec();
    if (!tiendaActualizada) {
      return res.status(400).json({
        ok: false,
        message: `Ocurrio un error actualizar la tienda: ${tiendaActualizada}.`,
      });
    }
    const productoEliminado = await Producto.findByIdAndDelete(
      productoId
    ).exec();
    if (!productoEliminado) {
      return res.status(400).json({
        ok: false,
        message: `Ocurrio un error al eliminar el producto: ${productoId}.`,
      });
    }
    return res.status(200).json({
      ok: true,
      tiendaActualizada,
      productoEliminado,
    });
  } catch (exception) {
    return res.status(500).json({
      ok: false,
      message: `${exception}`,
    });
  }
};

exports.eliminarCuenta = async (req, res) => {};
