import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, AppBar, Toolbar, Typography, Box } from '@mui/material';
import { Home, Dashboard, Devices, PlayArrow, Psychology, Analytics, Store, Description, Settings, AccountCircle, Menu as MenuIcon } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const menuItems = [
  { title: 'Home', path: '/', icon: <Home />, description: 'Landing page and overview' },
  { title: 'Dashboard', path: '/dashboard', icon: <Dashboard />, description: 'Real-time system monitoring' },
  { title: 'Device Manager', path: '/devices', icon: <Devices />, description: 'Manage Android/iOS devices' },
  { title: 'Task Execution', path: '/tasks', icon: <PlayArrow />, description: 'Create and monitor automation tasks' },
  { title: 'AI Training', path: '/ai-training', icon: <Psychology />, description: 'RL training and model management' },
  { title: 'Analytics', path: '/analytics', icon: <Analytics />, description: 'Performance metrics and insights' },
  { title: 'Marketplace', path: '/marketplace', icon: <Store />, description: 'Workflow plugins and extensions' },
  { title: 'Documentation', path: '/docs', icon: <Description />, description: 'API docs and guides' },
  { title: 'Settings', path: '/settings', icon: <Settings />, description: 'System configuration' },
  { title: 'Profile', path: '/profile', icon: <AccountCircle />, description: 'User account' },
];

const Navigation = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleDrawerToggle = () => setDrawerOpen(!drawerOpen);
  const handleNavigation = (path) => {
    navigate(path);
    setDrawerOpen(false);
  };
  const isActive = (path) => location.pathname === path;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="default" elevation={1} sx={{ background: 'linear-gradient(90deg, #0a0a0a 60%, #2196f3 100%)' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleDrawerToggle} sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700, letterSpacing: 1 }}>
            AutoRL Platform
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle}>
        <Box sx={{ width: 260 }} role="presentation" onClick={handleDrawerToggle}>
          <List>
            {menuItems.map((item) => (
              <ListItem button key={item.title} selected={isActive(item.path)} onClick={() => handleNavigation(item.path)}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.title} secondary={item.description} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
};

export default Navigation;
