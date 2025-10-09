import React, { useState, useMemo } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  AppBar,
  Toolbar,
  Typography,
  Box,
  Breadcrumbs,
  Link,
  Tooltip,
  Chip,
  useTheme
} from '@mui/material';
import {
  Home,
  Dashboard,
  Devices,
  PlayArrow,
  Psychology,
  TrendingUp,
  Store,
  Description,
  Settings,
  AccountCircle,
  Menu as MenuIcon,
  Circle as CircleIcon
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const menuItems = [
  { title: 'Home', path: '/', icon: <Home />, description: 'Landing page and overview' },
  { title: 'Dashboard', path: '/dashboard', icon: <Dashboard />, description: 'Real-time system monitoring' },
  { title: 'Device Manager', path: '/devices', icon: <Devices />, description: 'Manage Android/iOS devices' },
  { title: 'Task Execution', path: '/tasks', icon: <PlayArrow />, description: 'Create and monitor automation tasks' },
  { title: 'AI Training', path: '/ai-training', icon: <Psychology />, description: 'RL training and model management' },
  { title: 'Analytics', path: '/analytics', icon: <TrendingUp />, description: 'Performance metrics and insights' },
  { title: 'Marketplace', path: '/marketplace', icon: <Store />, description: 'Workflow plugins and extensions' },
  { title: 'Documentation', path: '/docs', icon: <Description />, description: 'API docs and guides' },
  { title: 'Settings', path: '/settings', icon: <Settings />, description: 'System configuration' },
  { title: 'Profile', path: '/profile', icon: <AccountCircle />, description: 'User account' },
];

const StatusIndicator = ({ label = 'OK', color = 'success' }) => (
  <Tooltip title={`System status: ${label}`}>
    <Chip label={label} color={color} size="small" sx={{ ml: 1 }} />
  </Tooltip>
);

const BreadcrumbsNav = ({ location }) => {
  const pathnames = location.pathname.split('/').filter((x) => x);
  return (
    <Breadcrumbs aria-label="breadcrumb" sx={{ color: 'text.secondary' }}>
      <Link underline="hover" color="inherit" href="#" onClick={(e) => e.preventDefault()} aria-current={pathnames.length === 0 ? 'page' : undefined}>
        Home
      </Link>
      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        return (
          <Typography key={to} color={isLast ? 'text.primary' : 'text.secondary'} sx={{ fontSize: 13 }}>
            {value.replace(/-/g, ' ')}
          </Typography>
        );
      })}
    </Breadcrumbs>
  );
};

const Navigation = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();

  const handleDrawerToggle = () => setDrawerOpen(!drawerOpen);
  const handleNavigation = (path) => {
    navigate(path);
    setDrawerOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  const status = useMemo(() => ({ label: 'Healthy', color: 'success' }), []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky" elevation={4} sx={{
        background: 'linear-gradient(90deg, rgba(10,10,10,1) 30%, rgba(0,230,118,0.08) 60%, rgba(33,150,243,0.12) 100%)'
      }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleDrawerToggle} sx={{ mr: 1 }}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" sx={{ fontWeight: 700, letterSpacing: 1 }}>
              AutoRL Platform
            </Typography>
            <Box sx={{ ml: 2 }}>
              <StatusIndicator label={status.label} color={status.color} />
            </Box>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <BreadcrumbsNav location={location} />
            <IconButton color="inherit" aria-label="account" onClick={() => navigate('/profile')}>
              <AccountCircle />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle}>
        <Box sx={{ width: 280, bgcolor: theme.palette.background.paper }} role="presentation">
          <Box sx={{ p: 2, borderBottom: `1px solid ${theme.palette.divider}` }}>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>AutoRL</Typography>
            <Typography variant="body2" color="text.secondary">AI Agent Platform</Typography>
          </Box>
          <List>
            {menuItems.map((item) => (
              <ListItem button key={item.title} selected={isActive(item.path)} onClick={() => handleNavigation(item.path)}>
                <ListItemIcon sx={{ color: isActive(item.path) ? theme.palette.primary.main : 'inherit' }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.title} secondary={item.description} />
              </ListItem>
            ))}
          </List>
          <Box sx={{ p: 2, mt: 'auto' }}>
            <Typography variant="caption" color="text.secondary">v0.1 • Enterprise preview</Typography>
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
};

export default Navigation;
