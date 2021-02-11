import React from 'react';
import { useState, useEffect } from 'react';
import FormularioProducto from './formularioProducto';
import ProductoModels from './modelData/Producto';
import Grid from '@material-ui/core/Grid';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from 'react-router-dom';
import axios from 'axios';

export default function FormularioEditarProducto(props) {
  const [miProducto, setProducto] = useState({});
  const [flag, setFlag] = useState(false);
  let { id } = useParams();

  useEffect(() => {

    axios
      .get('http://localhost:3800/api/obtener-producto-por-id/' + id, {
        params: '',
      })
      .then((res) => {
        console.log('+++++++++++++++++++++++++++++++++++++++++', id);

        let elProducto = res.data.response;
        console.log(
          'Elproducto++++++++++++++++++++++++++++++++++++++++++++++++++++++',
          elProducto
        );
        let miProducto = {
          estado: (elProducto.estado == "true") ? true: false,
          descripcion: elProducto.descripcion,
          nombre: elProducto.nombre,
          precio: elProducto.precio,
          imagen: elProducto.imagen,
        };
        setProducto(miProducto);
        setFlag(true);
      })
      .catch((error) => console.log(error));
  }, []);

  //console.log( "+++++++++++++++++++++++++++++++++++++++++", id );
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: '100vh' }}
    >
      <Grid item xs={6}>
          {
              (flag)?
              <FormularioProducto producto={miProducto}  idProducto={id} tiendaId={false}/>:
              <div></div>
          }
      </Grid>
    </Grid>
  );
}
