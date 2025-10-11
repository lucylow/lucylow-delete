import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';

const LandingPage = () => (
  <Box sx={{ pt: 10, pb: 4 }}>
    <Container maxWidth="md">
      <Typography variant="h2" fontWeight="bold" sx={{ mb: 4, textAlign: 'center' }}>
        AutoRL: Open Mobile Hub AI Agent
      </Typography>
      <Typography variant="h6" color="text.secondary" sx={{ mb: 4, textAlign: 'center' }}>
        Welcome to AutoRL, the open-source mobile automation agent for Android and iOS. Harness the power of AI, RL, and LLMs to automate mobile workflows and tests.
      </Typography>
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Button variant="contained" color="primary" href="/app/dashboard">
          Go to Dashboard
        </Button>
      </Box>
    </Container>
  </Box>
);

export default LandingPage;
