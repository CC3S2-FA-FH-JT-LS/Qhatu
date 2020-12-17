"use strict";

var ComercianteModels;

if (ComercianteModels === undefined) {
  ComercianteModels = {};
}
ComercianteModels.comercianteEjemplo = function () {
  return {
    nombre: "Freider Achic",
    nombreUsuario: "fachicc",
    contacto: "987654321",
    puesto: 12,
    informacion: "Top 1 ventas de Brownies",
    categoria: "dulceria",
    imagen:
      "https://wongfood.vteximg.com.br/arquivos/ids/279721-750-750/Azucar-Rubia-Metro-Bolsa-2-Kg-1-44706.jpg"
  };
};

export default ComercianteModels;
