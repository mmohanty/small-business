import React from 'react';
import GaugeChart from 'react-gauge-chart';
import { Box, Typography } from '@mui/material';

const FulfillmentTime = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#2C2D48', // Dark blue background
        padding: 3,
        borderRadius: 2,
        color: 'white',
        textAlign: 'center',
        minWidth: 400,
        marginLeft: 8
      }}
    >
      {/* Title */}
      <Typography variant="subtitle1" sx={{ color: '#B0B0C3' }}>
        Avg processing time (past 7d)
      </Typography>

      {/* Gauge Chart */}
      <Box sx={{ marginTop: 2, marginBottom: 2 }}>
        <GaugeChart
          id="gauge-chart"
          nrOfLevels={14}
          percent={0.01} // 60% corresponds to 6hr of 10hr total
          arcPadding={0.05}
          colors={['#00ff00', '#FFCC00', '#FF5555']} // Color scale
          arcWidth={0.3}
          needleColor="#FFF"
          textColor="white"
          formatTextValue={(value) => `${value}hr`}
        />
      </Box>

      {/* Fulfillment Hours */}
      <Typography variant="h3" sx={{ color: 'white' }}>
        72hr
      </Typography>

      {/* Returns to be Processed */}
      <Typography variant="h1" sx={{ fontSize: '48px', marginTop: 3, marginBottom: 0 }}>
        23
      </Typography>
      <Typography variant="subtitle1" sx={{ color: '#B0B0C3' }}>
        Loans to be processed
      </Typography>
    </Box>
  );
};

export default FulfillmentTime;
