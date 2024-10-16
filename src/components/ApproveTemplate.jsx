import React, { useState } from 'react';
import { Box, List, ListItem, ListItemText, Typography, Paper, Button } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Refresh as RefreshIcon } from '@mui/icons-material'; // Import refresh icon
import { MenuItem, Select, FormControl, InputLabel } from '@mui/material'; // Import necessary components


// Assuming the drawer is 240px wide when open
const drawerWidth = 240;

const templateData = [
  { id: 1, fieldName: 'LoanNumber', dataType: 'String', isRequired: true, isUnique: false, isEditable: false, minValue: '', maxValue: '', dataFormat: '' },
  { id: 2, fieldName: 'SellerLoanNumber', dataType: 'String', isRequired: true, isUnique: false, isEditable: false, minValue: '', maxValue: '', dataFormat: '' },
  { id: 3, fieldName: 'Borrower1FirstName', dataType: 'String', isRequired: true, isUnique: false, isEditable: false, minValue: '', maxValue: '', dataFormat: '' },
  { id: 4, fieldName: 'Borrower1LastName', dataType: 'String', isRequired: true, isUnique: false, isEditable: false, minValue: '', maxValue: '', dataFormat: '' },
  { id: 5, fieldName: 'Borrower2FirstName', dataType: 'String', isRequired: true, isUnique: false, isEditable: false, minValue: '', maxValue: '', dataFormat: '' },
  { id: 6, fieldName: 'Borrower2LastName', dataType: 'String', isRequired: true, isUnique: false, isEditable: false, minValue: '', maxValue: '', dataFormat: '' },
];

const templates = [{ id: 1, templateName: "Template1", status: "Approved" },
{ id: 2, templateName: "Template 2", status: "Pending" },
{ id: 3, templateName: "Template 3", status: "Pending" }];

const ApproveTemplate = ({ isDrawerOpen }) => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const handleLoanClick = (template) => {
    setSelectedTemplate(template);
  };

  const [filterStatus, setFilterStatus] = useState('All'); // State to track the selected filter

  const handleFilterChange = (event) => {
    setFilterStatus(event.target.value);
  };


  // Filter the loans based on the selected status
  const filteredTemplates = filterStatus === 'All' ? templates : templates.filter((template) => template.status === filterStatus);


  // Define the columns for the DataGrid
  const columns = [
    { field: 'fieldName', headerName: 'Field Name', width: 250 },
    { field: 'dataType', headerName: 'Data Type', width: 150 },
    { field: 'isRequired', headerName: 'Is Required', width: 120 },
    { field: 'isEditable', headerName: 'Is Editable', width: 120 },
    { field: 'minValue', headerName: 'Min Value/Length', width: 200 },
    { field: 'maxValue', headerName: 'Max Value/Length', width: 200 },
    { field: 'dataFormat', headerName: 'Data Format', width: 200 },
  ];

  // Map the selected loan attributes to rows for the DataGrid
  // const rows = selectedTemplate
  //   ? [
  //     { id: 1, templateName: 'Template1' },
  //     { id: 2, templateName: 'Template2' },
  //     { id: 3, templateName: 'Template3' },
  //   ]
  //   : [];

  const rows = templateData;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        padding: 2,
        height: { xs: 'auto', md: '90vh' },
        // Add margin-left based on the drawer state
        ml: isDrawerOpen ? `${drawerWidth}px` : '0',
        transition: 'margin-left 0.3s ease', // Smooth transition when drawer opens/closes
      }}
    >
      {/* Left panel - Loan list */}
      <Paper
        elevation={3}
        sx={{
          width: { xs: '100%', md: '20%' },
          padding: 2,
          marginLeft: { xs: 0, md: 3 },
          marginRight: { md: 2 },
          marginBottom: { xs: 2, md: 0 },
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" gutterBottom>
            Template List
          </Typography>
          <Button
            variant="outlined"
            startIcon={<RefreshIcon />}
            onClick={() => {
              // Your refresh logic here
              console.log('Refresh button clicked');
              // You can fetch new templates here, for example
            }}
          >
            Refresh
          </Button>
        </Box>

        {/* Filter Control */}
        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={filterStatus}
            label="Status"
            onChange={handleFilterChange}
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Approved">Approved</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Rejected">Rejected</MenuItem>
          </Select>
        </FormControl>

        <List>
          {templates.map((template) => (
            <ListItem
              button
              key={template.id}
              onClick={() => handleLoanClick(template)}
              selected={selectedTemplate?.id === template.id}
              sx={{
                backgroundColor: selectedTemplate?.id === template.id ? 'lightblue' : 'inherit',
                '&:hover': {
                  backgroundColor: selectedTemplate?.id === template.id ? 'lightblue' : 'rgba(0, 0, 0, 0.04)',
                },
              }}
            >
              <ListItemText primary={template.templateName} />
            </ListItem>
          ))}
        </List>
      </Paper>

      {/* Right panel - Loan details */}
      <Paper elevation={3}
        sx={{
          width: { xs: '100%', md: '80%' },
          padding: 2,
          height: { xs: 'auto' }, // Responsive height for different screen sizes
          overflowY: 'auto', // Scroll for overflow content
        }}
      >
        <Typography variant="h6" gutterBottom>
          Template Details
        </Typography>

        {!selectedTemplate ? (
          <Typography variant="body1">Select a template to view its details</Typography>
        ) : (
          <Box
            sx={{
              height: { xs: '300px', md: 'calc(100% - 100px)' }, // Responsive height for the DataGrid
              overflowY: 'auto',
            }}
          >
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={5}
              slots={{
                toolbar: GridToolbar,
              }}
              rowsPerPageOptions={[5]}
              disableSelectionOnClick
            />
          </Box>
        )}

        {/* Buttons below the DataGrid */}
        {selectedTemplate && (
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
            <Button
              variant="contained"
              color="primary"
              disabled={selectedTemplate.status === 'Approved'}
              sx={{
                backgroundColor: selectedTemplate.status === 'Approved' ? 'gray' : 'primary.main',
                opacity: selectedTemplate.status === 'Approved' ? 0.5 : 1,
              }}
            >
              {selectedTemplate.status === 'Approved' ? 'Template Approved' : 'Approve Template'}
            </Button>
            <Button
              variant="contained"
              color="error"
              disabled={selectedTemplate.status === 'Rejected'}
              sx={{
                backgroundColor: selectedTemplate.status === 'Rejected' ? 'gray' : 'error.main',
                opacity: selectedTemplate.status === 'Rejected' ? 0.5 : 1,
              }}
            >
              {selectedTemplate.status === 'Rejected' ? 'Template Rejected' : 'Reject Template'}
            </Button>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default ApproveTemplate;
