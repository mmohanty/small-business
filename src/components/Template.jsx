import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Select,
  MenuItem,
  Checkbox,
  IconButton,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';

const Template = () => {
  const [rows, setRows] = useState([
    { fieldName: '', dataType: 'String', isRequired: false, isUnique: false, isEditable: false, minValue: '', maxValue: '', dataFormat: '' },
  ]);
  const [templateName, setTemplateName] = useState('');
  const lastRowFieldRef = useRef(null); // Ref for the last row's field name input

  const dataTypes = ['String', 'Integer', 'Float', 'Date'];

  const handleAddRow = () => {
    setRows((prevRows) => [
      ...prevRows,
      { fieldName: '', dataType: 'String', isRequired: false, isUnique: false, isEditable: false, minValue: '', maxValue: '', dataFormat: '' },
    ]);
  };

  useEffect(() => {
    if (lastRowFieldRef.current) {
      lastRowFieldRef.current.focus(); // Set focus to the last added row's TextField
    }
  }, [rows]);

  const handleDeleteRow = (index) => {
    const updatedRows = [...rows];
    updatedRows.splice(index, 1);
    setRows(updatedRows);
  };

  const handleInputChange = (index, event) => {
    const { name, value, type, checked } = event.target;
    const updatedRows = [...rows];
    updatedRows[index][name] = type === 'checkbox' ? checked : value;
    setRows(updatedRows);
  };

  const handleSave = () => {
    console.log('Template saved', { templateName, rows });
    // Add your logic to save the template (e.g., saving to local storage or a draft state)
  };

  const handleSubmit = () => {
    console.log('Template submitted', { templateName, rows });
    // Add your logic to submit the template (e.g., submitting to an API)
  };

  return (
    <Box
      sx={{
        padding: { xs: 2, sm: 3, md: 4 },
        width: { xs: '100%', sm: '90%', md: '75%' },
        margin: '0 auto',
      }}
    >
      {/* Collapsible Panel for Template Name */}
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Name</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TextField
            label="Template Name"
            variant="outlined"
            fullWidth
            value={templateName}
            onChange={(e) => setTemplateName(e.target.value)}
            size="small"
          />
        </AccordionDetails>
      </Accordion>

      {/* Collapsible Panel for Table */}
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Fields</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TableContainer component={Paper} sx={{ maxHeight: '60vh', overflowX: 'auto' }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ padding: '8px' }}>#</TableCell>
                  <TableCell sx={{ padding: '8px' }}>Field Name</TableCell>
                  <TableCell sx={{ padding: '8px' }}>Data Type</TableCell>
                  <TableCell sx={{ padding: '8px' }}>Is Required</TableCell>
                  <TableCell sx={{ padding: '8px' }}>Is Editable</TableCell>
                  <TableCell sx={{ padding: '8px' }}>Min Value/Length</TableCell>
                  <TableCell sx={{ padding: '8px' }}>Max Value/Length</TableCell>
                  <TableCell sx={{ padding: '8px' }}>Data Format</TableCell>
                  <TableCell sx={{ padding: '8px' }}>Remove</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell sx={{ padding: '8px' }}>{index + 1}</TableCell>
                    <TableCell sx={{ padding: '8px' }}>
                      <TextField
                        name="fieldName"
                        value={row.fieldName}
                        onChange={(event) => handleInputChange(index, event)}
                        variant="outlined"
                        fullWidth
                        size="small"
                        inputRef={index === rows.length - 1 ? lastRowFieldRef : null} // Set ref for the last row
                      />
                    </TableCell>
                    <TableCell sx={{ padding: '8px' }}>
                      <Select
                        name="dataType"
                        value={row.dataType}
                        onChange={(event) => handleInputChange(index, event)}
                        fullWidth
                        size="small"
                        sx={{
                          height: '40px',
                          '& .MuiSelect-select': {
                            padding: '10px',
                          },
                        }}
                      >
                        {dataTypes.map((type, idx) => (
                          <MenuItem key={idx} value={type}>
                            {type}
                          </MenuItem>
                        ))}
                      </Select>
                    </TableCell>
                    <TableCell sx={{ padding: '8px' }}>
                      <Checkbox
                        name="isRequired"
                        checked={row.isRequired}
                        onChange={(event) => handleInputChange(index, event)}
                      />
                    </TableCell>
                    <TableCell sx={{ padding: '8px' }}>
                      <Checkbox
                        name="isEditable"
                        checked={row.isEditable}
                        onChange={(event) => handleInputChange(index, event)}
                      />
                    </TableCell>
                    <TableCell sx={{ padding: '8px' }}>
                      <TextField
                        name="minValue"
                        value={row.minValue}
                        onChange={(event) => handleInputChange(index, event)}
                        variant="outlined"
                        fullWidth
                        size="small"
                      />
                    </TableCell>
                    <TableCell sx={{ padding: '8px' }}>
                      <TextField
                        name="maxValue"
                        value={row.maxValue}
                        onChange={(event) => handleInputChange(index, event)}
                        variant="outlined"
                        fullWidth
                        size="small"
                      />
                    </TableCell>
                    <TableCell sx={{ padding: '8px' }}>
                      <TextField
                        name="dataFormat"
                        value={row.dataFormat}
                        onChange={(event) => handleInputChange(index, event)}
                        variant="outlined"
                        fullWidth
                        size="small"
                      />
                    </TableCell>
                    <TableCell sx={{ padding: '8px' }}>
                      <IconButton onClick={() => handleDeleteRow(index)} color="error">
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </AccordionDetails>
      </Accordion>

      <Box
        sx={{
          marginTop: 2,
          display: 'flex',
          justifyContent: { xs: 'center', sm: 'space-between' },
          flexDirection: { xs: 'column', sm: 'row' },
          gap: { xs: 2, sm: 0 },
        }}
      >
        <Button variant="contained" color="primary" onClick={handleAddRow} sx={{ width: { xs: '100%', sm: 'auto' } }}>
          Add Row
        </Button>
        {/* Save and Submit buttons */}
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant="contained" color="secondary" onClick={handleSave} sx={{ width: { xs: '100%', sm: 'auto' } }}>
            Save
          </Button>
          <Button variant="contained" color="success" onClick={handleSubmit} sx={{ width: { xs: '100%', sm: 'auto' } }}>
            Submit
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Template;
