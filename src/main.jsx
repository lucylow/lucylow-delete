import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

// Detect static hosts that need HashRouter for proper routing
const isStaticHost = typeof window !== 'undefined' && (
  window.location.hostname.endsWith('lovable.app') ||
  window.location.hostname.endsWith('lovable.dev') ||
  window.location.hostname.endsWith('github.io') ||
  window.location.hostname === 'localhost' ||
  window.location.pathname.startsWith('/projects/')
)

const Router = isStaticHost ? HashRouter : BrowserRouter

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <App />
    </Router>
  </StrictMode>,
)
