import React, { useState } from 'react';
import { TextField, MenuItem, FormControl, Select, InputLabel, Box, IconButton, InputAdornment } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';

const templates = [
  {
    id: "1",
    name: "Template1",
    fields: {
      LoanNumber: { data_type: "String", min: 1, max: 4, is_required: true, is_editable: false, data_format: "" },
      SellerLoanNumber: { data_type: "Currency", min: 1, max: 4, is_required: true, is_editable: false, data_format: "" },
      // Additional fields here...
    }
  },
  {
    id: "2",
    name: "Template2",
    fields: {
      LoanNumber: { data_type: "String", min: 1, max: 4, is_required: true, is_editable: false, data_format: "" },
      SellerLoanNumber: { data_type: "Currency", min: 1, max: 4, is_required: true, is_editable: false, data_format: "" },
      // Additional fields here...
    }
  },
  // Additional templates here...
];

const TemplateSelect = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [templateData, setTemplateData] = useState(templates);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSelectChange = (event) => {
    setSelectedTemplate(event.target.value);
  };

  const handleRefresh = () => {
    // Simulate a data fetch or reload
    console.log("Data reloaded");
    setTemplateData([...templates]); // Replace with actual data reload logic
  };

  // Filter templates based on search term
  const filteredTemplates = templateData.filter(template =>
    template.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ minWidth: 240 }}>
      <TextField
        label="Search Templates"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Type to search..."
        sx={{ mb: 2 }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleRefresh} aria-label="refresh">
                <RefreshIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <FormControl variant="outlined" fullWidth>
        <InputLabel id="template-select-label">Select Template</InputLabel>
        <Select
          labelId="template-select-label"
          id="template-select"
          value={selectedTemplate}
          onChange={handleSelectChange}
          label="Select Template"
        >
          {filteredTemplates.map((template) => (
            <MenuItem key={template.id} value={template.id}>
              {template.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default TemplateSelect;
