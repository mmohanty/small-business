import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, List, ListItem, ListItemText, Typography, Paper, Button, IconButton, TextField, InputAdornment, Grid, Dialog, DialogTitle, DialogContent, DialogActions, Tooltip } from '@mui/material';
import { DataGrid, GridToolbarContainer, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarDensitySelector, GridToolbarExport } from '@mui/x-data-grid';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Comment, Flag, FlagOutlined, History, Refresh as RefreshIcon } from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useBackdrop } from './BackdropProvider';
import { saveAs } from 'file-saver';
const drawerWidth = 240;

const ManageLoans = ({ isDrawerOpen }) => {
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [gridColumns, setGridColumns] = useState([]);
  const [gridData, setGridData] = useState([]);
  const [loanModalOpen, setLoanModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const { showBackdrop, hideBackdrop } = useBackdrop();

  const [fieldComments, setFieldComments] = useState({}); // To store comments for each field
  const [fieldFlags, setFieldFlags] = useState({}); // To store flagged status for each field
  const [notesModalOpen, setNotesModalOpen] = useState(false); // To show notes history
  const [selectedFieldNotes, setSelectedFieldNotes] = useState([]); // Stores notes for a field
  const [createClicked, setCreateClicked] = useState(false); // Stores event to decide modal behaviour
  const [fieldValues, setFieldValues] = useState({}); // Store values for each field

  const fetchTemplateData = async () => {
    const url2 = 'https://dummyjson.com/c/91bc-f393-4ffe-bbc0';
    try {
      const response = await axios.get(url2);
      setTemplates(response.data);
    } catch (error) {
      console.error('Error fetching template data:', error);
    }
  };

  useEffect(() => {
    fetchTemplateData();
  }, []);

  const handleFlagToggle = (field) => {
    setFieldFlags((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleAddComment = (field, comment) => {
    setFieldComments((prev) => ({
      ...prev,
      [field]: [
        ...(prev[field] || []),
        { userType: "User", note: comment, timestamp: new Date().toLocaleString() },
      ],
    }));
  };

  const handleViewNotes = (field) => {
    setSelectedFieldNotes(fieldComments[field] || []);
    setNotesModalOpen(true);
  };
  const fetchLoanData = async () => {
    const url1 = 'https://dummyjson.com/c/cefa-1a9d-4b8c-90a9';
    try {
      const response = await axios.get(url1);
      return response.data;
    } catch (error) {
      console.error('Error fetching loan data:', error);
      throw error;
    }
  };

  const handleTemplateSelectClick = async (template) => {
    setSelectedTemplate(template);
    prepareGridColumns(template.fields);

    showBackdrop('Loading data...');
    try {
      const data = await fetchLoanData();
      const processedData = data.data.map((item) => {
        const flatAttributes = Object.entries(item.attributes).reduce((acc, [key, attr]) => {
          acc[key] = attr?.value || null;
          acc[`${key}_flagged`] = attr?.flagged || false;
          acc[`${key}_comments`] = attr?.comments || [];
          return acc;
        }, {});

        return { id: item.id, status: item.status, ...flatAttributes };
      });

      setGridData(processedData);
    } catch (error) {
      console.error("Error fetching grid data:", error);
    } finally {
      hideBackdrop();
    }
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
      ),
    });
    setGridColumns(columns);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleViewClick = (row) => {
    setSelectedRow(row);
    setCreateClicked(false);
    setLoanModalOpen(true);
  };

  const handleCreateLoanClick = () => {
    setLoanModalOpen(true);
    setCreateClicked(true);
  };

  const handleLoanModalClose = () => {
    setLoanModalOpen(false);
    setCreateClicked(false);
  };

  const handleLoanSubmit = () => {
    const loanData = {
      ...fieldValues,
      flags: fieldFlags,
      comments: fieldComments,
    };

    // Here, you'd make an API call or perform another action to submit loanData
    console.log("Submitting Loan Data:", loanData);
    setLoanModalOpen(false); // Close modal on submit
  };

  const filteredTemplates = templates.filter((template) =>
    template.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLoanReset = () => {
    if (selectedRow) {
      // Reset to original values from selectedRow for view/edit mode
      setFieldValues(Object.keys(selectedTemplate.fields).reduce((acc, fieldKey) => {
        acc[fieldKey] = selectedRow[fieldKey] || '';
        return acc;
      }, {}));

      setFieldFlags(Object.keys(selectedTemplate.fields).reduce((acc, fieldKey) => {
        acc[fieldKey] = selectedRow[`${fieldKey}_flagged`] || false;
        return acc;
      }, {}));

      setFieldComments(Object.keys(selectedTemplate.fields).reduce((acc, fieldKey) => {
        acc[fieldKey] = selectedRow[`${fieldKey}_comments`] || [];
        return acc;
      }, {}));
    } else {
      // Clear values for creating a new loan
      setFieldValues({});
      setFieldFlags({});
      setFieldComments({});
    }
  };

  const handleFieldChange = (fieldKey, value) => {
    setFieldValues((prev) => ({
      ...prev,
      [fieldKey]: value,
    }));
  };
  const handleDownloadTemplateHeaders = (template) => {
    // Extract field names as headers
    const headers = Object.keys(template.fields);

    // Create CSV content with headers only
    const csvContent = headers.join(',') + '\n';

    // Create a Blob from the CSV content
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

    // Trigger the download of the CSV file
    saveAs(blob, 'sample-loan-template.csv');
  };


  const CustomToolbar = () => (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <GridToolbarExport />
      <Box sx={{ flexGrow: 1 }} />
      <Button variant="contained" color="primary" onClick={handleCreateLoanClick}>
        Create Loan
      </Button>
      <Button
        variant="contained"
        color="secondary"
        sx={{ marginLeft: 1 }}
        onClick={() => document.querySelector('[data-testid="Export CSV"]').click()}
      >
        Export Data
      </Button>
      <Button variant="outlined" color="info">
        Refresh
      </Button>
    </GridToolbarContainer>
  );




  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, padding: 2, height: { xs: 'auto', md: '90vh' }, ml: isDrawerOpen ? `${drawerWidth}px` : '0', transition: 'margin-left 0.3s ease' }}>
        <Paper elevation={3} sx={{ width: { xs: '100%', md: '20%' }, padding: 2, marginLeft: { xs: 0, md: 3 }, marginRight: { md: 2 }, marginBottom: { xs: 2, md: 0 } }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" gutterBottom>Template List</Typography>
            <Button variant="outlined" startIcon={<RefreshIcon />} onClick={fetchTemplateData}>Refresh</Button>
          </Box>

          <TextField
            label="Search Templates"
            variant="outlined"
            fullWidth
            sx={{ mt: 2 }}
            value={searchTerm}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <List>
            {filteredTemplates.map((template) => (
              <ListItem
                key={template.id}
                onClick={() => handleTemplateSelectClick(template)}
                selected={selectedTemplate?.id === template.id}
                sx={{
                  backgroundColor: selectedTemplate?.id === template.id ? 'lightblue' : 'inherit',
                  '&:hover': {
                    backgroundColor: selectedTemplate?.id === template.id ? 'lightblue' : 'rgba(0, 0, 0, 0.04)',
                  },
                }}
              >
                <ListItemText primary={template.name} />
              </ListItem>
            ))}
          </List>
        </Paper>

        <Paper elevation={3} sx={{ width: { xs: '100%', md: '80%' }, padding: 2, height: { xs: 'auto' }, overflowY: 'auto' }}>
          <Typography variant="h6" gutterBottom>Loan Details</Typography>

          {!selectedTemplate ? (
            <Typography variant="body1">Select a template to view its details</Typography>
          ) : (
            <Box sx={{ height: { xs: '300px', md: 'calc(100% - 100px)' }, overflowY: 'auto' }}>
              <DataGrid
                rows={gridData}
                columns={gridColumns}
                pageSize={5}
                slots={{ toolbar: CustomToolbar }}
                disableSelectionOnClick
              />
            </Box>
          )}
        </Paper>
      </Box>

      {/* Create Loan Modal */}
      <Dialog
        open={loanModalOpen}
        onClose={() => handleLoanModalClose()}
        maxWidth="md"
        fullWidth
        sx={{
          '& .MuiDialog-paper': {
            maxHeight: '90vh',       // Cap the height at 90% of the viewport
            overflowY: 'auto'        // Allow scrolling if content exceeds maxHeight
          }
        }}
      >
        <DialogTitle>Loan Details</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            {selectedTemplate && Object.entries(selectedTemplate.fields).map(([fieldKey, fieldData]) => (
              <Grid item xs={12} sm={6} key={fieldKey}>
                <Box display="flex" alignItems="center">
                  <TextField
                    label={fieldKey}
                    value={fieldValues[fieldKey] || ''}
                    disabled={!createClicked && !fieldData.is_editable}
                    onChange={(event) => handleFieldChange(fieldKey, event.target.value)} // Directly pass fieldKey and value
                    type={fieldData.data_type === "Date" ? "date" : "text"}
                    fullWidth
                    variant="outlined"
                    InputLabelProps={fieldData.data_type === "Date" ? { shrink: true } : {}}
                    sx={{ mt: 2 }}
                  />
                  <Box ml={1} display="flex">
                    <Tooltip title="Flag Field">
                      <IconButton onClick={() => handleFlagToggle(fieldKey)}>
                        {fieldFlags[fieldKey] ? <Flag color="error" /> : <FlagOutlined />}
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Add Comment">
                      <IconButton onClick={() => handleAddComment(fieldKey, prompt("Enter comment"))}>
                        <Comment />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="View Notes">
                      <IconButton onClick={() => handleViewNotes(fieldKey)}>
                        <History />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>

        </DialogContent>
        <DialogActions>
          <Button onClick={() => setLoanModalOpen(false)} color="secondary">Cancel</Button>
          <Button onClick={() => handleLoanSubmit()} color="primary">Create Loan</Button>
          <Button onClick={() =>handleLoanReset} color="secondary">Reset</Button>
          <Button onClick={() => handleLoanSubmit()} color="primary">Submit</Button>
        </DialogActions>
      </Dialog>


      {/* Notes Modal */}
      <Dialog open={notesModalOpen} onClose={() => setNotesModalOpen(false)}>
        <DialogTitle>Notes History</DialogTitle>
        <DialogContent>
          {selectedFieldNotes.length > 0 ? (
            selectedFieldNotes.map((note, index) => (
              <Box key={index} sx={{ marginBottom: 2 }}>
                <Typography variant="body2"><strong>User Type:</strong> {note.userType}</Typography>
                <Typography variant="body2"><strong>Timestamp:</strong> {note.timestamp}</Typography>
                <Typography variant="body2"><strong>Note:</strong> {note.note}</Typography>
              </Box>
            ))
          ) : (
            <Typography>No comments found.</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setNotesModalOpen(false)} color="primary">Close</Button>
        </DialogActions>
      </Dialog>

    </LocalizationProvider>
  );
};

export default ManageLoans;
