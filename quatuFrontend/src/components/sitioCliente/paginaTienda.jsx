import React from "react";
import PanelDetallesTienda from "../DetalleTienda/panelDetallesTienda";
import TiendaModels from "../DetalleTienda/modelData/tienda";
import ListaProductos from "../listaProductos/listaProductos";
import Grid from "@material-ui/core/Grid";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  contenedor: {
    maxWidth: 345,
  },
  avatar: {
    backgroundColor: red,
  },
}));

export default function PaginaTienda() {
  return (
    <Grid container spacing={3}>
        
        <Grid item xs={6}>
          <PanelDetallesTienda
            tienda={TiendaModels.tiendaEjemplo()}
          />
        </Grid>

        <Grid item xs={6}>
          <ListaProductos />
        </Grid>

    </Grid>
  );
}
