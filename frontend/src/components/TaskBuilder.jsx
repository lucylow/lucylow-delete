import React, { useState } from 'react';
import { Card, Chip, Box, Button, Typography } from '@mui/material';

const ACTIONS = [
  { id: 'tap', label: 'Tap' },
  { id: 'type', label: 'Type' },
  { id: 'swipe', label: 'Swipe' },
  { id: 'verify', label: 'Verify' },
  { id: 'wait', label: 'Wait' }
];

export default function TaskBuilder({ onCreate }) {
  const [steps, setSteps] = useState([]);
  const addStep = (a) => setSteps(s => [...s, { id: Date.now(), ...a }]);
  const clear = () => setSteps([]);
  const create = () => {
    const desc = steps.map((s,i)=>`${i+1}.${s.label}`).join(', ');
    onCreate(desc, steps);
  };

  return (
    <Card sx={{ p: 2 }}>
      <Typography variant="h6" sx={{ mb: 1 }}>Task Builder</Typography>
      <Box sx={{ mb: 2 }}>
        {ACTIONS.map(a => <Chip key={a.id} label={a.label} onClick={() => addStep(a)} sx={{ mr: 1, mb: 1 }} />)}
      </Box>
      <Box sx={{ mb: 2 }}>
        <Typography className="small">Steps: {steps.length}</Typography>
        <Box sx={{ mt: 1 }}>
          {steps.map((s, i) => <div key={s.id} className="kv" style={{marginBottom:6}}>{i+1}. {s.label}</div>)}
        </Box>
      </Box>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Button variant="contained" onClick={create} disabled={!steps.length}>Create Task</Button>
        <Button variant="outlined" onClick={clear}>Clear</Button>
      </Box>
    </Card>
  );
}

