import { Routes, Route, NavLink } from 'react-router-dom'
import { Home, LayoutDashboard, Smartphone, Play, Brain, TrendingUp, Store, BookOpen, Settings, User } from 'lucide-react'
import Dashboard from './pages/Dashboard'
import Devices from './pages/Devices'
import Tasks from './pages/Tasks'
import AITraining from './pages/AITraining'
import Analytics from './pages/Analytics'
import Marketplace from './pages/Marketplace'
import Documentation from './pages/Documentation'
import SettingsPage from './pages/Settings'
import Profile from './pages/Profile'
import LandingPage from './pages/LandingPage'
import './App.css'

const navigationItems = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/devices', label: 'Devices', icon: Smartphone },
  { path: '/tasks', label: 'Tasks', icon: Play },
  { path: '/ai-training', label: 'AI Training', icon: Brain },
  { path: '/marketplace', label: 'Marketplace', icon: Store },
  { path: '/analytics', label: 'Analytics', icon: TrendingUp },
  { path: '/docs', label: 'Docs', icon: BookOpen },
  { path: '/settings', label: 'Settings', icon: Settings },
  { path: '/profile', label: 'Profile', icon: User },
]

function App() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Bar */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <Brain className="w-6 h-6 text-primary" />
              <h1 className="text-xl font-bold">AutoRL</h1>
            </div>
            <div className="flex items-center space-x-1">
              {navigationItems.map((item) => {
                const Icon = item.icon
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.path === '/'}
                    className={({ isActive }) =>
                      `flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
                        isActive
                          ? 'bg-primary text-primary-foreground'
                          : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                      }`
                    }
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </NavLink>
                )
              })}
            </div>
          </div>
        </div>
      </nav>

      {/* Page Content */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/devices" element={<Devices />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/ai-training" element={<AITraining />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/docs" element={<Documentation />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  )
}

export default App

