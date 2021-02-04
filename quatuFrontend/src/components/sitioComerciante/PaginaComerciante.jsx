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
  
  useEffect(() => {
    
    console.log("Antes de axios");


    axios.get("/api/mostrar-detalles-tienda",
      {params:{
        tiendaId :"600046678f25c125841686ad"
      }
      }
    ).then((res)=>{
      //console.log("obtenido: ");
      //console.log(res);
      let laTienda = res.data.response
      let miTienda = {
                    id: 0,
                    valoracion: 4, //estrellas
                    nombre: "Tienda seño Maria",
                    descripcion:laTienda.informacionPuesto,
                    imagen:
                      "https://www.findevgateway.org/sites/default/files/inline-images/es_mujer_peruana_junto_a_su_puesto_de_verduras.jpg",
                  }
      console.log( "La tieenda \n", laTienda);
    })


    axios.get("/api/obtener-comentarios",
    {params:{
      tiendaId :"600046678f25c125841686ad"
    }
    }
  ).then((res)=>{
    console.log("mensajes: ");
    console.log(res);
  })


    console.log("-----------------------------");
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
            <div>Editar Prodcuto</div>
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
                  tienda={{
                    id: 0,
                    valoracion: 4, //estrellas
                    nombre: "Tienda seño Maria",
                    descripcion:
                      "Lo mejor al mejor precio. Encuentranos en el mercado La Aurora Avenida Emancipación 668",
                    imagen:
                      "https://www.findevgateway.org/sites/default/files/inline-images/es_mujer_peruana_junto_a_su_puesto_de_verduras.jpg",
                  }}
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
