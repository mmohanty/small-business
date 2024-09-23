import React from 'react';
import { Grid2 as Grid, Box, Typography } from '@mui/material';
import OverviewCard from './OverviewCard';
import BarChart from './BarChart';
import LiveShipmentTracking from './LiveShipmentTracking';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import FulfillmentTime from './FulfillmentTime';

const Dashboard = () => {
  return (
    <Box
      sx={{
        height: '70vh', // Full viewport height
        display: 'flex',
        justifyContent: 'center', // Horizontally center
        alignItems: 'center', // Vertically center
        flexDirection: 'column', // Items should stack vertically
        gap: 3, // Gap between items
        padding: 3,
        marginTop: 2
      }}
    >
      <Typography variant="h5" gutterBottom>
        Overview
      </Typography>
      <Grid container spacing={4} justifyContent="center" alignItems="center">
        <Grid item xs={12} sm={4}>
          <OverviewCard
            title="Total Loans"
            value="200,913"
            percentage={-6}
            icon={<CheckCircleIcon />}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <OverviewCard
            title="Pending"
            value="1,290"
            percentage={12}
            icon={<PendingActionsIcon />}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <OverviewCard
            title="Rejected"
            value="102"
            percentage={-3}
            icon={<CancelIcon />}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <OverviewCard
            title="Returned"
            value="102"
            percentage={-3}
            icon={<KeyboardReturnIcon />}
          />
        </Grid>
      </Grid>

      <Grid container spacing={3} justifyContent="center" alignItems="center">
        <Grid item xs={12} sm={8}>
          <BarChart />
        </Grid>
        <Grid item xs={12} sm={4}>
          {/* <LiveShipmentTracking /> */}
          <FulfillmentTime/>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
