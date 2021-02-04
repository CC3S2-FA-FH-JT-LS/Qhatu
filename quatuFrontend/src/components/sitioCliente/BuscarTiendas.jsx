import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import './BuscarTiendas.css';
import ListaTiendas from './ListaTiendas';
import { Link } from 'react-router-dom';
import '../../commons/commons.css';
import axios from 'axios';

const useStylesGrid = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const FullWidthGrid = (tiendas) => {
  const classes = useStylesGrid();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <ListaTiendas tiendas = {tiendas}></ListaTiendas>
      </Grid>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },

  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const NestedList = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Filtrar
        </ListSubheader>
      }
      className={classes.root - 'gradient-bg'}
    >
      <ListItem button>
        <ListItemText primary="Categorias" />
      </ListItem>
      <ListItem button>
        <ListItemText primary="Calificacion" />
      </ListItem>
      <ListItem button onClick={handleClick}>
        <ListItemText primary="Productos" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
            <ListItemText primary="Arroz" />
          </ListItem>
          <ListItem button className={classes.nested}>
            <ListItemText primary="Huevos" />
          </ListItem>
          <ListItem button className={classes.nested}>
            <ListItemText primary="Golosinas" />
          </ListItem>
          <ListItem button className={classes.nested}>
            <ListItemText primary="Carnes" />
          </ListItem>
        </List>
      </Collapse>
    </List>
  );
};

export default class BuscarTiendas extends Component {
  constructor(props) {
    super(props);

    this.state = {
      buscando: false,
      tiendas: []
    };

    this.handleChangeBound = (event) => this.handleChange(event);
  }

  handleChange(event) {
    this.setState({ buscando: !this.state.buscando });
  }

  componentDidMount = () => {
    axios.get("/api/get-comerciantes").then(res => {
      this.setState({
        tiendas: res.data.message
      });
      console.log(this.state.tiendas);
    })
    .catch(error => console.log(error));
  };

  render() {
    return (
      <Grid container spacing={3} className="gradient-bg">
        <Grid item xs={4}>
          <Button onClick={this.handleChangeBound}>Buscar</Button>
          <NestedList></NestedList>

          <Grid ontainer spacing={3}>
            <Button component={Link} to="/singIn" color="inherit">
              Iniciar Sesión
            </Button>
            <br />
            <Button component={Link} to="/signupConsumidor" color="inherit">
              Registrarse Consumidores
            </Button>
            <br />
            <Button component={Link} to="/singUpComerciante" color="inherit">
              Registrarse Comerciante
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={8}>
          {!this.state.buscando ? (
            <div>
              <div className="tittle" align="center">
                QHATU
              </div>
              <div align="center" className="subtittle">
                La cercania de tu comunidad
              </div>
            </div>
          ) : (
            <FullWidthGrid tiendas = {this.state.tiendas}></FullWidthGrid>
          )}
        </Grid>
      </Grid>
    );
  }
}
