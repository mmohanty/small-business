import { Box, Typography } from "@mui/material";
import MenuContext from "./MenuContext";
import Header from "./Header";


const AssetManager = () => {
    return (

        <div>
            <MenuContext.Provider value="AssetManager">
                <Header />
                <Box sx={{ display: 'flex' }}>
                    <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                        Asset Manager
                    </Typography>
                </Box>
            </MenuContext.Provider>
        </div>

    )
};
export default AssetManager;