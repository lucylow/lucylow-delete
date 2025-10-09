import React from 'react';

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900">
      <div className="max-w-2xl w-full px-6 py-12 bg-white dark:bg-slate-900 rounded-xl shadow-lg flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">AutoRL: Open Mobile Hub AI Agent</h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 text-center">
          Welcome to AutoRL, the open-source mobile automation agent for Android and iOS. Harness the power of AI, RL, and LLMs to automate real-world mobile workflows, test apps, and orchestrate multi-agent tasks.
        </p>
        <ul className="list-disc text-left mb-6 text-gray-600 dark:text-gray-400">
          <li>Device Pool Management</li>
          <li>Task Execution Workflows</li>
          <li>UI Element Detection</li>
          <li>Reinforcement Learning Episodes</li>
          <li>Agent Performance Analytics</li>
          <li>Memory & Knowledge Base</li>
        </ul>
        <a href="https://github.com/lucylow/auto-rl" target="_blank" rel="noopener noreferrer" className="inline-block px-6 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-purple-600 transition">View Project on GitHub</a>
      </div>
    </div>
  );
}
