import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Card } from '@mui/material';

export default function PerfChart({ data = [] }) {
  return (
    <Card sx={{ p: 2 }}>
      <div style={{fontWeight:700, marginBottom:8}}>Performance Trends</div>
      <div style={{width:'100%', height:200}}>
        <ResponsiveContainer>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#0b2b38" />
            <XAxis dataKey="time" stroke="#89cfe6" />
            <YAxis yAxisId="left" stroke="#89cfe6" />
            <Tooltip />
            <Legend />
            <Line yAxisId="left" type="monotone" dataKey="successRate" stroke="#00e3ff" strokeWidth={2} name="Success Rate (%)" dot={false} />
            <Line type="monotone" dataKey="avgTime" stroke="#ffb74d" strokeWidth={2} name="Avg Time (s)" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}


