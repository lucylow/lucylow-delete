import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent,
  LinearProgress,
  Chip,
  useTheme,
  alpha,
  Paper,
  Tabs,
  Tab,
} from '@mui/material';
import { 
  TrendingUp, 
  Speed,
  CheckCircle,
  ErrorOutline,
  Schedule,
  Psychology,
  ShowChart,
  PlayArrow,
} from '@mui/icons-material';

const Analytics = () => {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);

  const metrics = [
    { label: 'Total Tasks', value: '2,847', change: '+12%', icon: <PlayArrow />, color: theme.palette.primary.main },
    { label: 'Success Rate', value: '94.7%', change: '+2.3%', icon: <CheckCircle />, color: theme.palette.info.main },
    { label: 'Avg Response', value: '1.2s', change: '-0.3s', icon: <Speed />, color: theme.palette.secondary.main },
    { label: 'Active Policies', value: '12', change: '+3', icon: <Psychology />, color: theme.palette.info.light },
  ];

  const tasksByApp = [
    { name: 'Instagram', tasks: 487, success: 96, color: '#1e88e5' },
    { name: 'Gmail', tasks: 392, success: 98, color: '#0288d1' },
    { name: 'Venmo', tasks: 356, success: 92, color: '#42a5f5' },
    { name: 'Uber', tasks: 289, success: 94, color: '#1565c0' },
    { name: 'DoorDash', tasks: 234, success: 89, color: '#00b0ff' },
  ];

  const rlMetrics = [
    { metric: 'Policy Convergence', progress: 87, color: theme.palette.primary.main },
    { metric: 'Exploration Rate', progress: 34, color: theme.palette.info.main },
    { metric: 'Training Episodes', progress: 92, color: theme.palette.secondary.main },
    { metric: 'Model Accuracy', progress: 95, color: theme.palette.info.light },
  ];

  return (
    <Box sx={{ pt: 10, pb: 4, minHeight: '100vh' }}>
      <Container maxWidth="xl">
        {/* Header */}
        <Box sx={{ mb: 4 }}>
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
            Analytics & Insights
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Performance metrics and RL training insights
          </Typography>
        </Box>

        {/* Tabs */}
        <Paper sx={{ mb: 4, bgcolor: alpha(theme.palette.primary.main, 0.05) }}>
          <Tabs 
            value={tabValue} 
            onChange={(_, v) => setTabValue(v)}
            sx={{
              '& .MuiTab-root': {
                minHeight: 60,
                fontWeight: 600,
              },
            }}
          >
            <Tab label="Overview" icon={<ShowChart />} iconPosition="start" />
            <Tab label="RL Training" icon={<Psychology />} iconPosition="start" />
            <Tab label="Performance" icon={<TrendingUp />} iconPosition="start" />
          </Tabs>
        </Paper>

        {tabValue === 0 && (
          <>
            {/* Key Metrics */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
              {metrics.map((metric, idx) => (
                <Grid item xs={12} sm={6} lg={3} key={idx}>
                  <Card 
                    sx={{ 
                      height: '100%',
                      transition: 'all 0.3s',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: `0 8px 16px ${alpha(metric.color, 0.3)}`,
                      }
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                        <Box 
                          sx={{ 
                            p: 1.5, 
                            borderRadius: 2, 
                            bgcolor: alpha(metric.color, 0.1),
                            display: 'flex',
                          }}
                        >
                          {metric.icon}
                        </Box>
                        <Chip 
                          label={metric.change} 
                          size="small" 
                          sx={{ 
                            bgcolor: alpha(metric.color, 0.15),
                            color: metric.color,
                            fontWeight: 600,
                          }} 
                        />
                      </Box>
                      <Typography variant="h4" fontWeight="700" sx={{ color: metric.color, mb: 0.5 }}>
                        {metric.value}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {metric.label}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            {/* Tasks by App */}
            <Card sx={{ mb: 4 }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h5" fontWeight="600" sx={{ mb: 3 }}>
                  Tasks by Application
                </Typography>
                <Grid container spacing={3}>
                  {tasksByApp.map((app, idx) => (
                    <Grid item xs={12} md={6} key={idx}>
                      <Paper sx={{ p: 2, bgcolor: alpha(theme.palette.primary.main, 0.03) }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                          <Typography variant="h6" fontWeight="600">{app.name}</Typography>
                          <Chip 
                            label={`${app.success}% success`}
                            size="small"
                            sx={{ 
                              bgcolor: alpha(app.color, 0.15),
                              color: app.color,
                              fontWeight: 600,
                            }}
                          />
                        </Box>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                          {app.tasks} tasks executed
                        </Typography>
                        <LinearProgress 
                          variant="determinate" 
                          value={app.success} 
                          sx={{ 
                            height: 8, 
                            borderRadius: 4,
                            bgcolor: alpha(app.color, 0.1),
                            '& .MuiLinearProgress-bar': {
                              bgcolor: app.color,
                              borderRadius: 4,
                            }
                          }} 
                        />
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </>
        )}

        {tabValue === 1 && (
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h5" fontWeight="600" sx={{ mb: 3 }}>
                Reinforcement Learning Metrics
              </Typography>
              <Grid container spacing={3}>
                {rlMetrics.map((metric, idx) => (
                  <Grid item xs={12} md={6} key={idx}>
                    <Box sx={{ mb: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                        <Typography variant="body1" fontWeight="600">{metric.metric}</Typography>
                        <Typography variant="body2" fontWeight="600" sx={{ color: metric.color }}>
                          {metric.progress}%
                        </Typography>
                      </Box>
                      <LinearProgress 
                        variant="determinate" 
                        value={metric.progress} 
                        sx={{ 
                          height: 10, 
                          borderRadius: 5,
                          bgcolor: alpha(metric.color, 0.1),
                          '& .MuiLinearProgress-bar': {
                            background: `linear-gradient(90deg, ${metric.color} 0%, ${alpha(metric.color, 0.7)} 100%)`,
                            borderRadius: 5,
                          }
                        }} 
                      />
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        )}

        {tabValue === 2 && (
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ textAlign: 'center', py: 8 }}>
                <ShowChart sx={{ fontSize: 80, color: theme.palette.primary.main, mb: 2 }} />
                <Typography variant="h5" fontWeight="600" sx={{ mb: 1 }}>
                  Advanced Performance Charts
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Interactive charts and visualizations coming soon
                </Typography>
              </Box>
            </CardContent>
          </Card>
        )}
      </Container>
    </Box>
  );
};

export default Analytics;
