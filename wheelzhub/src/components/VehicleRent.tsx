import React from 'react';
import { Button, Container } from '@mui/material';
import Box from '@mui/material/Box';

import { postData } from '../api/ApiUtils';
import { useSnackbar } from 'notistack';
import { DateTimePicker, renderTimeViewClock } from '@mui/x-date-pickers';
import { Rent } from '../types/Rent';
import { VehicleWithRentStatus } from '../types/Vehicle';
import { User } from '../types/User';
import { Dayjs } from 'dayjs';

interface VehicleRentProps {
  vehicle: VehicleWithRentStatus;
  user: User;
  onFinishedEditing: () => void;
}

function VehicleRent({ vehicle, user, onFinishedEditing }: VehicleRentProps) {

  // Snackbar
  const { enqueueSnackbar } = useSnackbar();

  const [startDateTime, setStartDateTime] = React.useState<Dayjs | null>(null);
  const [endDateTime, setEndDateTime] = React.useState<Dayjs | null>(null);


  // Handler to submit the form and create a rent
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent default form submission

    const rentData: Rent = {
      user: user,
      vehicle: vehicle,
      startDateTime: startDateTime?.toDate(),
      endDateTime: endDateTime?.toDate(),
    }

    postData<Rent>(`${process.env.REACT_APP_API_PATH}/rents`, rentData)
      .then(() => {
        enqueueSnackbar(`Vehicle ${rentData.vehicle.id} rented.`, { preventDuplicate: true });
        if (rentData.startDateTime != undefined && rentData.endDateTime != undefined) {
          vehicle.rented = rentData.startDateTime < new Date() && new Date() < rentData.endDateTime;
          onFinishedEditing();
        }
      })
      .catch(() => {
        enqueueSnackbar(`Could not rent vehicle ${rentData.vehicle.id}!`, { preventDuplicate: true });
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
            <DateTimePicker
              label="Start time"
              value={startDateTime}
              onChange={(newValue) => setStartDateTime(newValue)}
              viewRenderers={{
                hours: renderTimeViewClock,
                minutes: renderTimeViewClock,
                seconds: renderTimeViewClock,
              }}
              slotProps={{
                textField: {
                  required: true,
                },
              }}
            />
          </Box>

          <Box mb={2}>
            <DateTimePicker
              label="End time"
              value={endDateTime}
              onChange={(newValue) => setEndDateTime(newValue)}
              viewRenderers={{
                hours: renderTimeViewClock,
                minutes: renderTimeViewClock,
                seconds: renderTimeViewClock,
              }}
              slotProps={{
                textField: {
                  required: true,
                },
              }}
            />
          </Box>

          <Button variant="contained" type="submit" color="primary">
            Rent Vehicle
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default VehicleRent;
