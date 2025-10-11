import React, { useEffect, useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';
import DevicePane from './DevicePane';
import BrainViz from './BrainViz';
import ThoughtBubbles from './ThoughtBubbles';
import AgentLog from './AgentLog';
import PerfChart from './PerfChart';
import TaskBuilder from './TaskBuilder';
import VoiceControl from './VoiceControl';
import { MockApi } from '../mock/mockApi';

export default function DashboardRoot() {
  const [events, setEvents] = useState([]);
  const [devicePath, setDevicePath] = useState('/mock/mobile1');
  const [perfData, setPerfData] = useState([]);

  useEffect(()=> {
    // initial data load
    MockApi.getAgentStatus().then(() => {});
    MockApi.getPerformanceData().then(d => setPerfData(d));
  }, []);

  // event handler when mock run emits an event
  const onEvent = (ev) => {
    setEvents(prev => [ev, ...prev].slice(0, 150));
  };

  const startTask = () => {
    MockApi.executeTask({ task: 'Send $20 to Jane', enableLearning: true, onEvent });
  };

  const toggleDevice = () => {
    setDevicePath(p => p === '/mock/mobile1' ? '/mock/mobile2' : '/mock/mobile1');
  };

  const onTaskCreate = () => {
    // quick feedback
    startTask();
  };

  const onVoiceCommand = (cmd) => {
    // treat voice as new task
    MockApi.executeTask({ task: cmd, enableLearning: true, onEvent });
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="app">
        <div className="header">
          <div className="brand">
            <div className="logo">AR</div>
            <div>
              <div className="title">AutoRL — Demo (UI/UX edition)</div>
              <div className="small">Real-time visualization • Self-healing • Mock backend</div>
            </div>
          </div>

          <div style={{display:'flex', gap:8, alignItems:'center'}}>
            <button className="btn" onClick={() => startTask()}>Start Demo Task</button>
            <button className="btn" onClick={toggleDevice} style={{background:'#0077cc'}}>Toggle UI Update</button>
          </div>
        </div>

        <div className="grid" style={{marginTop:18}}>
          <div>
            <DevicePane devicePath={devicePath} toggleDevicePath={toggleDevice} />
          </div>

          <div>
            <div style={{display:'flex', gap:12}}>
              <div style={{flex:1}} className="card">
                <div style={{display:'flex', gap:12, alignItems:'center'}}>
                  <BrainViz />
                  <div style={{flex:1}}>
                    <div style={{display:'flex', gap:8}}>
                      <div style={{flex:1}} className="kv"><div className="small">Success Rate</div><div style={{fontWeight:700,color:'#00e3ff'}}>94.7%</div></div>
                      <div style={{width:160}} className="kv"><div className="small">Throughput</div><div style={{fontWeight:700}}>300/s</div></div>
                    </div>

                    <div style={{marginTop:12}}>
                      <PerfChart data={perfData} />
                    </div>
                  </div>
                </div>
              </div>

              <div style={{width:360}}>
                <div className="card">
                  <AgentLog events={events} />
                </div>

                <div style={{height:12}} />

                <TaskBuilder onCreate={onTaskCreate} />
              </div>
            </div>

            <div style={{height:18}} />

            <div className="card">
              <ThoughtBubbles events={events} />
            </div>
          </div>
        </div>

        <VoiceControl onCommand={onVoiceCommand} />
      </div>
    </ThemeProvider>
  );
}

