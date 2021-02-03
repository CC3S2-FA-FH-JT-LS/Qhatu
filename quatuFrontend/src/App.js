import React from "react";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import PaginaTienda from "./components/sitioCliente/paginaTienda";
import PaginaComerciante from "./components/sitioComerciante/PaginaComerciante";
import PaginaAdministrador from "./components/sitioAdministrador/paginaAdministrador";
import BuscarTiendas from "./components/sitioCliente/BuscarTiendas";
import SignIn from "./components/sitioCliente/SignIn"
import SignUpComerciante from "./components/sitioCliente/SignUpComerciante"
import SignUpConsumidor from "./components/sitioCliente/SignUpConsumidor"
import EditarCuenta from "./components/sitioComerciante/EditarCuenta"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
export default function App() {
  return (
    <Container maxWidth="lg" >
      <Box my={4}>
        <Router>
          <Switch>
            <Route path="/comerciantes">
              <PaginaComerciante />
            </Route>
            <Route path="/administracion">
              <PaginaAdministrador />
            </Route>
            <Route path="/singIn" >
              <SignIn />
            </Route>
            <Route path="/singUpComerciante">
              <SignUpComerciante/>
            </Route>
            <Route path="/signupConsumidor">
              <SignUpConsumidor/>
            </Route>
            <Route path="/editarCuenta">
              <EditarCuenta/>
            </Route>
            <Route path={["/home", "/", "/clientes"]}>
              <BuscarTiendas />
            </Route>
          </Switch>
        </Router>
      </Box>
    </Container>
  );
}
/* 
        <PanelDetallesTienda 
        //estadisticas={TiendaModels.estadisticasTiendaEjemplo()} 
        tienda={TiendaModels.tiendaEjemplo()}
        />

*/
