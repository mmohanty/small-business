import React from 'react';
import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2'; // Importing Grid2 from Unstable_Grid2
import OverviewCard from './OverviewCard';
import BarChart from './BarChart';
import FulfillmentTime from './FulfillmentTime';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const Dashboard = () => {
  return (
    <Box
      sx={{
        minHeight: '70vh', // Minimum height for flexibility
        display: 'flex',
        justifyContent: 'center', // Horizontally center
        alignItems: 'center', // Vertically center
        flexDirection: 'column', // Items stack vertically
        gap: 3, // Gap between items
        padding: 3,
        marginTop: 2
      }}
    >
      <Typography variant="h5" gutterBottom>
        Overview
      </Typography>
      <Grid container spacing={4} justifyContent="center" alignItems="center">
        <Grid item xs={12} sm={6} md={3}>
          <OverviewCard
            title="Total Loans"
            value="200,913"
            percentage={-6}
            icon={<CheckCircleIcon />}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <OverviewCard
            title="Pending"
            value="1,290"
            percentage={12}
            icon={<PendingActionsIcon />}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <OverviewCard
            title="Rejected"
            value="102"
            percentage={-3}
            icon={<CancelIcon />}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <OverviewCard
            title="Returned"
            value="102"
            percentage={-3}
            icon={<KeyboardReturnIcon />}
          />
        </Grid>
      </Grid>

      <Grid container spacing={3} justifyContent="center" alignItems="center">
        {/* Ensure both items take full width on small screens */}
        <Grid item xs={12} md={6}>
          <BarChart />
        </Grid>
        <Grid item xs={12} md={6}>
          <FulfillmentTime />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
