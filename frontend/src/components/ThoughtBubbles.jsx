import React from 'react';
import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars

export default function ThoughtBubbles({ events = [] }) {
  const top = events.slice(0, 4);
  return (
    <div className="thoughts" aria-hidden>
      <div style={{display:'flex', gap:12, justifyContent:'center'}}>
        {top.map((e, i) => (
          <motion.div key={i} initial={{ y: -12, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: i * 0.08 }} className="bubble" role="img" aria-label={e.event}>
            <div style={{fontSize:13, fontWeight:700}}>{e.event}</div>
            <div style={{fontSize:12, color:'#bfefff', marginTop:6}}>{(e.text || '').slice(0, 48)}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}


