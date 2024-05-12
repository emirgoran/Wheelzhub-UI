import React, { useState } from 'react';
import { Button, Container, TextField, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { Vehicle } from '../types/Vehicle';

import { postData } from '../api/ApiUtils';

const defaultVehicleData: Vehicle = {
  id: 0,
  make: '',
  model: '',
  year: new Date().getFullYear(),
  licensePlate: ''
};

function VehicleCreate() {
  // State for managing form inputs
  const [formValues, setFormValues] = useState<Vehicle>(defaultVehicleData);
  const [message, setMessage] = useState<string | null>(null);

  // Handler to update form values on input change
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  // Handler to submit the form and create a vehicle
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent default form submission
    setMessage(null);

    postData(`${process.env.REACT_APP_API_PATH}/vehicles`, formValues)
      .then(() => {
        setMessage('Vehicle created successfully!');
        setFormValues(defaultVehicleData); // Reset form inputs
      })
      .catch(err => {
        setMessage(`Error: ${err.message}`);
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
        {message && (
          <Typography color="error" mt={2}>
            {message}
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default VehicleCreate;
