import React, { useState } from 'react';
import { Avatar, Box, Drawer, List, ListItem, ListItemText, ListItemIcon, Menu, Typography, IconButton, MenuItem, Tooltip } from '@mui/material';
import { Link } from 'react-router-dom';
import { Home, Dashboard, ListAlt, Assignment, Business, ContactMail, AccountCircle, Settings, MoreVert as MoreVertIcon, ChevronLeft, ChevronRight, ContactSupport } from '@mui/icons-material';
import VerifiedIcon from '@mui/icons-material/Verified';
import FactCheckIcon from '@mui/icons-material/FactCheck';

const DrawerMenu = () => {
  const [isOpen, setIsOpen] = useState(false); // Control the drawer's open state
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedItem, setSelectedItem] = useState('Home'); // Track selected item

  const userRole = localStorage.getItem("loggedInUser");

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const openMenu = Boolean(anchorEl);

  const toggleDrawer = () => {
    setIsOpen(!isOpen); // Toggle drawer open/close
  };

  const handleListItemClick = (text) => {
    setSelectedItem(text);
  };

  const menuItemsForAggregator = [
    { text: 'Home', link: '/home', icon: <Home /> },
    { text: 'Dashboard', link: '/dashboard', icon: <Dashboard /> },
    { text: 'Create Template', link: '/createTemplates', icon: <Assignment /> },
    { text: 'Approve Template', link: '/approveTemplates', icon: <VerifiedIcon /> },
    { text: 'Manage Loans', link: '/manageLoans', icon: <ListAlt /> },
    { text: 'Services', link: '/services', icon: <Business /> },
    { text: 'Templates View', link: '/templates', icon: <Business /> },
  ];

  const menuItemsForCustodian = [
    { text: 'Home', link: '/home', icon: <Home /> },
    { text: 'Dashboard', link: '/dashboard', icon: <Dashboard /> },
    { text: 'About', link: '/about', icon: <ContactSupport /> },
    { text: 'Services', link: '/services', icon: <Business /> },
    { text: 'Templates View', link: '/templates', icon: <Business /> },
  ];

  return (
    <Drawer
      variant="permanent"
      open={isOpen}
      sx={{
        width: isOpen ? 240 : 60,
        '& .MuiDrawer-paper': {
          width: isOpen ? 240 : 60,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          transition: 'width 0.3s',
        },
      }}
    >
      {/* Drawer Toggle Arrow Icon */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: isOpen ? 'flex-end' : 'center',
          p: 1,
        }}
      >
        <IconButton onClick={toggleDrawer}>
          {isOpen ? <ChevronLeft /> : <ChevronRight />}
        </IconButton>
      </Box>

      {/* List of menu items */}
      <Box sx={{ flexGrow: 1 }} role="presentation">
        <List>
          {(userRole === 'AssetManager' ? menuItemsForAggregator : menuItemsForCustodian).map((item) => (
            <Tooltip key={item.text} title={item.text} placement="right" arrow>
              <ListItem
                key={item.text}
                component={Link}
                to={item.link}
                selected={selectedItem === item.text}
                onClick={() => handleListItemClick(item.text)}
                sx={{
                  '&.Mui-selected': {
                    backgroundColor: '#E3F2FD', // Light blue background for better contrast
                    color: '#000', // Black text for contrast
                    '&:hover': {
                      backgroundColor: '#BBDEFB', // Slightly darker on hover
                    },
                  },
                  '&:hover': {
                    backgroundColor: '#F1F1F1', // General hover effect
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color: selectedItem === item.text ? '#000' : 'inherit',
                    minWidth: isOpen ? 'auto' : '45px',
                    justifyContent: 'center',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                {isOpen && <ListItemText primary={item.text} />}
              </ListItem>
            </Tooltip>
          ))}
        </List>
      </Box>

      {/* User Avatar and Menu */}
      <Box sx={{ p: 2, borderTop: '1px solid rgba(0, 0, 0, 0.12)' }}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box display="flex" alignItems="center">
            <Avatar src={'https://i.pravatar.cc/150?img=1'} alt={userRole} />
            {isOpen && (
              <Box ml={2}>
                <Typography variant="body1">{userRole}</Typography>
                <Typography variant="body2" color="textSecondary" sx={{ fontSize: '0.75rem' }}>
                  {userRole}
                </Typography>
              </Box>
            )}
          </Box>

          {isOpen && (
            <IconButton onClick={handleMenuClick}>
              <MoreVertIcon />
            </IconButton>
          )}
        </Box>

        {/* Profile, Accounts, and Settings menu */}
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
