import React from 'react';
import { Box, Container, Typography, Card, CardContent, Avatar, TextField, Button } from '@mui/material';

const Profile = () => (
  <Box sx={{ pt: 10, pb: 4 }}>
    <Container maxWidth="md">
      <Typography variant="h4" fontWeight="bold" sx={{ mb: 4 }}>
        User Profile
      </Typography>
      <Card>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Avatar sx={{ width: 80, height: 80, mr: 3, bgcolor: 'primary.main' }}>U</Avatar>
            <Box>
              <Typography variant="h6">AutoRL User</Typography>
              <Typography color="text.secondary">Premium Account</Typography>
            </Box>
          </Box>
          <TextField label="Display Name" fullWidth sx={{ mb: 2 }} />
          <TextField label="Email" fullWidth sx={{ mb: 2 }} />
          <Button variant="contained">Update Profile</Button>
        </CardContent>
      </Card>
    </Container>
  </Box>
);

export default Profile;
