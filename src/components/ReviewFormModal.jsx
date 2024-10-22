import React, { useEffect, useState } from 'react';
import {
    Box,
    TextField,
    IconButton,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    InputAdornment,
    Tooltip,
    Avatar,
    Typography,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import NoteIcon from '@mui/icons-material/Note';
import CommentIcon from '@mui/icons-material/Comment';
import FlagIcon from '@mui/icons-material/Flag';
import Grid2 from '@mui/material/Grid2';
import dayjs from 'dayjs';

// Utility function for formatting currency
const formatCurrency = (value) => {
    if (isNaN(value)) return '';
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
    });
    return formatter.format(value);
};

// Utility function to handle raw numeric value
const getRawValue = (formattedValue) => {
    return formattedValue.replace(/[^0-9.-]+/g, ''); // Remove everything except digits, `.` and `-`
};

// Function to display the note history for a specific field
const renderNotesHistory = (fieldName, notesHistory) => {
    const history = notesHistory[fieldName];
    if (!history || history.length === 0) return null;

    return (
        <List>
            {history.map((note, index) => (
                <ListItem key={index} alignItems="flex-start">
                    <ListItemAvatar>
                        <Avatar alt={note.user} src={note.avatar} />
                    </ListItemAvatar>
                    <ListItemText
                        primary={`${note.task} by ${note.user}`}
                        secondary={`${note.date} - ${note.time}`}
                    />
                </ListItem>
            ))}
        </List>
    );
};

// Main ReviewForm Component with Modal
const ReviewFormModal = ({ open, onClose, jsonFields, selectedRow, notesHistoryDetails, flags, onSubmit, onReset, onCancel }) => {
    const [formData, setFormData] = useState({});
    const [originalFormData, setOriginalFormData] = useState({}); // Store original form data
    const [flaggedFields, setFlaggedFields] = useState({}); // Store flag status for each field
    const [comments, setComments] = useState({}); // Store comments for each field

    useEffect(() => {
        console.log("test", notesHistoryDetails);
        if (selectedRow) {
            // Populate formData based on selectedRow when modal opens
            const initialData = jsonFields.reduce((acc, field) => ({
                ...acc,
                [field.fieldName]: selectedRow[field.fieldName] || '', // Use selected row data for each field
            }), {});
            setFormData(initialData);
            setOriginalFormData(initialData); // Store the initial data for reset

            //Populate flags based on flags
            const initialFlags = jsonFields.reduce((acc, field) => ({
                ...acc,
                [field.fieldName]: flaggedFields.includes(field.fieldName),
            }), {});
            setFlaggedFields(initialFlags);
        }
    }, [selectedRow, jsonFields, flags]);

    // Handle input changes dynamically based on field name
    const handleInputChange = (fieldName, value) => {
        setFormData((prev) => ({ ...prev, [fieldName]: value }));
    };

    // Handle currency input
    const handleCurrencyChange = (fieldName, value) => {
        const rawValue = getRawValue(value); // Get the raw numeric value
        setFormData((prev) => ({
            ...prev,
            [fieldName]: rawValue, // Store the raw value
        }));
    };

    // Handle flag toggle
    const toggleFlagStatus = (fieldName) => {
        setFlaggedFields((prev) => ({
            ...prev,
            [fieldName]: !prev[fieldName],
        }));
    };

    // Handle comment change
    const handleCommentChange = (fieldName, value) => {
        setComments((prev) => ({
            ...prev,
            [fieldName]: value, // Store the comment separately in the comments state
        }));
    };

    // Handle form submission
    const handleSubmit = () => {
        const submissionData = {
            formData,
            flags: flaggedFields,
            comments,
        };
        console.log('Form Data on Submit:', submissionData); // Log form data, flags, and comments
        if (onSubmit) onSubmit(submissionData); // Call the provided onSubmit handler
    };

    // Handle form reset to original values
    const handleReset = () => {
        setFormData(originalFormData); // Reset to original data
        setFlaggedFields({}); // Reset flags
        setComments({}); // Reset comments
        if (onReset) onReset(); // Call the provided onReset handler
    };

    const [noteHistoryVisible, setNoteHistoryVisible] = useState(false);
    const [commentsModalOpen, setCommentsModalOpen] = useState(false);
    const [currentCommentField, setCurrentCommentField] = useState(''); // Track the field for which a comment is being added
    const [currentNotesField, setCurrentNotesField] = useState(''); // Track the field for which a comment is being added

   // const toggleNoteHistory = () => setNoteHistoryVisible((prev) => !prev);

    const handleOpenCommentsModal = (fieldName) => {
        setCurrentCommentField(fieldName); // Set the current field to add a comment to
        setCommentsModalOpen(true);
    };

    const handleOpenNotesModal = (fieldName) => {
        setCurrentNotesField(fieldName); // Set the current field to add a comment to
        setNoteHistoryVisible(true);
    };

    const handleCloseCommentsModal = () => setCommentsModalOpen(false);

    const handleCloseNotesModal = () => setNoteHistoryVisible(false); // handleCloseCommentsModal

    const handleSaveComment = () => {
        // Save the comment for the current field in the `comments` state
        handleCloseCommentsModal();
    };

    return (
        <>
            <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
                <DialogTitle>Review Form</DialogTitle>
                <DialogContent>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Grid2 container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                            {(jsonFields && Array.isArray(jsonFields)) ? (
                                jsonFields.map((field) => (
                                    <Grid2
                                        key={field.fieldName}
                                        xs={2}
                                        sm={4}
                                        md={4}
                                        sx={{ display: 'flex', alignItems: 'center' }}
                                        direction="column"
                                    >
                                        {field.dataType === 'String' && (
                                            <TextField
                                                label={field.fieldName}
                                                variant="outlined"
                                                disabled={!field.isEditable} 
                                                value={formData[field.fieldName] || ''}
                                                onChange={(e) => handleInputChange(field.fieldName, e.target.value)}
                                                fullWidth
                                                sx={{ marginRight: 2, width: '230px', marginLeft: 8 }}
                                            />
                                        )}

                                        {field.dataType === 'Date' && (
                                            <DatePicker
                                                label={field.fieldName}
                                                disabled={!field.isEditable} 
                                                value={formData[field.fieldName] ? dayjs(formData[field.fieldName]) : null}
                                                onChange={(newValue) => handleInputChange(field.fieldName, newValue)}
                                                sx={{ marginRight: 2, width: '100%', marginLeft: 8 }}
                                                renderInput={(params) => (
                                                    <TextField {...params} fullWidth variant="outlined" sx={{ marginRight: 2 }} />
                                                )}
                                            />
                                        )}

                                        {field.dataType === 'Currency' && (
                                            <TextField
                                                label={field.fieldName}
                                                variant="outlined"
                                                disabled={!field.isEditable} 
                                                value={formatCurrency(formData[field.fieldName])} // Display formatted value
                                                onChange={(e) => handleCurrencyChange(field.fieldName, e.target.value)} // Handle raw input
                                                fullWidth
                                                sx={{ marginRight: 2, width: '100%', marginLeft: 8 }}

                                            />
                                        )}

                                        {/* Icons for Notes, Comments, and Flag placed vertically */}
                                        <Box sx={{ display: 'flex', flexDirection: 'column', marginLeft: 2 }}>
                                            <Tooltip title="View Notes">
                                                <IconButton 
                                                //onClick={toggleNoteHistory} color="primary" 
                                                onClick={() => handleOpenNotesModal(field.fieldName)}
                                                sx={{ fontSize: '10px', padding: '4px' }}
                                                >
                                                    <NoteIcon sx={{ fontSize: '14px' }} />
                                                </IconButton>
                                            </Tooltip>

                                            <Tooltip title="Add Comment">
                                                <IconButton
                                                    onClick={() => handleOpenCommentsModal(field.fieldName)}
                                                    color="primary"
                                                    sx={{ fontSize: '10px', padding: '4px' }}
                                                >
                                                    <CommentIcon sx={{ fontSize: '14px' }} />
                                                </IconButton>
                                            </Tooltip>

                                            <Tooltip title="Flag Field">
                                                <IconButton
                                                    onClick={() => toggleFlagStatus(field.fieldName)}
                                                    color={flaggedFields[field.fieldName] ? 'warning' : 'default'}
                                                    sx={{ fontSize: '10px', padding: '4px' }}
                                                >
                                                    <FlagIcon sx={{ fontSize: '14px' }} />
                                                </IconButton>
                                            </Tooltip>
                                        </Box>
                                    </Grid2>
                                ))
                            ) : (
                                <p>No form fields available.</p>
                            )}
                        </Grid2>
                    </LocalizationProvider>
                </DialogContent>
                <DialogActions>
                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                        <Button variant="contained" color="primary" onClick={handleSubmit}>
                            Submit
                        </Button>
                        <Button variant="outlined" color="secondary" onClick={handleReset}>
                            Reset
                        </Button>
                        <Button variant="outlined" color="error" onClick={onCancel}>
                            Cancel
                        </Button>
                    </Box>
                </DialogActions>
            </Dialog>

            {/* Render the Notes History Modal */}
            {/* <NotesHistoryModal open={noteHistoryVisible} onClose={handleCloseNotesModal}/> */}

            {/* Render the Comments Modal */}
            <Dialog open={commentsModalOpen} onClose={handleCloseCommentsModal}>
                <DialogTitle>Add Comment</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Enter your comment"
                        variant="outlined"
                        multiline
                        rows={4}
                        fullWidth
                        value={comments[currentCommentField] || ''} // Use comments state for the current field
                        onChange={(e) => handleCommentChange(currentCommentField, e.target.value)} // Update comment state
                    />
                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                        <Button onClick={handleSaveComment} variant="contained" color="primary">
                            Save
                        </Button>
                        <Button onClick={handleCloseCommentsModal} variant="outlined" color="error">
                            Cancel
                        </Button>
                    </Box>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default ReviewFormModal;
