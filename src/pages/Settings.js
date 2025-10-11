import React from 'react';
import { Box, Container, Typography, Card, CardContent, Switch, FormControlLabel } from '@mui/material';

const Settings = () => (
  <Box sx={{ pt: 10, pb: 4 }}>
    <Container maxWidth="md">
      <Typography variant="h4" fontWeight="bold" sx={{ mb: 4 }}>
        Settings
      </Typography>
      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 3 }}>System Configuration</Typography>
          <FormControlLabel control={<Switch defaultChecked />} label="Enable RL Training" />
          <br/>
          <FormControlLabel control={<Switch defaultChecked />} label="PII Masking" />
          <br/>
          <FormControlLabel control={<Switch />} label="Debug Mode" />
        </CardContent>
      </Card>
    </Container>
  </Box>
);

export default Settings;
