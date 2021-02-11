import React, { useCallback } from "react";
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
import PaginaConsumidor from "./components/sitioCliente/PaginaConsumidor"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import {useState, useEffect} from "react";
export default function App() {
  const [userRole,setRole] = useState({myRole:""});
  const [flag, setFlag] = useState(false);

  const handleRolChange = (role)=>{
    var newRole = {myRole:role}
    setFlag(newRole);
  }
  useEffect(() => {
    // action on update of movies
    console.log("flag updated",flag);
    setRole(localStorage.getItem("myRole"));
  }, [flag]);
  useEffect(()=>{
    console.log("userRole updated",userRole)
  },[userRole])

  return (
    <Container style={{height:"100%"}}   maxWidth="false" >
        <Router>
          <Switch>
            <Route path="/administracion">
            <Container style={{height:"100%"}}   maxWidth="md" >
              <PaginaAdministrador />
            </Container>
            </Route>
            <Route path="/singIn" >
              <SignIn sendRole = {handleRolChange}/>
            </Route>
            <Route path="/singUpComerciante">
              <SignUpComerciante/>
            </Route>
            <Route path="/signupConsumidor">
              <SignUpConsumidor/>
            </Route>
            <Route path={["/home", "/","/consumidor","/comerciantes"]}>
              {localStorage.getItem("myRole")==="comerciante"  && 
              <Container style={{height:"100%"}}   maxWidth="lg" >
              <PaginaComerciante />
              </Container>
              }
              {localStorage.getItem("myRole")==="consumidor"  && 
              <Container style={{height:"100%"}}   maxWidth="lg" >
              <PaginaConsumidor/>
              </Container>
              }
              {localStorage.getItem("myRole")===null &&
                <Container style={{height:"100%"}}   maxWidth="lg" >
                <BuscarTiendas/>
                </Container>
              }
            </Route>
          </Switch>
        </Router>
    </Container>
  );
}
/* 
        <PanelDetallesTienda 
        //estadisticas={TiendaModels.estadisticasTiendaEjemplo()} 
        tienda={TiendaModels.tiendaEjemplo()}
        />

*/
