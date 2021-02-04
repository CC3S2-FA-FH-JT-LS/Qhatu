import React, { Component } from "react";
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import 'fontsource-roboto';
import "./estadisticaSistema.css";

import axios from "axios";
const useStyles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  tittle:{
    textAlign: 'center',
  }
});

class EstadisticaSistema extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //valores:values.data()
      valores:"Not loaded"
    };
  }
  componentDidMount = () => {
    axios.get("/api/obtener-estadisticas-admin").then(response => {
      this.setState({
        valores:response.data.response
      });
    });
  };
  render() {
    const  {classes}  = this.props;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
            <div>
              <Typography className={classes.tittle} id="valoracionLabel" gutterBottom variant="h5" component="h2">
                Estadisticas del Sistema
              </Typography>
            </div>
            
            <div>
              <Grid container spacing={3}>

                <Grid item xs={12} sm={6}>
                  <Paper className={classes.paper}>Cantidad de comentarios totales:{this.state.valores.comentarios}</Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Paper className={classes.paper}>Cantidad de usuarios comerciantes:{this.state.valores.comerciantes}</Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Paper className={classes.paper}>Cantidad de usuarios consumidores:{this.state.valores.consumidores}</Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Paper className={classes.paper}>Cantidad de contactos concretados:{this.state.valores.contactos}</Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Paper className={classes.paper}>Cantidad de productos:{this.state.valores.productos}</Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Paper className={classes.paper}>Visitas totales al sitio web:{this.state.valores.visitas}</Paper>
                </Grid>
               
              </Grid>
            </div>
            </form>
        </div>
    );
  }
}
export default withStyles(useStyles)(EstadisticaSistema);

