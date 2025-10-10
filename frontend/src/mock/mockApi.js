// src/mock/mockApi.js
// Simple in-memory mock "API" for demo purposes.
// Replace with real backend endpoints when ready.
let memory = { episodes: [] };

export const MockApi = {
  getAgentStatus() {
    return Promise.resolve({
      isActive: false,
      currentTask: null,
      progress: 0,
      confidence: 0.96,
      successRate: 94.7,
      tasksCompleted: 156,
      avgExecutionTime: 23.4
    });
  },

  getDevices() {
    return Promise.resolve([
      { id: 'android_pixel_7', name: 'Android Pixel 7', status: 'active', currentTask: 'Book flight - Step 3/7', lastSeen: Date.now() - 1000 * 10 },
      { id: 'iphone_14', name: 'iPhone 14', status: 'idle', currentTask: null, lastSeen: Date.now() - 300000 }
    ]);
  },

  getPerformanceData() {
    return Promise.resolve([
      { time: '10:00', successRate: 89, avgTime: 25.2 },
      { time: '10:30', successRate: 91, avgTime: 24.1 },
      { time: '11:00', successRate: 94, avgTime: 23.8 },
      { time: '11:30', successRate: 95, avgTime: 23.4 },
      { time: '12:00', successRate: 94.7, avgTime: 23.4 }
    ]);
  },

  // Simulates an execution run, with streaming events via provided callback
  executeTask({ task = 'Send $20 to Jane', deviceId = 'android_pixel_7', enableLearning = true, onEvent = () => {} } = {}) {
    const runId = Date.now();
    const steps = [
      { event: 'perception', text: 'Capturing screenshot and OCR...', confidence: 0.97, delay: 700 },
      { event: 'planning', text: 'LLM planning: build action sequence', plan: ['tap_send', 'type_amount', 'select_recipient', 'confirm'], confidence: 0.94, delay: 1000 },
      { event: 'execution_start', text: 'Executing actions...', progress: 10, delay: 500 }
    ];

    // Random error injection for demo
    const willError = Math.random() < 0.45;
    if (willError) {
      steps.push({ event: 'error', text: 'Popup: Permission required', severity: 'warning', delay: 600 });
      steps.push({ event: 'recovery_analyze', text: 'Analyzing popup and computing recovery policy...', delay: 900 });
      steps.push({ event: 'recovery_plan', text: 'Plan: tap Allow → resume action', plan: ['tap_allow', 'resume_sequence'], delay: 800 });
      steps.push({ event: 'recovery_execute', text: 'Executing recovery...', progress: 70, delay: 700 });
    }

    steps.push({ event: 'completed', text: `Task '${task}' completed on ${deviceId}`, success: true, reward: 0.98, delay: 600 });

    // Stream events through callback
    (async () => {
      for (const s of steps) {
        await new Promise(r => setTimeout(r, s.delay));
        onEvent({ runId, ...s, timestamp: Date.now() });
      }
      // store episode
      if (enableLearning) {
        memory.episodes.push({ runId, task, deviceId, timestamp: Date.now() });
        onEvent({ event: 'memory_saved', runId, text: 'Episode learned and stored.' });
      }
    })();

    return Promise.resolve({ status: 'started', runId });
  },

  getMemory() {
    return Promise.resolve(memory);
  },

  resetMemory() {
    memory = { episodes: [] };
    return Promise.resolve({ ok: true });
  }
};

