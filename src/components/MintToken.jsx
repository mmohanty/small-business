import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import SecurityIcon from '@mui/icons-material/Security';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import axios from "axios";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';


import { darken, lighten, styled } from '@mui/material/styles';

const MintToken = () => {

  const [rowData, setRowData] = useState();

  const [open, setOpen] = React.useState(false);
  const [severity, setSeverity] = React.useState('success');
  const [message, setMessage] = React.useState('Loan Token minted successfully');

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
      }
    ).catch(error => {
      console.error(error);
    })
  }, [])


  const mintToken = React.useCallback(
    (id) => () => {
      setTimeout(() => {
        //setRows((prevRows) => prevRows.filter((row) => row.id !== id));
        var row = rowData.find((row) => row.id === id);
        console.log(row);
        const mintData = {
          loan_number: row.loan_number,
          cdfi: ""
        };
        axios.post("https://reqres.in/api/login", mintData,
          { headers: { "Content-Type": "application/json" } }
        ).then((response) => {
          console.log(response.status, response.data.token);
        }).catch((error) => {
          if (error.response) {
            console.log(error.response);
            console.log("server responded");
          } else if (error.request) {
            console.log("network error");
          } else {
            console.log(error);
          }
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

      <Box component="h2">Loan Details</Box>
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
    </Box>
  );
};

export default MintToken;