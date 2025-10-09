import React, { useState } from 'react';
import { Box, Container, Typography, Card, CardContent, Grid, Button, Avatar } from '@mui/material';
import { Devices } from '@mui/icons-material';

const DeviceManager = () => {
  const [devices, setDevices] = useState([
    { id: 'android_pixel_7_1', name: 'Pixel 7', platform: 'Android', status: 'active', battery: 87, connection: 'WiFi' },
    { id: 'iphone_14_1', name: 'iPhone 14', platform: 'iOS', status: 'active', battery: 65, connection: 'Cellular' },
    { id: 'android_galaxy_s23', name: 'Galaxy S23', platform: 'Android', status: 'busy', battery: 92, connection: 'WiFi' },
    { id: 'android_emulator_1', name: 'Android Emulator', platform: 'Android', status: 'offline', battery: 100, connection: 'Ethernet' },
  ]);

  return (
    <Box sx={{ pt: 10, pb: 4 }}>
      <Container maxWidth="xl">
        <Typography variant="h4" fontWeight="bold" sx={{ mb: 4 }}>
          Device Manager
        </Typography>
        <Grid container spacing={3}>
          {devices.map((device) => (
            <Grid item xs={12} sm={6} md={3} key={device.id}>
              <Card>
                <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Avatar sx={{ bgcolor: device.status === 'active' ? 'success.main' : device.status === 'busy' ? 'warning.main' : 'grey.500', mb: 2 }}>
                    <Devices />
                  </Avatar>
                  <Typography variant="h6">{device.name}</Typography>
                  <Typography variant="body2" color="text.secondary">Platform: {device.platform}</Typography>
                  <Typography variant="body2" color="text.secondary">Status: {device.status}</Typography>
                  <Typography variant="body2" color="text.secondary">Battery: {device.battery}%</Typography>
                  <Typography variant="body2" color="text.secondary">Connection: {device.connection}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Button variant="contained" color="primary">Add Device</Button>
        </Box>
      </Container>
    </Box>
  );
};

export default DeviceManager;
