/* eslint-disable no-undef */
import React from 'react';
import { Box, Button } from '@mui/material';

export default function DevicePane({ devicePath, toggleDevicePath }) {
  const base = (typeof process !== 'undefined' && process.env.REACT_APP_API_URL) || 'http://localhost:5000';
  const src = base + devicePath;
  return (
    <Box>
      <div className="card">
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:8}}>
          <div style={{fontWeight:700}}>Device Views</div>
          <div>
            <Button variant="contained" size="small" onClick={toggleDevicePath}>Toggle App Update</Button>
          </div>
        </div>

        <div style={{display:'flex', gap:12}}>
          <div className="phone-frame">
            <iframe title="phone-left" src={src} className="iframe" />
          </div>

          <div style={{display:'flex',flexDirection:'column',gap:12,width:'100%'}}>
            <div className="phone-frame" style={{height:360}}>
              <iframe title="phone-right" src={src} className="iframe" />
            </div>

            <div style={{display:'flex',gap:12}}>
              <div style={{flex:1}} className="kv"><div className="small">Connected</div><div style={{fontWeight:700}}>2 devices</div></div>
              <div style={{width:160}} className="kv"><div className="small">Throughput</div><div style={{fontWeight:700}}>300/s</div></div>
            </div>
          </div>
        </div>
      </div>
    </Box>
  );
}


