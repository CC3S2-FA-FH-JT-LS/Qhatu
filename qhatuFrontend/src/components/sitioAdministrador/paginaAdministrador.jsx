import React, { useState } from 'react';
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";

import EliminacionComerciante from "./eliminacionComerciante";
import EstadisticaSistema from "./estadisticaSistema";
import Button from "@material-ui/core/Button";



export default function PaginaAdministrador() {
const [mostrarEstadisticas, setMostrarEstadisticas] = useState(true);


  return (
    <Box>
      <Button variant="contained" onClick={()=>setMostrarEstadisticas(!mostrarEstadisticas)} color="primary">
        {(mostrarEstadisticas)?"Cambiar a eliminar comerciante":"Cambiar a mostrar estadisticas" }
        
      </Button>
      {
          (mostrarEstadisticas)?
          <EstadisticaSistema />:
          <EliminacionComerciante/>
      }
    </Box>
  );
}

/*
      <PanelDetallesTienda
      tienda={TiendaModels.tiendaEjemplo()}
      estadisticas={TiendaModels.estadisticasTiendaEjemplo()}
      />
*/
