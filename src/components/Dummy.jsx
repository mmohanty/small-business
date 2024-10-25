import React, { useState } from 'react';
import { TextField, MenuItem, FormControl, Select, InputLabel, Box, IconButton, InputAdornment, Menu } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';

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

const templates2 = [
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
    },
    {
      id: "2",
      name: "Template2",
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

const TemplateSelect = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [templateData, setTemplateData] = useState(templates);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSearchTerm(''); // Clear search term on close
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSelectChange = (event) => {
    setSelectedTemplate(event.target.value);
    handleClose(); // Close the dropdown after selecting an option
  };

  const handleRefresh = () => {
    console.log("Data reloaded");
    setTemplateData([...templates2]); // Replace with actual data reload logic
  };

  // Filter templates based on search term
  const filteredTemplates = templateData.filter(template =>
    template.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ minWidth: 240 }}>
      <FormControl variant="outlined" fullWidth>
        <InputLabel id="template-select-label">Select Template</InputLabel>
        <Select
          labelId="template-select-label"
          id="template-select"
          value={selectedTemplate}
          onOpen={handleOpen}
          onClose={handleClose}
          label="Select Template"
          open={Boolean(anchorEl)}
          onClick={(event) => setAnchorEl(event.currentTarget)}
          IconComponent={() => (
            <InputAdornment position="end">
              <IconButton onClick={handleRefresh} aria-label="refresh">
                <RefreshIcon />
              </IconButton>
            </InputAdornment>
          )}
          MenuProps={{
            PaperProps: {
              style: { maxHeight: 300, width: '250px' },
            },
          }}
        >
          {/* Search field in the dropdown */}
          <MenuItem disableGutters>
            <TextField
              autoFocus
              size="small"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearchChange}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IconButton onClick={handleRefresh} aria-label="refresh">
                      <RefreshIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </MenuItem>
          {/* Display filtered templates */}
          {filteredTemplates.map((template) => (
            <MenuItem key={template.id} value={template.id} onClick={() => handleSelectChange({ target: { value: template.id } })}>
              {template.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default TemplateSelect;
