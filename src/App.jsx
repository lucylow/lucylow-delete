import React, { useState } from 'react';
import { Activity, Smartphone, Zap, TrendingUp, CheckCircle, Users, Brain, BarChart3, Book, Settings as SettingsIcon, User } from 'lucide-react';
import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';
import Devices from './pages/Devices';
import Analytics from './pages/Analytics';
import AITraining from './pages/AITraining';
import Marketplace from './pages/Marketplace';
import Documentation from './pages/Documentation';
import Settings from './pages/Settings';
import Profile from './pages/Profile';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'tasks':
        return <Tasks />;
      case 'devices':
        return <Devices />;
      case 'analytics':
        return <Analytics />;
      case 'ai-training':
        return <AITraining />;
      case 'marketplace':
        return <Marketplace />;
      case 'documentation':
        return <Documentation />;
      case 'settings':
        return <Settings />;
      case 'profile':
        return <Profile />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Navigation Bar */}
      <nav className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-green-400">AutoRL</h1>
              </div>
              <div className="ml-10 flex items-baseline space-x-4">
                <button
                  onClick={() => setCurrentPage('dashboard')}
                  className={`px-3 py-2 rounded-md text-sm font-medium flex items-center ${
                    currentPage === 'dashboard'
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  <Activity className="w-4 h-4 mr-2" />
                  Dashboard
                </button>
                <button
                  onClick={() => setCurrentPage('tasks')}
                  className={`px-3 py-2 rounded-md text-sm font-medium flex items-center ${
                    currentPage === 'tasks'
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Tasks
                </button>
                <button
                  onClick={() => setCurrentPage('devices')}
                  className={`px-3 py-2 rounded-md text-sm font-medium flex items-center ${
                    currentPage === 'devices'
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  <Smartphone className="w-4 h-4 mr-2" />
                  Devices
                </button>
                <button
                  onClick={() => setCurrentPage('analytics')}
                  className={`px-3 py-2 rounded-md text-sm font-medium flex items-center ${
                    currentPage === 'analytics'
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Analytics
                </button>
                <button
                  onClick={() => setCurrentPage('ai-training')}
                  className={`px-3 py-2 rounded-md text-sm font-medium flex items-center ${
                    currentPage === 'ai-training'
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  <Brain className="w-4 h-4 mr-2" />
                  AI Training
                </button>
                <button
                  onClick={() => setCurrentPage('marketplace')}
                  className={`px-3 py-2 rounded-md text-sm font-medium flex items-center ${
                    currentPage === 'marketplace'
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  <Users className="w-4 h-4 mr-2" />
                  Marketplace
                </button>
                <button
                  onClick={() => setCurrentPage('documentation')}
                  className={`px-3 py-2 rounded-md text-sm font-medium flex items-center ${
                    currentPage === 'documentation'
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  <Book className="w-4 h-4 mr-2" />
                  Docs
                </button>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage('profile')}
                className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700"
              >
                <User className="w-5 h-5" />
              </button>
              <button
                onClick={() => setCurrentPage('settings')}
                className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700"
              >
                <SettingsIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {renderPage()}
      </main>
    </div>
  );
}

export default App;
