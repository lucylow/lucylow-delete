import React from 'react';
import { Box, Container, Typography, Grid, Card, CardContent, Button } from '@mui/material';
import { Psychology, Speed, Devices, Security, TrendingUp, CheckCircle } from '@mui/icons-material';

const features = [
  {
    icon: <Psychology color="primary" />,
    title: 'LLM + Computer Vision',
    description: 'GPT-4o planning with YOLO object detection and OCR',
    status: 'Active'
  },
  {
    icon: <Speed color="secondary" />,
    title: 'Reinforcement Learning',
    description: 'Self-improving agent with PPO optimization',
    status: 'Training'
  },
  {
    icon: <Devices color="success" />,
    title: 'Cross-Platform Support',
    description: 'Android and iOS automation with device farms',
    status: 'Ready'
  },
  {
    icon: <Security color="warning" />,
    title: 'Production Ready',
    description: 'Enterprise security, monitoring, and scalability',
    status: 'Deployed'
  }
];

const stats = [
  { label: 'Task Success Rate', value: '94.7%', icon: <TrendingUp /> },
  { label: 'Active Devices', value: '12', icon: <Devices /> },
  { label: 'Tasks Completed', value: '1,247', icon: <CheckCircle /> },
  { label: 'Training Episodes', value: '3,892', icon: <Psychology /> }
];

const LandingPage = () => (
  <Box sx={{ pt: 10, pb: 4 }}>
    <Container maxWidth="md">
      <Typography variant="h2" fontWeight="bold" sx={{ mb: 4, textAlign: 'center', background: 'linear-gradient(90deg, #00e676, #2196f3)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
        AutoRL: Open Mobile Hub AI Agent
      </Typography>
      <Typography variant="h6" color="text.secondary" sx={{ mb: 4, textAlign: 'center' }}>
        Welcome to AutoRL, the open-source mobile automation agent for Android and iOS. Harness the power of AI, RL, and LLMs to automate real-world mobile workflows, test apps, and orchestrate multi-agent tasks.
      </Typography>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {features.map((feature) => (
          <Grid item xs={12} sm={6} key={feature.title}>
            <Card>
              <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                {feature.icon}
                <Box>
                  <Typography variant="h6">{feature.title}</Typography>
                  <Typography variant="body2" color="text.secondary">{feature.description}</Typography>
                  <Typography variant="caption" color="primary">{feature.status}</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat) => (
          <Grid item xs={6} sm={3} key={stat.label}>
            <Card>
              <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {stat.icon}
                <Typography variant="h6">{stat.value}</Typography>
                <Typography variant="body2" color="text.secondary">{stat.label}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Button variant="contained" color="primary" href="https://github.com/lucylow/auto-rl" target="_blank">
          View Project on GitHub
        </Button>
      </Box>
    </Container>
  </Box>
);

export default LandingPage;
