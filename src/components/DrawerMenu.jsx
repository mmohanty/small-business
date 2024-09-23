import React from 'react';
import { Box, Drawer, List, ListItem, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import MenuContext from './MenuContext';

const DrawerMenu = ({ isOpen, toggleDrawer }) => {

  const loggedInUser = React.useContext(MenuContext);
  const menuItemsForAggregator = [
    { text: 'Home', link: '/home' },
    { text: 'Dashboard', link: '/dashboard' },
    { text: 'About', link: '/about' },
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
    <Drawer anchor="left" open={isOpen} onClose={toggleDrawer(false)}>
      <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
        <List>
          {(localStorage.getItem("loggedInUser") === 'AssetManager' ? menuItemsForAggregator : menuItemsForCustodian).map((item, index) => (
            <ListItem button key={item.text} component={Link} to={item.link}>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default DrawerMenu;
