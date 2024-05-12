import * as React from 'react';
import { PaletteMode } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import VehiclesOverview from './components/VehiclesOverview';
import VehicleCreate from './components/VehicleCreate';
import AppAppBar from './components/AppAppBar';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import { SnackbarProvider } from 'notistack';

function App() {
  const [mode, setMode] = React.useState<PaletteMode>('light');
  const defaultTheme = createTheme({ palette: { mode } });

  const toggleColorMode = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <SnackbarProvider>
      <Router>
        <ThemeProvider theme={defaultTheme}>
          <CssBaseline />
          <AppAppBar mode={mode} toggleColorMode={toggleColorMode} />
          <Box sx={{ bgcolor: 'background.default', pt: 14 }}>

            <div>
              <Routes>
                <Route path="/" element={<VehiclesOverview />} />
                <Route path="/vehiclesOverview" element={<VehiclesOverview />} />
                <Route path="/vehicleCreate" element={<VehicleCreate />} />
              </Routes>
            </div>

          </Box>
        </ThemeProvider>
      </Router>
    </SnackbarProvider>
  );
}

export default App;
