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
  return (
    <Box>
      <Router>
      <AppBarNav />
      <br />
        <Switch>
          <Route path="/comerciantes/productos">
            <ListaProductos 
              tiendaId= {localStorage.getItem("myStore")}
              comercianteBool={true}
            />
          </Route>
          <Route path="/comerciantes/editar">
            <EditarCuenta />
          </Route>
          <Route path="/comerciantes/nuevop">
            <FormularioNuevoProducto tiendaId={localStorage.getItem("myStore")}/>
          </Route>
          <Route path="/comerciantes/eproducto/:id"  children={<FormularioEditarProducto/>}/>
          
          <Route path={["/comerciantes/dashboard", "/comerciantes","/"]}>
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
                  tiendaId={localStorage.getItem("myStore")}
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
