import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import App from './App';
import theme from './theme';
import './commons/commons.css';

ReactDOM.render(
  <ThemeProvider theme={theme} className="gradient-bg">
    <CssBaseline />
    <App />
  </ThemeProvider>,
  document.querySelector('#root')
);
