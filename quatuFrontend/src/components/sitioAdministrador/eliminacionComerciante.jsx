import React, { Component } from "react";
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import 'fontsource-roboto';
import "./eliminacionComerciante.css";
import axios from "axios";
import DeleteIcon from '@material-ui/icons/Delete';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import TextField from "@material-ui/core/TextField";

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
  },
  value:{

  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardButton:{
    color: "#FF4C4C"
  },
  busqueda:{
    display:'flex',
     justifyContent:'center',
     marginBottom:'10px',
  }
});

class EliminacionComerciante extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      valores:[],
      inputValue: " ",
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  componentDidMount = () => {
    this._isMounted=true;
    axios.get("/api/get-comerciantes").then(response => {
      this.setState({
        valores:response.data.message
      });
    });
    /*const user={
      nombre : "Leo",
      nombreUsuario : "Leonardo",
      contraseña : "123",
      imagen : " ",
    };
    axios.post(`/api/registrar-consumidor`,user)
      .then(res => {
        console.log(res);
        console.log(res.data);
    })*/
    const comercio={
      "contacto" : "12345678",
      "contraseña" : "contrasena",
      "nombre" : "Leonardo S.",
      "nombreTienda" : "PidgeonSD",
      "nombreUsuario" : "lezar",
      "categoria" : "Electronica",
      "imagen" : "https://source.unsplash.com/random",
      "imagencomerciante":"https://source.unsplash.com/random",
      "informacionPuesto" : "Innovaciones tecnologicas al alcanze de todos",
      "numeroPuesto" : "4321",
    };
    axios.post(`/api/registrar-comerciante`,comercio)
      .then(res => {
        console.log(res);
        console.log(res.data);
    });
  };
  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
      inputValue: event.target.value
    });
  }
  filtro(){
    const listItems = [];
    var j=0;
    for (let i = 0; i < this.state.valores.length; i++) {
      if(this.state.valores[i].nombre.toLowerCase().includes(this.state.inputValue.toLowerCase())){
        listItems[j] = this.state.valores[i];
        j++;
      }
    }
    return listItems;
  }
  eliminar(id){
    const comerciante ={
      "comercianteId" : id,
    }
    axios.delete("/api/delete-comerciante",{data: comerciante})
    .then(res => {
      console.log(res);
      console.log(res.data);
    })
    .catch(error => console.log(error));
  }
  render() {
    const  {classes}  = this.props;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
            <div>
              <Typography className={classes.tittle} id="valoracionLabel" gutterBottom variant="h5" component="h2">
                    Eliminacion de Comerciantes
              </Typography>
            </div>
            
            <div className={classes.busqueda}>
                <TextField  
                    name="busqueda"
                    label="Nombre"
                    rows="1"
                    onInput={this.handleInputChange}
                    variant="outlined"
                />
            </div>


            <div>
                <Grid container spacing={3}>
                {this.filtro().map((value) => (
                    <Grid item key={value._id}  xs={12} sm={3} >
                        <Card className={classes.value._id} id= {`cardOf${value._id}`}>
                            <CardMedia
                                className={classes.cardMedia}
                                image = {value.imagen}
                                title = {value.nombre}
                            />
                            <CardContent className={classes.cardContent}>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {value.nombre}
                                </Typography>
                                <Typography>
                                    Creado el: {value.fCreacion.dia}/{value.fCreacion.mes}/{value.fCreacion.año}
                                </Typography>  
                            </CardContent>
                            <CardActions>  
                                <IconButton className={classes.cardButton} aria-label="like" onClick={() => {
                                        if(this.state.valores.indexOf(value)>-1){
                                            console.log("Se elimino a " + value.nombre);
                                            console.log("con id: " + value._id);
                                            this.eliminar(value._id);
                                            this.state.valores.splice(this.state.valores.indexOf(value),1);
                                            document.getElementById(`cardOf${value._id}`).style.visibility="hidden";
                                        }
                                    }}>
                                    <DeleteIcon />Eliminar
                                </IconButton>
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
export default withStyles(useStyles)(EliminacionComerciante);

