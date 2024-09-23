import React, { useState } from 'react';
import { Box, List, ListItem, ListItemText, Typography, Paper, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const loans = [
  { id: 1, name: 'Loan A', amount: '50000', term: '12 months', interestRate: '5%', status: 'Approved' },
  { id: 2, name: 'Loan B', amount: '75000', term: '24 months', interestRate: '6%', status: 'Pending' },
  { id: 3, name: 'Loan C', amount: '100000', term: '36 months', interestRate: '4.5%', status: 'Rejected' },
  { id: 4, name: 'Loan D', amount: '250000', term: '60 months', interestRate: '3.8%', status: 'Approved' },
];

const LoanScreen = () => {
  const [selectedLoan, setSelectedLoan] = useState(null);

  const handleLoanClick = (loan) => {
    setSelectedLoan(loan);
  };

  // Define the columns for the DataGrid
  const columns = [
    { field: 'field', headerName: 'Field', width: 150 },
    { field: 'value', headerName: 'Value', width: 200 },
  ];

  // Map the selected loan attributes to rows for the DataGrid
  const rows = selectedLoan
    ? [
        { id: 1, field: 'Amount', value: selectedLoan.amount },
        { id: 2, field: 'Term', value: selectedLoan.term },
        { id: 3, field: 'Interest Rate', value: selectedLoan.interestRate },
        { id: 4, field: 'Status', value: selectedLoan.status },
      ]
    : [];

  return (
    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, padding: 2 }}>
      {/* Left panel - Loan list */}
      <Paper
        elevation={3}
        sx={{
          width: { xs: '100%', md: '30%' },
          padding: 2,
          marginRight: { md: 2 },
          marginBottom: { xs: 2, md: 0 },
        }}
      >
        <Typography variant="h6" gutterBottom>
          Loan List
        </Typography>
        <List>
          {loans.map((loan) => (
            <ListItem
              button
              key={loan.id}
              onClick={() => handleLoanClick(loan)}
              selected={selectedLoan?.id === loan.id}
            >
              <ListItemText primary={loan.name} />
            </ListItem>
          ))}
        </List>
      </Paper>

      {/* Right panel - Loan details */}
      <Paper elevation={3} sx={{ width: { xs: '100%', md: '70%' }, padding: 2 }}>
        <Typography variant="h6" gutterBottom>
          Loan Details
        </Typography>

        {!selectedLoan ? (
          <Typography variant="body1">Select a loan to view its details</Typography>
        ) : (
          <Box sx={{ height: 300 }}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              disableSelectionOnClick
            />
          </Box>
        )}

        {/* Buttons below the DataGrid */}
        {selectedLoan && (
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
            <Button variant="contained" color="primary">
              Approve Loan
            </Button>
            <Button variant="contained" color="error">
              Reject Loan
            </Button>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default LoanScreen;
