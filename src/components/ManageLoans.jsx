import React, { useState } from 'react';
import { Box, List, ListItem, ListItemText, Typography, Paper, Button, IconButton, Dialog, AppBar, Toolbar, TextField, InputAdornment, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { DataGrid, GridRowModes, GridToolbar, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport, GridToolbarFilterButton } from '@mui/x-data-grid';
import VisibilityIcon from '@mui/icons-material/Visibility'; // Eye icon to view details
import { Refresh as RefreshIcon } from '@mui/icons-material';
import Slide from '@mui/material/Slide';
import {
  randomId,
} from '@mui/x-data-grid-generator';
import SearchIcon from '@mui/icons-material/Search'; // Import search icon
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'; // Import LocalizationProvider
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import ReviewFormModal from './ReviewFormModal';
import { useBackdrop } from './BackdropProvider';

// Assuming the drawer is 240px wide when open
const drawerWidth = 240;

const templateData = [
  { id: 1, fieldName: 'LoanNumber', dataType: 'String', isRequired: true, isEditable: false, minValue: '', maxValue: '', dataFormat: '' },
  { id: 2, fieldName: 'SellerLoanNumber', dataType: 'Currency', isRequired: true, isEditable: false, minValue: '', maxValue: '', dataFormat: '' },
  { id: 3, fieldName: 'Borrower1FirstName', dataType: 'String', isRequired: true, isEditable: false, minValue: '', maxValue: '', dataFormat: '' },
  { id: 4, fieldName: 'Borrower1LastName', dataType: 'String', isRequired: true, isEditable: false, minValue: '', maxValue: '', dataFormat: '' },
  { id: 5, fieldName: 'Borrower2FirstName', dataType: 'String', isRequired: true, isEditable: false, minValue: '', maxValue: '', dataFormat: '' },
  { id: 6, fieldName: 'Borrower2LastName', dataType: 'String', isRequired: true, isEditable: false, minValue: '', maxValue: '', dataFormat: '' },
  { id: 7, fieldName: 'HaveLoan', dataType: 'String', isRequired: true, isEditable: false, minValue: '', maxValue: '', dataFormat: '' },
  { id: 8, fieldName: 'DOB', dataType: 'Date', isRequired: true, isEditable: false, minValue: '', maxValue: '', dataFormat: '' },
];


const gridData = [
  { id: 1, LoanNumber: '123', SellerLoanNumber: '123', Borrower1FirstName: "Bob1", Borrower1LastName: "Smith", Borrower2FirstName: "Bob1", Borrower2LastName: "Smith", HaveLoan: "Yes", DOB: "2022-01-01" },
  { id: 2, LoanNumber: '345', SellerLoanNumber: '123', Borrower1FirstName: "Bob1", Borrower1LastName: "Smith", Borrower2FirstName: "Bob1", Borrower2LastName: "Smith", HaveLoan: "Yes", DOB: "2022-01-01"  },
  { id: 3, LoanNumber: '456', SellerLoanNumber: '123', Borrower1FirstName: "Bob1", Borrower1LastName: "Smith", Borrower2FirstName: "Bob1", Borrower2LastName: "Smith", HaveLoan: "Yes", DOB: "2022-01-01"  },
  { id: 4, LoanNumber: '124', SellerLoanNumber: '123', Borrower1FirstName: "Bob1", Borrower1LastName: "Smith", Borrower2FirstName: "Bob1", Borrower2LastName: "Smith", HaveLoan: "Yes", DOB: "2022-01-01"  },
  { id: 5, LoanNumber: '432', SellerLoanNumber: '123', Borrower1FirstName: "Bob1", Borrower1LastName: "Smith", Borrower2FirstName: "Bob1", Borrower2LastName: "Smith", HaveLoan: "Yes", DOB: "2022-01-01"  },
  { id: 6, LoanNumber: '346', SellerLoanNumber: '123', Borrower1FirstName: "Bob1", Borrower1LastName: "Smith", Borrower2FirstName: "Bob1", Borrower2LastName: "Smith", HaveLoan: "Yes", DOB: "2022-01-01"  },
  { id: 7, LoanNumber: '790', SellerLoanNumber: '123', Borrower1FirstName: "Bob1", Borrower1LastName: "Smith", Borrower2FirstName: "Bob1", Borrower2LastName: "Smith", HaveLoan: "Yes", DOB: "2022-01-01"  },
  { id: 8, LoanNumber: '987', SellerLoanNumber: '123', Borrower1FirstName: "Bob1", Borrower1LastName: "Smith", Borrower2FirstName: "Bob1", Borrower2LastName: "Smith", HaveLoan: "Yes", DOB: "2022-01-01"  },
];


const templates = [
  { id: 1, templateName: "Template1", status: "Approved" },
  { id: 2, templateName: "Template 2", status: "Pending" },
  { id: 3, templateName: "Template 3", status: "Pending" }
];

const flagStatus = {
  Borrower1FirstName: true,
  Borrower1LastName: false,
  Borrower2FirstName: true,
  Borrower2LastName: false,
  HaveLoan: false,
  DOB: true,
};

const notesHistory = {"Borrower1FirstName":[
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
],
"Borrower2FirstName":[
  {
    date: 'Apr 28',
    avatar: 'path_to_avatar_1.png',
    user: 'CUser 1',
    task: 'Prepare questionnaire',
    time: '11:43 am',
  },
  {
    date: 'Apr 28',
    avatar: 'path_to_avatar_2.png',
    user: 'CUser 2',
    task: 'Heuristic evaluation',
    time: '11:43 am',
  },
  {
    date: 'Apr 28',
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
]};

// Slide transition for opening the modal
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ManageLoans = ({ isDrawerOpen }) => {

  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [gridColumns, setGridColumnValue] = useState(null);
  const [modalOpen, setModalOpen] = useState(false); // Modal state for loan details
  const [selectedRow, setSelectedRow] = useState(null); // Store the selected row
  const [gridRows, setGridRows] = React.useState(templateData);
  const [rowModesModel, setRowModesModel] = React.useState({});
  const [searchTerm, setSearchTerm] = useState(''); // State to track the search term

  const [flagStatus, setFlagStatus] = useState(''); // State to track selected flag status
  const { showBackdrop, hideBackdrop } = useBackdrop(); 


  const handleReset = () => {
    console.log('Form Reset');

   

  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const lowerFirstLetter = (str) => {
    return str.charAt(0).toLowerCase() + str.slice(1);
  };

  const prepareGridColumns = () => {
    const columns = templateData.map((column) => {
      const { id, fieldName, dataType, isRequired, isUnique, isEditable, minValue, maxValue, dataFormat} = column;
      return {
        field: fieldName, 
        headerName: fieldName,
        //type: dataType,
        //editable: isEditable,
        flex: 1
        
      };
    });
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
    setGridColumnValue(columns);
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
  
  const handleLoanClick = (template) => {
    setSelectedTemplate(template);
    prepareGridColumns();
  };


  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Handle opening the modal with the selected loan details
  const handleViewClick = (row) => {
    console.log(row);
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


  const CustomToolbar = (props) => {

    const { setRows, setRowModesModel } = props;

    const handleAddClick = () => {
      // const id = randomId();
      // setRows((oldRows) => [
      //   ...oldRows,
      //   { id, firstName: '', lastName: '', fullName: '', age: '' },
      // ]);
      // setRowModesModel((oldModel) => ({
      //   ...oldModel,
      //   [id]: { mode: GridRowModes.Edit, fieldToFocus: 'firstName' },
      // }));

      showBackdrop('Loading...');

      // Simulate an async operation, then hide the backdrop
      setTimeout(() => {
        hideBackdrop();
      }, 3000); // Hide the Backdrop after 3 seconds
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
                rows={gridData}
                columns={gridColumns}
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

       {/* Pass selected row data to ReviewFormModal */}
       {selectedRow && (
                    <ReviewFormModal
                        open={modalOpen}
                        onClose={handleModalClose}
                        jsonFields={templateData || []} // Template data or jsonFields for dynamic form
                        selectedRow={selectedRow}  // Pass the selected row data
                        onSubmit={() => console.log("Submitted")}
                        onReset={() => console.log("Reset")}
                        onCancel={handleModalClose}
                        notesHistoryDetails={notesHistory}
                    />
                )}
    </LocalizationProvider>
  );
};

export default ManageLoans;
