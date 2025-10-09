import React, { useState } from 'react';
import { Box, Container, Typography, Card, CardContent, Grid, Button, TextField, MenuItem } from '@mui/material';
import { PlayArrow } from '@mui/icons-material';

const TaskExecution = () => {
  const [selectedDevice, setSelectedDevice] = useState('');
  const [taskInstruction, setTaskInstruction] = useState('');
  const [activeTask, setActiveTask] = useState(null);

  const sampleTasks = [
    'Send money to John via Venmo',
    'Book an Uber ride to the airport',
    'Order pizza from DoorDash',
    'Check calendar and create meeting',
    'Send WhatsApp message to team'
  ];

  const handleStartTask = () => {
    setActiveTask({
      instruction: taskInstruction,
      device: selectedDevice,
      status: 'in_progress',
      steps: [
        'Task Planning',
        'UI Perception',
        'Action Execution',
        'Verification',
        'Learning Update'
      ]
    });
  };

  return (
    <Box sx={{ pt: 10, pb: 4 }}>
      <Container maxWidth="md">
        <Typography variant="h4" fontWeight="bold" sx={{ mb: 4 }}>
          Task Execution
        </Typography>
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <TextField
              select
              label="Select Device"
              value={selectedDevice}
              onChange={(e) => setSelectedDevice(e.target.value)}
              fullWidth
              sx={{ mb: 2 }}
            >
              <MenuItem value="android_pixel_7_1">Pixel 7 (Android)</MenuItem>
              <MenuItem value="iphone_14_1">iPhone 14 (iOS)</MenuItem>
              <MenuItem value="android_galaxy_s23">Galaxy S23 (Android)</MenuItem>
              <MenuItem value="android_emulator_1">Android Emulator</MenuItem>
            </TextField>
            <TextField
              select
              label="Sample Task"
              value={taskInstruction}
              onChange={(e) => setTaskInstruction(e.target.value)}
              fullWidth
              sx={{ mb: 2 }}
            >
              {sampleTasks.map((task) => (
                <MenuItem key={task} value={task}>{task}</MenuItem>
              ))}
            </TextField>
            <Button variant="contained" color="primary" startIcon={<PlayArrow />} onClick={handleStartTask} disabled={!selectedDevice || !taskInstruction}>
              Start Task
            </Button>
          </CardContent>
        </Card>
        {activeTask && (
          <Card>
            <CardContent>
              <Typography variant="h6">Active Task</Typography>
              <Typography variant="body2">Instruction: {activeTask.instruction}</Typography>
              <Typography variant="body2">Device: {activeTask.device}</Typography>
              <Typography variant="body2">Status: {activeTask.status}</Typography>
              <Typography variant="body2" sx={{ mt: 2 }}>Steps:</Typography>
              <ul>
                {activeTask.steps.map((step, idx) => (
                  <li key={idx}>{step}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}
      </Container>
    </Box>
  );
};

export default TaskExecution;
