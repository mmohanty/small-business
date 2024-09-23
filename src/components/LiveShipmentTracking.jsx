import React from 'react';
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';

const LiveShipmentTracking = () => {
  const shipments = [
    { status: 'Delivery', detail: 'On Truck #263', date: 'Today', distanceLeft: '2.5km' },
    { status: 'Transit', detail: 'At warehouse 21, 13 Simone W', date: '10/12/2023' },
    { status: 'Transit', detail: 'At warehouse 10, 90 St Mauric', date: '09/12/2023' },
  ];

  return (
    <Box sx={{ minWidth: 400, padding: 2, border: '1px solid #ccc', marginTop: 8, marginLeft: 3 }}>
      <Typography variant="h6" gutterBottom>
        Live Shipment Tracking
      </Typography>
      <Typography variant="h4" color="textPrimary">
        2.5km Left
      </Typography>
      <List>
        {shipments.map((shipment, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={shipment.status}
              secondary={`${shipment.detail} - ${shipment.date}`}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default LiveShipmentTracking;
