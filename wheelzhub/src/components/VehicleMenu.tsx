import React from 'react';
import { Button, Menu, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';

function VehicleMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button variant="text" color="info" size="small" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        Vehicles
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose} component={Link} to="/vehiclesOverview">Overview Vehicles</MenuItem>
        <MenuItem onClick={handleClose} component={Link} to="/vehicleCreate">Create Vehicle</MenuItem>
      </Menu>
    </div>
  );
}

export default VehicleMenu;
