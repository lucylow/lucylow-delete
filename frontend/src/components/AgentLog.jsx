import React, { useEffect, useRef } from 'react';
import { Box } from '@mui/material';

export default function AgentLog({ events = [] }) {
  const ref = useRef();
  useEffect(() => {
    if (ref.current) ref.current.scrollTop = 0; // newest first
  }, [events]);
  return (
    <Box className="log" ref={ref} role="log" aria-live="polite">
      {events.map((e, i) => (
        <div key={i} style={{padding:'8px 6px', borderBottom:'1px solid rgba(255,255,255,0.02)'}}>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <div style={{fontWeight:700, fontSize:13}}>{e.event}</div>
            <div style={{fontSize:12, color:'#9fc'}}>{e.timestamp ? new Date(e.timestamp).toLocaleTimeString() : ''}</div>
          </div>
          <div style={{fontSize:13, color:'#cfefff', marginTop:6}}>{e.text}</div>
          {e.plan && <div style={{fontSize:12, color:'#9fe', marginTop:6}}>Plan: {e.plan.join(' → ')}</div>}
        </div>
      ))}
    </Box>
  );
}

