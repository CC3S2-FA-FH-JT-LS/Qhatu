import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
  },
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function TablaEstadisticasComerciante(props) {
  const classes = useStyles();
  const contenido = props.estadisticas;
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableBody>
            <TableRow>
                <TableCell component="th" scope="row">
                    Confirmaciones
                </TableCell>
                <TableCell  align="right">
                {contenido.confirmaciones}
                </TableCell>
                </TableRow>

                <TableRow>
                <TableCell component="th" scope="row">
                    Visitas
                </TableCell>
                <TableCell  align="right">
                {contenido.visitas}
                </TableCell>
                </TableRow>

                <TableRow>
                <TableCell component="th" scope="row">
                    Item mas popular
                </TableCell>
                <TableCell  align="right">
                {contenido.itemPopular}
                </TableCell>
                </TableRow>

                <TableRow>
                <TableCell component="th" scope="row">
                Item menos popular</TableCell>

                <TableCell  align="right">
                {contenido.itemNoPopular}
                </TableCell>
                </TableRow>

                <TableRow>
                <TableCell component="th" scope="row">
                Numero de valoraciones

                </TableCell>
                <TableCell  align="right">
                {contenido.numeroValoraciones}
                </TableCell>

            </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}