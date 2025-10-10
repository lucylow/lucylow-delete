import React, { useState } from 'react';
import { Fab, Dialog, DialogContent, Typography, IconButton, Box } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import CloseIcon from '@mui/icons-material/Close';

export default function VoiceControl({ onCommand }) {
  const [open, setOpen] = useState(false);
  const [isListening, setListening] = useState(false);
  const [transcript, setTranscript] = useState('');

  const start = () => {
    setOpen(true);
    setListening(true);
    setTranscript('Simulated voice input: "Send $20 to Jane"');
    // In real product, hook webkitSpeechRecognition here
    setTimeout(()=> {
      onCommand && onCommand('Send $20 to Jane');
      setListening(false);
      setOpen(false);
    }, 1800);
  };

  return (
    <>
      <Fab color="primary" onClick={start} aria-label="voice control" sx={{ position: 'fixed', right: 20, bottom: 20 }}>
        <MicIcon />
      </Fab>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <Box sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent:'space-between', alignItems:'center' }}>
            <Typography variant="h6">Voice Command</Typography>
            <IconButton onClick={() => setOpen(false)}><CloseIcon /></IconButton>
          </Box>
          <DialogContent>
            <Typography sx={{ mb: 2 }}>{isListening ? 'Listening…' : 'Click to speak'}</Typography>
            <Typography variant="body2" sx={{ color:'#9fc' }}>{transcript}</Typography>
          </DialogContent>
        </Box>
      </Dialog>
    </>
  );
}

