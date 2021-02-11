import React from "react";
import FormularioComerciante from "./FormularioComerciante";
import ComercianteModels from "./modelData/Comerciante";
import { useState, useEffect } from 'react';
import axios from 'axios';
//import AppBarNav from "./AppBarNav";

export default function EditarCuenta() {
  const [usuarioComerciante, setComerciante] = useState({
    nombre: "",
    nombreUsuario: "",
    contacto: "",
    numeroPuesto: "",
    nombreTienda: "",
    informacionPuesto: "",
    categoria: "",
    imagen: ""
  });
  const [flag, setFlag] = useState(false);
  useEffect(() => {
    console.log("Hola -------")
    let tienda_id = localStorage.getItem('myStore');
    let role = localStorage.getItem('myRole');
    if(true){
      console.log("consulta sobre "+tienda_id);
      axios.get("/api/mostrar-detalles-tienda",
      {params:{
      tiendaId : "600046678f25c125841686ad",
      }
      }
      ).then((res)=>{
        //console.log("obtenido: ");
        var data="";
        console.log("Datos enviados desde back");
        console.log(res.data)
        let datosTienda = res.data.response
        let comerciante = datosTienda.comercianteId
        
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
        console.log( "La tieenda \n", data);
        /*console.log(data)
        console.log(usuarioComerciante)*/
        //usuarioComerciante = data;
        setComerciante(data);
        setFlag(true);
        console.log("Usuario luego de set \n",usuarioComerciante);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
    }
    }, [])
 /*  useEffect(() => {
    console.log("Cambio usuario comerciante")
    setComerciante(data);
    console.log(data);
  }, [data]) */
  //const comerciante = ComercianteModels.comercianteEjemplo();
  return (
    
    <div>
      { 
        (flag)?
        <FormularioComerciante componentTitle="EditarCuenta" comerciante={usuarioComerciante}></FormularioComerciante>:
        <div></div>
      }
    </div>
  );
}
