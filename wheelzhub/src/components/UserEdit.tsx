import React, { useState } from 'react';
import { Button, Container, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import { patchData } from '../api/ApiUtils';
import { useSnackbar } from 'notistack';
import { User, defaultUserData } from '../types/User';
import { useUser } from './UserContext';

function UserEdit() {

  // To manage user login
  const { user, setUser } = useUser();

  // Snackbar
  const { enqueueSnackbar } = useSnackbar();

  // State for managing form inputs
  const [formValues, setFormValues] = useState<User>(user ?? defaultUserData);

  // Handler to update form values on input change
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  // Handler to submit the form and create a user
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent default form submission

    patchData<User>(`${process.env.REACT_APP_API_PATH}/users/${user?.id}`, formValues)
      .then((data) => {
        enqueueSnackbar('User updated successfully!', { preventDuplicate: true });
        setUser(data);
      }).catch(err => {
        enqueueSnackbar(`Could not update user! ${err.message}`, { preventDuplicate: true });
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
              label="Username"
              name="username"
              value={formValues.username}
              onChange={handleInputChange}
              required
              fullWidth
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="Password"
              name="password"
              value={formValues.password}
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

export default UserEdit;
