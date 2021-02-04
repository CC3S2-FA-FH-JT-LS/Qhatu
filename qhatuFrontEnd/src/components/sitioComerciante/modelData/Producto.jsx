'use strict';

var ProductoModels;

if (ProductoModels === undefined) {
   ProductoModels = {};
}
ProductoModels.productoEjemplo = function (){
    return ({
        id:0,
        nombre: "Azúcar Rubia Bolsa 2 Kg",
        precio: "4.5",
        disponible: true,
        descripcion: "Azúcar Rubia Bolsa 2 Kg marca blanca",
        imagen:
          "https://wongfood.vteximg.com.br/arquivos/ids/279721-750-750/Azucar-Rubia-Metro-Bolsa-2-Kg-1-44706.jpg",
      });
}

export default ProductoModels;