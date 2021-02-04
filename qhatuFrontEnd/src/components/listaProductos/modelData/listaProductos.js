'use strict';
var values;

if (values === undefined) {
   values = {};
}

values.data = function() {
   return [

        {nombre: "Azúcar Rubia Bolsa 2 Kg",
        id:0,
        precio: "4.5",
        disponible: true,
        descripcion: "Azúcar Rubia Bolsa 2 Kg marca blanca",
        imagen: "https://source.unsplash.com/random"},

        {nombre: "Arroz Integral 1 Kg",
        id:1,
        precio: "3.2",
        disponible: false,
        descripcion: "Arroz Integral Bolsa 1 Kg marca costeño",
        imagen: "https://source.unsplash.com/random"},
        
        {nombre: "Paneton Caja Donofrio",
        id:2,
        precio: "19.5",
        disponible: true,
        descripcion: "Paneton Donofrio presentacion Caja",
        imagen: "https://source.unsplash.com/random"},
        
        {nombre: "Papel Higenico Chems",
        id:3,
        precio: "6.9",
        disponible: true,
        descripcion: "Papel Higienico Doble Capa marca Chems",
        imagen: "https://source.unsplash.com/random"},
        
        {nombre: "Gelatina Universal 500gr",
        id:4,
        precio: "2.2",
        disponible: false,
        descripcion: "Gelatina sabor Fresa marca Universal",
        imagen: "https://source.unsplash.com/random"},
   ];
};
export default values;