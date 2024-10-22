import React, { createContext, useState, useContext } from 'react';
import { Backdrop, CircularProgress, Typography, Box } from '@mui/material';

// Create Backdrop context
const BackdropContext = createContext(); // Ensure this is created

// Backdrop provider component
export const BackdropProvider = ({ children }) => {
  const [backdropOpen, setBackdropOpen] = useState(false);
  const [backdropLabel, setBackdropLabel] = useState(''); // State for the label

  // Function to show the backdrop
  const showBackdrop = (label = '') => {
    setBackdropLabel(label);
    setBackdropOpen(true);
  };

  // Function to hide the backdrop
  const hideBackdrop = () => {
    setBackdropOpen(false);
    setBackdropLabel('');
  };

  return (
    <BackdropContext.Provider value={{ showBackdrop, hideBackdrop }}>
      {children}

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={backdropOpen}
      >
        <Box display="flex" flexDirection="column" alignItems="center">
          <CircularProgress color="inherit" />
          {backdropLabel && (
            <Typography variant="h6" sx={{ mt: 2 }}>
              {backdropLabel}
            </Typography>
          )}
        </Box>
      </Backdrop>
    </BackdropContext.Provider>
  );
};

// Custom hook to use the Backdrop
export const useBackdrop = () => {
  return useContext(BackdropContext); // Ensure context is used here
};
