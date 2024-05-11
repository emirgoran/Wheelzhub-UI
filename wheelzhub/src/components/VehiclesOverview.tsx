import { useEffect, useState } from 'react';
import { Container, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VehicleEditModal from './VehicleEditModal';
import { Vehicle } from '../types/Vehicle';

function VehiclesOverview() {

  const [isModalOpen, setModalOpen] = useState(false);
  const [vehicle, setVehicle] = useState<Vehicle>();

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const updateVehicle = (vehicle: Vehicle) => {
    setVehicle(vehicle);
    openModal();
  };

  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Function to fetch vehicles from the API
  const fetchVehicles = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch data from the API
      const response = await fetch('http://localhost:8080/api/vehicles');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json() as Vehicle[];
      setVehicles(data);
    } catch (err: any) {
      setError('Failed to fetch vehicles data. ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Function to delete a vehicle by ID
  const deleteVehicle = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:8080/api/vehicles/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setVehicles((prevVehicles) => prevVehicles.filter((vehicle) => vehicle.id !== id));
      } else {
        const error = await response.text();
      }
    } catch (err: any) {
    }
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
        {loading && <p>Loading vehicles data...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {!loading && !error && (
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
                {vehicles.map((vehicle) => (
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
        )}
      </Box>

      {vehicle && <VehicleEditModal vehicle={vehicle} open={isModalOpen} onClose={closeModal} />}

    </Container>
  );
}

export default VehiclesOverview;
