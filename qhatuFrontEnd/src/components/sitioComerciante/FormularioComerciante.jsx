import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { DropzoneArea } from "material-ui-dropzone";
import "../../App.css";
import axios from 'axios';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/" className="text-color">
        Qhatu's website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  container: {
    padding: 20,
    backgroundColor: "white",
    border: '2px solid #428BFF',
    borderRadius: 20
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "white"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  menuPaper: {
    color: "#428BFF",
    maxHeight: "50%"
  }
}));

export default function FormularioComerciante(props) {
  const classes = useStyles();
  const names = ["abarrotes","carniceria","verduras","farmacia","dulceria","panaderia"];
  const initial_category = {
    categoria: props.comerciante.categoria
  };
  
  const [checked, setChecked] = React.useState(false);
  const [newUser, setUser] = React.useState(props.comerciante);
  const handleChange = (event) => {
    var name = event.target.name;
    var userdata={
      ...newUser
    }
    userdata[name]=event.target.value;
    setUser(userdata);
  };
  const handleTerminos = (event) =>{
    event.preventDefault();
    setChecked(event.target.checked);
  }
  const handleSubmit=(event) => {
    event.preventDefault();
    if(props.componentTitle !== "EditarCuenta" ){
      if(validateData()){
        axios.post("/api/registrar-comerciante", newUser )
          .then(res => {
            //console.log(res);
            //console.log(res.data);
            if(res.data.unico === false){
              alert("El nombre de usuario ingresado ya existe");
            }else if(res.data.ok){
              alert("Usuario creado satisfactoriamente");
            }
          })
          .catch(error => {
            console.error('There was an error!', error);
          });
      }
    }else{
      if(validateData()){
        axios.put("/api/registrar-comerciante", newUser )
          .then(res => {
            //console.log(res);
            //console.log(res.data);
            if(res.data.unico === false){
              alert("El nombre de usuario ingresado ya existe");
            }else if(res.data.ok){
              alert("Usuario creado satisfactoriamente");
            }
          })
          .catch(error => {
            console.error('There was an error!', error);
          });
      }
    }
  }

  const validateData = ()=>{
    let isValid = true;
    let isDataCompleted=true;
    for (const attribute of Object.getOwnPropertyNames(newUser)) {
      if(newUser[attribute].length===0){
        alert("Debes completar todos los campos");
        isValid = false;
        isDataCompleted = false;
        break;
      }
    }
    if(isDataCompleted){
      if(!checked){
        alert("Por favor acepte los terminos y condiciones");
        isValid = false;
      }
      if(newUser["contraseña"].length <8){
        alert("La contraseña debe tener mas de 8 caracteres");
        isValid = false;
      }
      if(newUser["contraseña"] !== newUser["confirmar_contraseña"]){
        alert("Las contraseñas deben coincidir")
        isValid = false;
      }
      
    }
    
    return isValid;
  }

  const deleteButton = props.showDelBut;
  const comerciante = props.comerciante;
  const nameComponent = props.componentTitle;
  const buttonName = function () {
    if (nameComponent === "EditarCuenta") {
      return "Guardar Cambios";
    } else {
      return "Registrarse";
    }
  };
  return (
    <Container component="main" maxWidth="xs" className={`${classes.container} text-color`}>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {nameComponent}
        </Typography>
        <form className={`${classes.form} text-color`} noValidate>
          <Grid container spacing={2} >
            <Grid item xs={12} sm={12} >
              <TextField
                autoComplete="Nombre"
                //autoFocus="true"
                name="nombre"
                variant="outlined"
                required
                fullWidth
                id="NombreComerciante"
                label="Nombre"
                defaultValue={comerciante.nombre}
                autoFocus
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                autoComplete="Nombre_Usuario"
                name="nombreUsuario"
                variant="outlined"
                required
                fullWidth
                id="Nickname"
                label="Nombre de Usuario"
                defaultValue={comerciante.nombreUsuario}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="contraseña"
                label="Contraseña"
                type="password"
                id="Contraseña"
                autoComplete="current-password"
                defaultValue={comerciante.contraseña}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="confirmar_contraseña"
                label="Confirmar contraseña"
                type="password"
                id="Confirmar_Contraseña"
                autoComplete="current-password"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                autoComplete="Nombre_Tienda"
                name="nombreTienda"
                variant="outlined"
                required
                fullWidth
                id="Tienda"
                label="Nombre de Tienda"
                defaultValue={comerciante.nombreTienda}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="contacto"
                label="Contacto"
                type="number"
                id="Contacto"
                autoComplete="Contacto"
                defaultValue={comerciante.contacto}
                onChange={handleChange}
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="numeroPuesto"
                label="Numero de Puesto"
                id="NumPuesto"
                autoComplete="NumPuesto"
                defaultValue={comerciante.numeroPuesto}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                multiline
                rows={2}
                rowsMax={8}
                name="informacionPuesto"
                label="Información de Puesto"
                id="InfoPuesto"
                autoComplete="InfoPuesto"
                defaultValue={comerciante.informacionPuesto}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <FormControl className={classes.formControl}>
                <InputLabel id="categoriaTienda">Categoria</InputLabel>
                <Select
                  name="categoria"
                  labelId="categoriaTienda"
                  id="select"
                  value={newUser.categoria}
                  onChange={handleChange}
                  MenuProps={{ classes: { paper: classes.menuPaper } }}
                >
                 
                  {names.map((name) => (
                    <MenuItem  key={name} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <DropzoneArea
                acceptedFiles={["image/*"]}
                dropzoneText={"Arrastre la foto de su tienda"}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" onChange={handleTerminos}/>}
                label="Acepto cumplir con las normas establecidas por el Sistema Qhatu"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={`${classes.submit} basic-bg`}
            onClick={handleSubmit}
          >
            {buttonName()}
          </Button>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={`${classes.delete} basic-bg`}
            style={{ visibility: deleteButton }}
          >
            Eliminar Cuenta
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright/>
      </Box>
    </Container>
  );
}
FormularioComerciante.defaultProps = {
  componentTitle: "",
  showDelBut: "hidden",
  comerciante: {
    nombre: "",
    nombreUsuario: "",
    contacto: "",
    numeroPuesto: "",
    nombreTienda: "",
    informacionPuesto: "",
    categoria: "abarrotes",
    imagen: "https://source.unsplash.com/random",
  }
};
