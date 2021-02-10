import React from "react";
import FormularioComerciante from "./FormularioComerciante";
import ComercianteModels from "./modelData/Comerciante";
import { useState, useEffect } from 'react';
import axios from 'axios';

class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      User:{nombre:"Freider"}
    };
    this.handleMount = this.handleMount.bind(this);
  }
  handleMount(event,data){
    this.setState({User:data});
  }
  componentDidMount(){
    var data={};
    let tienda_id = localStorage.getItem('myStore');
    let role = localStorage.getItem('myRole');
    if(role === "comerciante"){
      axios.get("/api/mostrar-detalles-tienda",
      {params:{
      tiendaId : "600046678f25c125841686ad",
      }
      }
      ).then((res)=>{
        //console.log("obtenido: ");
        //console.log(res.data);

        let datosTienda = res.data.response
        let comerciante = datosTienda.comercianteId
        //console.log( "La tieenda \n", laTienda);
        //console.log( "El comercianteeee \n", miComerciante);
        data = {
          nombre: comerciante.nombre,
          nombreUsuario: comerciante.nombreUsuario,
          contacto: comerciante.contacto,
          numeroPuesto: datosTienda.numeroPuesto,
          nombreTienda: comerciante.nombreTienda,
          informacionPuesto: datosTienda.informacionPuesto,
          categoria: datosTienda.categoria,
          imagen: datosTienda.imagen,
        };
        //console.log(data)
        //console.log(usuarioComerciante)
        
        //usuarioComerciante = data;
        //setComerciante(data);
      })
      .then(()=>{
        this.handleMount(data);
        //this.setState({User:data});
        //this.render();
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
      
    }    
  }
  
  render() {
    return (
      <div>
        <FormularioComerciante
          componentTitle="EditarCuenta"
          comerciante={this.state.User}
          showDelBut="visible"
        ></FormularioComerciante>
      </div>
    );
  }
}

export default function EditarCuenta() {
  //var [usuarioComerciante, setComerciante] = useState({});
  //var usuarioComerciante;
  //var data="";
  //usuarioComerciante = useRef({});
  /* const putData = function(data){
    console.log("update user")
    setComerciante(data)
    console.log(usuarioComerciante.informacionPuesto)
  } */
  /* const setter = function(){
    var data="";
    let tienda_id = localStorage.getItem('myStore');
    let role = localStorage.getItem('myRole');
    if(role === "comerciante"){
      console.log("consulta sobre "+tienda_id);
      axios.get("/api/mostrar-detalles-tienda",
      {params:{
      tiendaId : "600046678f25c125841686ad",
      }
      }
      ).then((res)=>{
        //console.log("obtenido: ");
        console.log(res.data);

        let datosTienda = res.data.response
        let comerciante = datosTienda.comercianteId
        //console.log( "La tieenda \n", laTienda);
        //console.log( "El comercianteeee \n", miComerciante);
        data = {
          nombre: comerciante.nombre,
          nombreUsuario: comerciante.nombreUsuario,
          contacto: comerciante.contacto,
          numeroPuesto: datosTienda.numeroPuesto,
          nombreTienda: comerciante.nombreTienda,
          informacionPuesto: datosTienda.informacionPuesto,
          categoria: datosTienda.categoria,
          imagen: datosTienda.imagen,
        };
        console.log("back data");
        console.log(data);
       
        return data;
      })
      .then((data)=>{
        console.log("from second \n")
        console.log(data);
        setComerciante(data);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
    }
    console.log("Data returned")
    console.log(data)
    return data;
  }
  console.log(setter()); */
  /* useEffect(() => {
    
    let tienda_id = localStorage.getItem('myStore');
    let role = localStorage.getItem('myRole');
    if(role === "comerciante"){
      console.log("consulta sobre "+tienda_id);
      axios.get("/api/mostrar-detalles-tienda",
      {params:{
      tiendaId : "600046678f25c125841686ad",
      }
      }
      ).then((res)=>{
        //console.log("obtenido: ");
        console.log(res.data);

        let datosTienda = res.data.response
        let comerciante = datosTienda.comercianteId
        //console.log( "La tieenda \n", laTienda);
        //console.log( "El comercianteeee \n", miComerciante);
        data = {
          nombre: comerciante.nombre,
          nombreUsuario: comerciante.nombreUsuario,
          contacto: comerciante.contacto,
          numeroPuesto: datosTienda.numeroPuesto,
          nombreTienda: comerciante.nombreTienda,
          informacionPuesto: datosTienda.informacionPuesto,
          categoria: datosTienda.categoria,
          imagen: datosTienda.imagen,
        };
        //console.log(data)
        console.log(usuarioComerciante)
        //usuarioComerciante = data;
        //setComerciante(data);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
    }
  }, []); */

 /*  useEffect(() => {
    console.log("Cambio usuario comerciante")
    setComerciante(data);
    console.log(data);
  }, [data]) */
  //const comerciante = ComercianteModels.comercianteEjemplo();
  return (
    <div>
      <Test></Test>;
    </div>
  );
}
