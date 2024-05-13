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
import NotFound from './components/NotFound';
import { User } from './types/User';
import { Vehicle } from './types/Vehicle';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

function App() {
  const [mode, setMode] = React.useState<PaletteMode>('light');
  const defaultTheme = createTheme({ palette: { mode } });

  const toggleColorMode = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const user: User = {
    id: 1,
    username: '',
    password: ''
  }

  const vehicle: Vehicle = {
    id: 1,
    make: '',
    model: '',
    year: 0,
    licensePlate: ''
  }

  return (
    <UserProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
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

                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </div>

              </Box>
            </ThemeProvider>
          </Router>
        </SnackbarProvider>
      </LocalizationProvider>
    </UserProvider>
  );
}

export default App;
