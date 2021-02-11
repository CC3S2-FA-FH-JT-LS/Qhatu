import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";
import { DropzoneArea } from 'material-ui-dropzone';
import { Link } from 'react-router-dom';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

function validateData (obj){
  console.log("Validado" , obj );
}



export default class FormularioProducto extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.producto;
    this.state.img=" ";
    this.state.idProps = props.idProducto;
    this.state.tiendaIdNUeva = props.tiendaId;
    this.handleChangeFileBound = (event) => this.handleChangeFile(event);
    this.handleChangeDispBound = (event) => this.handleChangeDisponible(event);
    this.handleChangeBound = (event) => this.handleChange(event);
    this.handleSubmitBound = (event) => this.handleSubmit(event);
  }
  /*
  componentDidMount = () => {
    axios.get("http://localhost:3800/api/obtener-producto-por-id/" + this.state.idProps ,{params: ""}).then(
      
    res => {

      let elProducto =res.data.response;
      console.log("Elproducto++++++++++++++++++++++++++++++++++++++++++++++++++++++",elProducto);
      let miProducto = {
        tiendaId : elProducto.__id,
        estado :  elProducto.estado,
        descripcion : elProducto.descripcion,
        nombre : elProducto.nombre,
        precio : elProducto.precio, 
        imagen : elProducto.imagen
      }
          this.setState(miProducto);
          component.forceUpdate(()=>{})
    })
    .catch(error => console.log(error));
    
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
    });
  };
*/

  handleChangeFile(files) {}


  handleSubmit(event){
    event.preventDefault();
    if (!(this.state.tiendaIdNUeva)){
      console.log("Actualizando producto ============================");
      let productoAEnviar ={
        productoId:this.state.idProps,
        update:{    
          "estado": this.state.disponible.toString(),
          "descripcion": this.state.descripcion,
          "nombre": this.state.nombre,
          "precio":this.state.precio,
          "imagen": this.state.imagen,
        } 
      };
      if(localStorage.getItem("imagen")!=null){
        productoAEnviar.update.imagen=localStorage.getItem("imagen");
      }
    axios.put(
      "/api/update-producto", productoAEnviar
      );             
    }
    else {
      console.log("Eviando producto ============================");
      let productoAEnviar ={      
        "tiendaId": this.state.tiendaIdNUeva,
        "estado": this.state.disponible.toString(),
        "descripcion": this.state.descripcion,
        "nombre": this.state.nombre,
            "precio":this.state.precio,
            "imagen": localStorage.getItem("imagen"),
      };
      
      axios.post(
        "/api/add-producto", productoAEnviar
      );             
      localStorage.removeItem("imagen");;
    }



  }
  
  
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }
  handleChangeDisponible(event) {
    this.setState({
      disponible: !this.state.disponible,
    });
  }
  getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result); 
        reader.onerror = error => reject(error);
        reader.readAsDataURL(file);
    });
  }
  render() {
    return (
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          Detalles de producto
        </Typography>
        <form noValidate>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                required
                id="NombreProducto"
                name="nombre"
                label="Nombre de producto"
                defaultValue={this.state.nombre}
                onChange={this.handleChangeBound}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} fullWidth>
              <TextField
                required
                id="PrecioProducto"
                name="precio"
                label="Precio del producto"
                defaultValue={this.state.precio}
                onChange={this.handleChangeBound}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                value="disponible"
                control={
                  <Switch
                    color="primary"
                    checked={this.state.disponible}
                    onChange={this.handleChangeDispBound}
                  />
                }
                label="Producto disponible"
                labelPlacement="start"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="DescripcionProducto"
                name="descripcion"
                label="Descripcion del producto"
                multiline
                rows={5}
                defaultValue={this.state.descripcion}
                onChange={this.handleChangeBound}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <Card style={{ maxWidth: 345 }}>
                <CardActionArea>
                  <CardMedia
                    style={
                      this.state.disponible
                        ? { height: 345 }
                        : { height: 345, filter: 'grayscale(100%)' }
                    }
                    image={this.state.imagen}
                    title="Contemplative Reptile"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {this.state.nombre}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {this.state.descripcion + '  s./' + this.state.precio}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <DropzoneArea
                acceptedFiles={['image/*']}
                dropzoneText={'Arrastre la foto de su producto '}
                onChange={this.handleChangeFileBound}
                onDrop={e => {
                  var promesa;
                  e.forEach(item =>
                    promesa=this.getBase64(item)
                  );
                  promesa.then(function(result) {
                    localStorage.setItem("imagen",result);
                  });
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" 
              onClick=
              {this.handleSubmitBound}
              fullWidth
              >
                Listo
              </Button>
            </Grid>
          </Grid>
        </form>
      </React.Fragment>
    );
  }
}

FormularioProducto.defaultProps = {
  producto: {
    id: 1,
    nombre: '',
    precio: '',
    disponible: true,
    descripcion: '',
    imagen:
      'https://www.argola.com/wp-content/uploads/placeholder-blue-800x600px.png',
  },
};

/*
import React from "react";
import "./States.css";

import Cabecera from "../header/Header";
/**
 * Define States, un componente React de la tarea #2. del LAB06 del curso CC3S2
 * La Data del Modelo para esta vista  (Los nombres de los estados) esta disponible
 * en  window.cc3s2models.statesModel().

function filtar(busqueda, arreglo) {
  return arreglo.filter((estado) =>
    estado.toLowerCase().includes(busqueda.toLowerCase())
  );
}

class States extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      usStates: window.cc3s2models.statesModel(),
      filtrados: window.cc3s2models.statesModel(),
      busqueda: "",
    };

    this.handleChangeBound = (event) => this.handleChange(event);
  }

  handleChange(event) {
    this.setState({
      busqueda: event.target.value,
      filtrados: filtar(event.target.value, this.state.usStates),
    });
    console.log(this.state);
  }
  render() {
    return (
      <div>
        <Cabecera/>

        <div className="cc3s2-example-output">
          <label htmlFor="busq">Busquedas:</label>
          <input
            id="busq"
            type="text"
            value={this.state.busqueda}
            onChange={this.handleChangeBound}
          />
        </div>
        {
          (this.state.busqueda != "subcadena") &&(
          <div>Buscando la subcadena "{this.state.busqueda}"</div> 
          )
        }
        
        {
          (this.state.filtrados.length == 0) &&(
            <div className="noencontrado">No se encontraron coincidencias</div>
          )
        }
        <ul>
          {this.state.filtrados.map((i) => (
            <li key={i} className="elementoestado">Estado:{i}</li>
          ))}
        </ul>
        
      </div>
    );
  }
}

export default States;*/
