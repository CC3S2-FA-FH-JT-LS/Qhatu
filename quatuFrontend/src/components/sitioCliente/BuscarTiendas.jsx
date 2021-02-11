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
import CardUsuario from './CardUsuario';
import { Box } from '@material-ui/core';

const useStylesGrid = makeStyles((theme) => ({
  root: {
    //    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const FullWidthGrid = (tiendas) => {
  return (
    <Grid container spacing={3}>
      <ListaTiendas tiendas={tiendas}></ListaTiendas>
    </Grid>
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
      className={classes.root}
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
      tiendas: [],
    };

    this.handleChangeBound = (event) => this.handleChange(event);
  }

  handleChange(event) {
    this.setState({ buscando: !this.state.buscando });
  }

  componentDidMount = () => {
    axios
      .get('/api/get-comerciantes')
      .then((res) => {
        this.setState({
          tiendas: res.data.message,
        });
      })
      .catch((error) => console.log(error));
  };
  render() {
    return (
      <Grid
        id = "nover"
        container
        style={{ height: '100%' }}
        spacing={3}
        //className="gradient-bg"
      >
        <Grid
          container
          item
          xs={3}
          direction="column"
          justify="space-evenly"
          alignItems="center"
          style={{maxHeight:"1000px"}}
        >
          <Grid
            container
            item
            direction="column"
            alignItems="center"
            justify="center"
            xs
          >
            <Button fullWidth onClick={this.handleChangeBound}>Buscar</Button>
          </Grid>
          <Grid
            container
            item
            direction="column"
            alignItems="center"
            justify="center"
            xs
          >
            {/*<NestedList></NestedList> */}

            { localStorage.getItem("myId")!=null &&<CardUsuario
              contenido={{
                imagen:
                localStorage.getItem("myImage"),
                usuario: localStorage.getItem("myName"),
              }}
            />}
          </Grid>
          <Grid
            container
            item
            direction="column"
            alignItems="center"
            justify="center"
            xs
          >
            {localStorage.getItem("myId")==null &&<Button fullWidth component={Link} to="/singIn" color="inherit">
              Iniciar Sesión
            </Button>}
            <br />
            {localStorage.getItem("myId")==null &&<Button fullWidth component={Link} to="/signupConsumidor" color="inherit">
              Registrarse <br/> Consumidores
            </Button>}
            <br />
            {localStorage.getItem("myId")==null &&<Button fullWidth component={Link} to="/singUpComerciante" color="inherit">
              Registrarse <br/> Comerciante
            </Button>}
          </Grid>
        </Grid>

        <Grid
          container
          item
          direction="column"
          alignItems="center"
          justify="center"
          xs={9}
        >
          {!this.state.buscando ? (
            <Grid>
              <Grid item className="tittle" align="center">
                QHATU
              </Grid>
              <Grid item className="subtittle" align="center">
                La cercania de tu comunidad
              </Grid>
            </Grid>
          ) : (
            <Grid id="griBuscar" style={{ height: '100%' }} item container>
              <ListaTiendas tiendas={this.state.tiendas}></ListaTiendas>
            </Grid>
          )}
        </Grid>
      </Grid>
    );
  }
}
