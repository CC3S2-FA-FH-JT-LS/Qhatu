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
  const imagen = params.imagen;

  try {
    const producto = new Producto();
    producto.estado = estado;
    producto.descripcion = descripcion;
    producto.nombre = nombre;
    producto.precio = precio;
    producto.imagen = imagen;
    
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
    console.log(exception);
    return res.status(500).json({
      ok: false,
      message: `${exception}`,
    });
  }
};

exports.editarProducto = async (req, res) => {
  console.log("Llamado a editar producto");

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

exports.eliminarCuenta = async (req, res) => {
  const comercianteId = req.body.comercianteId;

  try {
    const comercianteEliminado = await Comerciante.findByIdAndDelete(
      comercianteId
    ).exec();
    if (!comercianteEliminado) {
      return res.status(400).json({
        ok: false,
        message: `Ocurrio un error al eliminar el comerciante: ${comercianteId}.`,
      });
    }
    const tiendaEliminada = await Tienda.findByIdAndDelete(
      comercianteEliminado.tiendaId
    ).exec();
    if (!tiendaEliminada) {
      return res.status(400).json({
        ok: false,
        message: `Ocurrio un error al eliminar la tienda: ${comercianteEliminado.tiendaId}.`,
      });
    }
    const comentariosEliminador = await Comentarios.deleteMany({
      _id: { $in: tiendaEliminada.comentarios },
    }).exec();
    if (!comentariosEliminador) {
      return res.status(400).json({
        ok: false,
        message: `Ocurrio un error al eliminar el comerciante: ${tiendaEliminada._id}.`,
      });
    }
    const productosEliminados = await Producto.deleteMany({
      _id: { $in: tiendaEliminada.productos },
    }).exec();
    if (!productosEliminados) {
      return res.status(400).json({
        ok: false,
        message: `Ocurrio un error al eliminar el comerciante: ${tiendaEliminada._id}.`,
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

exports.obtenerEstadisticasTienda = async (req, res) => {
  const tiendaId = req.params.tiendaId;
  const estadisticas = {};

  try {
    const tienda = await Tienda.findById(tiendaId)
      .populate('comentarios')
      .exec();
    if (!tienda) {
      return res.status(500).json({
        ok: false,
        response: 'Ocurrio un error al buscar la tienda',
      });
    }
    estadisticas.visitas = tienda.visitas;
    estadisticas.valoracion = tienda.valoracion;
    estadisticas.contactos = tienda.contactos;
    estadisticas.numeroComentarios = tienda.comentarios.length;

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

exports.editarCuenta = async (req, res) => {
  const params = req.body;
  const comercianteId = params.comercianteId;
  const update = params.update;

  try {
    const comercianteEditado = await Comerciante.findByIdAndUpdate(
      comercianteId,
      update,
      { new: true }
    ).exec();
    if (!comercianteEditado) {
      return res.status(400).json({
        ok: false,
        message: `Ocurrio un error al editar el comerciante: ${comercianteId}.`,
      });
    }
    return res.status(200).json({
      ok: true,
      response: comercianteEditado,
    });
  } catch (exception) {
    return res.status(500).json({
      ok: false,
      message: `${exception}`,
    });
  }
};
