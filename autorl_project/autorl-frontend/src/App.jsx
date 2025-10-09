import { Routes, Route, NavLink } from 'react-router-dom';
import { Smartphone, Home, LayoutDashboard, Cpu, PlaySquare, Brain, ShoppingBag, BarChart3, FileText, Settings, User } from 'lucide-react';
import LandingPage from './LandingPage.jsx';
import Dashboard from './pages/Dashboard.js';
import DeviceManager from './pages/DeviceManager.js';
import TaskExecution from './pages/TaskExecution.js';
import AITraining from './pages/AITraining.js';
import Marketplace from './pages/Marketplace.js';
import Analytics from './pages/Analytics.js';
import Documentation from './pages/Documentation.js';
import SettingsPage from './pages/Settings.js';
import Profile from './pages/Profile.js';
import './App.css'

const navigationItems = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/devices', label: 'Devices', icon: Cpu },
  { path: '/tasks', label: 'Tasks', icon: PlaySquare },
  { path: '/ai-training', label: 'AI Training', icon: Brain },
  { path: '/marketplace', label: 'Marketplace', icon: ShoppingBag },
  { path: '/analytics', label: 'Analytics', icon: BarChart3 },
  { path: '/docs', label: 'Documentation', icon: FileText },
  { path: '/settings', label: 'Settings', icon: Settings },
  { path: '/profile', label: 'Profile', icon: User },
];

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Navigation Menu */}
      <nav className="border-b bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                <Smartphone className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                AutoRL Control Center
              </h1>
            </div>
          </div>
          
          {/* Navigation Links */}
          <div className="flex flex-wrap gap-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === '/'}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`
                  }
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm">{item.label}</span>
                </NavLink>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Page Routing */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/devices" element={<DeviceManager />} />
        <Route path="/tasks" element={<TaskExecution />} />
        <Route path="/ai-training" element={<AITraining />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/docs" element={<Documentation />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App
