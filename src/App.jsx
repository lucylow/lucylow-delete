import React, { useState } from 'react';
import { Activity, Smartphone, Zap, TrendingUp, CheckCircle } from 'lucide-react';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  // Simple Dashboard Component
  const Dashboard = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">AutoRL Dashboard</h1>
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-900 text-green-200">
          <Activity className="w-4 h-4 mr-2" />
          System Active
        </span>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Tasks Completed</p>
              <p className="text-3xl font-bold text-white mt-2">47</p>
            </div>
            <CheckCircle className="w-10 h-10 text-green-400" />
          </div>
          <p className="text-green-400 text-sm mt-4">↑ 12% from last week</p>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Success Rate</p>
              <p className="text-3xl font-bold text-white mt-2">94%</p>
            </div>
            <TrendingUp className="w-10 h-10 text-blue-400" />
          </div>
          <p className="text-blue-400 text-sm mt-4">↑ 3% improvement</p>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Active Devices</p>
              <p className="text-3xl font-bold text-white mt-2">8</p>
            </div>
            <Smartphone className="w-10 h-10 text-purple-400" />
          </div>
          <p className="text-gray-400 text-sm mt-4">2 Android, 6 iOS</p>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Avg Speed</p>
              <p className="text-3xl font-bold text-white mt-2">4.2s</p>
            </div>
            <Zap className="w-10 h-10 text-yellow-400" />
          </div>
          <p className="text-yellow-400 text-sm mt-4">↓ 0.8s faster</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h2 className="text-xl font-semibold text-white mb-4">Recent Activity</h2>
        <div className="space-y-3">
          {[
            { action: 'Login test completed', device: 'Pixel 7', time: '2 min ago', status: 'success' },
            { action: 'Form validation test', device: 'iPhone 14', time: '5 min ago', status: 'success' },
            { action: 'Navigation flow test', device: 'Galaxy S23', time: '12 min ago', status: 'success' },
          ].map((activity, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 bg-gray-900 rounded-lg">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <div>
                  <p className="text-white font-medium">{activity.action}</p>
                  <p className="text-gray-400 text-sm">{activity.device}</p>
                </div>
              </div>
              <span className="text-gray-400 text-sm">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Simple page placeholders
  const Tasks = () => (
    <div className="text-white">
      <h1 className="text-3xl font-bold mb-4">Tasks</h1>
      <p className="text-gray-400">Task management coming soon...</p>
    </div>
  );

  const Devices = () => (
    <div className="text-white">
      <h1 className="text-3xl font-bold mb-4">Devices</h1>
      <p className="text-gray-400">Device management coming soon...</p>
    </div>
  );

  const Analytics = () => (
    <div className="text-white">
      <h1 className="text-3xl font-bold mb-4">Analytics</h1>
      <p className="text-gray-400">Analytics dashboard coming soon...</p>
    </div>
  );

  const Documentation = () => (
    <div className="text-white">
      <h1 className="text-3xl font-bold mb-4">Documentation</h1>
      <p className="text-gray-400">Documentation coming soon...</p>
    </div>
  );

  const Settings = () => (
    <div className="text-white">
      <h1 className="text-3xl font-bold mb-4">Settings</h1>
      <p className="text-gray-400">Settings panel coming soon...</p>
    </div>
  );

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
      case 'documentation':
        return <Documentation />;
      case 'settings':
        return <Settings />;
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
