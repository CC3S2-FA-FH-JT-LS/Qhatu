import React from "react";
import PanelDetallesTienda from "../DetalleTienda/panelDetallesTienda";
import TiendaModels from "../DetalleTienda/modelData/tienda";
import ListaProductos from "../listaProductos/listaProductos";
import Grid from "@material-ui/core/Grid";
import { useEffect, useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  contenedor: {
    maxWidth: 345,
  },
  avatar: {
    backgroundColor: red,
  },
}));

export default function PaginaTienda(props) {

  
  return (
    <Grid container id="griT1" spacing={3}>
        
        <Grid id="griT1"  item xs={5}>
          <PanelDetallesTienda
            tiendaId={props.tiendaId}
          />
        </Grid>

        <Grid id="griT2" item xs={7}>
          <ListaProductos />
        </Grid>

    </Grid>
  );
}
