import React, { useState } from 'react';
import { Button, Container, TextField, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { Vehicle, VehicleEditProps } from '../types/Vehicle';

function VehicleEdit({ vehicle }: VehicleEditProps) {
  // State for managing form inputs
  const [formValues, setFormValues] = useState<Vehicle>(vehicle);
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

    try {
      const response = await fetch(`http://localhost:8080/api/vehicles/${vehicle.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formValues),
      });

      if (response.ok) {
        // Successful creation
        setMessage('Vehicle updated successfully!');
        setFormValues({ id: 0, make: '', model: '', year: new Date().getFullYear(), licensePlate: '' }); // Reset form inputs

        Object.assign(vehicle, formValues);
      } else {
        // Server-side errors
        const error = await response.text();
        setMessage(`Error: ${error}`);
      }
    } catch (err: any) {
      // Network errors
      setMessage(`Network error: ${err.message}`);
    }
  };

  // Form rendering with Material-UI
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
            Save changes
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

export default VehicleEdit;
