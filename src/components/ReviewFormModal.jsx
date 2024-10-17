import React, { useState } from 'react';
import {
    Box,
    TextField,
    IconButton,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography,
    InputAdornment,
    Paper,
    Tooltip,
    Avatar,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import NoteIcon from '@mui/icons-material/Note';
import CommentIcon from '@mui/icons-material/Comment';
import FlagIcon from '@mui/icons-material/Flag';
import Grid2 from '@mui/material/Grid2';

// Notes History Modal Component
const NotesHistoryModal = ({ open, onClose, notesHistory }) => {
    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Notes History</DialogTitle>
            <DialogContent dividers>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {notesHistory.map((note, index) => (
                        <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
                            <Box sx={{ width: '60px', textAlign: 'center', marginRight: '20px' }}>
                                {(index === 0 || notesHistory[index - 1].date !== note.date) && (
                                    <Typography variant="caption" sx={{ fontWeight: 'bold', display: 'block', mb: 2 }}>
                                        {note.date}
                                    </Typography>
                                )}
                            </Box>
                            <Box sx={{ flexGrow: 1, paddingLeft: '10px', borderLeft: '2px solid #ccc' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <Avatar src={note.avatar} alt={note.user} />
                                    <Typography variant="body2">{note.task}</Typography>
                                    <Typography variant="caption" sx={{ marginLeft: 'auto' }}>
                                        {note.time}
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    ))}
                </Box>
            </DialogContent>
        </Dialog>
    );
};

// Comments Modal Component
const CommentsModal = ({ open, onClose, commentValue, onChange, onSave }) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Add Comment</DialogTitle>
            <DialogContent>
                <TextField
                    label="Enter your comment"
                    variant="outlined"
                    multiline
                    rows={4}
                    fullWidth
                    value={commentValue}
                    onChange={onChange}
                />
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                    <Button onClick={onSave} variant="contained" color="primary">
                        Save
                    </Button>
                    <Button onClick={onClose} variant="outlined" color="error">
                        Cancel
                    </Button>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

// Main ReviewForm Component with Modal
const ReviewFormModal = ({ open, onClose, jsonFields, notesHistory, onSubmit, onReset, onCancel }) => {
    const [formData, setFormData] = useState(
        jsonFields.reduce((acc, field) => ({ ...acc, [field.fieldName]: field.value }), {})
    );
    const [flaggedFields, setFlaggedFields] = useState({});
    const [noteHistoryVisible, setNoteHistoryVisible] = useState(false);
    const [commentsModalOpen, setCommentsModalOpen] = useState(false);
    const [currentCommentField, setCurrentCommentField] = useState('');
    const [comments, setComments] = useState({});

    // Handle input changes dynamically based on field name
    const handleInputChange = (fieldName, value) => {
        setFormData((prev) => ({ ...prev, [fieldName]: value }));
    };

    const toggleFlagStatus = (field) => {
        setFlaggedFields((prev) => ({
            ...prev,
            [field]: !prev[field],
        }));
    };

    const toggleNoteHistory = () => setNoteHistoryVisible((prev) => !prev);

    const handleOpenCommentsModal = (field) => {
        setCurrentCommentField(field);
        setCommentsModalOpen(true);
    };

    const handleCloseCommentsModal = () => setCommentsModalOpen(false);

    const handleSaveComment = () => {
        setComments((prev) => ({
            ...prev,
            [currentCommentField]: formData[currentCommentField] || '',
        }));
        handleCloseCommentsModal();
    };

    return (
        <>
            <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
                <DialogTitle>Review Form</DialogTitle>
                <DialogContent>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Grid2 container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                            {jsonFields.map((field, index) => (
                                <Grid2
                                    key={field.fieldName}
                                    xs={2}
                                    sm={4}
                                    md={4}
                                    sx={{ display: 'flex', alignItems: 'center' }}
                                    direction="column"
                                >
                                    {field.type === 'text' && (
                                        <TextField
                                            label={field.label}
                                            variant="outlined"
                                            value={formData[field.fieldName]}
                                            onChange={(e) => handleInputChange(field.fieldName, e.target.value)}
                                            fullWidth
                                            sx={{ marginRight: 2, width: '230px', marginLeft: 8 }}
                                        />
                                    )}

                                    {field.type === 'date' && (
                                        <DatePicker
                                            label={field.label}
                                            value={formData[field.fieldName]}
                                            onChange={(newValue) => handleInputChange(field.fieldName, newValue)}
                                            sx={{ marginRight: 2, width: '100%',  marginLeft: 8 }}
                                            renderInput={(params) => (
                                                <TextField {...params} fullWidth variant="outlined" sx={{ marginRight: 2 }} />
                                            )}
                                        />
                                    )}

                                    {field.type === 'currency' && (
                                        <TextField
                                            label={field.label}
                                            variant="outlined"
                                            value={formData[field.fieldName]}
                                            onChange={(e) => handleInputChange(field.fieldName, e.target.value)}
                                            fullWidth
                                            sx={{ marginRight: 2, width: '100%' }}
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                            }}
                                        />
                                    )}

                {/* Icons for Notes, Comments, and Flag with Tooltip */}
                {/* <Tooltip title="View Notes">
                    <IconButton onClick={toggleNoteHistory} color="primary">
                      <NoteIcon />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Add Comment">
                    <IconButton onClick={() => handleOpenCommentsModal(field.fieldName)} color="primary">
                      <CommentIcon />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Flag Field">
                    <IconButton
                      onClick={() => toggleFlagStatus(field.fieldName)}
                      color={flaggedFields[field.fieldName] ? 'warning' : 'default'}
                    >
                      <FlagIcon />
                    </IconButton>
                  </Tooltip> */}
                    {/* Icons for Notes, Comments, and Flag placed vertically */}
                    <Box sx={{ display: 'flex', flexDirection: 'column', marginLeft: 2 }}>
                        <Tooltip title="View Notes">
                            <IconButton onClick={toggleNoteHistory} color="primary" 
                            sx={{ fontSize: '10px', padding: '4px' }} // Reduced size
                            >
                                <NoteIcon sx={{ fontSize: '14px' }} />
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="Add Comment">
                            <IconButton
                                onClick={() => handleOpenCommentsModal(field.fieldName)}
                                color="primary"
                                sx={{ fontSize: '10px', padding: '4px' }} // Reduced size
                            >
                                <CommentIcon sx={{ fontSize: '14px' }} />
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="Flag Field">
                            <IconButton
                                onClick={() => toggleFlagStatus(field.fieldName)}
                                color={flaggedFields[field.fieldName] ? 'warning' : 'default'}
                                sx={{ fontSize: '10px', padding: '4px' }} // Reduced size
                            >
                                <FlagIcon sx={{ fontSize: '14px' }}/>
                            </IconButton>
                        </Tooltip>
                    </Box>
                        </Grid2>
                    ))}
                </Grid2>
                    </LocalizationProvider>
                </DialogContent>
                <DialogActions>
                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                        <Button variant="contained" color="primary" onClick={onSubmit}>
                            Submit
                        </Button>
                        <Button variant="outlined" color="secondary" onClick={onReset}>
                            Reset
                        </Button>
                        <Button variant="outlined" color="error" onClick={onCancel}>
                            Cancel
                        </Button>
                    </Box>
                </DialogActions>
            </Dialog>

            {/* Render the Notes History Modal */}
            <NotesHistoryModal open={noteHistoryVisible} onClose={toggleNoteHistory} notesHistory={notesHistory} />

            {/* Render the Comments Modal */}
            <CommentsModal
                open={commentsModalOpen}
                onClose={handleCloseCommentsModal}
                commentValue={formData[currentCommentField] || ''}
                onChange={(e) => handleInputChange(currentCommentField, e.target.value)}
                onSave={handleSaveComment}
            />
        </>
    );
};

export default ReviewFormModal;
