import React, { useState } from 'react';
import { Button, Container, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import { postData } from '../api/ApiUtils';
import { useSnackbar } from 'notistack';
import { User } from '../types/User';
import { useNavigate } from 'react-router-dom';
import { useUser } from './UserContext';

const defaultUserData: User = {
  id: 0,
  username: '',
  password: '',
};

function UserCreate() {

  // To manage user login
  const { user, setUser } = useUser();

  // To navigate to another page after login
  const navigate = useNavigate();
  
  // Snackbar
  const { enqueueSnackbar } = useSnackbar();

  // State for managing form inputs
  const [formValues, setFormValues] = useState<User>(defaultUserData);

  // Handler to update form values on input change
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  // Handler to submit the form and create a user
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent default form submission

    postData<User>(`${process.env.REACT_APP_API_PATH}/users`, formValues)
      .then((data) => {
        enqueueSnackbar(`User ${formValues.username} created successfully!`, { preventDuplicate: true });
        setFormValues(defaultUserData); // Reset form inputs
        setUser(data);
        navigate('/');
      })
      .catch(() => {
        enqueueSnackbar(`Could not create user ${formValues.username}!`, { preventDuplicate: true });
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
            Register
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default UserCreate;
