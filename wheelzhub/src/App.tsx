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
import UserCreate from './components/UserCreate';
import UserLogin from './components/UserLogin';
import { UserProvider } from './components/UserContext';
import UserEdit from './components/UserEdit';

function App() {
  const [mode, setMode] = React.useState<PaletteMode>('light');
  const defaultTheme = createTheme({ palette: { mode } });

  const toggleColorMode = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <UserProvider>
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
                  
                  <Route path="/userRegister" element={<UserCreate />} />
                  <Route path="/userLogin" element={<UserLogin />} />
                  <Route path="/userEdit" element={<UserEdit />} />
                </Routes>
              </div>

            </Box>
          </ThemeProvider>
        </Router>
      </SnackbarProvider>
    </UserProvider>
  );
}

export default App;
