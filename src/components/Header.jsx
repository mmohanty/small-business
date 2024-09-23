import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Tooltip, Avatar, Box, Menu, MenuItem, Badge } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import MenuContext from './MenuContext';
import MailIcon from '@mui/icons-material/Mail';

const Header = ({ toggleDrawer }) => {

    const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

    const sharedValue = React.useContext(MenuContext);
    const [anchorElUser, setAnchorElUser] = React.useState(null);


    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };


    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="fixed" sx={{ bgcolor: "#d71e28", borderBottom: "4px solid #ffcd41" }}>

            <Toolbar>
                {/* Left Drawer Button */}
                <IconButton edge="start" color="inherit" onClick={toggleDrawer(true)}>
                    <MenuIcon />
                </IconButton>

                {/* Company Logo */}
                <Typography
                    variant="h6"
                    noWrap
                    component="a"
                    href="/home"
                    sx={{
                        mr: 2,
                        display: { xs: 'none', md: 'flex' },
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                    }}
                >
                    <img src="/images/logos/wf.webp" alt="logo" />
                </Typography>

                {/* Right Menu Items */}
                <Box sx={{ display: 'flex', alignItems: 'center', ml: 'auto' }}>
                    <IconButton color="inherit">
                        <Badge badgeContent={4} color="info">
                            <MailIcon />
                        </Badge>
                    </IconButton>
                    <Tooltip title="Open settings">
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                            <Avatar alt="Asset Manager" src="/static/images/avatar/2.jpg" />
                        </IconButton>
                    </Tooltip>
                    <Menu
                        sx={{ mt: '45px', ml: 'auto' }}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                    >
                        {settings.map((setting) => (
                            <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                            </MenuItem>
                        ))}
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
