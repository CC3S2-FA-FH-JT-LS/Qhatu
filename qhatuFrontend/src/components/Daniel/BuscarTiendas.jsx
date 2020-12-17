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

const FullWidthGrid = () => {
  const classes = useStylesGrid();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <ListaTiendas></ListaTiendas>
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
    };

    this.handleChangeBound = (event) => this.handleChange(event);
  }

  handleChange(event) {
    console.log('HOLA');
    this.setState({ buscando: !this.state.buscando });
  }

  render() {
    return (
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <Button onClick={this.handleChangeBound}>Buscar</Button>
          <NestedList></NestedList>
          <Button variant="contained" color="primary">
            Registrarse
          </Button>
          <Button variant="contained" color="primary">
            Iniciar Sesión
          </Button>
        </Grid>
        <Grid item xs={8}>
          {!this.state.buscando ? (
            <div>
              <span className="tittle">QHATU</span>
              <div>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eos
                aut, deleniti nulla expedita perspiciatis, iusto sint cumque ut
                similique blanditiis id doloremque itaque dicta quibusdam.
                Dolore rem non accusamus cum? Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Aliquam perferendis autem
                architecto sint culpa possimus fugit ex quam molestiae,
                dignissimos placeat sequi dolorum quaerat, odit praesentium
                expedita reiciendis non aliquid! Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Distinctio modi quos iure dolorum
                aut delectus deserunt laudantium doloremque repudiandae, nemo,
                sapiente fugit debitis voluptate. Ducimus, ab. Commodi corrupti
                dignissimos culpa!
              </div>
            </div>
          ) : (
            <FullWidthGrid></FullWidthGrid>
          )}
        </Grid>
      </Grid>
    );
  }
}
