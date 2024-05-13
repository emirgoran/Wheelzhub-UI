import { useEffect, useState } from 'react';
import { Container, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VehicleEditModal from './VehicleEditModal';
import { VehicleWithRentStatus } from '../types/Vehicle';
import { deleteData, fetchData } from '../api/ApiUtils';
import { useSnackbar } from 'notistack';
import CarRentalIcon from '@mui/icons-material/CarRental';
import AvailableIcon from '@mui/icons-material/Check';
import NotAvailableIcon from '@mui/icons-material/Clear';
import VehicleRentModal from './VehicleRentModal';
import { useUser } from './UserContext';

function VehiclesOverview() {

  // USER CONTEXT
  const { user, setUser } = useUser();

  // SNACKBAR

  const { enqueueSnackbar } = useSnackbar();

  // EDIT VEHICLE SECTION

  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isRentModalOpen, setRentodalOpen] = useState(false);
  const [editVehicle, setEditVehicle] = useState<VehicleWithRentStatus>();
  const [rentalVehicle, setRentalVehicle] = useState<VehicleWithRentStatus>();

  const openEditModal = () => setEditModalOpen(true);
  const closeEditModal = () => setEditModalOpen(false);

  const openRentModal = () => setRentodalOpen(true);
  const closeRentModal = () => setRentodalOpen(false);

  const updateVehicle = (vehicle: VehicleWithRentStatus) => {
    setEditVehicle(vehicle);
    openEditModal();
  };

  const rentVehicle = (vehicle: VehicleWithRentStatus) => {
    if (vehicle.rented) {
      enqueueSnackbar(`Vehicle ${vehicle.id} has already been rented.`, { preventDuplicate: true });
      return;
    }

    setRentalVehicle(vehicle);
    openRentModal();
  };

  // VIEW AND DELETE VEHICLE SECTION

  const [vehicles, setVehicles] = useState<VehicleWithRentStatus[]>([]);

  // Function to fetch vehicles from the API
  const fetchVehicles = async () => {
    fetchData<VehicleWithRentStatus[]>(`${process.env.REACT_APP_API_PATH}/vehicles/withRentStatus`)
      .then((data) => {
        setVehicles(data);
      })
      .catch(err => {
        enqueueSnackbar(`Failed to fetch vehicle data.`, { preventDuplicate: true });
      });
  };

  // Function to delete a vehicle by ID
  const deleteVehicle = async (id: number) => {
    deleteData(`${process.env.REACT_APP_API_PATH}/vehicles/${id}`)
      .then(() => {
        setVehicles((prevVehicles) => prevVehicles.filter((vehicle) => vehicle.id !== id));
        enqueueSnackbar(`Vehicle ${id} deleted.`, { preventDuplicate: true });
      })
      .catch(err => {
        enqueueSnackbar(`Failed to delete vehicle ${id}!`, { preventDuplicate: true });
      });
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchVehicles();
  }, []);

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Box sx={{ bgcolor: 'background.default', width: '100%' }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Vehicle ID</TableCell>
                <TableCell align="center">Make</TableCell>
                <TableCell align="center">Model</TableCell>
                <TableCell align="center">Year</TableCell>
                <TableCell align="center">License&nbsp;plate</TableCell>
                <TableCell align="center">Available</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {vehicles && vehicles.map((vehicle) => (
                <TableRow
                  key={vehicle.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="center">{vehicle.id}</TableCell>
                  <TableCell align="center" component="th" scope="row">{vehicle.make}</TableCell>
                  <TableCell align="center">{vehicle.model}</TableCell>
                  <TableCell align="center">{vehicle.year}</TableCell>
                  <TableCell align="center">{vehicle.licensePlate}</TableCell>
                  <TableCell align="center">
                    <IconButton aria-label="status">
                      {vehicle.rented ? <NotAvailableIcon style={{ color: 'red' }} /> : <AvailableIcon style={{ color: 'green' }} />}
                    </IconButton>
                  </TableCell>

                  <TableCell align="center">
                    <IconButton
                      aria-label="delete"
                      color="secondary"
                      onClick={() => deleteVehicle(vehicle.id)}
                    >
                      <DeleteIcon />
                    </IconButton>

                    <IconButton
                      aria-label="update"
                      color="primary"
                      onClick={() => updateVehicle(vehicle)}
                    >
                      <EditIcon />
                    </IconButton>

                    {user &&
                      <IconButton
                        aria-label="update"
                        color="primary"
                        onClick={() => rentVehicle(vehicle)}
                      >
                        <CarRentalIcon style={{ color: vehicle.rented ? 'red' : 'green' }} />
                      </IconButton>
                    }
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {editVehicle && <VehicleEditModal vehicle={editVehicle} open={isEditModalOpen} onClose={closeEditModal} />}
      {rentalVehicle && user && <VehicleRentModal vehicle={rentalVehicle} user={user} open={isRentModalOpen} onClose={closeRentModal} />}

    </Container>
  );
}

export default VehiclesOverview;
