import React from 'react';

export default function ThoughtBubbles({events}){
  const thoughts = (events||[]).slice(0,6).map((e,i)=>({text: e.text || e.note || JSON.stringify(e), id:i}));
  return (
    <div style={{position:'fixed', right:18, bottom:18, width:300, display:'flex', flexDirection:'column', gap:8}}>
      {thoughts.map(t=> (
        <div key={t.id} style={{background:'rgba(4,22,34,0.8)', color:'#9fe', padding:10, borderRadius:14, boxShadow:'0 6px 20px rgba(0,0,0,0.35)'}}>
          <div style={{fontSize:13}}>{t.text}</div>
        </div>
      ))}
    </div>
  );
}
