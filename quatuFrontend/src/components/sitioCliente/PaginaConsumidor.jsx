import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";

import BuscarTiendas from "./BuscarTiendas";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from "axios";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
const useStyles = makeStyles((theme) => ({
  contenedor: {
    maxWidth: 345,
  },
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

const Barra = function(){
    const classes = useStyles();
    const handleLogOut = ()=>{
        localStorage.clear();
        window.location.reload(false);
      }
    return(
        <div>
            <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Qhatu
          </Typography>
          <Button onClick={handleLogOut} color="inherit">Log Out</Button>
        </Toolbar>
        </AppBar>
        </div>
    )
}

export default function PaginaConsumidor() {
  return (
    <Box>
        <Barra></Barra>
        <br></br>
      <Router>
      <br />
        <Switch>
          <Route path={["/consumidor","/"]}>
            <Grid
              container
              spacing={0}
              direction="column"
              alignItems="center"
              justify="center"
              style={{ minHeight: "100vh" }}
            >
              <Grid item xs={12}>
                <BuscarTiendas></BuscarTiendas>
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
