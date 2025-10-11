import React from 'react';
import { Box, Container, Typography, Grid, Card, CardContent, List, ListItem, ListItemText } from '@mui/material';
import { Description } from '@mui/icons-material';

const Documentation = () => (
  <Box sx={{ pt: 10, pb: 4 }}>
    <Container maxWidth="xl">
      <Typography variant="h4" fontWeight="bold" sx={{ mb: 4 }}>
        Documentation
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>API Reference</Typography>
              <List>
                <ListItem><ListItemText primary="POST /api/v1/execute" secondary="Execute mobile automation task" /></ListItem>
                <ListItem><ListItemText primary="GET /api/v1/devices" secondary="List connected devices" /></ListItem>
                <ListItem><ListItemText primary="GET /api/v1/tasks/{id}" secondary="Get task status" /></ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>Quick Start</Typography>
              <Typography variant="body2" color="text.secondary">
                1. Connect your Android/iOS device<br/>
                2. Create a natural language task<br/>
                3. Monitor real-time execution<br/>
                4. Review performance analytics
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  </Box>
);

export default Documentation;
