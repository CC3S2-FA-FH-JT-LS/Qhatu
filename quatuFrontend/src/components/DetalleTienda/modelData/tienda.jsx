"use strict";

var TiendaModels;

if (TiendaModels === undefined) {
  TiendaModels = {};
}
TiendaModels.tiendaEjemplo = function () {
  return {
    id: 0,
    valoracion: 4, //estrellas
    nombre: "Tienda seño Maria",
    descripcion:
      "Lo mejor al mejor precio. Encuentranos en el mercado La Aurora Avenida Emancipación 668",
    imagen:
      "https://www.findevgateway.org/sites/default/files/inline-images/es_mujer_peruana_junto_a_su_puesto_de_verduras.jpg",
  };
};
TiendaModels.estadisticasTiendaEjemplo = function () {
    return {
      confirmaciones: 0,
      visitas: 7,
      itemPopular: "Arroz caserita",
      itemNoPopular:"Clips",
      numeroValoraciones:10,
    };
  };
  
TiendaModels.comentarios = function () {
  return [
    {
      id: 0,
      valoracion: 5, //estrellas
      fechaPublicacion:"10/12/20",
      contenido:
        "Integer suscipit libero cursus ante porta, in porta diam aliquam In vel.",
      usuario:"Camila Perez",
        imagen: "https://picsum.photos/seed/picsum/100",
    },
    {
      id: 1,
      valoracion: 2, //estrellas
      fechaPublicacion:"11/11/20",
      contenido:
        "Integer suscipit libero cursus ante porta, in porta diam aliquam In vel.",
      usuario:"Juan Quispe",
        imagen: "https://picsum.photos/seed/picsum/100",
    },
    {
      id: 2,
      valoracion: 4, //estrellas
      fechaPublicacion:"03/08/20",
      contenido:
        "Integer suscipit libero cursus ante porta, in porta diam aliquam In vel.",
      usuario:"Pedro Navarro",
        imagen: "https://picsum.photos/seed/picsum/100",
    },
    {
      id: 3,
      valoracion: 4, //estrellas
      fechaPublicacion:"10/12/20",
      contenido:
        "Integer suscipit libero cursus ante porta, in porta diam aliquam In vel.",
      usuario:"Marta Ramirez",
        imagen: "https://picsum.photos/seed/picsum/100",
    },
    {
      id: 4,
      valoracion: 3, //estrellas
      fechaPublicacion:"10/12/20",
      contenido:
        "Integer suscipit libero cursus ante porta, in porta diam aliquam In vel.",
      usuario:"Juliana de la Cruz",
        imagen: "https://picsum.photos/seed/picsum/100",
    },
    {
      id: 5,
      valoracion: 5, //estrellas
      fechaPublicacion:"10/12/20",
      contenido:
        "Integer suscipit libero cursus ante porta, in porta diam aliquam In vel.",
      usuario:"Mario Rojas",
        imagen: "https://picsum.photos/seed/picsum/100",
    },
  ];
};

export default TiendaModels;
