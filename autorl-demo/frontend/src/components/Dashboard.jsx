import React, { useEffect, useRef, useState } from 'react';
import ThoughtBubbles from './ThoughtBubbles';

const WS_URL = (process.env.REACT_APP_WS_URL) ? process.env.REACT_APP_WS_URL : 'ws://localhost:5000/ws';
const API_BASE = (process.env.REACT_APP_API_URL) ? process.env.REACT_APP_API_URL : 'http://localhost:5000';

export default function Dashboard(){
  const [events, setEvents] = useState([]);
  const [devicePath, setDevicePath] = useState('/mock/mobile1');
  const wsRef = useRef(null);

  useEffect(()=> {
    const ws = new WebSocket(WS_URL);
    ws.onopen = ()=> console.log('WS open');
    ws.onmessage = (m) => {
      try {
        const d = JSON.parse(m.data);
        setEvents(prev => [d, ...prev].slice(0, 80));
      } catch(e){
        console.log('ws parse', e);
      }
    };
    ws.onclose = ()=> console.log('WS closed');
    wsRef.current = ws;
    return ()=> ws.close();
  }, []);

  const startTask = async () => {
    const taskDesc = "Send $20 to Jane";
    await fetch(`${API_BASE}/api/execute`, {
      method:'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ task: taskDesc, device_id: 'sim-phone', parameters:{ enable_learning:true }})
    });
  };

  const switchUI = () => {
    setDevicePath(prev => prev === '/mock/mobile1' ? '/mock/mobile2' : '/mock/mobile1');
  };

  return (
    <div className="app">
      <div className="header">
        <div className="title">AutoRL — Demo Control Center</div>
        <div className="controls">
          <button className="button" onClick={startTask}>Start Demo Task</button>
          <button style={{background:'#00aaff', color:'#041522'}} className="button" onClick={switchUI}>Toggle App Update</button>
        </div>
      </div>

      <div style={{display:'flex', gap:20, alignItems:'flex-start'}}>
        <div style={{display:'flex', flexDirection:'column', gap:12}}>
          <div className="phone-frame">
            <iframe title="phone-left" src={API_BASE + devicePath} style={{width:'100%', height:'100%', border:'none', transform:'scale(0.95)'}}/>
            <div className="overlay"></div>
          </div>
          <div className="phone-frame">
            <iframe title="phone-right" src={API_BASE + devicePath} style={{width:'100%', height:'100%', border:'none', transform:'scale(0.95)'}}/>
            <div className="overlay"></div>
          </div>
        </div>

        <div style={{flex:1}}>
          <div className="brain">
            <div style={{textAlign:'center'}}>
              <div style={{fontWeight:700}}>AutoRL Brain</div>
              <div style={{fontSize:12, color:'#bfefff'}}>Real-time reasoning</div>
            </div>
          </div>

          <div style={{height:18}} />

          <div style={{display:'flex', gap:12}}>
            <div className="hud">
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                <div style={{fontWeight:700}}>Agent Log</div>
                <div className="small">Live events</div>
              </div>
              <div className="log" id="log">
                {events.map((e,i)=>(
                  <div key={i} style={{padding:'6px 4px', borderBottom:'1px solid rgba(255,255,255,0.02)'}}>
                    <div style={{fontSize:13, color:'#cfeeff'}}><strong>{e.event || 'event'}</strong> — {e.text || JSON.stringify(e)}</div>
                    {e.plan && <div style={{fontSize:12,color:'#9fc'}}>Plan: {JSON.stringify(e.plan)}</div>}
                  </div>
                ))}
              </div>
            </div>

            <div style={{width:260}}>
              <div style={{padding:12, marginBottom:12, background:'linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))', borderRadius:10}}>
                <div style={{fontWeight:700}}>Execution Trace</div>
                <div style={{marginTop:8}}><div className="small">Reward:</div><div style={{fontSize:20,fontWeight:700,color:'#00e3ff'}}>—</div></div>
              </div>

              <div style={{padding:12, background:'rgba(255,255,255,0.02)', borderRadius:10}}>
                <div style={{fontWeight:700}}>Memory</div>
                <div className="small" style={{marginTop:8}}>Saved successful episodes are persisted on backend memory.json</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ThoughtBubbles events={events}/>
    </div>
  );
}
