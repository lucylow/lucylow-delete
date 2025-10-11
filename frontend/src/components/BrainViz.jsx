import React from 'react';
import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars

export default function BrainViz({ size = 260 }) {
  const pulse = { scale: [1, 1.03, 1], opacity: [0.9, 1, 0.9] };
  return (
    <div style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column',gap:8}}>
      <motion.div animate={pulse} transition={{ duration: 3, repeat: Infinity }} style={{width:size, height:size/1.4, borderRadius:18, background:'radial-gradient(circle at 30% 30%, rgba(0,227,255,0.12), rgba(0,102,255,0.06))', display:'flex',alignItems:'center',justifyContent:'center', boxShadow:'0 10px 30px rgba(0,0,0,0.6)'}}>
        {/* stylized simple brain using SVG paths */}
        <svg viewBox="0 0 200 120" width="80%" height="80%" aria-hidden>
          <defs>
            <linearGradient id="g1" x1="0" x2="1">
              <stop offset="0" stopColor="#00e3ff" stopOpacity="0.9" />
              <stop offset="1" stopColor="#6b59ff" stopOpacity="0.9" />
            </linearGradient>
          </defs>
          <path d="M20 60c0-25 20-40 40-40 10-20 60-20 80 0 20 0 40 15 40 40 0 25-20 40-40 40H60c-20 0-40-15-40-40z" fill="url(#g1)" opacity="0.92"/>
          <g stroke="#d7fbff" strokeWidth="1.2" strokeOpacity="0.25" fill="none">
            <path d="M60 30c10 0 20 0 30 8" />
            <path d="M70 24c10 8 18 10 28 12" />
            <path d="M50 52c12-6 24-6 40 2" />
          </g>
        </svg>
      </motion.div>
      <div style={{fontSize:13, color:'#bfefff', fontWeight:700}}>AutoRL Cognitive Core</div>
      <div className="small">Real-time reasoning & RL feedback</div>
    </div>
  );
}


