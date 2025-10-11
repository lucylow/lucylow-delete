import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Import page components
import Navigation from './components/Navigation.js';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import DeviceManager from './pages/DeviceManager';
import TaskExecution from './pages/TaskExecution';
import AITraining from './pages/AITraining';
import Analytics from './pages/Analytics';
import Marketplace from './pages/Marketplace';
import Documentation from './pages/Documentation';
import Settings from './pages/Settings';
import Profile from './pages/Profile';
import BlockchainEnhancedDashboard from './pages/BlockchainEnhancedDashboard';
import OMHIntegrationPage from './pages/OMHIntegrationPage';

// Import OMH Auth Context
import { OMHAuthProvider } from './contexts/OMHAuthContext';
import { Web3Provider } from './contexts/Web3Context';

// AutoRL theme configuration
const autorlTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00e676', // Green for AI/tech feel
    },
    secondary: {
      main: '#2196f3', // Blue for mobile/tech
    },
    background: {
      default: '#0a0a0a',
      paper: '#1a1a1a',
    },
    text: {
      primary: '#ffffff',
      secondary: '#b3b3b3',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={autorlTheme}>
      <CssBaseline />
      <Web3Provider>
        <OMHAuthProvider>
          <div className="App">
            <Navigation />
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/devices" element={<DeviceManager />} />
              <Route path="/tasks" element={<TaskExecution />} />
              <Route path="/ai-training" element={<AITraining />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/blockchain" element={<BlockchainEnhancedDashboard />} />
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/omh-integration" element={<OMHIntegrationPage />} />
              <Route path="/docs" element={<Documentation />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </div>
        </OMHAuthProvider>
      </Web3Provider>
    </ThemeProvider>
  );
}

export default App;
