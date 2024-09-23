import React, { useState } from 'react';
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

  const dataTypes = ['String', 'Integer', 'Float', 'Date'];

  const handleAddRow = () => {
    setRows([...rows, { fieldName: '', dataType: 'String', isRequired: false, isUnique: false, isEditable: false, minValue: '', maxValue: '', dataFormat: '' }]);
  };

  const handleDeleteRow = (index) => {
    const updatedRows = [...rows];
    updatedRows.splice(index, 1);
    setRows(updatedRows);
  };

  const handleDeleteLastRow = () => {
    const updatedRows = [...rows];
    updatedRows.pop();
    setRows(updatedRows);
  };

  const handleInputChange = (index, event) => {
    const { name, value, type, checked } = event.target;
    const updatedRows = [...rows];
    updatedRows[index][name] = type === 'checkbox' ? checked : value;
    setRows(updatedRows);
  };

  return (
    <Box sx={{ padding: 2 }}>
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
          />
        </AccordionDetails>
      </Accordion>

      {/* Collapsible Panel for Table */}
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Fields</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Field Name</TableCell>
                  <TableCell>Data Type</TableCell>
                  <TableCell>Is Required</TableCell>
                  <TableCell>Is Unique</TableCell>
                  <TableCell>Is Editable</TableCell>
                  <TableCell>Min Value/Length</TableCell>
                  <TableCell>Max Value/Length</TableCell>
                  <TableCell>Data Format</TableCell>
                  <TableCell>Remove</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{index}</TableCell>
                    <TableCell>
                      <TextField
                        name="fieldName"
                        value={row.fieldName}
                        onChange={(event) => handleInputChange(index, event)}
                        variant="outlined"
                        fullWidth
                      />
                    </TableCell>
                    <TableCell>
                      <Select
                        name="dataType"
                        value={row.dataType}
                        onChange={(event) => handleInputChange(index, event)}
                        fullWidth
                      >
                        {dataTypes.map((type, idx) => (
                          <MenuItem key={idx} value={type}>
                            {type}
                          </MenuItem>
                        ))}
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Checkbox
                        name="isRequired"
                        checked={row.isRequired}
                        onChange={(event) => handleInputChange(index, event)}
                      />
                    </TableCell>
                    <TableCell>
                      <Checkbox
                        name="isUnique"
                        checked={row.isUnique}
                        onChange={(event) => handleInputChange(index, event)}
                      />
                    </TableCell>
                    <TableCell>
                      <Checkbox
                        name="isEditable"
                        checked={row.isEditable}
                        onChange={(event) => handleInputChange(index, event)}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        name="minValue"
                        value={row.minValue}
                        onChange={(event) => handleInputChange(index, event)}
                        variant="outlined"
                        fullWidth
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        name="maxValue"
                        value={row.maxValue}
                        onChange={(event) => handleInputChange(index, event)}
                        variant="outlined"
                        fullWidth
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        name="dataFormat"
                        value={row.dataFormat}
                        onChange={(event) => handleInputChange(index, event)}
                        variant="outlined"
                        fullWidth
                      />
                    </TableCell>
                    <TableCell>
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

      <Box sx={{ marginTop: 2, display: 'flex', justifyContent: 'space-between' }}>
        <Button variant="contained" color="primary" onClick={handleAddRow}>
          Add Row
        </Button>
        <Button variant="contained" color="error" onClick={handleDeleteLastRow}>
          Delete Last Row
        </Button>
      </Box>
    </Box>
  );
};

export default Template;
