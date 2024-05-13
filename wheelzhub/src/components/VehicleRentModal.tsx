import React from 'react';
import { Box, Modal, Typography } from '@mui/material';
import { VehicleWithRentStatus } from '../types/Vehicle';
import VehicleRent from './VehicleRent';
import { User } from '../types/User';

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

interface VehicleRentModalProps {
  vehicle: VehicleWithRentStatus;
  user: User;
  open: boolean;
  onClose: () => void;
}

const VehicleRentModal: React.FC<VehicleRentModalProps> = ({ vehicle, user, open, onClose }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="edit-vehicle-modal-title"
      aria-describedby="edit-vehicle-modal-description"
    >
      <Box sx={style}>
        <Typography id="edit-vehicle-modal-title" variant="h6">
          Rent Vehicle {vehicle.id}
        </Typography>

        <VehicleRent vehicle={vehicle} user={user} onFinishedEditing={onClose} />
      </Box>
    </Modal>
  );
};

export default VehicleRentModal;
