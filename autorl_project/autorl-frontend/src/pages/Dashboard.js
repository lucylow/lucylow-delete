import React, { useState } from 'react';
import { Box, Container, Typography, Card, CardContent, Grid, Button } from '@mui/material';
import { TrendingUp, CheckCircle, Devices } from '@mui/icons-material';
import LiveAgentActivity from '../components/dashboard/LiveAgentActivity';
import PerformanceCharts from '../components/dashboard/PerformanceCharts';

const Dashboard = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [systemStats, setSystemStats] = useState({
    activeTasks: 8,
    successRate: 94.7,
    devicesOnline: 12,
    episodesToday: 156
  });

  const [recentTasks, setRecentTasks] = useState([
    { id: 'task-001', instruction: 'Send money via Venmo', status: 'completed', device: 'Pixel 7', duration: '45s' },
    { id: 'task-002', instruction: 'Book Uber ride', status: 'in_progress', device: 'iPhone 14', duration: '1m 20s' },
    { id: 'task-003', instruction: 'Order food delivery', status: 'failed', device: 'Galaxy S23', duration: '2m 15s' },
    { id: 'task-004', instruction: 'Check calendar', status: 'completed', device: 'Pixel 6a', duration: '28s' },
  ]);

  return (
    <Box sx={{ pt: 10, pb: 4 }}>
      <Container maxWidth="xl">
        <Typography variant="h4" fontWeight="bold" sx={{ mb: 4 }}>
          Dashboard
        </Typography>
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={4}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <TrendingUp color="primary" />
                    <Typography variant="h6">{systemStats.successRate}%</Typography>
                    <Typography variant="body2" color="text.secondary">Success Rate</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <Devices color="secondary" />
                    <Typography variant="h6">{systemStats.devicesOnline}</Typography>
                    <Typography variant="body2" color="text.secondary">Devices Online</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12}>
                <LiveAgentActivity />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} md={8}>
            <PerformanceCharts />
          </Grid>
        </Grid>
        <Typography variant="h6" sx={{ mb: 2 }}>Recent Tasks</Typography>
        <Grid container spacing={2}>
          {recentTasks.map((task) => (
            <Grid item xs={12} sm={6} md={3} key={task.id}>
              <Card>
                <CardContent>
                  <Typography variant="body1" fontWeight="bold">{task.instruction}</Typography>
                  <Typography variant="body2" color="text.secondary">Device: {task.device}</Typography>
                  <Typography variant="body2" color="text.secondary">Status: {task.status}</Typography>
                  <Typography variant="body2" color="text.secondary">Duration: {task.duration}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Button variant="contained" color="primary">Refresh</Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Dashboard;
