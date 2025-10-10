import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import './index.css';
import App from './App';

// Some static hosts (including static S3 hosts or certain app platforms) don't
// rewrite unknown paths to index.html. In that case BrowserRouter won't work
// on refresh or deep links. Detect common static hostnames and fall back to
// HashRouter automatically so routes work without server rewrites.
const isStaticHost = typeof window !== 'undefined' && (
  // hostnames known to not provide SPA rewrite rules in many preview/static setups
  window.location.hostname.endsWith('lovable.app') ||
  window.location.hostname.endsWith('lovable.dev') ||
  window.location.hostname.endsWith('github.io') ||
  window.location.hostname === 'localhost' ||
  // lovable preview URLs embed the project under a /projects/ path — treat those as static
  window.location.pathname.startsWith('/projects/')
);

const Router = isStaticHost ? HashRouter : BrowserRouter;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <App />
    </Router>
  </StrictMode>
);
