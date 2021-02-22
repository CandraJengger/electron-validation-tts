import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const App = () => {
  const [theme, setTheme] = useState({
    palette: {
      type: 'light',
      primary: {
        light: '#c3fdff',
        main: '#90caf9',
        dark: '#5d99c6',
        contrastText: '#141D23',
      },
      secondary: {
        light: '#ffc1e3',
        main: '#f48fb1',
        dark: '#bf5f82',
        contrastText: '#141D23',
      },
    },
  });

  const toggleDarkTheme = () => {
    let newPaletteType = theme.palette.type === 'light' ? 'dark' : 'light';
    setTheme({
      ...theme,
      palette: {
        ...theme.palette,
        type: newPaletteType,
      },
    });
  };

  const muiTheme = createMuiTheme(theme);

  return (
    <MuiThemeProvider theme={muiTheme}>
      <Dashboard onToggleTheme={toggleDarkTheme} />
    </MuiThemeProvider>
  );
};

export default App;
