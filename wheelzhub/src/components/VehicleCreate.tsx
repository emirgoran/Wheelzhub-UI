import React, { useState } from 'react';
import { Button, Container, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import { Vehicle } from '../types/Vehicle';

import { postData } from '../api/ApiUtils';
import { useSnackbar } from 'notistack';

const defaultVehicleData: Vehicle = {
  id: 0,
  make: '',
  model: '',
  year: new Date().getFullYear(),
  licensePlate: ''
};

function VehicleCreate() {
  // Snackbar
  const { enqueueSnackbar } = useSnackbar();
  
  // State for managing form inputs
  const [formValues, setFormValues] = useState<Vehicle>(defaultVehicleData);

  // Handler to update form values on input change
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  // Handler to submit the form and create a vehicle
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent default form submission

    postData(`${process.env.REACT_APP_API_PATH}/vehicles`, formValues)
      .then(() => {
        enqueueSnackbar('Vehicle created successfully!', { preventDuplicate: true });
        setFormValues(defaultVehicleData); // Reset form inputs
      })
      .catch(err => {
        enqueueSnackbar(`Could not create vehicle ${formValues.id}!`, { preventDuplicate: true });
      });
  };

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Box display="flex" flexDirection="column" alignItems="center" p={3} maxWidth="lg">
        <form onSubmit={handleSubmit}>
          <Box mb={2}>
            <TextField
              label="Make"
              name="make"
              value={formValues.make}
              onChange={handleInputChange}
              required
              fullWidth
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="Model"
              name="model"
              value={formValues.model}
              onChange={handleInputChange}
              required
              fullWidth
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="Year"
              type="number"
              name="year"
              value={formValues.year}
              onChange={handleInputChange}
              required
              fullWidth
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="License plate"
              name="licensePlate"
              value={formValues.licensePlate}
              onChange={handleInputChange}
              required
              fullWidth
            />
          </Box>
          <Button variant="contained" type="submit" color="primary">
            Create Vehicle
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default VehicleCreate;
