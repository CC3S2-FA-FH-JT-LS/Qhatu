import React from 'react';
import Modal from 'react-modal';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Rating from '@material-ui/lab/Rating';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Comentario from './comentario';
import TablaEstadisticasComerciante from './tablaEstadicticasComenciante';
import CajaValoracion from '../sitioCliente/cajaValoracion';
import { useEffect, useState } from 'react';
import axios from 'axios';

import TiendaModels from './modelData/tienda';
const useStyles = makeStyles((theme) => ({
  root: {
    //    maxWidth: 345,
  },
  comment: {
    marginBottom: '10px',
  },
  btn: {
    margin: '8px',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function PanelDetallesTienda(props) {

  const [miTienda, setTiendaObtenida] = React.useState({valoracion:1});
  const [comentarios, setComentariosObtenidos] = React.useState([
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
    axios.get("/api/mostrar-detalles-tienda",
      {params:{
        tiendaId : props.tiendaId
      }
      }
    ).then((res)=>{
      let laTienda = res.data.response
      let miComerciante = laTienda.comercianteId
      const miTienda = {
        id: laTienda._id,
        valoracion: parseInt(laTienda.valoracion) , //estrellas
        nombre: miComerciante.nombreTienda,
        descripcion:laTienda.informacionPuesto,
        contacto:laTienda.contacto,
        imagen:
        miComerciante.imagen,
      }
      setTiendaObtenida(miTienda);
    })

    axios.get("/api/obtener-comentarios",
    {params:{
      tiendaId : props.tiendaId
    }
    }
  ).then((res)=>{
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
      setComentariosObtenidos(arrComentarios);
  })
  },[])

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [contacto, setContactado] = React.useState(false);
  const [comentar, setComentar] = React.useState(false);

  const estadisticas = props.estadisticas;

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card  className={classes.root}>
      <CardHeader title={miTienda.nombre} />
      <CardMedia
        className={classes.media}
        image={miTienda.imagen}
        title="Paella dish"
      />
      <CardContent>
        <Rating name="read-only" value={miTienda.valoracion} readOnly />
        {(contacto)? (<div>{miTienda.contacto + "c"} </div>) : <div></div> }
        <Typography variant="body2" color="textSecondary" component="p">
          {miTienda.descripcion}
        </Typography>
        {estadisticas ? (
          <TablaEstadisticasComerciante estadisticas={estadisticas} />
        ) : (
          <div />
        )}
      </CardContent>

      <CardActions disableSpacing>
        {localStorage.getItem("myRole")==="consumidor" &&<Button
          variant="contained"
          className={classes.btn}
          onClick={() => {
            setContactado(true);
          }}
          color="primary"
        >
          Contacto
        </Button>}
        {localStorage.getItem("myRole")==="consumidor" && <Button
          variant="contained"
          onClick={() => {
            setComentar(!comentar);
          }}
          color="secondary"
        >
          Comentario
        </Button>}
        <Modal isOpen={comentar}>
          <CajaValoracion 
            tiendaId={props.tiendaId}
            consumidorId={props.consumidorId}
          />
          <Button
            variant="contained"
            onClick={() => {
              setComentar(!comentar);
            }}
            className={classes.btn}
          >
            Cerrar
          </Button>
        </Modal>

        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          {comentarios.map((comentario) => (
            <Comentario contenido={comentario} />
          ))}
        </CardContent>
      </Collapse>
    </Card>
  );
}
