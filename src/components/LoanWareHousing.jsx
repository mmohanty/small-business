import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridActionsCellItem, useGridApiRef } from '@mui/x-data-grid';
import SecurityIcon from '@mui/icons-material/Security';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import axios from "axios";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

import { darken, lighten, styled } from '@mui/material/styles';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid2, MenuItem, Stack, TextField, Typography } from '@mui/material';

import AddCircleTwoTone from '@mui/icons-material/AddCircleTwoTone';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SyncTwoToneIcon from '@mui/icons-material/SyncTwoTone';


var rowGlobal = null;
var apiRef = null;

const LoanWareHousing = () => {

    apiRef = useGridApiRef();
    const [rowData, setRowData] = useState();

    const [open, setOpen] = React.useState(false);
    const [severity, setSeverity] = React.useState('success');
    const [message, setMessage] = React.useState('Loan Token minted successfully');

    const [openAddDialog, setAddDialogOpen] = React.useState(false);
    const [openBulkUploadDialog, setBulkUploadDialogOpen] = React.useState(false);


    //form data
    const [loanNumber, setLoanNumber] = useState('123');
    const [loanAmount, setLoanAmount] = useState('50000');
    const [creditScore, setCreditScore] = useState('750');
    const [latePaymentDays, setLatePaymentDays] = useState('30');
    const [favouriteColor, setFavouriteColor] = useState('Blue');
    const [bankruptcyStatus, setBankruptcyStatus] = useState('No');

    const handleAddDialogClickOpen = () => {
        setAddDialogOpen(true);
    };

    const handleAddDialogClose = () => {
        setAddDialogOpen(false);
    };

    const handleBulkUploadDialogClickOpen = () => {
        setBulkUploadDialogOpen(true);
    };

    const handleBulkUploadDialogClose = () => {
        setBulkUploadDialogOpen(false);
    };

    const showSnackbar = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    useEffect(() => {
        fetchLoans();
    }, []);


    function fetchLoans() {
        axios.get('https://dummyjson.com/c/93d4-0dd2-43d1-b124').then(
            response => {
                var data = new Array();
                response.data.data["loans"].flatMap((item) => {
                    var rowData = item[1];
                    rowData["id"] = rowData["loan_number"];
                    data.push(rowData);
                });
                console.log(data);
                setRowData(data);
                rowGlobal = data;
            }
        ).catch(error => {
            console.error(error);
        });
    }

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

    const handleBulkUploadDialogSubmitClick = (event) => {
        console.log(event.target.files)
        event.preventDefault();

        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('file', file);
      
        axios.post('http://localhost:3500/upload', formData)
          .then(response => {
            console.log(response);
          })
          .catch(error => {
            console.error(error);
          });
    };

    const handleAddDialogSubmitClick = (e) => {
        console.log('submit called');
        e.preventDefault();


        if (!loanNumber || !loanAmount || !creditScore || !latePaymentDays || !favouriteColor || !bankruptcyStatus) {
            setSeverity('error');
            setMessage('Please fill all the fields');
            showSnackbar();
            return;
        }
        if (loanNumber === '' || loanAmount === '' || creditScore === '' || latePaymentDays === '' || favouriteColor === '' || bankruptcyStatus === '') {
            setSeverity('error');
            setMessage('Please fill all the fields');
            showSnackbar();
            return;
        }
        console.log(creditScore, loanAmount, loanNumber, bankruptcyStatus, favouriteColor, latePaymentDays);

        var mintData = {
            "loan_number": loanNumber,
            "loan_amount": loanAmount,
            "credit_score": creditScore,
            "late_payment_days": latePaymentDays,
            "favourite_color": favouriteColor,
            "bankruptcy_status": bankruptcyStatus
        }
        axios.post("https://dummyjson.com/posts/add", mintData,
            { headers: { "Content-Type": "application/json" } }
        ).then((response) => {
            setSeverity('success');
            setMessage('Loan created successfully');
            showSnackbar();
            console.log(response.status, response.data.token);
        }).catch((error) => {
            setSeverity('error');
            if (error.response) {
                console.log(error.response);
                setMessage(error.response.data.message);
                console.log("server responded");
            } else if (error.request) {
                setMessage("network error");
                console.log("network error");
            } else {
                console.log(error);
            }
            showSnackbar();
        });
    };

    const mintToken = React.useCallback(
        (id) => () => {
            setTimeout(() => {
                //setRows((prevRows) => prevRows.filter((row) => row.id !== id));
                var row = rowGlobal.find((row) => row.id === id);
                console.log(row);
                const mintData = {
                    loan_number: row.loan_number,
                    cdfi: ""
                };
                axios.post("https://reqres.in/api/login", mintData,
                    { headers: { "Content-Type": "application/json" } }
                ).then((response) => {
                    console.log(response.status, response.data.token);
                    setSeverity('success');
                    setMessage('Loan created successfully');
                    showSnackbar();
                    fetchLoans();
                }).catch((error) => {
                    setSeverity('error');
                    setMessage("Unknown error.");
                    if (error.response) {
                        console.log(error.response);
                        setMessage(error.response.data.message);
                        console.log("server responded");
                    } else if (error.request) {
                        setMessage("network error");
                        console.log("network error");
                    } else {
                        console.log(error);
                    }
                    showSnackbar();
                });
            });
        },
        [],
    );

    const removeLoan = React.useCallback(
        (id) => () => {
            setRowData((prevRows) => {
                const rowToDuplicate = prevRows.find((row) => row.id === id);
                return [...prevRows, { ...rowToDuplicate, id: Date.now() }];
            });
        },
        [],
    );

    const getBackgroundColor = (color, theme, coefficient) => ({
        backgroundColor: darken(color, coefficient),
        ...theme.applyStyles('light', {
            backgroundColor: lighten(color, coefficient),
        }),
    });

    const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
        '& .super-app-theme--Open': {
            ...getBackgroundColor(theme.palette.info.main, theme, 0.7),
            '&:hover': {
                ...getBackgroundColor(theme.palette.info.main, theme, 0.6),
            },
            '&.Mui-selected': {
                ...getBackgroundColor(theme.palette.info.main, theme, 0.5),
                '&:hover': {
                    ...getBackgroundColor(theme.palette.info.main, theme, 0.4),
                },
            },
        },
        '& .super-app-theme--ACCEPT': {
            ...getBackgroundColor(theme.palette.success.main, theme, 0.7),
            '&:hover': {
                ...getBackgroundColor(theme.palette.success.main, theme, 0.6),
            },
            '&.Mui-selected': {
                ...getBackgroundColor(theme.palette.success.main, theme, 0.5),
                '&:hover': {
                    ...getBackgroundColor(theme.palette.success.main, theme, 0.4),
                },
            },
        },
        '& .super-app-theme--PartiallyFilled': {
            ...getBackgroundColor(theme.palette.warning.main, theme, 0.7),
            '&:hover': {
                ...getBackgroundColor(theme.palette.warning.main, theme, 0.6),
            },
            '&.Mui-selected': {
                ...getBackgroundColor(theme.palette.warning.main, theme, 0.5),
                '&:hover': {
                    ...getBackgroundColor(theme.palette.warning.main, theme, 0.4),
                },
            },
        },
        '& .super-app-theme--REJECT': {
            ...getBackgroundColor(theme.palette.error.main, theme, 0.7),
            '&:hover': {
                ...getBackgroundColor(theme.palette.error.main, theme, 0.6),
            },
            '&.Mui-selected': {
                ...getBackgroundColor(theme.palette.error.main, theme, 0.5),
                '&:hover': {
                    ...getBackgroundColor(theme.palette.error.main, theme, 0.4),
                },
            },
        },
    }));

    const columns = [
        { field: 'loan_number', headerName: 'Loan Number', width: 120 },
        {
            field: 'bankruptcy_status',
            headerName: 'Bankruptcy Status',
            width: 170,
            editable: false,
        },
        {
            field: 'late_pmt_days',
            headerName: 'Late Payment Days',
            width: 170,
            editable: false,
        },
        {
            field: 'loan_amount',
            headerName: 'Loan Amount',
            type: 'string',
            width: 150,
            editable: false,
        },
        {
            field: 'own_credit_score',
            headerName: 'Own Credit Score',
            description: 'Own Credit Score.',
            sortable: false,
            width: 160
        },
        {
            field: 'loan_status',
            headerName: 'Loan Status',
            description: 'Loan Status.',
            sortable: false,
            width: 160,
        },
        {
            field: 'actions',
            type: 'actions',
            width: 80,
            getActions: (params) => [
                <GridActionsCellItem
                    icon={<SecurityIcon />}
                    label="Mint Token"
                    onClick={mintToken(params.id)}
                    showInMenu
                />,
                <GridActionsCellItem
                    icon={<FileCopyIcon />}
                    label="Remove Loan"
                    onClick={removeLoan(params.id)}
                    showInMenu
                />,
            ],
        }
    ];

    const bankruptcyOptions = [
        {
            value: 'No',
            label: 'No',
        },
        {
            value: 'Yes',
            label: 'Yes',
        }
    ];

    return (
        <Box sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
        }}>

            <Box sx={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                textAlign: "center",
                marginTop: '60px',
                border: 3,
                borderColor: "error.main",
                display: "inline-block",

            }}>

                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    bgcolor: 'background.paper',
                    borderRadius: 1,
                }}>
                    <Box component="span"></Box>
                    <Box component="h2">Loan Details</Box>

                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                        bgcolor: 'background.paper',
                        borderRadius: 1,
                    }}>

                        <Stack direction="row" spacing={2}>
                            <Button variant="text" onClick={handleAddDialogClickOpen} startIcon={<AddCircleTwoTone />}>Add</Button>

                            <Button variant="text" onClick={handleBulkUploadDialogClickOpen} startIcon={<CloudUploadIcon />}>Bulk Upload</Button>

                            <Button variant="text" onClick={showSnackbar} startIcon={<SyncTwoToneIcon />}>Refresh</Button>
                        </Stack>
                    </Box>
                </Box>


                <Box sx={{ height: 400, width: '100%' }}>
                    <StyledDataGrid
                        rows={rowData}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: {
                                    pageSize: 5,
                                },
                            },
                        }}
                        pageSizeOptions={[5]}
                        checkboxSelection
                        disableRowSelectionOnClick
                        getRowClassName={(params) => `super-app-theme--${params.row.loan_status}`}
                        apiRef={apiRef}
                    />

                    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                        <Alert
                            onClose={handleClose}
                            severity={severity}
                            variant="filled"
                            sx={{ width: '100%' }}
                        >
                            {message}
                        </Alert>
                    </Snackbar>
                </Box>
            </Box>

            {/* Dialog Content */}

            <Box>
                <Dialog
                    open={openAddDialog}
                    onClose={handleAddDialogClose}
                    PaperProps={{
                        component: 'form',
                        onSubmit: handleAddDialogSubmitClick,
                    }}
                >
                    <DialogTitle sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        textAlign: "center",
                        display: "inline-block",

                    }}>Submit Loan Data</DialogTitle>
                    <DialogContent>
                        <Box
                            component="form"
                            sx={{ '& .MuiTextField-root': { m: 1, width: '15ch', justifyContent: 'center' } }}
                            noValidate
                            autoComplete="off"
                        >

                            <Grid2 container spacing={3} >
                                <Grid2 container item xs={6} direction="column" >
                                    <TextField
                                        id="outlined-error-helper-text"
                                        label="Loan Number"
                                        value={loanNumber}
                                        name="loanNumber"
                                        onInput={e => setLoanNumber(e.target.value)}
                                        required
                                    />
                                    <TextField
                                        id="outlined-error-helper-text"
                                        label="Credit Score"
                                        value={creditScore}
                                        onInput={e => setCreditScore(e.target.value)}
                                        required
                                    />
                                    <TextField
                                        id="outlined-error-helper-text"
                                        label="Favorite Color"
                                        value={favouriteColor}
                                        onInput={e => setFavouriteColor(e.target.value)}
                                        required
                                    />
                                    <TextField
                                        id="outlined-error-helper-text"
                                        label="Loan Number"
                                        value={loanNumber}
                                        onInput={e => setLoanNumber(e.target.value)}
                                        required
                                    />
                                    <TextField
                                        id="outlined-error-helper-text"
                                        label="Credit Score"
                                        value={creditScore}
                                        onInput={e => setCreditScore(e.target.value)}
                                        required
                                    />
                                    <TextField
                                        id="outlined-error-helper-text"
                                        label="Favorite Color"
                                        value={favouriteColor}
                                        onInput={e => setFavouriteColor(e.target.value)}
                                        required
                                    />
                                    <TextField
                                        id="outlined-error-helper-text"
                                        label="Loan Number"
                                        value={loanNumber}
                                        onInput={e => setLoanNumber(e.target.value)}
                                        required
                                    />
                                    <TextField
                                        id="outlined-error-helper-text"
                                        label="Credit Score"
                                        value={creditScore}
                                        onInput={e => setCreditScore(e.target.value)}
                                        required
                                    />
                                    <TextField
                                        id="outlined-error-helper-text"
                                        label="Favorite Color"
                                        value={favouriteColor}
                                        onInput={e => setFavouriteColor(e.target.value)}
                                        required
                                    />
                                </Grid2>
                                <Grid2 container item xs={6} direction="column" >
                                    <TextField
                                        id="outlined-error-helper-text"
                                        label="Loan Amount"
                                        value={loanAmount}
                                        onInput={e => setLoanAmount(e.target.value)}
                                        required
                                    />
                                    <TextField
                                        id="outlined-error-helper-text"
                                        label="Late payment Days"
                                        value={latePaymentDays}
                                        onInput={e => setLatePaymentDays(e.target.value)}
                                        required
                                    />
                                    <TextField
                                        id="standard-error-helper-text"
                                        select
                                        required
                                        label="Bankruptcy Status"
                                        value={bankruptcyStatus}
                                        defaultValue="No"
                                        onChange={e => setBankruptcyStatus(e.target.value)}>

                                        {bankruptcyOptions.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                    <TextField
                                        id="outlined-error-helper-text"
                                        label="Loan Number"
                                        value={loanNumber}
                                        onInput={e => setLoanNumber(e.target.value)}
                                        required
                                    />
                                    <TextField
                                        id="outlined-error-helper-text"
                                        label="Credit Score"
                                        value={creditScore}
                                        onInput={e => setCreditScore(e.target.value)}
                                        required
                                    />
                                    <TextField
                                        id="outlined-error-helper-text"
                                        label="Favorite Color"
                                        value={favouriteColor}
                                        onInput={e => setFavouriteColor(e.target.value)}
                                        required
                                    />
                                    <TextField
                                        id="outlined-error-helper-text"
                                        label="Loan Number"
                                        value={loanNumber}
                                        onInput={e => setLoanNumber(e.target.value)}
                                        required
                                    />
                                    <TextField
                                        id="outlined-error-helper-text"
                                        label="Credit Score"
                                        value={creditScore}
                                        onInput={e => setCreditScore(e.target.value)}
                                        required
                                    />
                                    <TextField
                                        id="outlined-error-helper-text"
                                        label="Favorite Color"
                                        value={favouriteColor}
                                        onInput={e => setFavouriteColor(e.target.value)}
                                        required
                                    />
                                </Grid2>
                                <Grid2 container item xs={6} direction="column" >
                                    <TextField
                                        id="outlined-error-helper-text"
                                        label="Loan Number"
                                        value={loanNumber}
                                        onInput={e => setLoanNumber(e.target.value)}
                                        required
                                    />
                                    <TextField
                                        id="outlined-error-helper-text"
                                        label="Credit Score"
                                        value={creditScore}
                                        onInput={e => setCreditScore(e.target.value)}
                                        required
                                    />
                                    <TextField
                                        id="outlined-error-helper-text"
                                        label="Favorite Color"
                                        value={favouriteColor}
                                        onInput={e => setFavouriteColor(e.target.value)}
                                        required
                                    />
                                    <TextField
                                        id="outlined-error-helper-text"
                                        label="Loan Number"
                                        value={loanNumber}
                                        onInput={e => setLoanNumber(e.target.value)}
                                        required
                                    />
                                    <TextField
                                        id="outlined-error-helper-text"
                                        label="Credit Score"
                                        value={creditScore}
                                        onInput={e => setCreditScore(e.target.value)}
                                        required
                                    />
                                    <TextField
                                        id="outlined-error-helper-text"
                                        label="Favorite Color"
                                        value={favouriteColor}
                                        onInput={e => setFavouriteColor(e.target.value)}
                                        required
                                    />
                                    <TextField
                                        id="outlined-error-helper-text"
                                        label="Loan Number"
                                        value={loanNumber}
                                        onInput={e => setLoanNumber(e.target.value)}
                                        required
                                    />
                                    <TextField
                                        id="outlined-error-helper-text"
                                        label="Credit Score"
                                        value={creditScore}
                                        onInput={e => setCreditScore(e.target.value)}
                                        required
                                    />
                                    <TextField
                                        id="outlined-error-helper-text"
                                        label="Favorite Color"
                                        value={favouriteColor}
                                        onInput={e => setFavouriteColor(e.target.value)}
                                        required
                                    />
                                </Grid2>
                            </Grid2>
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleAddDialogClose}>Cancel</Button>
                        <Button type="submit">Submit</Button>
                    </DialogActions>
                </Dialog>
            </Box>
            <Box>
                <Dialog
                    fullWidth="sm"
                    maxWidth="sm"
                    open={openBulkUploadDialog}
                    onClose={handleBulkUploadDialogClose}
                    PaperProps={{
                        component: 'form',
                        onSubmit: handleBulkUploadDialogSubmitClick,
                    }}
                >
                    <DialogTitle sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        textAlign: "center",
                        display: "inline-block",

                    }}>Upload Loan Data Through .xls File</DialogTitle>
                    <DialogContent>
                        <Box
                            component="form"
                            sx={{ '& .MuiTextField-root': { m: 1, width: '15ch', justifyContent: 'center' } }}
                            noValidate
                            autoComplete="off"
                        >

                            <Grid2 container spacing={2} >
                                <Grid2 container item xs={6} direction="column" >
                                    <Typography>Upload XLS file:</Typography>
                                </Grid2>
                                <Grid2 container item xs={6} direction="column" >
                                    <Button
                                        component="label"
                                        role={undefined}
                                        variant="contained"
                                        tabIndex={-1}
                                        startIcon={<CloudUploadIcon />}
                                    >
                                        Upload file
                                        <VisuallyHiddenInput
                                            type="file"
                                            onChange={handleBulkUploadDialogSubmitClick}
                                            multiple
                                        />
                                    </Button>
                                </Grid2>
                            </Grid2>
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleBulkUploadDialogClose}>Cancel</Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </Box>
    );
};

export default LoanWareHousing;