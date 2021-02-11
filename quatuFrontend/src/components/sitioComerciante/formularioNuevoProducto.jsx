import React from 'react';
import FormularioProducto from './formularioProducto';
import ProductoModels from './modelData/Producto';
import Grid from '@material-ui/core/Grid';

export default class FormularioNuevoProducto extends React.Component {
  constructor(props) {
    super(props);
    this.tiendaId = props.tiendaId;
  }
  render() {
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
          <FormularioProducto tiendaId={this.tiendaId}/>
        </Grid>
      </Grid>
    );
  }
}
