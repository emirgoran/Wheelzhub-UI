import React from 'react';
import { Box, Button, Modal, Typography } from '@mui/material';
import VehicleEdit from './VehicleEdit';
import { Vehicle } from '../types/Vehicle';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface VehicleEditModalProps {
  vehicle: Vehicle;
  open: boolean;
  onClose: () => void;
}

const VehicleEditModal: React.FC<VehicleEditModalProps> = ({ vehicle, open, onClose }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="edit-vehicle-modal-title"
      aria-describedby="edit-vehicle-modal-description"
    >
      <Box sx={style}>
        <Typography id="edit-vehicle-modal-title" variant="h6">
          Edit Vehicle {vehicle.id}
        </Typography>
        <VehicleEdit vehicle={vehicle} onFinishedEditing={onClose} />
        <Button onClick={onClose} variant="outlined" color="secondary">
          Close
        </Button>
      </Box>
    </Modal>
  );
};

export default VehicleEditModal;
