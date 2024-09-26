import React from 'react';
import { Avatar, Box, Drawer, List, ListItem, ListItemText, Menu, Typography, IconButton, MenuItem, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import MenuContext from './MenuContext';
import { Home, Settings, AccountCircle, MoreVert as MoreVertIcon } from '@mui/icons-material';

const DrawerMenu = ({ isOpen, toggleDrawer }) => {

  const loggedInUser = React.useContext(MenuContext);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const openMenu = Boolean(anchorEl);


  const menuItemsForAggregator = [
    { text: 'Home', link: '/home' },
    { text: 'Dashboard', link: '/dashboard' },
    { text: 'LoanScreen', link: '/loan-screen' },
    { text: 'Template', link: '/template' },
    { text: 'Services', link: '/services' },
    { text: 'Contact', link: '/contact' },
  ];

  const menuItemsForCustodian = [
    { text: 'Home', link: '/home' },
    { text: 'Dashboard', link: '/dashboard' },
    { text: 'About', link: '/about' },
    { text: 'Services', link: '/services' },
  ];

  return (
    <Drawer anchor="left" open={isOpen} onClose={toggleDrawer(false)}
    sx={{
      '& .MuiDrawer-paper': {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      },
    }}>

       {/* Company Logo at the top */}
       <Box
        sx={{
          p: 5,
          marginTop: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: 10,
          borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
          background: 'linear-gradient(45deg, #6A82FB 30%, #FC5C7D 90%)'

        }}
      >
        <Typography variant="h6">Asset Management</Typography>
      </Box>

       {/* List of items */}
      <Box sx={{ width: 250, flexGrow: 1 }} role="presentation" onClick={toggleDrawer(false)}>
        <List>
          {(localStorage.getItem("loggedInUser") === 'AssetManager' ? menuItemsForAggregator : menuItemsForCustodian).map((item, index) => (
            <ListItem button key={item.text} component={Link} to={item.link}>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Box>

      {/* User Avatar and Name with Menu at the bottom */}
      <Box sx={{ p: 2, borderTop: '1px solid rgba(0, 0, 0, 0.12)' }}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box display="flex" alignItems="center">
            <Avatar src={'https://i.pravatar.cc/150?img=1'} alt={localStorage.getItem("loggedInUser")} />
            <Box ml={2}>
              <Typography variant="body1">{localStorage.getItem("loggedInUser")}</Typography>
              {/* User Role Label */}
              <Typography variant="body2" color="textSecondary" sx={{ fontSize: '0.75rem' }}>
                {localStorage.getItem("loggedInUser")} {/* Smaller font size for role */}
              </Typography>
            </Box>
          </Box>

          {/* Three Dots Icon to open menu */}
          <IconButton onClick={handleMenuClick}>
            <MoreVertIcon />
          </IconButton>
        </Box>

        {/* Menu for Profile, Accounts, Settings */}
        <Menu
          anchorEl={anchorEl}
          open={openMenu}
          onClose={handleMenuClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <MenuItem onClick={handleMenuClose}>
            <AccountCircle sx={{ mr: 1 }} />
            Profile
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <AccountCircle sx={{ mr: 1 }} />
            Accounts
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <Settings sx={{ mr: 1 }} />
            Settings
          </MenuItem>
        </Menu>
      </Box>
    </Drawer>
  );
};

export default DrawerMenu;
