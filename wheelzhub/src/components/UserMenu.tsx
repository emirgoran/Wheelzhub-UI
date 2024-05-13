import React from 'react';
import { Divider, IconButton, Menu, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';
import { useUser } from './UserContext';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function UserMenu() {

  // To manage user login
  const { user, setUser } = useUser();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div>
      {user &&
        <IconButton size="small" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
          {user.username} &nbsp;
          <AccountCircleIcon />
        </IconButton>
      }
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose} component={Link} to="/userEdit"> Settings </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}> Logout </MenuItem>
      </Menu>
    </div>
  );
}

export default UserMenu;
