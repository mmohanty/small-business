import React, { useState, useEffect } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Box,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Chip,
    IconButton,
    Button,
    CircularProgress,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DoneIcon from '@mui/icons-material/Done';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import RefreshIcon from '@mui/icons-material/Refresh';

// Sample data for templates (replace this with actual API data in production)
const sampleTemplates = [
    {
        name: 'Loan Template A',
        loanCreators: ['Alice', 'Bob'],
        loanReviewers: ['David', 'Eva'],
        loanCreatorsApprovals: ['Alice'],
        loanReviewerApprovals: ['David'],
    },
    {
        name: 'Loan Template B',
        loanCreators: ['Frank', 'George'],
        loanReviewers: ['Helen', 'Irene'],
        loanCreatorsApprovals: ['Frank', 'George'],
        loanReviewerApprovals: ['Helen'],
    },
];

// Main component to display the list of templates
const TemplatesList = () => {
    const [templates, setTemplates] = useState([]);
    const [loading, setLoading] = useState(false);

    // Simulate loading data (replace with actual API call)
    const loadTemplates = () => {
        setLoading(true);
        setTimeout(() => {
            setTemplates(sampleTemplates);
            setLoading(false);
        }, 1000); // Simulate API call delay
    };

    useEffect(() => {
        loadTemplates();
    }, []);

    const renderStatus = (name, approvals) => {
        const isApproved = approvals.includes(name);
        return isApproved ? (
            <Chip
                label="Approved"
                color="success"
                icon={<DoneIcon />}
                size="small"
                sx={{ marginRight: 1 }}
            />
        ) : (
            <Chip
                label="Pending"
                color="warning"
                icon={<HourglassEmptyIcon />}
                size="small"
                sx={{ marginRight: 1 }}
            />
        );
    };

    const handleRefresh = () => {
        loadTemplates(); // Call the data load function again
    };

    return (
        <Box sx={{ p: 4, marginLeft: '20px' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 5 }}>
                <Typography variant="h4" gutterBottom>
                    List of Loan Templates
                </Typography>
                
                {/* Refresh Button or Icon */}
                <IconButton color="primary" onClick={handleRefresh}>
                    <RefreshIcon />
                </IconButton>
                {/* Or you could use a Button */}
                {/* <Button variant="contained" color="primary" startIcon={<RefreshIcon />} onClick={handleRefresh}>
                    Refresh
                </Button> */}
            </Box>

            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
                    <CircularProgress />
                </Box>
            ) : (
                templates.length > 0 ? (
                    templates.map((template, index) => (
                        <Accordion key={index}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography variant="h6">{template.name}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <TableContainer component={Paper} sx={{ mb: 3 }}>
                                    <Table>
                                        <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                                            <TableRow>
                                                <TableCell><strong>Loan Creators</strong></TableCell>
                                                <TableCell><strong>Loan Reviewers</strong></TableCell>
                                                <TableCell><strong>Creators' Approvals</strong></TableCell>
                                                <TableCell><strong>Reviewers' Approvals</strong></TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <TableRow>
                                                {/* Loan Creators */}
                                                <TableCell>
                                                    {template.loanCreators.map((creator, i) => (
                                                        <Box key={i} sx={{ display: 'flex', alignItems: 'center' }}>
                                                            <Typography>{creator}</Typography>
                                                            {renderStatus(creator, template.loanCreatorsApprovals)}
                                                        </Box>
                                                    ))}
                                                </TableCell>

                                                {/* Loan Reviewers */}
                                                <TableCell>
                                                    {template.loanReviewers.map((reviewer, i) => (
                                                        <Box key={i} sx={{ display: 'flex', alignItems: 'center' }}>
                                                            <Typography>{reviewer}</Typography>
                                                            {renderStatus(reviewer, template.loanReviewerApprovals)}
                                                        </Box>
                                                    ))}
                                                </TableCell>

                                                {/* Creators' Approvals */}
                                                <TableCell>
                                                    {template.loanCreatorsApprovals.length > 0 ? (
                                                        template.loanCreatorsApprovals.map((approval, i) => (
                                                            <Chip
                                                                key={i}
                                                                label={approval}
                                                                color="success"
                                                                size="small"
                                                                sx={{ marginRight: 1 }}
                                                            />
                                                        ))
                                                    ) : (
                                                        <Typography>No Approvals</Typography>
                                                    )}
                                                </TableCell>

                                                {/* Reviewers' Approvals */}
                                                <TableCell>
                                                    {template.loanReviewerApprovals.length > 0 ? (
                                                        template.loanReviewerApprovals.map((approval, i) => (
                                                            <Chip
                                                                key={i}
                                                                label={approval}
                                                                color="success"
                                                                size="small"
                                                                sx={{ marginRight: 1 }}
                                                            />
                                                        ))
                                                    ) : (
                                                        <Typography>No Approvals</Typography>
                                                    )}
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </AccordionDetails>
                        </Accordion>
                    ))
                ) : (
                    <Typography>No templates available</Typography>
                )
            )}
        </Box>
    );
};

export default TemplatesList;
