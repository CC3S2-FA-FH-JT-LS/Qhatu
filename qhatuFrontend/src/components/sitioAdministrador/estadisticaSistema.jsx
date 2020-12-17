import React, { Component } from "react";
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import 'fontsource-roboto';
import "./estadisticaSistema.css";
import values from "./modelData/estadisticaSistema"

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
      valores:values.data()
    };
  }
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
                  <Paper className={classes.paper}>Cantidad de usuarios comerciantes:{this.state.valores[0]}</Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Paper className={classes.paper}>Productos vistos por visita en promedio:{this.state.valores[1]}</Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Paper className={classes.paper}>Visitas en promedio por comerciante:{this.state.valores[2]}</Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Paper className={classes.paper}>Cantidad de usuarios comerciantes:{this.state.valores[3]}</Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Paper className={classes.paper}>Tiempo de visita en promedio:{this.state.valores[4]}</Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Paper className={classes.paper}>Visitas totales al sitio web:{this.state.valores[5]}</Paper>
                </Grid>
               
              </Grid>
            </div>
            </form>
        </div>
    );
  }
}
export default withStyles(useStyles)(EstadisticaSistema);

