'use strict';

const jwt = require('jwt-simple');
const moment = require('moment');
const secret = 'clave_secreta_software';

exports.createTokenComerciante = function (comerciante) {
  const payload = {
    sub: comerciante._id,
    contacto: comerciante.contacto,
    fCreacion: comerciante.fCreacion,
    imagen: comerciante.imagen,
    nombre: comerciante.nombre,
    nombreTienda: comerciante.nombreTienda,
    nombreUsuario: comerciante.nombreUsuario,
    tiendaId: comerciante.tiendaId,
    iat: moment().unix(),
    exp: moment().add(30, 'days').unix,
  };

  return jwt.encode(payload, secret);
};

exports.createTokenConsumidor = function (consumidor) {
  const payload = {
    sub: consumidor._id,
    imagen: consumidor.imagen,
    nombre: consumidor.nombre,
    nombreUsuario: consumidor.nombreUsuario,
    iat: moment().unix(),
    exp: moment().add(30, 'days').unix,
  };

  return jwt.encode(payload, secret);
};
