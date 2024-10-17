import React, { useState } from 'react';
import { Box, List, ListItem, ListItemText, Typography, Paper, Button, IconButton, Dialog, AppBar, Toolbar, TextField, InputAdornment, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { DataGrid, GridRowModes, GridToolbar, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport, GridToolbarFilterButton } from '@mui/x-data-grid';
import VisibilityIcon from '@mui/icons-material/Visibility'; // Eye icon to view details
import FlagIcon from '@mui/icons-material/Flag'; // Flag icon
import CloseIcon from '@mui/icons-material/Close'; // Close icon
import { Refresh as RefreshIcon } from '@mui/icons-material';
import Slide from '@mui/material/Slide';
import {
  randomId,
} from '@mui/x-data-grid-generator';
import SearchIcon from '@mui/icons-material/Search'; // Import search icon
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'; // Import LocalizationProvider
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import ReviewFormModal from './ReviewFormModal';

// Assuming the drawer is 240px wide when open
const drawerWidth = 240;

const templateData = [
  { id: 1, fieldName: 'LoanNumber', dataType: 'String', isRequired: true, isEditable: false, minValue: '', maxValue: '', dataFormat: '' },
  { id: 2, fieldName: 'SellerLoanNumber', dataType: 'String', isRequired: true, isEditable: false, minValue: '', maxValue: '', dataFormat: '' },
  { id: 3, fieldName: 'Borrower1FirstName', dataType: 'String', isRequired: true, isEditable: false, minValue: '', maxValue: '', dataFormat: '' },
  { id: 4, fieldName: 'Borrower1LastName', dataType: 'String', isRequired: true, isEditable: false, minValue: '', maxValue: '', dataFormat: '' },
  { id: 5, fieldName: 'Borrower2FirstName', dataType: 'String', isRequired: true, isEditable: false, minValue: '', maxValue: '', dataFormat: '' },
  { id: 6, fieldName: 'Borrower2LastName', dataType: 'String', isRequired: true, isEditable: false, minValue: '', maxValue: '', dataFormat: '' },
  { id: 7, fieldName: 'HaveLoan', dataType: 'String', isRequired: true, isEditable: false, minValue: '', maxValue: '', dataFormat: '' },
  { id: 8, fieldName: 'DOB', dataType: 'Date', isRequired: true, isEditable: false, minValue: '', maxValue: '', dataFormat: '' },
];

const templates = [
  { id: 1, templateName: "Template1", status: "Approved" },
  { id: 2, templateName: "Template 2", status: "Pending" },
  { id: 3, templateName: "Template 3", status: "Pending" }
];

// Data
const fields = [
  {
    label: 'Enter Text',
    type: 'text',
    value: '',
    fieldName: 'textValue',
  },
  {
    label: 'Select Date',
    type: 'date',
    value: null,
    fieldName: 'dateValue',
  },
  {
    label: 'Enter Amount',
    type: 'text',
    value: '',
    fieldName: 'currencyValue',
  },
  {
    label: 'Additional Field',
    type: 'text',
    value: '',
    fieldName: 'additionalField',
  },
];

const notesHistory = [
  {
    date: 'Apr 27',
    avatar: 'path_to_avatar_1.png',
    user: 'CUser 1',
    task: 'Prepare questionnaire',
    time: '11:43 am',
  },
  {
    date: 'Apr 27',
    avatar: 'path_to_avatar_2.png',
    user: 'CUser 2',
    task: 'Heuristic evaluation',
    time: '11:43 am',
  },
  {
    date: 'Apr 27',
    avatar: 'path_to_avatar_3.png',
    user: 'CUser 3',
    task: 'Create Wireframes',
    time: '9:20 am',
  },
  {
    date: 'Apr 24',
    avatar: 'path_to_avatar_4.png',
    user: 'AUser 4',
    task: 'Design a database',
    time: '5:31 pm',
  },
  {
    date: 'Apr 24',
    avatar: 'path_to_avatar_5.png',
    user: 'AUser 4',
    task: 'Home page design',
    time: '12:03 pm',
  },
];

// Slide transition for opening the modal
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ManageLoans = ({ isDrawerOpen }) => {

  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [modalOpen, setModalOpen] = useState(false); // Modal state for loan details
  const [selectedRow, setSelectedRow] = useState(null); // Store the selected row
  const [gridRows, setGridRows] = React.useState(templateData);
  const [rowModesModel, setRowModesModel] = React.useState({});
  const [searchTerm, setSearchTerm] = useState(''); // State to track the search term

  const [flagStatus, setFlagStatus] = useState(''); // State to track selected flag status


  const handleReset = () => {
    console.log('Form Reset');
  };
  
  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleModalSubmit = () => {
    console.log('Form Submitted');
    handleCloseModal(); // Optionally close the modal on submit
  };

  const handleModalCancel = () => {
    console.log('Form Canceled');
    handleCloseModal(); // Optionally close the modal on cancel
  };
  
  const handleFlagChange = (event) => {
    setFlagStatus(event.target.value);
  };

  const handleLoanClick = (template) => {
    setSelectedTemplate(template);
  };


  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Handle opening the modal with the selected loan details
  const handleViewClick = (row) => {
    setSelectedRow(row);
    setModalOpen(true);
  };

  // Handle closing the modal
  const handleModalClose = () => {
    setModalOpen(false);
  };

  // Filter the templates based on the search term
  const filteredTemplates = templates.filter((template) =>
    template.templateName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Define the columns for the DataGrid
  const columns = [
    { field: 'fieldName', headerName: 'Field Name', width: 250 },
    { field: 'dataType', headerName: 'Data Type', width: 150 },
    { field: 'isRequired', headerName: 'Is Required', width: 120 },
    { field: 'isEditable', headerName: 'Is Editable', width: 120 },
    { field: 'minValue', headerName: 'Min Value/Length', width: 200 },
    { field: 'maxValue', headerName: 'Max Value/Length', width: 200 },
    { field: 'dataFormat', headerName: 'Data Format', width: 200 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 100,
      renderCell: (params) => (
        <IconButton color="primary" onClick={() => handleViewClick(params.row)}>
          <VisibilityIcon />
        </IconButton>
      ),
    },
  ];

  const CustomToolbar = (props) => {

    const { setRows, setRowModesModel } = props;

    const handleAddClick = () => {
      const id = randomId();
      setRows((oldRows) => [
        ...oldRows,
        { id, firstName: '', lastName: '', fullName: '', age: '' },
      ]);
      setRowModesModel((oldModel) => ({
        ...oldModel,
        [id]: { mode: GridRowModes.Edit, fieldToFocus: 'firstName' },
      }));
    };

    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector
          slotProps={{ tooltip: { title: 'Change density' } }}
        />
        <GridToolbarExport
          slotProps={{
            tooltip: { title: 'Export data' },
            button: { variant: 'outlined' },
          }}
        />
        <Box sx={{ flexGrow: 1 }} />
        <Button variant="contained" color="primary" sx={{ marginRight: 1 }} onClick={handleAddClick}>
          Add Row
        </Button>
        <Button
          variant="contained"
          color="secondary"
          sx={{ marginRight: 1 }}
          onClick={() => {
            document.querySelector('[data-testid="Export CSV"]').click();
          }}
        >
          Export Data
        </Button>
        <Button variant="outlined" color="info">
          Refresh
        </Button>
      </GridToolbarContainer>
    );
  };

  const renderField = (field) => {
    return (
      <Box
        key={field.id}
        sx={{
          display: 'flex',
          alignItems: 'center',
          mb: 2,
          width: '100%', // Make sure the entire row takes up full width
        }}
      >
        {/* Main input field based on data type */}
        {(() => {
          switch (field.dataType) {
            case 'String':
              return (
                <TextField
                  label={field.fieldName}
                  variant="outlined"
                  value={selectedRow ? selectedRow[field.fieldName] : ''}
                  sx={{ flex: 1, marginRight: 2, minWidth: 250 }}
                  disabled={!field.isEditable}
                />
              );
            case 'Float':
            case 'Integer':
              return (
                <TextField
                  label={field.fieldName}
                  variant="outlined"
                  value={selectedRow ? selectedRow[field.fieldName] : ''}
                  type="number"
                  sx={{ flex: 1, marginRight: 2, minWidth: 250 }}
                  disabled={!field.isEditable}
                  inputProps={{
                    min: field.minValue,
                    max: field.maxValue,
                  }}
                />
              );
            case 'Date':
              return (
                <Box sx={{ flex: 1, marginRight: 2, minWidth: 250 }}>
                  <DatePicker
                    label={field.fieldName}
                    value={selectedRow ? selectedRow[field.fieldName] : null}
                    onChange={() => { }} // Handle date change
                    renderInput={(params) => (
                      <TextField {...params} fullWidth variant="outlined" />
                    )}
                  />
                </Box>
              );
            default:
              return null;
          }
        })()}

        {/* Reviewer Notes */}
        {/* <TextField
          label="Reviewer Notes"
          variant="outlined"
          fullWidth
          sx={{ flex: 1, marginRight: 2, minWidth: 250 }}
        /> */}

        {/* Flag Icon */}
        <IconButton color="warning" sx={{ marginLeft: 1 }}>
          <FlagIcon />
        </IconButton>
        {/* Comments */}
        <TextField
          label="Comments"
          variant="outlined"
          fullWidth
          sx={{ flex: 1, minWidth: 250 }}
        />

         {/* Flag Status Dropdown */}
      <FormControl variant="outlined" sx={{ minWidth: 150, marginLeft: 1 }}>
        <InputLabel>Flag Status</InputLabel>
        <Select
          value={flagStatus}
          onChange={handleFlagChange}
          label="Flag Status"
        >
          <MenuItem value=""><em>None</em></MenuItem>
          <MenuItem value="Flagged">Flagged</MenuItem>
          <MenuItem value="Unflagged">Unflagged</MenuItem>
        </Select>
      </FormControl>


      </Box>
    );
  };


  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          padding: 2,
          height: { xs: 'auto', md: '90vh' },
          ml: isDrawerOpen ? `${drawerWidth}px` : '0',
          transition: 'margin-left 0.3s ease', // Smooth transition when drawer opens/closes
        }}
      >
        {/* Left panel - Template list */}
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
                console.log('Refresh button clicked');
                // You can fetch new templates here, for example
              }}
            >
              Refresh
            </Button>
          </Box>

          {/* Search Field */}
          <TextField
            label="Search Templates"
            variant="outlined"
            fullWidth
            sx={{ mt: 2 }}
            value={searchTerm}
            onChange={handleSearchChange}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }
            }}
          />
          <List>
            {filteredTemplates.map((template) => (
              <ListItem
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

        {/* Right panel - DataGrid */}
        <Paper
          elevation={3}
          sx={{
            width: { xs: '100%', md: '80%' },
            padding: 2,
            height: { xs: 'auto' }, // Responsive height for different screen sizes
            overflowY: 'auto', // Scroll for overflow content
          }}
        >
          <Typography variant="h6" gutterBottom>
            Loan Details
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
                rows={templateData}
                columns={columns}
                pageSize={5}
                slots={{
                  toolbar: CustomToolbar,
                }}
                slotProps={{
                  toolbar: { setGridRows, setRowModesModel },
                }}
                // initialState={{
                //   pagination: {
                //     paginationModel: {
                //       pageSize: 5,
                //     },
                //   },
                // }}
                rowsPerPageOptions={[5]}
                disableSelectionOnClick
              />
            </Box>
          )}
        </Paper>

        
      </Box>

      <ReviewFormModal
        open={modalOpen}
        onClose={handleCloseModal}
        jsonFields={fields}
        notesHistory={notesHistory}
        onSubmit={handleModalSubmit}
        onReset={handleReset}
        onCancel={handleModalCancel}
      />
    </LocalizationProvider>
  );
};

export default ManageLoans;
