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
import './BuscarTiendas.css';

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
  const [open, setOpen] = React.useState(true);

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
        <ListItemText primary="Inbox" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
            <ListItemText primary="Starred" />
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
      inputValue: ' ',
    };

    this.handleChangeBound = (event) => this.handleChange(event);
  }

  handleChange(event) {
    if (event.target.value !== '') {
      this.setState({ buscando: true, inputValue: event.target.value });
    } else {
      this.setState({ buscando: false, inputValue: event.target.value });
    }
    console.log(this.state.buscando);
  }

  render() {
    return (
      <div>
        <div className="left_div">
          <input
            id="inId"
            type="text"
            placeholder="Buscar tienda"
            value={this.state.inputValue}
            onChange={this.handleChangeBound}
          />
          <NestedList></NestedList>
          <Button variant="contained" color="primary">
            Registrarse
          </Button>
          <Button variant="contained" color="primary">
            Iniciar Sesión
          </Button>
        </div>

        <div className="right_div">
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
            <div>
              <div>Tiendas</div>
              <div>Imagenes de productos</div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
