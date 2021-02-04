import React from "react";
import PanelDetallesTienda from "../DetalleTienda/panelDetallesTienda";
import TiendaModels from "../DetalleTienda/modelData/tienda";
import ListaProductos from "../listaProductos/listaProductos";
import Grid from "@material-ui/core/Grid";
import { useEffect, useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  contenedor: {
    maxWidth: 345,
  },
  avatar: {
    backgroundColor: red,
  },
}));

export default function PaginaTienda(props) {
  const [tiendaObtenida, setTiendaObtenida] = React.useState({valoracion:1});
  const [comentariosObtenidos, setComentariosObtenidos] = React.useState([
    {
      id: 0,
      valoracion: 5, //estrellas
      fechaPublicacion:"10/12/20",
      contenido:
        "Integer suscipit libero cursus ante porta, in porta diam aliquam In vel.",
      usuario:"Camila Perez",
        imagen: "https://picsum.photos/seed/picsum/100",
    },]
    );

  useEffect(() => {
    console.log(props.tiendaId);
    axios.get("/api/mostrar-detalles-tienda",
      {params:{
        tiendaId : props.tiendaId
      }
      }
    ).then((res)=>{
      console.log(res.data);
      let laTienda = res.data.response
      let miComerciante = laTienda.comercianteId
      const miTienda = {
        id: laTienda._id,
        valoracion: parseInt(laTienda.valoracion) , //estrellas
        nombre: miComerciante.nombreTienda,
        descripcion:laTienda.informacionPuesto,
        imagen:
        "https://www.findevgateway.org/sites/default/files/inline-images/es_mujer_peruana_junto_a_su_puesto_de_verduras.jpg",
      }
      setTiendaObtenida(miTienda);
    })

    axios.get("/api/obtener-comentarios",
    {params:{
      tiendaId : props.tiendaId
    }
    }
  ).then((res)=>{
    console.log("mensajes: ");
    console.log(res);
    console.log("Comentarios---------------------: ");
    console.log(res.data.response.comentarios);
    let losComentarios = res.data.response.comentarios
    let arrComentarios = losComentarios.map((comen,index) => 
      ({
        id: index,
        valoracion: comen.valoracion, //estrellas
        fechaPublicacion : "10/12/20",
        contenido : comen.texto,

        usuario:"Camila Perez",
          imagen: "https://picsum.photos/seed/picsum/100",
      })
      ) 

      console.log("Formateados---------------------: ");
      console.log(arrComentarios);
      setComentariosObtenidos(arrComentarios);
  })
  },[])

  
  return (
    <Grid container spacing={3}>
        
        <Grid item xs={6}>
          <PanelDetallesTienda
            tienda={tiendaObtenida}
            comentarios = {[]}
          />
        </Grid>

        <Grid item xs={6}>
          <ListaProductos />
        </Grid>

    </Grid>
  );
}
