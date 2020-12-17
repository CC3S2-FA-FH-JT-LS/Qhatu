import React, { Component } from "react";
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import 'fontsource-roboto';
import "./eliminacionComerciante.css";
import values from "./modelData/eliminacionComerciante"
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
      valores:values.data(),
      inputValue: " "
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }
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
                    <Grid item key={value.id}  xs={12} sm={3} >
                        <Card className={classes.value.id} id= {`cardOf${value.id}`}>
                            <CardMedia
                                className={classes.cardMedia}
                                image = {value.image}
                                title = {value.nombre}
                            />
                            <CardContent className={classes.cardContent}>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {value.nombre}
                                </Typography>
                                <Typography>
                                    Creado el: {value.fCreacion[0]}/{value.fCreacion[1]}/{value.fCreacion[2]}
                                </Typography>   
                            </CardContent>
                            <CardActions>  
                                <IconButton className={classes.cardButton} aria-label="like" onClick={() => {
                                        if(this.state.valores.indexOf(value)>-1){
                                            console.log("Se elimino" + this.state.valores.indexOf(value));
                                            this.state.valores.splice(this.state.valores.indexOf(value),1);
                                            console.log(document.getElementById(`cardOf${value.id}`).style.visibility="hidden");
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

