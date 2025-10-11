import React, { useState } from 'react';
import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';
import Devices from './pages/Devices';
import Analytics from './pages/Analytics';
import AITraining from './pages/AITraining';
import Marketplace from './pages/Marketplace';
import Documentation from './pages/Documentation';
import Settings from './pages/Settings';
import Profile from './pages/Profile';
import LandingPage from './pages/LandingPage';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage onNavigate={setCurrentPage} />;
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
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    currentPage === 'dashboard'
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  Dashboard
                </button>
                <button
                  onClick={() => setCurrentPage('tasks')}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    currentPage === 'tasks'
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  Tasks
                </button>
                <button
                  onClick={() => setCurrentPage('devices')}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    currentPage === 'devices'
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  Devices
                </button>
                <button
                  onClick={() => setCurrentPage('analytics')}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    currentPage === 'analytics'
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  Analytics
                </button>
                <button
                  onClick={() => setCurrentPage('documentation')}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    currentPage === 'documentation'
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  Docs
                </button>
              </div>
            </div>
            <div className="flex items-center">
              <button
                onClick={() => setCurrentPage('settings')}
                className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700"
              >
                Settings
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
