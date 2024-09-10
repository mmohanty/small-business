import React from "react";
import { Box, Typography } from "@mui/material";
import Header from "./Header";
import MenuContext from "./MenuContext";

const BulkUpload = () => {

    return (
        <div>
        <MenuContext.Provider value="AssetManager">
            <Header />
            <Box sx={{ display: 'flex' }}>
                <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                    Bulk Upload
                </Typography>
            </Box>
        </MenuContext.Provider>
    </div>
    )   

}

export default BulkUpload;