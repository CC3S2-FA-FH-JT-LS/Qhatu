import React from "react";
import FormularioComerciante from "./FormularioComerciante";
import ComercianteModels from "./modelData/Comerciante";
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function EditarCuenta() {
  var baseURL = `/api/detalles-cuenta`;
  const [usuarioComerciante, setComerciante] =useState({});
  useEffect(() => {
    let comerciante_id = localStorage.getItem('myId');
    let role = localStorage.getItem('myRole');
    if(role === "comerciante"){
      axios.get(baseURL,{params:{comercianteId: comerciante_id}})
      .then(res => {
        console.log(res);
        console.log(res.data);
        if(res.data.ok === false){
          alert("Cuenta no encontrada");
        }else if(res.data.ok){
          alert("Login correcto");
          console.log(res.data);
          setComerciante(res.data.comerciante)
        }
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
    }
  }, []);
  //const comerciante = ComercianteModels.comercianteEjemplo();
  return (
    <div>
      <FormularioComerciante
        componentTitle="EditarCuenta"
        comerciante={usuarioComerciante}
        showDelBut="visible"
      ></FormularioComerciante>
    </div>
  );
}
