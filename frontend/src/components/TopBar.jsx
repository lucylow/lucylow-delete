import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Box, Switch, Tooltip } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

export default function TopBar({ darkMode = true, toggleDark = () => {} }) {
  return (
    <AppBar position="static" sx={{ background: 'transparent', boxShadow: 'none' }}>
      <Toolbar sx={{ px: 0 }}>
        <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          AutoRL — Agent Dashboard
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Tooltip title="Toggle theme">
            <Switch checked={darkMode} onChange={toggleDark} color="default" />
          </Tooltip>
          {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

