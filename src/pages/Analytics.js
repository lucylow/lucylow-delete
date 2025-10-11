import React from 'react';
import { Box, Container, Typography, Grid, Card, CardContent } from '@mui/material';
import { TrendingUp } from '@mui/icons-material';

const Analytics = () => (
  <Box sx={{ pt: 10, pb: 4 }}>
    <Container maxWidth="xl">
      <Typography variant="h4" fontWeight="bold" sx={{ mb: 4 }}>
        Analytics & Insights
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <TrendingUp sx={{ mr: 1 }} />
                <Typography variant="h6">Performance Analytics Coming Soon</Typography>
              </Box>
              <Typography color="text.secondary">
                Advanced analytics dashboard with task success trends, device utilization, 
                RL training progress, and cross-app automation insights.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  </Box>
);

export default Analytics;
