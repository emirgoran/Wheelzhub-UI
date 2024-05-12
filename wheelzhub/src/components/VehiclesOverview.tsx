import { useEffect, useState } from 'react';
import { Container, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VehicleEditModal from './VehicleEditModal';
import { Vehicle } from '../types/Vehicle';
import { deleteData, fetchData } from '../api/ApiUtils';
import { useSnackbar } from 'notistack';

function VehiclesOverview() {

  // SNACKBAR

  const { enqueueSnackbar } = useSnackbar();

  // EDIT VEHICLE SECTION

  const [isModalOpen, setModalOpen] = useState(false);
  const [vehicle, setVehicle] = useState<Vehicle>();

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const updateVehicle = (vehicle: Vehicle) => {
    setVehicle(vehicle);
    openModal();
  };

  // VIEW AND DELETE VEHICLE SECTION

  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  // Function to fetch vehicles from the API
  const fetchVehicles = async () => {
    fetchData<Vehicle[]>(`${process.env.REACT_APP_API_PATH}/vehicles`)
      .then((data) => {
        setVehicles(data);
      })
      .catch(err => {
        enqueueSnackbar(`Failed to fetch vehicles data. Error: ${err.message}`, { preventDuplicate: true });
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
        enqueueSnackbar(`Failed to delete vehicle ${id}. Error: ${err.message}`, { preventDuplicate: true });
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
                <TableCell>Vehicle ID</TableCell>
                <TableCell align="right">Make</TableCell>
                <TableCell align="right">Model</TableCell>
                <TableCell align="right">Year</TableCell>
                <TableCell align="right">License&nbsp;plate</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {vehicles && vehicles.map((vehicle) => (
                <TableRow
                  key={vehicle.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="right">{vehicle.id}</TableCell>
                  <TableCell align="right" component="th" scope="row">{vehicle.make}</TableCell>
                  <TableCell align="right">{vehicle.model}</TableCell>
                  <TableCell align="right">{vehicle.year}</TableCell>
                  <TableCell align="right">{vehicle.licensePlate}</TableCell>

                  <TableCell align="right">
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
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {vehicle && <VehicleEditModal vehicle={vehicle} open={isModalOpen} onClose={closeModal} />}

    </Container>
  );
}

export default VehiclesOverview;
