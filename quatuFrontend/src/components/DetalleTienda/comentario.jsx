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
      maxWidth: 345,
    },
    comment: {
      marginBottom: "10px",
   },
    media: {
      height: 0,
      paddingTop: "56.25%", // 16:9
    },
    expand: {
      transform: "rotate(0deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: "rotate(180deg)",
    },
  }));
  

export default function Comentario(props) {
    const contenido = props.contenido;
    console.log(contenido);
    return (
      <Grid>
        <Card className={useStyles().comment}>
          <CardHeader
            avatar={
              <Avatar
                aria-label="recipe"
                src={contenido.imagen}
                className={useStyles().avatar}
              ></Avatar>
            }
            title={contenido.usuario}
            //subheader={contenido.fechaPublicacion}
          />
          <CardContent>
            <Rating name="read-only" value={contenido.valoracion} readOnly />
            <Typography variant="body2" color="textSecondary" component="p">
              {contenido.contenido}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    );
  }
  