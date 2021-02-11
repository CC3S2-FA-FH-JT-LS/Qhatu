import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import 'fontsource-roboto';
import './listaProductos.css';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import { green } from '@material-ui/core/colors';
import Switch from '@material-ui/core/Switch';
import { Link } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import Button from '@material-ui/core/Button';

const useStyles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  tittle: {
    textAlign: 'center',
  },
  value: {},
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardButtonDelete: {
    color: '#FF4C4C',
  },
  cardButtonEdit: {
    color: '#add8e6',
  },
  busqueda: {
    display: 'flex',
    justifyContent: 'center',
  },
});

class ListaProductos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      valores: [],
      inputValue: ' ',
      showBool: false,
      vistaCliente: props.vistaCosumidor,
      comercianteBool: props.comercianteBool,
      tiendaId: props.tiendaId,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.toggleChecked = this.toggleChecked.bind(this);
  }
  toggleChecked(event) {
    this.setState({
      [event.target.name]: event.target.checked,
      showBool: event.target.checked,
    });
  }
  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
      inputValue: event.target.value,
    });
  }
  filtro() {
    const listItems = [];
    var j = 0;
    var actualCheck = this.state.showBool;
    for (let i = 0; i < this.state.valores.length; i++) {
      if (!actualCheck) {
        if (
          this.state.valores[i].nombre
            .toLowerCase()
            .includes(this.state.inputValue.toLowerCase()) ||
          this.state.inputValue.toLowerCase() == ' '
        ) {
          listItems[j] = this.state.valores[i];
          j++;
        }
      } else {
        if (
          this.state.valores[i].estado == 'no disponible' &&
          this.state.valores[i].nombre
            .toLowerCase()
            .includes(this.state.inputValue.toLowerCase())
        ) {
          listItems[j] = this.state.valores[i];
          j++;
        }
      }
    }
    return listItems;
  }
  componentDidMount = () => {
    const tienda = {
      tiendaId: this.state.tiendaId,
    };
    axios
      .get('http://localhost:3800/api/obtener-productos', { params: tienda })
      .then((res) => {
        this.setState({
          valores: res.data.response.productos,
        });
      })
      .catch((error) => console.log(error));
    /*
    const producto={
      tiendaId : this.state.tiendaId,
      estado : "disponible",
      descripcion : "Inorganico",
      nombre : "Arroz Susan",
      precio : 5.5
    }
    axios.post(`/api/add-producto`,producto).then(res => {
      console.log(res);
      console.log(res.data);
    });*/
  };
  eliminar(id) {
    const dataProducto = {
      productoId: id,
      tiendaId: this.state.tiendaId,
    };
    axios
      .delete('/api/delete-producto', { data: dataProducto })
      .then((res) => {})
      .catch((error) => console.log(error));
  }
  render() {
    const { classes } = this.props;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <Container>
            <Typography
              className={classes.tittle}
              id="valoracionLabel"
              gutterBottom
              variant="h5"
              component="h2"
            >
              Lista Productos
            </Typography>
          </Container>

          <Grid container spacing={2} justify="space-evenly" alignItems="center">
            <Grid item xs={6}>
              <TextField
                name="busqueda"
                label="Nombre"
                rows="1"
                onInput={this.handleInputChange}
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs xs={2}>
              <Typography>Solo Productos no disponibles</Typography>
            </Grid>
            <Grid item xs={2}>
              <Switch
                name="disponible"
                color="primary"
                onChange={this.toggleChecked}
              />
            </Grid>
            <Grid item xs={2}>
              <Button
                component={Link}  
                to="/comerciantes/nuevop"
                variant="contained"
                color="primary"
                href="#contained-buttons"
                fullWidth
              >
                Nuevo Producto
              </Button>
            </Grid>
          </Grid>

          <div>
            <Grid container spacing={3}>
              {this.filtro().map((value) => (
                <Grid item key={value._id} xs={12} sm={6} md={4}>
                  <Card className={classes.value._id} id={`cardOf${value._id}`}>
                    <CardMedia
                      className={classes.cardMedia}
                      image={value.imagen}
                      title={value.nombre}
                    />
                    <CardContent className={classes.cardContent}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {value.nombre}
                      </Typography>
                      <Typography
                        gutterBottom
                        variant="h5"
                        style={{ textAlign: 'right', color: 'green' }}
                      >
                        S/.{value.precio}
                      </Typography>
                      <Typography>{value.descripcion}</Typography>
                    </CardContent>
                    <CardActions>
                      {this.state.comercianteBool && (
                        <IconButton
                          size="small"
                          className={classes.cardButtonDelete}
                          aria-label="like"
                          onClick={() => {
                            if (this.state.valores.indexOf(value) > -1) {
                              console.log('Se elimino a ' + value.nombre);
                              console.log('con id: ' + value._id);
                              this.eliminar(value._id);
                              this.state.valores.splice(
                                this.state.valores.indexOf(value),
                                1
                              );
                              document.getElementById(
                                `cardOf${value._id}`
                              ).style.visibility = 'hidden';
                            }
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      )}
                      {this.state.comercianteBool && (
                        <IconButton
                          size="small"
                          className={classes.cardButtonEdit}
                          aria-label="like"
                          onClick={() => {}}
                          component={Link}
                          to={'/comerciantes/eproducto/' + value._id}
                        >
                          <EditIcon />
                        </IconButton>
                      )}
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </div>
        </form>
      </div>
    );
  }
}
export default withStyles(useStyles)(ListaProductos);
