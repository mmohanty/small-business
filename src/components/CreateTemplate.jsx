import React, { useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import Header from "./Header";
import MenuContext from "./MenuContext";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

const CreateTemplate = () => {

    const [rows, setRows] = useState([{}]);

    const handleChange = (idx) => (e) => {
        const { name, value } = e.target;
        const newRows = [...rows];
        newRows[idx] = {
            ...newRows[idx],
            [name]: value,
        };
        setRows(newRows);
    };

    const handleAddRow = () => {
        const item = {
            name: "",
            mobile: "",
        };
        setRows([...rows, item]);
    };

    const handleRemoveRow = () => {
        setRows(rows.slice(0, -1));
    };

    const handleRemoveSpecificRow = (idx) => () => {
        const newRows = [...rows];
        newRows.splice(idx, 1);
        setRows(newRows);
    };


    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        ...theme.applyStyles('dark', {
            backgroundColor: '#1A2027',
        }),
    }));

    return (
        <div>
            <MenuContext.Provider value="AssetManager">
                <Header />
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Box>
                        <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                            Create Template
                        </Typography>
                    </Box>

                    <Box><Stack spacing={2}>
                        <Item>Item 1</Item>
                        <Item>Item 2</Item>
                        <Item>Item 3</Item>
                    </Stack></Box>

                </Box>
            </MenuContext.Provider>
        </div>
    );
};

export default CreateTemplate;