import React from 'react';
import { Drawer, List, ListItemButton, ListItemIcon } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import TimelineIcon from '@mui/icons-material/Timeline';
import BuildIcon from '@mui/icons-material/Build';

export default function SideNav({ open = true, onSelect = () => {}, current = 'dashboard' }) {
  const items = [
    { id: 'dashboard', label: 'Dashboard', icon: <DashboardIcon /> },
    { id: 'devices', label: 'Devices', icon: <PhoneIphoneIcon /> },
    { id: 'analytics', label: 'Analytics', icon: <TimelineIcon /> },
    { id: 'tools', label: 'Task Builder', icon: <BuildIcon /> },
  ];

  return (
    <Drawer variant="permanent" open sx={{ width: 72, '& .MuiDrawer-paper': { width: 72, bgcolor: 'transparent', borderRight: 'none' } }}>
      <List sx={{ mt: 2 }}>
        {items.map(it => (
          <ListItemButton key={it.id} selected={current === it.id} onClick={() => onSelect(it.id)} sx={{ justifyContent: 'center', mb: 1 }}>
            <ListItemIcon sx={{ color: 'white' }}>{it.icon}</ListItemIcon>
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
}

