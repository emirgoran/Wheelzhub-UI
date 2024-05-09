import React, { useEffect, useState } from 'react';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Box from '@mui/material/Box';

interface Vehicle {
  id: number;
  make: string;
  model: string;
  year: number;
  licensePlate: string;
}

function VehiclesOverview() {

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

  // Fetch data on component mount
  useEffect(() => {
    fetchVehicles();
  }, []);

  return (
    <Box sx={{ bgcolor: 'background.default' }}>
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
              </TableRow>
            </TableHead>
            <TableBody>
              {vehicles.map((vehicle) => (
                <TableRow
                  key={vehicle.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="right">{vehicle.id}</TableCell>
                  <TableCell component="th" scope="row">{vehicle.make}</TableCell>
                  <TableCell align="right">{vehicle.model}</TableCell>
                  <TableCell align="right">{vehicle.year}</TableCell>
                  <TableCell align="right">{vehicle.licensePlate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}

export default VehiclesOverview;
