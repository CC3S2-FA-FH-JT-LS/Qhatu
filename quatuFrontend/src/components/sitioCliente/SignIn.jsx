import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import "../../App.css";
import axios from 'axios';
import { useHistory } from "react-router-dom";
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center" >
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Qhatu's Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "white",
    color: " #428BFF",
    borderRadius: "20px",
    border: '2px solid #428BFF',
    padding: 20,
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  copyright: {
    backgroundColor: "white"
  }
}));


export default function SignIn() {
  const classes = useStyles();
  let history = useHistory();
  const [User, setUser] = React.useState({nombreUsuario:"",contraseña:""});
  const handleChange = (event) => {
    var name = event.target.name;
    var userdata={
      ...User
    }
    userdata[name]=event.target.value;
    setUser(userdata);
  };

  const validateData = ()=>{
    let isValid = true;
    let isDataCompleted=true;
    for (const attribute of Object.getOwnPropertyNames(User)) {
      if(User[attribute].length===0){
        alert("Ingrese el nombre de Usuario y contraseña");
        isValid = false;
        isDataCompleted = false;
        break;
      }
    }
    if(isDataCompleted){
      if(User["contraseña"].length===0){
        alert("Contraseña incorrecta")
      }
    }
    return isValid;
  }
  const handleLogin=(event) => {
    event.preventDefault(); 
    var role="",id="", idTienda="";
    var baseURL = `/api/login`;
    
    if(validateData()){
        //const hashPass = bcrypt.hashSync(User.contraseña, saltRounds); 

        axios.get(baseURL,
          {params:{
            nombreUsuario:User.nombreUsuario,
            contraseña:User.contraseña}
          })
          .then(res => {
            console.log(res.data);
            var role,id,idTienda,nombre,imagen;
            if(res.data.ok === false){
              alert("Usuario o contraseña incorrecta");
            }else if(res.data.ok){
              alert("Login correcto");
              role=res.data.rol;
              console.log(res.data);
              if(role==="comerciante"){
                alert("comerciante")
                history.push('/comerciantes')
                id = res.data.comerciante._id;
                idTienda = res.data.comerciante.tiendaId;
                nombre=res.data.comerciante.nombre;  
              }else if(role === "consumidor"){
                alert("consumidor")
                history.push('/consumidor')
                id = res.data.consumidor._id;  
                nombre=res.data.consumidor.nombre;
                imagen=res.data.consumidor.imagen;
                localStorage.setItem('myImage',imagen);
              }
              localStorage.setItem('myRole',role);
              localStorage.setItem('myId',id);
              localStorage.setItem('myStore',id);
              localStorage.setItem('myName',nombre);
            }else{
              alert("Usuario no registrado");
            }
          })
          .catch(error => {
            console.error('There was an error!', error);
          });
    }else{
      alert("Vuelva a intentarlo")
    }
  }
  return (
    <div>
      <Container component="main" maxWidth="xs" >
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Iniciar Sesion
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="Name"
            label="Nombre"
            name="nombreUsuario"
            autoComplete="Name"
            autoFocus
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="contraseña"
            label="Contraseña"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleChange}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleLogin} 
          >
            Ingresar
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/singUpComerciante" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
        <Box mt={8} >
          <div><Copyright /></div>
        </Box>
      </div>
      
    </Container>
    </div>
  );
}
