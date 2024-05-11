import React, { useEffect, useState } from 'react';
import { Button, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import Box from '@mui/material/Box';

interface Vehicle {
  id: number;
  make: string;
  model: string;
  year: number;
  licensePlate: string;
}

function VehicleCreate() {
  // State for managing form inputs
  const [formValues, setFormValues] = useState<Vehicle>({
    id: 0,
    make: '',
    model: '',
    year: new Date().getFullYear(),
    licensePlate: ''
  });
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
      const response = await fetch('http://localhost:8080/api/vehicles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formValues),
      });

      if (response.ok) {
        // Successful creation
        setMessage('Vehicle created successfully!');
        setFormValues({ id: 0, make: '', model: '', year: new Date().getFullYear(), licensePlate: '' }); // Reset form inputs
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
