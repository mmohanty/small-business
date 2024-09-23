import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Box, Typography } from '@mui/material';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from "chart.js";

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  
const BarChart = () => {
    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'Processed',
                data: [1000, 2000, 3000, 4000, 3500, 4500, 4000, 3000, 2500, 4000, 3500, 4200],
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: false,
            },
        },
    };

    return (
        <Box sx={{ minWidth: 800, padding: 2 }}>
            <Typography variant="h6" gutterBottom>
                Avg. Monthly Processed Loans
            </Typography>
            <Bar data={data} options={options} />
        </Box>

    );
};

export default BarChart;
