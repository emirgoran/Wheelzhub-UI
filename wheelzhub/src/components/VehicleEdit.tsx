import React, { useState } from 'react';
import { Button, Container, TextField, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { Vehicle, VehicleEditProps } from '../types/Vehicle';
import { patchData } from '../api/ApiUtils';
import { useSnackbar } from 'notistack';

function VehicleEdit({ vehicle, onFinishedEditing }: VehicleEditProps) {

  // Snackbar
  const { enqueueSnackbar } = useSnackbar();

  // State for managing form inputs
  const [formValues, setFormValues] = useState<Vehicle>(vehicle);

  // Handler to update form values on input change
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  // Handler to submit the form and create a vehicle
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent default form submission

    patchData(`${process.env.REACT_APP_API_PATH}/vehicles/${vehicle.id}`, formValues)
      .then(() => {
        enqueueSnackbar('Vehicle updated successfully!', { preventDuplicate: true });
        Object.assign(vehicle, formValues); // Copy back updated values into vehicle
        onFinishedEditing();
      }).catch(err => {
        enqueueSnackbar(`Could not update vehicle! ${err.message}`, { preventDuplicate: true });
      });
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
      </Box>
    </Container>
  );
};

export default VehicleEdit;
