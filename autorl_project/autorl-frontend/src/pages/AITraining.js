import React, { useState } from 'react';
import { Box, Container, Typography, Card, CardContent, Grid, Button, LinearProgress } from '@mui/material';
import { Psychology } from '@mui/icons-material';

const AITraining = () => {
  const [trainingActive, setTrainingActive] = useState(false);
  const [trainingProgress, setTrainingProgress] = useState(67);

  const modelVersions = [
    { version: 'v1.3.2', accuracy: 91.2, episodes: 1250, size: '45.2MB', status: 'Active' },
    { version: 'v1.3.1', accuracy: 89.5, episodes: 1100, size: '43.8MB', status: 'Archived' },
    { version: 'v1.2.8', accuracy: 87.2, episodes: 980, size: '42.1MB', status: 'Archived' }
  ];

  return (
    <Box sx={{ pt: 10, pb: 4 }}>
      <Container maxWidth="md">
        <Typography variant="h4" fontWeight="bold" sx={{ mb: 4 }}>
          AI Training Center
        </Typography>
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Typography variant="body1" sx={{ mb: 2 }}>Training Progress</Typography>
            <LinearProgress variant="determinate" value={trainingProgress} sx={{ height: 10, borderRadius: 5 }} />
            <Typography variant="body2" sx={{ mt: 2 }}>{trainingProgress}% Complete</Typography>
            <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={() => setTrainingActive(!trainingActive)}>
              {trainingActive ? 'Pause Training' : 'Start Training'}
            </Button>
          </CardContent>
        </Card>
        <Typography variant="h6" sx={{ mb: 2 }}>Model Versions</Typography>
        <Grid container spacing={2}>
          {modelVersions.map((model) => (
            <Grid item xs={12} sm={4} key={model.version}>
              <Card>
                <CardContent>
                  <Psychology color={model.status === 'Active' ? 'primary' : 'disabled'} />
                  <Typography variant="body1" fontWeight="bold">{model.version}</Typography>
                  <Typography variant="body2" color="text.secondary">Accuracy: {model.accuracy}%</Typography>
                  <Typography variant="body2" color="text.secondary">Episodes: {model.episodes}</Typography>
                  <Typography variant="body2" color="text.secondary">Size: {model.size}</Typography>
                  <Typography variant="caption" color={model.status === 'Active' ? 'primary' : 'text.secondary'}>{model.status}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default AITraining;
