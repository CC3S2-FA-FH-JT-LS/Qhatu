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
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { DropzoneArea } from "material-ui-dropzone";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
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
    alignItems: "center"
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
  }
}));

export default function FormularioComerciante(props) {
  const classes = useStyles();
  const initial_category = {
    categoria: props.comerciante.categoria
  };
  const [category, setCategory] = React.useState(initial_category);

  const handleChange = (event) => {
    let cat = event.target.value;
    setCategory({ categoria: cat });
  };
  const deleteButton = props.showDelBut;
  const comerciante = props.comerciante;
  const nameComponent = props.componentTitle;
  const buttonName = function () {
    if (nameComponent === "Editar Cuenta Comerciante") {
      return "Guardar Cambios";
    } else {
      return "Registrarse";
    }
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {nameComponent}
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                autoComplete="Nombre"
                //autoFocus="true"
                name="Nombre"
                variant="outlined"
                required
                fullWidth
                id="NombreComerciante"
                label="Nombre"
                defaultValue={comerciante.nombre}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                autoComplete="Nombre_Usuario"
                name="Nombre_usuario"
                variant="outlined"
                required
                fullWidth
                id="Nickname"
                label="Nombre de Usuario"
                defaultValue={comerciante.nombreUsuario}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="Contraseña"
                label="Contraseña"
                type="password"
                id="Contraseña"
                autoComplete="current-password"
                defaultValue={comerciante.contraseña}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="Confirm_contraseña"
                label="Confirmar contraseña"
                type="password"
                id="Contraseña"
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="Contacto"
                label="Contacto"
                type="number"
                id="Contacto"
                autoComplete="Contacto"
                defaultValue={comerciante.contacto}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="NumPuesto"
                label="Numero de Puesto"
                id="NumPuesto"
                autoComplete="NumPuesto"
                defaultValue={comerciante.puesto}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                multiline
                rows={2}
                rowsMax={8}
                name="InfoPuesto"
                label="Información de Puesto (opcional)"
                id="InfoPuesto"
                autoComplete="InfoPuesto"
                defaultValue={comerciante.informacion}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <InputLabel id="categoriaTienda">Categoria</InputLabel>
              <Select
                labelId="categoriaTienda"
                id="select"
                value={category.categoria}
                onChange={handleChange}
              >
                <MenuItem value="abarrotes">Abarrotes</MenuItem>
                <MenuItem value="carnes">Carnes</MenuItem>
                <MenuItem value="farmacia">Farmacia</MenuItem>
                <MenuItem value="verduras">Verduras</MenuItem>
                <MenuItem value="pollos">Pollos</MenuItem>
                <MenuItem value="pescados">Pescados</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12}>
              <DropzoneArea
                acceptedFiles={["image/*"]}
                dropzoneText={"Arrastre la foto de su tienda"}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="Acepto cumplir con las normas establecidas por el Sistema Qhatu"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {buttonName()}
          </Button>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.delete}
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
        <Copyright />
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
    puesto: "",
    informacion: "",
    categoria: "",
    imagen: ""
  }
};
