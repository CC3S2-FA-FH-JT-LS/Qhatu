import React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Rating from "@material-ui/lab/Rating";
import Grid from '@material-ui/core/Grid';
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
    root: {
    },
    comment: {
      width:"100%",
      maxHeight: 80,
      marginBottom: "10px",
   },
    media: {
      height: 0,
      paddingTop: "56.25%", // 16:9
    },
  }));
  

export default function CardUsuario(props) {
    const contenido = props.contenido;
    return (
        <Card fullWidth className={useStyles().comment}>
          <CardHeader
            avatar={
              <Avatar
                aria-label="recipe"
                src={contenido.imagen}
                className={useStyles().avatar}
              ></Avatar>
            }
            title={contenido.usuario}
          />
        </Card>
    );
  }
  