import React from 'react';
import ReactDOM from 'react-dom';
import { theme } from 'theme/MainTheme';
import { ThemeProvider } from 'styled-components';

import App from './App';

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  document.getElementById('root'),
);
