import { createTheme, CssBaseline, PaletteMode, ThemeProvider, useMediaQuery } from '@mui/material';
import './App.css';
import Home from './pages/home'
import { useState } from 'react';
import { useMode } from './mode-context';


function App() {
  // Optional manual toggle
  const { mode } = useMode();
  const theme = createTheme({ palette: { mode } });
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Home/>
    </ThemeProvider>
  );
}

export default App;
