import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Badge, Box, Drawer, List, ListItem, Divider, Button } from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';

const Header = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [notifications, setNotifications] = useState([
        { id: 1, type: 'Alert', title: '[APM 500 Server errors] is now active', time: '3 min ago', status: 'Unread' },
        { id: 2, type: 'Background Search', title: '[Flights] Flight Count and Average Ticket Price', time: '4 min ago', status: 'Unread' },
        { id: 3, type: 'Report', title: '2020 Global Marketing Analysis', time: '12 min ago', status: 'Unread' },
        { id: 4, type: 'Alert', title: 'Index Threshold Alert', time: '12 min ago', status: 'Unread' },
    ]);

    // Toggle drawer open/close
    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerOpen(open);
    };

    // Mark all notifications as read
    const markAllAsRead = () => {
        setNotifications(notifications.map(n => ({ ...n, status: 'Read' })));
    };

    // Handle refresh
    const handleRefresh = () => {
        // For now, it's just a placeholder for the refresh functionality.
        console.log('Notifications refreshed');
    };

    const NotificationItem = ({ notification }) => (
        <ListItem sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
                <Typography variant="body2" sx={{ fontWeight: notification.status === 'Unread' ? 'bold' : 'normal' }}>
                    {notification.type === 'Alert' && <span>[Alert] </span>}
                    {notification.type === 'Background Search' && <span>[Background Search] </span>}
                    {notification.type === 'Report' && <span>[Report] </span>}
                    {notification.title}
                </Typography>
                <Typography variant="caption" sx={{ color: 'gray' }}>{notification.time}</Typography>
            </Box>
            <Button size="small">Read</Button>
        </ListItem>
    );

    return (
        <>
            <AppBar position="fixed" sx={{ bgcolor: "#3a9ad9", borderBottom: "4px solid #ffcd41" }}>
                <Toolbar>
                    {/* Company Logo */}
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/home"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                            paddingLeft: { xs: '20px', md: '50px' } // Responsive padding
                        }}
                    >
                        LOAN WAREHOUSE
                    </Typography>

                    {/* Right Menu Items */}
                    <Box sx={{ display: 'flex', alignItems: 'center', ml: 'auto' }}>
                        <IconButton color="inherit" onClick={toggleDrawer(true)}>
                            <Badge badgeContent={notifications.length} color="info">
                                <MailIcon />
                            </Badge>
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>

            {/* Right Drawer for Pending Actions */}
            <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
                <Box sx={{ width: 350, padding: 2 }}>
                    {/* Read All and Refresh Buttons */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Button size="small" variant="outlined" onClick={markAllAsRead}>
                            Read All
                        </Button>
                        <Button size="small" onClick={handleRefresh}>
                            Refresh
                        </Button>
                    </Box>

                    <Typography variant="body1" sx={{ marginBottom: 2 }}>You have {notifications.length} new suggestions</Typography>

                    <List>
                        {notifications.map(notification => (
                            <React.Fragment key={notification.id}>
                                <NotificationItem notification={notification} />
                                <Divider />
                            </React.Fragment>
                        ))}
                    </List>

                    {/* Footer with Open Notification Center */}
                    <Divider />
                    <Box sx={{ display: 'flex', justifyContent: 'center', padding: 2 }}>
                        <Button variant="outlined" onClick={() => console.log('Opening Notification Center')}>
                            Open Notification Center
                        </Button>
                    </Box>
                </Box>
            </Drawer>
        </>
    );
};

export default Header;
