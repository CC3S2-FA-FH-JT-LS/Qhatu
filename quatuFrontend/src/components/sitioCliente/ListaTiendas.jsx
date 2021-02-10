import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import 'fontsource-roboto';
import values from './modelData/ListaTeindas';
import DeleteIcon from '@material-ui/icons/Delete';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import DescriptionIcon from '@material-ui/icons/Description';
import PaginaTienda from './paginaTienda';
import FormControl from '@material-ui/core/FormControl';
import TiendaModels from '../DetalleTienda/modelData/tienda';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Container from '@material-ui/core/Container';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import InfoIcon from '@material-ui/icons/Info';

const useStyles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  tittle: {
    textAlign: 'center',
  },
  gridList: {
    width: "100%",
    height: "800px",
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
  value: {},
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardButton: {
    color: '#186CEF',
  },
  busqueda: {
    display: 'flex',
    justifyContent: 'center',
    margin: '10px',
  },
});

class ListaTiendas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      valores: props.tiendas,
      inputValue: ' ',
      mostrarDetalles: true,
      tiendaId: '',
    };
    console.log("////////////Objetos tienda/////////////////");
    console.log(this.state.valores);
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
      inputValue: event.target.value,
    });
  }

  filtro() {
    const listItems = [];
    for (let i = 0; i < this.state.valores.length; i++) {
      if (
        this.state.valores[i].nombre
          .toLowerCase()
          .includes(this.state.inputValue.toLowerCase())
      )
      listItems.push(this.state.valores[i])
    }
    return listItems;
  }
  render() {
    const { classes } = this.props;
    return (
      <Container id="cont1" style={{ heigth: '100%' }}>
        {this.state.mostrarDetalles ? (
          <Grid
            container
            id="gri1"
            direction="column"
            justify="space-between"
            alignItems="center"
          >
            <Grid item container direction="row" id="gri2" item>
              <FormControl
                fullWidth
                style={{ margin: '20px' }}
                onSubmit={this.handleSubmit}
              >
                <Typography
                  className={classes.tittle}
                  id="valoracionLabel"
                  gutterBottom
                  variant="h5"
                  component="h2"
                >
                  Tiendas
                </Typography>
                <TextField
                  name="busqueda"
                  label="Nombre"
                  rows="1"
                  onInput={this.handleInputChange}
                  variant="outlined"
                />
              </FormControl>
            </Grid>

            <Grid id="gri3" item container fullHeight >
              <GridList cellHeight={'300'} className={classes.gridList}>
                {this.filtro().map((value, index) => (
                  <GridListTile key={index}>
                    <img src={value.imagen} />
                    <GridListTileBar
                      title={value.nombre}
                      //                    subtitle={<span>by: {tile.author}</span>}
                      actionIcon={
                        <IconButton
                          aria-label={`info about ${value.nombre}`}
                          className={classes.icon}
                          onClick={() => {
                            this.setState({
                              tiendaId: value.tiendaId,
                            });                        
                            this.setState({
                              mostrarDetalles: !this.state.mostrarDetalles,
                            });
                          }}
                        >
                          <InfoIcon />
                        </IconButton>
                      }
                    />
                  </GridListTile>
                ))}
              </GridList>
            </Grid>
          </Grid>
        ) : (
          <Grid container alignItems="Center">
            <Grid item>
              <PaginaTienda tiendaId={this.state.tiendaId} />
            </Grid>
          </Grid>
        )}
      </Container>
    );
  }
}
export default withStyles(useStyles)(ListaTiendas);
