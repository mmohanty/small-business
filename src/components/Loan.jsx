import { Box, Button, FormControl, Grid2, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React, { useState } from 'react';
import axios from "axios";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import SendIcon from '@mui/icons-material/Send';

export default function Loan() {

    const [loanNumber, setLoanNumber] = useState('123');
    const [loanAmount, setLoanAmount] = useState('50000');
    const [creditScore, setCreditScore] = useState('750');
    const [latePaymentDays, setLatePaymentDays] = useState('30');
    const [favouriteColor, setFavouriteColor] = useState('Blue');
    const [bankruptcyStatus, setBankruptcyStatus] = useState('No');

    const [open, setOpen] = React.useState(false);
    const [severity, setSeverity] = React.useState('success');
    const [message, setMessage] = React.useState('Loan created successfully');


    const handleBankruptcyChange = (event) => {
        setBankruptcyStatus(event.target.value);
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


    const submitHandler = (e) => {
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
    }

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
                <Box component="h2">Submit Loan Data on chain</Box>
                <Box
                    component="form"
                    onSubmit={submitHandler}
                    sx={{ '& .MuiTextField-root': { m: 1, width: '30ch', justifyContent: 'center' } }}
                    noValidate
                    autoComplete="off"
                >

                    <Grid2 container spacing={2} >
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
                        </Grid2>
                    </Grid2>
                    <Button type="submit" variant="contained" endIcon={<SendIcon />}>Submit</Button>
                </Box>

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
    );
}