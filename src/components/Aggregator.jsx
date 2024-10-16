import React from 'react';
import { Container, Grid, Typography, Box, Button, Tabs, Tab, Accordion, AccordionSummary, AccordionDetails, Table, TableBody, TableCell, TableHead, TableRow, Paper, Breadcrumbs, Link } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function LoanDetails() {
  return (
    <Container>
      {/* Breadcrumb Navigation */}
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
        <Link underline="hover" color="inherit" href="#">
          Home
        </Link>
        <Link underline="hover" color="inherit" href="#">
          Loan listing
        </Link>
        <Typography color="textPrimary">Sam’s Musica</Typography>
      </Breadcrumbs>

      {/* Header and Navigation Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
        <Typography variant="h4" component="div" gutterBottom>
          Sam’s Musica
        </Typography>
        <Tabs value={0} aria-label="loan details tabs">
          <Tab label="Overview" />
          <Tab label="Status tracker" />
          <Tab label="Payments" />
        </Tabs>
      </Box>

      {/* Main Information Section */}
      <Paper sx={{ p: 3, mb: 2 }}>
        {/* Row with Account number and Buttons */}
        <Grid container spacing={3} alignItems="center">
          {/* Account Number */}
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1">Account number</Typography>
            <Typography variant="h6">256723545365438765</Typography>
          </Grid>

          {/* Action Buttons */}
          <Grid item xs={12} md={6} sx={{ textAlign: 'right' }}>
            <Button variant="outlined" sx={{ mr: 1 }}>View Documents</Button>
            <Button variant="outlined" sx={{ mr: 1 }}>Generate Report</Button>
            <Button variant="contained">Loan Actions</Button>
          </Grid>
        </Grid>

        {/* Loan Amount and Loan Status Below */}
        <Grid container spacing={3} sx={{ mt: 2 }}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1">Loan amount</Typography>
            <Typography variant="h5">$5,000.00 USD</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1">Loan status</Typography>
            <Button variant="contained" color="warning">In review</Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Accordion for Loan Info */}
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Loan info</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Loan amount</TableCell>
                <TableCell>Funded date</TableCell>
                <TableCell>Interest rate</TableCell>
                <TableCell>Term (Months)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>$50,000 USD</TableCell>
                <TableCell>6 June 2024</TableCell>
                <TableCell>7.00%</TableCell>
                <TableCell>360</TableCell>
              </TableRow>
              {/* Add more rows as needed */}
            </TableBody>
          </Table>
        </AccordionDetails>
      </Accordion>

      {/* Accordion for Servicing Info */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Servicing info</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Event</TableCell>
                <TableCell>Event date</TableCell>
                <TableCell>Payment type</TableCell>
                <TableCell>Unpaid principal balance</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Payment</TableCell>
                <TableCell>6 June 2024</TableCell>
                <TableCell>On time</TableCell>
                <TableCell>$3,600</TableCell>
              </TableRow>
              {/* Add more rows as needed */}
            </TableBody>
          </Table>
        </AccordionDetails>
      </Accordion>
    </Container>
  );
}

export default LoanDetails;
