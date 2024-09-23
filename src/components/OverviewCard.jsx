import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

const OverviewCard = ({ title, value, percentage, icon, color }) => {
  return (
    <Card sx={{ minWidth: 300, padding: 2 }}>
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="body2" color="textSecondary">
            {title}
          </Typography>
          {icon}
        </Box>
        <Typography variant="h4" component="div">
          {value}
        </Typography>
        <Box display="flex" alignItems="center" mt={1}>
          <Typography
            variant="body2"
            color={percentage > 0 ? 'green' : 'red'}
            sx={{ marginRight: 1 }}
          >
            {percentage > 0 ? `+${percentage}%` : `${percentage}%`}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            vs last month
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default OverviewCard;
