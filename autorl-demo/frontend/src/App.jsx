import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './components/Dashboard';

function Nav(){
  return (
    <nav style={{display:'flex', gap:12, padding:12, alignItems:'center'}}>
      <Link to="/" style={{color:'#cfe', fontWeight:700}}>Dashboard</Link>
      <Link to="/devices" style={{color:'#cfe'}}>Devices</Link>
      <Link to="/events" style={{color:'#cfe'}}>Events</Link>
    </nav>
  );
}

function Devices(){
  // simple page listing the two mock device pages
  return (
    <div style={{padding:20}}>
      <h2>Devices</h2>
      <ul>
        <li><a href="/mock/mobile1" target="_blank" rel="noreferrer">Mobile 1 (mock)</a></li>
        <li><a href="/mock/mobile2" target="_blank" rel="noreferrer">Mobile 2 (mock)</a></li>
      </ul>
    </div>
  );
}

function EventsView(){
  return (
    <div style={{padding:20}}>
      <h2>Raw Events</h2>
      <p>This page shows raw events streamed by the demo backend (the dashboard subscribes to the same websocket).</p>
      <p>Open the dashboard to view live visualizations.</p>
    </div>
  );
}

export default function App(){
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Dashboard/>} />
        <Route path="/devices" element={<Devices/>} />
        <Route path="/events" element={<EventsView/>} />
      </Routes>
    </BrowserRouter>
  );
}
