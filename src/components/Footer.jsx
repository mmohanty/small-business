import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#3f51b5',
        color: 'white',
        textAlign: 'center',
        p: 2,
        position: 'fixed',
        width: '100%',
        bottom: 0,
      }}
    >
      <Typography variant="body1">Footer Content &copy; 2024</Typography>
    </Box>
  );
};

export default Footer;
