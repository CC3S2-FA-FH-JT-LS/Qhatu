import React from "react";
import Grid from "@material-ui/core/Grid";
import AppBarNav from "./AppBarNav";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";

import ListaProductos from "../listaProductos/listaProductos";
import FormularioEditarProducto from "./formularioEditarProducto";
import FormularioNuevoProducto from "./formularioNuevoProducto";
import PanelDetallesTienda from "../DetalleTienda/panelDetallesTienda";
import TiendaModels from "../DetalleTienda/modelData/tienda";
import listaProductos from "../listaProductos/listaProductos";
import EditarCuenta from "./EditarCuenta";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  contenedor: {
    maxWidth: 345,
  },
  avatar: {
    backgroundColor: red,
  },
}));

export default function PaginaComerciante() {
  const [tiendaObtenida, setTiendaObtenida] = React.useState({valoracion:1});
  const [comentariosObtenidos, setComentariosObtenidos] = React.useState([]);

  useEffect(() => {
    axios.get("/api/mostrar-detalles-tienda",
      {params:{
        tiendaId :"600046678f25c125841686ad"
      }
      }
    ).then((res)=>{
      let laTienda = res.data.response
      let miComerciante = laTienda.comercianteId
      let miTienda = {
        id: laTienda._id,
        valoracion: parseInt(laTienda.valoracion) , //estrellas
        nombre: miComerciante.nombreTienda,
        descripcion:laTienda.informacionPuesto,
        imagen:
        "https://www.findevgateway.org/sites/default/files/inline-images/es_mujer_peruana_junto_a_su_puesto_de_verduras.jpg",}
      
      setTiendaObtenida(miTienda);
    })


    axios.get("/api/obtener-comentarios",
    {params:{
      tiendaId :"600046678f25c125841686ad"
    }
    }
  ).then((res)=>{
    let losComentarios = res.data.response.comentarios
    let arrComentarios = losComentarios.map((comen,index) => 
      ({
        id: index,
        valoracion: comen.valoracion, //estrellas
        fechaPublicacion : "10/12/20",
        contenido : comen.texto,

        usuario:"Camila Perez",
          imagen: "https://picsum.photos/seed/picsum/100",
      })
      ) 
      setComentariosObtenidos(arrComentarios);
  })
  }, []);
  

  return (
    <Box>
      <AppBarNav />
      <br />
      <Router>
        <Switch>
          <Route path="/comerciantes/productos">
            <ListaProductos />
          </Route>
          <Route path="/comerciantes/editar">
            <EditarCuenta />
          </Route>
          <Route path="/comerciantes/eproducto">
            <div>Editar Producto</div>
            <FormularioEditarProducto />
          </Route>
          <Route path={["/comerciantes/dashboard", "/comerciantes/"]}>
            <Grid
              container
              spacing={0}
              direction="column"
              alignItems="center"
              justify="center"
              style={{ minHeight: "100vh" }}
            >
              <Grid item xs={12}>
                <PanelDetallesTienda
                  tienda={tiendaObtenida}
                  comentarios={comentariosObtenidos}
                  estadisticas={TiendaModels.estadisticasTiendaEjemplo()}
                />
              </Grid>
            </Grid>
          </Route>
        </Switch>
      </Router>
    </Box>
  );
}

/*
      <PanelDetallesTienda
      tienda={TiendaModels.tiendaEjemplo()}
      estadisticas={TiendaModels.estadisticasTiendaEjemplo()}
      />
*/
