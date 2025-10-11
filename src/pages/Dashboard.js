import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Card, 
  CardContent, 
  Grid, 
  Button, 
  Chip,
  IconButton,
  LinearProgress,
  Paper,
  Divider,
  useTheme,
} from '@mui/material';
import { 
  TrendingUp, 
  CheckCircle, 
  Devices, 
  PlayArrow,
  Refresh,
  Speed,
  Psychology,
  ErrorOutline,
  AccessTime,
} from '@mui/icons-material';
import LiveAgentActivity from '../components/dashboard/LiveAgentActivity';
import PerformanceCharts from '../components/dashboard/PerformanceCharts';

const Dashboard = () => {
  const theme = useTheme();
  const [systemStats] = useState({
    activeTasks: 8,
    successRate: 94.7,
    devicesOnline: 12,
    episodesToday: 156,
    avgResponseTime: '1.2s',
    policyVersion: 'v2.3.1',
  });

  const [recentTasks] = useState([
    { id: 'task-001', instruction: 'Send money via Venmo', status: 'completed', device: 'Pixel 7', duration: '45s', progress: 100 },
    { id: 'task-002', instruction: 'Book Uber ride', status: 'in_progress', device: 'iPhone 14', duration: '1m 20s', progress: 65 },
    { id: 'task-003', instruction: 'Order food delivery', status: 'failed', device: 'Galaxy S23', duration: '2m 15s', progress: 30 },
    { id: 'task-004', instruction: 'Check calendar', status: 'completed', device: 'Pixel 6a', duration: '28s', progress: 100 },
    { id: 'task-005', instruction: 'Post Instagram story', status: 'in_progress', device: 'iPhone 13', duration: '55s', progress: 40 },
    { id: 'task-006', instruction: 'Reply to email', status: 'completed', device: 'Pixel 8', duration: '1m 5s', progress: 100 },
  ]);

  const [animatedStats, setAnimatedStats] = useState({
    successRate: 0,
    devicesOnline: 0,
    activeTasks: 0,
    episodesToday: 0,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedStats(systemStats);
    }, 100);
    return () => clearTimeout(timer);
  }, [systemStats]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return theme.palette.info.main;
      case 'in_progress':
        return theme.palette.primary.main;
      case 'failed':
        return theme.palette.error.main;
      default:
        return theme.palette.text.secondary;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle sx={{ color: theme.palette.info.main }} />;
      case 'in_progress':
        return <PlayArrow sx={{ color: theme.palette.primary.main }} />;
      case 'failed':
        return <ErrorOutline sx={{ color: theme.palette.error.main }} />;
      default:
        return null;
    }
  };

  const StatCard = ({ icon: Icon, value, label, trend, color }) => (
    <Card 
      sx={{ 
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.3s',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: `0 12px 24px ${color}40`,
        },
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: `linear-gradient(90deg, ${color} 0%, ${color}80 100%)`,
        }
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Box 
            sx={{ 
              p: 1.5, 
              borderRadius: 2, 
              bgcolor: `${color}15`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Icon sx={{ fontSize: 32, color }} />
          </Box>
          {trend && (
            <Chip 
              label={trend} 
              size="small" 
              sx={{ 
                bgcolor: `${color}20`,
                color: color,
                fontWeight: 600,
              }} 
            />
          )}
        </Box>
        <Typography variant="h3" fontWeight="700" sx={{ color, mb: 0.5 }}>
          {value}
        </Typography>
        <Typography variant="body2" color="text.secondary" fontWeight="500">
          {label}
        </Typography>
      </CardContent>
    </Card>
  );

  return (
    <Box sx={{ pt: 10, pb: 4, minHeight: '100vh' }}>
      <Container maxWidth="xl">
        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 4 }}>
          <Box>
            <Typography 
              variant="h3" 
              fontWeight="700" 
              sx={{
                background: 'linear-gradient(135deg, #42a5f5 0%, #1e88e5 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 1,
              }}
            >
              Command Center
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Real-time AI agent monitoring & control
            </Typography>
          </Box>
          <Button 
            variant="contained" 
            startIcon={<Refresh />}
            sx={{
              px: 3,
              py: 1.5,
              background: 'linear-gradient(135deg, #1e88e5 0%, #1565c0 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #42a5f5 0%, #1e88e5 100%)',
                transform: 'scale(1.05)',
              },
              transition: 'all 0.3s',
            }}
          >
            Refresh Data
          </Button>
        </Box>

        {/* Stat Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} lg={3}>
            <StatCard 
              icon={TrendingUp}
              value={`${systemStats.successRate}%`}
              label="Success Rate"
              trend="+5.2%"
              color={theme.palette.info.main}
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <StatCard 
              icon={Devices}
              value={systemStats.devicesOnline}
              label="Devices Online"
              trend="+2"
              color={theme.palette.primary.main}
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <StatCard 
              icon={PlayArrow}
              value={systemStats.activeTasks}
              label="Active Tasks"
              color={theme.palette.secondary.main}
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <StatCard 
              icon={Psychology}
              value={systemStats.episodesToday}
              label="Episodes Today"
              trend="+12%"
              color={theme.palette.info.light}
            />
          </Grid>
        </Grid>

        {/* Main Content Area */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {/* Left Column - Activity & Stats */}
          <Grid item xs={12} lg={4}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <LiveAgentActivity />
              </Grid>
              <Grid item xs={12}>
                <Card>
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="h6" fontWeight="600" sx={{ mb: 3 }}>
                      System Performance
                    </Typography>
                    <Box sx={{ mb: 3 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2" color="text.secondary">Response Time</Typography>
                        <Typography variant="body2" fontWeight="600" color="primary">{systemStats.avgResponseTime}</Typography>
                      </Box>
                      <LinearProgress 
                        variant="determinate" 
                        value={85} 
                        sx={{ 
                          height: 8, 
                          borderRadius: 4,
                          bgcolor: 'rgba(30, 136, 229, 0.1)',
                          '& .MuiLinearProgress-bar': {
                            background: 'linear-gradient(90deg, #1e88e5 0%, #42a5f5 100%)',
                          }
                        }} 
                      />
                    </Box>
                    <Box sx={{ mb: 3 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2" color="text.secondary">Policy Version</Typography>
                        <Chip 
                          label={systemStats.policyVersion} 
                          size="small" 
                          color="primary" 
                          variant="outlined"
                        />
                      </Box>
                    </Box>
                    <Divider sx={{ my: 2 }} />
                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <Box sx={{ flex: 1, textAlign: 'center' }}>
                        <Typography variant="h4" color="info.main" fontWeight="700">98.2%</Typography>
                        <Typography variant="caption" color="text.secondary">Uptime</Typography>
                      </Box>
                      <Box sx={{ flex: 1, textAlign: 'center' }}>
                        <Typography variant="h4" color="primary.main" fontWeight="700">2.4M</Typography>
                        <Typography variant="caption" color="text.secondary">Actions</Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>

          {/* Right Column - Charts */}
          <Grid item xs={12} lg={8}>
            <PerformanceCharts />
          </Grid>
        </Grid>

        {/* Recent Tasks */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h5" fontWeight="600" sx={{ mb: 3 }}>
            Recent Task Execution
          </Typography>
          <Grid container spacing={2}>
            {recentTasks.map((task) => (
              <Grid item xs={12} sm={6} lg={4} key={task.id}>
                <Card 
                  sx={{ 
                    height: '100%',
                    transition: 'all 0.3s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: `0 8px 16px ${getStatusColor(task.status)}40`,
                    }
                  }}
                >
                  <CardContent sx={{ p: 2.5 }}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
                      <Typography variant="body1" fontWeight="600" sx={{ flex: 1 }}>
                        {task.instruction}
                      </Typography>
                      {getStatusIcon(task.status)}
                    </Box>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
                        Device: <span style={{ color: theme.palette.primary.light }}>{task.device}</span>
                      </Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <AccessTime sx={{ fontSize: 14 }} /> {task.duration}
                      </Typography>
                    </Box>
                    <Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 0.5 }}>
                        <Typography variant="caption" color="text.secondary">Progress</Typography>
                        <Typography variant="caption" fontWeight="600" color="primary">{task.progress}%</Typography>
                      </Box>
                      <LinearProgress 
                        variant="determinate" 
                        value={task.progress} 
                        sx={{ 
                          height: 6, 
                          borderRadius: 3,
                          bgcolor: 'rgba(30, 136, 229, 0.1)',
                          '& .MuiLinearProgress-bar': {
                            bgcolor: getStatusColor(task.status),
                          }
                        }} 
                      />
                    </Box>
                    <Chip 
                      label={task.status.replace('_', ' ')} 
                      size="small" 
                      sx={{ 
                        mt: 2,
                        textTransform: 'capitalize',
                        bgcolor: `${getStatusColor(task.status)}20`,
                        color: getStatusColor(task.status),
                        fontWeight: 600,
                      }} 
                    />
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default Dashboard;
