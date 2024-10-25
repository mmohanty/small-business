import React, { useState, useEffect } from 'react';
import { Box, List, ListItem, ListItemText, Typography, Paper, Button, IconButton, TextField, InputAdornment } from '@mui/material';
import { DataGrid, GridToolbarContainer } from '@mui/x-data-grid';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Refresh as RefreshIcon } from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import ReviewFormModal from './ReviewFormModal';
import { useBackdrop } from './BackdropProvider';

const drawerWidth = 240;

const templates = [
  {
    id: "1",
    name: "Template1",
    fields: {
      LoanNumber: { data_type: "String", min: 1, max: 4, is_required: true, is_editable: false, data_format: "" },
      SellerLoanNumber: { data_type: "Currency", min: 1, max: 4, is_required: true, is_editable: false, data_format: "" },
      Borrower1FirstName: { data_type: "String", min: 1, max: 50, is_required: true, is_editable: false, data_format: "" },
      Borrower1LastName: { data_type: "String", min: 1, max: 50, is_required: true, is_editable: false, data_format: "" },
      Borrower2FirstName: { data_type: "String", min: 1, max: 50, is_required: true, is_editable: false, data_format: "" },
      Borrower2LastName: { data_type: "String", min: 1, max: 50, is_required: true, is_editable: false, data_format: "" },
      HaveLoan: { data_type: "String", min: 1, max: 3, is_required: true, is_editable: false, data_format: "" },
      DOB: { data_type: "Date", min: "", max: "", is_required: true, is_editable: false, data_format: "" }
    }
  }
  // Additional templates here...
];

const rawGridData = [
  { id: 1, LoanNumber: '123', SellerLoanNumber: '123', Borrower1FirstName: "Bob1", Borrower1LastName: "Smith", Borrower2FirstName: "Bob1", Borrower2LastName: "Smith", HaveLoan: "Yes", DOB: "2022-01-01" },
  // Additional rows
];

const ManageLoans = ({ isDrawerOpen }) => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [gridColumns, setGridColumns] = useState([]);
  const [gridData, setGridData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const { showBackdrop, hideBackdrop } = useBackdrop();

  useEffect(() => {
    // Preprocess rawGridData to convert date strings to Date objects
    const processedData = rawGridData.map((row) => ({
      ...row,
      DOB: row.DOB ? new Date(row.DOB) : null, // Convert DOB to Date object if it exists
    }));
    setGridData(processedData);
  }, []);

  const handleTemplateSelectClick = (template) => {
    setSelectedTemplate(template);
    prepareGridColumns(template.fields);
  };

  const prepareGridColumns = (fields) => {
    const columns = Object.entries(fields).map(([fieldName, fieldData]) => ({
      field: fieldName,
      headerName: fieldName,
      type: fieldData.data_type.toLowerCase() === 'date' ? 'date' : fieldData.data_type.toLowerCase(),
      editable: fieldData.is_editable,
      flex: 1,
    }));
    columns.push({
      field: 'actions',
      headerName: 'Actions',
      width: 100,
      renderCell: (params) => (
        <IconButton color="primary" onClick={() => handleViewClick(params.row)}>
          <VisibilityIcon />
        </IconButton>
      )
    });
    setGridColumns(columns);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleViewClick = (row) => {
    setSelectedRow(row);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const filteredTemplates = templates.filter((template) =>
    template.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, padding: 2, height: { xs: 'auto', md: '90vh' }, ml: isDrawerOpen ? `${drawerWidth}px` : '0', transition: 'margin-left 0.3s ease' }}>
        
        <Paper elevation={3} sx={{ width: { xs: '100%', md: '20%' }, padding: 2, marginLeft: { xs: 0, md: 3 }, marginRight: { md: 2 }, marginBottom: { xs: 2, md: 0 } }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" gutterBottom>
              Template List
            </Typography>
            <Button variant="outlined" startIcon={<RefreshIcon />} onClick={() => console.log('Refresh button clicked')}>
              Refresh
            </Button>
          </Box>

          <TextField label="Search Templates" variant="outlined" fullWidth sx={{ mt: 2 }} value={searchTerm} onChange={handleSearchChange} slotProps={{ input: { startAdornment: (<InputAdornment position="start"><SearchIcon /></InputAdornment>) } }} />
          <List>
            {filteredTemplates.map((template) => (
              <ListItem key={template.id} onClick={() => handleTemplateSelectClick(template)} selected={selectedTemplate?.id === template.id} sx={{ backgroundColor: selectedTemplate?.id === template.id ? 'lightblue' : 'inherit', '&:hover': { backgroundColor: selectedTemplate?.id === template.id ? 'lightblue' : 'rgba(0, 0, 0, 0.04)' } }}>
                <ListItemText primary={template.name} />
              </ListItem>
            ))}
          </List>
        </Paper>

        <Paper elevation={3} sx={{ width: { xs: '100%', md: '80%' }, padding: 2, height: { xs: 'auto' }, overflowY: 'auto' }}>
          <Typography variant="h6" gutterBottom>
            Loan Details
          </Typography>

          {!selectedTemplate ? (
            <Typography variant="body1">Select a template to view its details</Typography>
          ) : (
            <Box sx={{ height: { xs: '300px', md: 'calc(100% - 100px)' }, overflowY: 'auto' }}>
              <DataGrid
                rows={gridData}
                columns={gridColumns}
                pageSize={5}
                slots={{ toolbar: GridToolbarContainer }}
                disableSelectionOnClick
              />
            </Box>
          )}
        </Paper>
      </Box>

      {selectedRow && (
        <ReviewFormModal
          open={modalOpen}
          onClose={handleModalClose}
          jsonFields={selectedTemplate.fields}
          selectedRow={selectedRow}
          onSubmit={() => console.log("Submitted")}
          onReset={() => console.log("Reset")}
          onCancel={handleModalClose}
        />
      )}
    </LocalizationProvider>
  );
};

export default ManageLoans;
