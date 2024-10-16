import React from 'react';
import { Button, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import {
    DataGrid, GridRowModes, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector,
    GridToolbarExport, GridToolbarFilterButton
} from '@mui/x-data-grid';
import {
    randomId,
} from '@mui/x-data-grid-generator';

const Contact = () => {

    const initialRows = [
        { id: 1, lastName: 'Snow', firstName: 'Jon', age: 14 },
        { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 31 },
        { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 31 },
        { id: 4, lastName: 'Stark', firstName: 'Arya', age: 11 },
        { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
        { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
        { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
        { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
        { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
    ];

    const [rows, setRows] = React.useState(initialRows);
    const [rowModesModel, setRowModesModel] = React.useState({});

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
            field: 'firstName',
            headerName: 'First name',
            width: 150,
            editable: true,
        },
        {
            field: 'lastName',
            headerName: 'Last name',
            width: 150,
            editable: true,
        },
        {
            field: 'age',
            headerName: 'Age',
            type: 'number',
            width: 110,
            editable: true,
        },
        {
            field: 'fullName',
            headerName: 'Full name',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 160,
            valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`, // Correct valueGetter
        },
    ];


    const CustomToolbar = (props) => {

        const { setRows, setRowModesModel } = props;

        const handleAddClick = () => {
            const id = randomId();
            setRows((oldRows) => [
                ...oldRows,
                { id, firstName: '', lastName: '', fullName: '', age: '' },
            ]);
            setRowModesModel((oldModel) => ({
                ...oldModel,
                [id]: { mode: GridRowModes.Edit, fieldToFocus: 'firstName' },
            }));
        };

        return (
            <GridToolbarContainer>
                <GridToolbarColumnsButton />
                <GridToolbarFilterButton />
                <GridToolbarDensitySelector
                    slotProps={{ tooltip: { title: 'Change density' } }}
                />
                <GridToolbarExport
                    slotProps={{
                        tooltip: { title: 'Export data' },
                        button: { variant: 'outlined' },
                    }}
                />
                <Box sx={{ flexGrow: 1 }} />
                <Button variant="contained" color="primary" sx={{ marginRight: 1 }} onClick={handleAddClick}>
                    Add Row
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    sx={{ marginRight: 1 }}
                    onClick={() => {
                        document.querySelector('[data-testid="Export CSV"]').click();
                    }}
                >
                    Export Data
                </Button>
                <Button variant="outlined" color="info">
                    Refresh
                </Button>
            </GridToolbarContainer>
        );
    };

    return (
        <Box>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center', // Horizontally center
                    alignItems: 'center', // Vertically center
                    textAlign: 'center', // Text align to center
                }}
            >
                <Typography variant="h4">
                    Contacts
                </Typography>
            </Box>

            <Box
                sx={{
                    height: { xs: '60vh', sm: '70vh', md: '80vh' }, // Responsive height
                    width: { xs: '95%', sm: '95%', md: '95%' },
                    border: "1px solid black",
                    marginLeft: { xs: '25px', sm: '35px', md: '70px' }, // Shifting the container slightly to the right
                    marginTop: '20px', // Space from the top
                }}
            >
                <DataGrid
                    rows={rows}
                    columns={columns}
                    slots={{
                        toolbar: CustomToolbar, // Custom Toolbar
                    }}
                    slotProps={{
                        toolbar: { setRows, setRowModesModel },
                    }}
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
                />
            </Box>
        </Box>
    );
};

export default Contact;
