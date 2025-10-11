<div align="center">

# 🤖 AutoRL - Intelligent Mobile Automation Platform

### *Autonomous AI-Powered Mobile Automation with Reinforcement Learning*

[![Python 3.9+](https://img.shields.io/badge/python-3.9+-blue.svg)](https://www.python.org/downloads/)
[![React 18](https://img.shields.io/badge/react-18.2-61dafb.svg)](https://reactjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.104-009688.svg)](https://fastapi.tiangolo.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

[Features](#-features) • [Quick Start](#-quick-start) • [Documentation](#-documentation) • [API](#-api-reference) • [Contributing](#-contributing)

---

### *Transform mobile testing and automation with natural language commands powered by AI agents that perceive, plan, execute, and recover from errors automatically*

</div>

## 📖 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Architecture](#-architecture)
- [Quick Start](#-quick-start)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Usage Examples](#-usage-examples)
- [API Reference](#-api-reference)
- [Plugin System](#-plugin-system)
- [AI Agents](#-ai-agents)
- [Deployment](#-deployment)
- [Testing](#-testing)
- [Troubleshooting](#-troubleshooting)
- [Use Cases](#-use-cases)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [License](#-license)

## 🌟 Overview

**AutoRL** is a next-generation mobile automation platform that combines cutting-edge AI technologies to provide intelligent, adaptive, and self-healing mobile automation. Unlike traditional automation frameworks that follow rigid scripts, AutoRL uses AI agents and reinforcement learning to understand, plan, and execute mobile tasks with human-like intelligence.

### What Makes AutoRL Different?

| Traditional Automation | AutoRL |
|------------------------|---------|
| 🔧 Fixed scripts & selectors | 🧠 Natural language instructions |
| ❌ Breaks on UI changes | ✅ Adapts to changes automatically |
| 📝 Manual error handling | 🔄 Self-healing with AI recovery |
| 📊 Static execution | 📈 Learns and improves over time |
| 🎯 Single-platform | 🌐 Android & iOS support |

### Core Technologies

- **🤖 AI Agents**: Perception, Planning, Execution, and Recovery agents working in harmony
- **🧠 Large Language Models**: GPT-4 powered natural language understanding and action planning
- **🎯 Reinforcement Learning**: Adaptive policies that continuously improve success rates
- **📱 Appium Integration**: Cross-platform mobile automation (Android & iOS)
- **⚡ Real-time Dashboard**: Modern React interface with live WebSocket updates
- **🔌 Plugin Architecture**: Extensible system for custom functionality
- **📊 Metrics & Monitoring**: Prometheus integration for production-grade observability

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    React Frontend                           │
│  (Dashboard, Tasks, Devices, Analytics, AI Training)        │
└─────────────────┬───────────────────────────────────────────┘
                  │ WebSocket + REST API
┌─────────────────▼───────────────────────────────────────────┐
│                 Backend API Server                          │
│  (Flask/FastAPI - Task Queue, Metrics, Device Management)   │
└─────────────────┬───────────────────────────────────────────┘
                  │
┌─────────────────▼───────────────────────────────────────────┐
│                  AI Orchestrator                            │
│  ┌──────────────┬────────────┬──────────────┬─────────┐    │
│  │  Perception  │  Planning  │  Execution   │ Recovery│    │
│  │    Agent     │   Agent    │    Agent     │  Agent  │    │
│  └──────────────┴────────────┴──────────────┴─────────┘    │
│                         │                                   │
│              ┌──────────┴──────────┐                       │
│              │  Plugin System      │                       │
│              │  (Vision, OMH, etc) │                       │
│              └─────────────────────┘                       │
└─────────────────┬───────────────────────────────────────────┘
                  │ Appium Protocol
┌─────────────────▼───────────────────────────────────────────┐
│            Mobile Devices (Android/iOS)                     │
│     ┌────────────┐  ┌────────────┐  ┌────────────┐        │
│     │  Emulator  │  │ Real Device│  │  Emulator  │        │
│     └────────────┘  └────────────┘  └────────────┘        │
└─────────────────────────────────────────────────────────────┘
```

## ✨ Key Features

### 🤖 Intelligent Automation

<details>
<summary><b>Natural Language Task Execution</b></summary>

Simply describe what you want in plain English:
```python
"Open Instagram, navigate to the Explore page, and like the first 3 posts"
```

AutoRL's LLM-powered planning agent understands the intent and generates the action sequence automatically.

</details>

<details>
<summary><b>Visual Perception & OCR</b></summary>

- **Screenshot Analysis**: Capture and analyze UI state in real-time
- **OCR Text Extraction**: Extract text from any UI element using Tesseract
- **Element Detection**: Identify buttons, inputs, and interactive elements
- **Screen State Understanding**: Contextual awareness of app state
- **Vision Boost Plugin**: Enhanced visual recognition with confidence scoring

</details>

<details>
<summary><b>Smart Action Planning</b></summary>

- **LLM-Powered**: GPT-4 generates optimal action sequences
- **Context-Aware**: Considers current screen state and task history
- **Confidence Scoring**: Evaluates plan quality before execution
- **Multi-Step Workflows**: Handles complex, multi-step automations
- **Adaptive Replanning**: Adjusts plans based on execution results

</details>

<details>
<summary><b>Self-Healing Error Recovery</b></summary>

When errors occur, AutoRL doesn't just fail—it recovers:
- **Automatic Detection**: Identifies errors and unexpected states
- **Root Cause Analysis**: LLM analyzes what went wrong
- **Recovery Planning**: Generates intelligent recovery strategies
- **Fallback Strategies**: Multiple recovery paths with priority
- **Learning from Failures**: Stores recovery patterns for future use

Example recovery flow:
```
Error: Button not found
  ↓
Recovery Agent Analyzes
  ↓
Tries Alternative: Scroll down and retry
  ↓
Success: Button found after scroll
  ↓
Stores Recovery Pattern: "scroll_when_element_missing"
```

</details>

<details>
<summary><b>Reinforcement Learning</b></summary>

- **Adaptive Policies**: Learn optimal action strategies over time
- **Experience Buffer**: Stores successful and failed attempts
- **Epsilon-Greedy Exploration**: Balances exploration vs exploitation
- **Shadow Mode**: Test new policies safely alongside production
- **Policy Promotion**: Hot-swap policies without downtime
- **Performance Tracking**: Monitor policy success rates and metrics

</details>

### 📊 Real-time Monitoring & Analytics

<details>
<summary><b>Live Dashboard</b></summary>

Modern React dashboard with real-time updates via WebSocket:
- **Task Execution Viewer**: Watch tasks execute in real-time
- **Agent Activity Log**: See what each agent is thinking and doing
- **Thought Bubbles**: Visual representation of agent state
- **Device Viewer**: Live device screens with interaction tracking
- **Performance Charts**: Success rates, execution times, trends
- **System Health**: CPU, memory, and task queue metrics

</details>

<details>
<summary><b>Prometheus Metrics</b></summary>

Production-grade observability:
```
autorl_task_success_total          # Total successful tasks
autorl_task_failure_total          # Total failed tasks
autorl_tasks_in_progress           # Currently executing tasks
autorl_avg_task_runtime_seconds    # Average execution time
autorl_device_utilization          # Device usage metrics
autorl_agent_performance           # Per-agent success rates
```

Access at: `http://localhost:8000/metrics`

</details>

<details>
<summary><b>Activity Logging</b></summary>

- **Structured JSON Logs**: Machine-readable audit trails
- **Sensitive Data Masking**: Automatic PII protection
- **Secure Audit Logs**: Critical operations tracking
- **Log Rotation**: Automatic cleanup with configurable retention
- **Multi-level Logging**: DEBUG, INFO, WARNING, ERROR, CRITICAL

</details>

### 🔌 Extensibility & Integration

<details>
<summary><b>Plugin Architecture</b></summary>

Extend AutoRL with custom functionality:

```python
from plugins.base_plugin import BasePlugin

class MyCustomPlugin(BasePlugin):
    def initialize(self, config):
        # Setup code
        self.api_key = config.get('api_key')
    
    def process(self, input_data):
        # Custom logic
        return {"status": "success", "data": processed_data}
    
    def shutdown(self):
        # Cleanup
        pass
```

Drop plugins in `plugins/` directory for automatic discovery.

**Included Plugins:**
- `vision_boost` - Enhanced visual recognition
- `error_recovery` - Advanced error handling
- `memory_cache` - Performance optimization
- `omh_auth_plugin` - OMH authentication
- `omh_maps_plugin` - Location services integration

</details>

<details>
<summary><b>REST & WebSocket APIs</b></summary>

**REST API Endpoints:**
```bash
GET    /api/health              # Health check
GET    /api/devices             # List devices
POST   /api/devices             # Add device
GET    /api/tasks               # Task history
POST   /api/tasks               # Create task
GET    /api/tasks/{id}          # Task details
GET    /api/metrics             # System metrics
GET    /api/policies            # RL policies
POST   /api/policies/promote    # Promote policy
GET    /api/plugins             # List plugins
POST   /api/plugins/{id}/exec   # Execute plugin
```

**WebSocket Events:**
```javascript
ws://localhost:5000/ws

Events:
- perception              // UI analysis complete
- planning               // Action plan generated
- execution_start        // Task execution begins
- execution_step         // Individual action executed
- error                  // Error occurred
- recovery_initiated     // Recovery process started
- recovery_succeeded     // Recovery successful
- recovery_failed        // Recovery failed
- completed              // Task completed
- memory_saved           // Learning data stored
```

Full API documentation at: `http://localhost:5000/docs`

</details>

### 🚀 Production-Ready Features

- ✅ **Docker Support**: Containerized deployment with docker-compose
- ✅ **Configuration Management**: YAML-based with environment variable overrides
- ✅ **Demo Mode**: Test without real devices using mock data
- ✅ **Hot Reload**: Development mode with automatic code reload
- ✅ **Error Handling**: Comprehensive try-catch with graceful degradation
- ✅ **Rate Limiting**: Protect APIs from abuse
- ✅ **Security**: API key authentication, encryption, audit logging
- ✅ **Scalability**: Parallel task execution, queue management
- ✅ **Testing**: Comprehensive test suite with pytest
- ✅ **Documentation**: Swagger/OpenAPI, detailed guides

## 📂 Project Structure

```
├── src/
│   ├── components/          # React UI components
│   ├── pages/              # Dashboard pages
│   ├── agent_service/      # AI agent implementations
│   ├── runtime/            # Device and task management
│   ├── llm/                # LLM integration
│   ├── rl/                 # Reinforcement learning
│   ├── perception/         # Visual perception
│   └── api_server.py       # Backend API
├── autorl_project/
│   ├── main.py             # Main orchestrator
│   ├── api_server.py       # Production API server
│   └── autorl-frontend/    # Frontend build
├── plugins/                # Extensible plugin system
├── agents/                 # Agent registry
├── autorl-demo/            # Demo with mock data
└── tests/                  # Test suites
```

## 🚀 Quick Start

Get AutoRL running in under 5 minutes!

### Option 1: One-Command Startup (Recommended)

```bash
# Clone the repository
git clone https://github.com/yourusername/autorl.git
cd autorl

# Install dependencies
pip install -r requirements.txt
npm install

# Start everything with one command
python start_autorl.py
```

**That's it!** Open http://localhost:5173 to see the dashboard.

### Option 2: Docker (Zero Setup)

```bash
# Clone and start with Docker
git clone https://github.com/yourusername/autorl.git
cd autorl

# Build and run
docker-compose up -d

# View logs
docker-compose logs -f
```

Access at: http://localhost:5173

### Option 3: Manual Setup (Full Control)

<details>
<summary>Click to expand manual setup instructions</summary>

**Terminal 1 - Backend:**
```bash
python backend_server.py
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

**Terminal 3 - Appium (optional, for real devices):**
```bash
appium
```

</details>

### First Steps After Installation

1. **Open Dashboard**: Navigate to http://localhost:5173
2. **Check Connection**: Look for green "WebSocket Connected" badge
3. **Create Your First Task**:
   ```
   Task: "Open Instagram and navigate to Explore page"
   Device: Select any (or leave empty for demo mode)
   Click: Start Task
   ```
4. **Watch the Magic**: See real-time updates as AI agents execute your task

### Demo Mode (No Devices Required)

AutoRL starts in **demo mode** by default, which simulates everything:
- ✅ No physical devices needed
- ✅ No Appium installation required
- ✅ Realistic AI execution simulation
- ✅ WebSocket real-time updates
- ✅ Perfect for development and testing

**Switch to production mode:**
```bash
# In config.yaml
server:
  mode: "production"

# Or via environment variable
export AUTORL_MODE=production
python backend_server.py
```

## 💿 Installation

### Prerequisites

| Component | Version | Required | Purpose |
|-----------|---------|----------|---------|
| Python | 3.9+ | ✅ Yes | Backend runtime |
| Node.js | 16+ | ✅ Yes | Frontend build |
| Appium | 2.0+ | ⚠️ Production only | Device automation |
| Android SDK | Latest | ⚠️ Android only | Emulator support |
| Xcode | Latest | ⚠️ iOS only | iOS simulator |
| Docker | 20+ | ❌ Optional | Container deployment |

### Detailed Installation Steps

#### 1. Clone Repository

```bash
git clone https://github.com/yourusername/autorl.git
cd autorl
```

#### 2. Python Dependencies

```bash
# Create virtual environment (recommended)
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

**Core Dependencies:**
- `fastapi` - Web framework
- `uvicorn` - ASGI server
- `appium-python-client` - Mobile automation
- `openai` - LLM integration
- `Pillow` & `pytesseract` - Image processing & OCR
- `prometheus-client` - Metrics
- `websockets` - Real-time communication

#### 3. Node.js Dependencies

```bash
npm install
```

**Core Dependencies:**
- `react` & `react-dom` - UI framework
- `vite` - Build tool
- `tailwindcss` - Styling
- `lucide-react` - Icons

#### 4. Additional Setup (Optional)

<details>
<summary><b>Tesseract OCR (for text extraction)</b></summary>

**Ubuntu/Debian:**
```bash
sudo apt-get install tesseract-ocr
```

**macOS:**
```bash
brew install tesseract
```

**Windows:**
Download from: https://github.com/UB-Mannheim/tesseract/wiki

</details>

<details>
<summary><b>Appium (for real device automation)</b></summary>

```bash
# Install Appium
npm install -g appium

# Install drivers
appium driver install uiautomator2  # Android
appium driver install xcuitest       # iOS

# Verify installation
appium --version
```

</details>

<details>
<summary><b>Android SDK Setup</b></summary>

1. Install Android Studio
2. Open SDK Manager
3. Install:
   - Android SDK Platform Tools
   - Android Emulator
   - System Images (Android 11+)
4. Add to PATH:
   ```bash
   export ANDROID_HOME=$HOME/Android/Sdk
   export PATH=$PATH:$ANDROID_HOME/emulator
   export PATH=$PATH:$ANDROID_HOME/platform-tools
   ```

</details>

#### 5. Verify Installation

```bash
# Check Python installation
python --version
pip list | grep fastapi

# Check Node.js installation
node --version
npm list react

# Test backend
python -c "import fastapi; print('Backend OK')"

# Test frontend build
npm run build
```

## ⚙️ Configuration

AutoRL uses a powerful YAML-based configuration system with environment variable overrides.

### config.yaml

The main configuration file (`config.yaml`) controls all aspects of the system:

<details>
<summary><b>Server Configuration</b></summary>

```yaml
server:
  host: "0.0.0.0"              # Bind address
  port: 5000                    # API port
  mode: "demo"                  # "demo" or "production"
  debug: false                  # Debug mode
  cors_origins: ["*"]           # CORS allowed origins
```

</details>

<details>
<summary><b>API Configuration</b></summary>

```yaml
api:
  base_url: "http://localhost:5000/api"
  websocket_url: "ws://localhost:5000/ws"
  metrics_port: 8000
  timeout: 300                  # Request timeout (seconds)
```

</details>

<details>
<summary><b>Device Configuration</b></summary>

```yaml
devices:
  max_parallel: 4               # Max simultaneous devices
  default_platform: "android"   # Default platform
  auto_discover: true           # Auto-discover connected devices
  
  preregistered:
    - device_id: "emulator-5554"
      platform: "android"
      is_real: false
    - device_id: "iPhone 15"
      platform: "ios"
      is_real: false
```

Add devices programmatically:
```python
from src.runtime import DeviceManager, Device

device_manager = DeviceManager()
await device_manager.add_device(
    Device("Pixel_7", "android", is_real=True)
)
```

</details>

<details>
<summary><b>LLM Configuration</b></summary>

```yaml
llm:
  provider: "openai"            # "openai", "anthropic", "local"
  model: "gpt-4"                # Model name
  temperature: 0.7              # Creativity (0-1)
  max_tokens: 2000              # Response length
  api_key_env: "OPENAI_API_KEY" # Environment variable name
  fallback_enabled: true        # Use fallback on failure
```

</details>

<details>
<summary><b>Reinforcement Learning</b></summary>

```yaml
reinforcement_learning:
  initial_policy: "initial_policy"
  shadow_mode_enabled: true     # Test policies safely
  learning_rate: 0.001
  epsilon_start: 0.1            # Initial exploration
  epsilon_min: 0.01             # Minimum exploration
  epsilon_decay: 0.995          # Decay rate
  discount_factor: 0.99         # Future reward weight
  experience_buffer_size: 10000 # Memory size
```

</details>

<details>
<summary><b>Plugin Configuration</b></summary>

```yaml
plugins:
  directory: "./plugins"
  auto_load: true
  enabled_plugins:
    - vision_boost
    - error_recovery
    - memory_cache
    - omh_auth_plugin
  
  # Plugin-specific settings
  vision_boost:
    confidence_threshold: 0.85
    max_retries: 3
  
  error_recovery:
    max_recovery_attempts: 3
    recovery_timeout: 30
```

</details>

### Environment Variables

Create a `.env` file in the project root:

```bash
# ============================================
# API Keys & Secrets
# ============================================
OPENAI_API_KEY=sk-your-key-here
ANTHROPIC_API_KEY=your-key-here

# ============================================
# Appium Configuration
# ============================================
APPIUM_SERVER_URL=http://localhost:4723/wd/hub

# ============================================
# Application Mode
# ============================================
AUTORL_MODE=demo                # "demo" or "production"

# ============================================
# Database (Optional)
# ============================================
DB_PASSWORD=your-db-password
REDIS_URL=redis://localhost:6379

# ============================================
# Security (Production)
# ============================================
API_KEY=your-api-key
SECRET_KEY=your-secret-key
ENCRYPTION_KEY=your-encryption-key

# ============================================
# Monitoring (Optional)
# ============================================
PROMETHEUS_PORT=8000
SENTRY_DSN=your-sentry-dsn

# ============================================
# Frontend
# ============================================
VITE_API_BASE_URL=http://localhost:5000/api
VITE_WS_URL=ws://localhost:5000/ws
```

### Configuration Priority

Configuration values are loaded in this order (later overrides earlier):

1. **Default values** in code
2. **config.yaml** file
3. **Environment variables**
4. **Command-line arguments** (if applicable)

Example:
```bash
# Override mode via environment variable
export AUTORL_MODE=production
python backend_server.py

# Or pass directly
AUTORL_MODE=production python backend_server.py
```

## 📖 Usage Examples

### Example 1: Basic Task Execution

```python
import requests

# Create a task via API
response = requests.post('http://localhost:5000/api/tasks', json={
    "instruction": "Open Twitter and like the first post",
    "device_id": "emulator-5554",
    "parameters": {
        "enable_learning": True,
        "timeout": 120
    }
})

task_id = response.json()['task_id']
print(f"Task created: {task_id}")
```

**What happens:**
1. Perception Agent captures screenshot
2. Planning Agent generates action plan
3. Execution Agent performs actions
4. Recovery Agent handles any errors
5. Results are stored for learning

### Example 2: Real-time Monitoring with WebSocket

```javascript
// Connect to WebSocket for real-time updates
const ws = new WebSocket('ws://localhost:5000/ws');

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  
  switch(data.event) {
    case 'perception':
      console.log('UI analyzed:', data.data);
      break;
    case 'planning':
      console.log('Action plan:', data.data.actions);
      break;
    case 'execution_step':
      console.log('Executing:', data.data.action);
      break;
    case 'completed':
      console.log('Task completed!', data.data.result);
      break;
    case 'error':
      console.log('Error occurred:', data.data.error);
      break;
  }
};
```

### Example 3: Custom Plugin Development

```python
# plugins/custom_analytics.py
from plugins.base_plugin import BasePlugin
import logging

class CustomAnalyticsPlugin(BasePlugin):
    """Custom analytics plugin for tracking user behavior"""
    
    def initialize(self, config):
        self.logger = logging.getLogger(__name__)
        self.analytics_endpoint = config.get('endpoint')
        self.logger.info("Analytics plugin initialized")
    
    def process(self, input_data):
        """Process analytics data"""
        event_type = input_data.get('type')
        event_data = input_data.get('data')
        
        # Send to analytics service
        self._send_analytics(event_type, event_data)
        
        return {
            "status": "success",
            "events_sent": 1
        }
    
    def _send_analytics(self, event_type, data):
        # Your analytics logic here
        pass
    
    def shutdown(self):
        self.logger.info("Analytics plugin shutdown")
```

**Usage:**
```python
# Execute plugin via API
response = requests.post('http://localhost:5000/api/plugins/custom_analytics/exec', json={
    "type": "task_completed",
    "data": {"task_id": "123", "duration": 45.2}
})
```

### Example 4: Advanced Task with Recovery

```python
# Complex task with custom error handling
task_config = {
    "instruction": """
        1. Open the weather app
        2. Search for 'New York'
        3. Take a screenshot of the 7-day forecast
        4. Navigate to settings and enable notifications
    """,
    "device_id": "Pixel_7",
    "parameters": {
        "enable_learning": True,
        "max_retries": 3,
        "recovery_strategy": "adaptive",  # or "aggressive", "conservative"
        "screenshot_on_error": True,
        "timeout": 180
    }
}

response = requests.post('http://localhost:5000/api/tasks', json=task_config)
```

### Example 5: Parallel Device Execution

```python
import asyncio
import httpx

async def execute_on_device(device_id, instruction):
    async with httpx.AsyncClient() as client:
        response = await client.post('http://localhost:5000/api/tasks', json={
            "instruction": instruction,
            "device_id": device_id
        })
        return response.json()

# Execute same task on multiple devices simultaneously
devices = ["emulator-5554", "Pixel_7", "iPhone_15"]
instruction = "Open Instagram and check notifications"

results = await asyncio.gather(*[
    execute_on_device(device, instruction) 
    for device in devices
])

print(f"Started {len(results)} tasks")
```

### Example 6: RL Policy Management

```python
# Get current policies
response = requests.get('http://localhost:5000/api/policies')
policies = response.json()

# Promote shadow policy to active
requests.post('http://localhost:5000/api/policies/promote', json={
    "policy_id": "shadow_policy_v2",
    "strategy": "gradual"  # or "immediate"
})

# Monitor policy performance
metrics = requests.get('http://localhost:5000/api/metrics').json()
print(f"Policy success rate: {metrics['policy_success_rate']}%")
```

### Example 7: Dashboard Integration

```jsx
// React component using AutoRL
import { useState, useEffect } from 'react';
import { apiService } from './services/api';
import { useWebSocket } from './hooks/useWebSocket';

function TaskExecutor() {
  const [taskStatus, setTaskStatus] = useState(null);
  const { lastMessage } = useWebSocket((message) => {
    if (message.event === 'execution_step') {
      setTaskStatus(message.data);
    }
  });
  
  const executeTask = async (instruction) => {
    const response = await apiService.createTask(instruction);
    console.log('Task started:', response.task_id);
  };
  
  return (
    <div>
      <button onClick={() => executeTask('Open Settings')}>
        Execute Task
      </button>
      {taskStatus && (
        <div>Status: {taskStatus.action}</div>
      )}
    </div>
  );
}
```

### Example 8: Batch Task Processing

```python
# Process multiple tasks in sequence
tasks = [
    "Open Gmail and archive first 5 emails",
    "Open Calendar and check tomorrow's events",
    "Open Notes and create new note 'Meeting Summary'",
    "Open Photos and upload latest screenshot"
]

for task in tasks:
    response = requests.post('http://localhost:5000/api/tasks', json={
        "instruction": task,
        "parameters": {"enable_learning": True}
    })
    task_id = response.json()['task_id']
    print(f"Queued: {task_id}")
    
    # Wait for completion (in real app, use WebSocket)
    # ... check status endpoint ...
```

## 📊 Key Components

### Frontend Dashboard

Modern React SPA with Tailwind CSS:

| Page | Description |
|------|-------------|
| **Dashboard** | Real-time task monitoring with WebSocket updates |
| **Tasks** | Create, manage, and view task history |
| **Devices** | Device connection and status management |
| **Analytics** | Performance charts and success rate tracking |
| **AI Training** | RL policy management and A/B testing |
| **Plugins** | Plugin marketplace and configuration |
| **Settings** | System configuration and preferences |

**Key Features:**
- 🔴 Live WebSocket connection indicator
- 📊 Real-time metrics and charts
- 🎨 Thought bubble visualization
- 📱 Device screen viewer
- 📝 Scrollable agent activity log
- 🎯 Task builder with drag-and-drop

## 🔌 API Reference

### REST API Endpoints

Full interactive documentation available at: http://localhost:5000/docs

#### Health & Status

```bash
GET /api/health
# Returns: { "status": "ok", "version": "1.0.0", "mode": "demo" }

GET /api/status
# Returns: { "tasks_running": 2, "devices_connected": 3, "uptime": 3600 }
```

#### Device Management

```bash
GET /api/devices
# List all connected devices

POST /api/devices
# Add a new device
Body: { "device_id": "emulator-5554", "platform": "android", "is_real": false }

GET /api/devices/{device_id}
# Get specific device details

DELETE /api/devices/{device_id}
# Remove a device
```

#### Task Management

```bash
GET /api/tasks
# List all tasks (with pagination)
Query params: ?limit=50&offset=0&status=completed

POST /api/tasks
# Create a new task
Body: {
  "instruction": "Open Instagram",
  "device_id": "emulator-5554",  # Optional (null for demo)
  "parameters": {
    "enable_learning": true,
    "timeout": 300,
    "max_retries": 3
  }
}
Response: { "task_id": "uuid", "status": "queued" }

GET /api/tasks/{task_id}
# Get task status and results
Response: {
  "task_id": "uuid",
  "status": "completed",
  "result": {...},
  "duration": 45.2,
  "success": true
}

DELETE /api/tasks/{task_id}
# Cancel a running task
```

#### Metrics & Analytics

```bash
GET /api/metrics
# Get system metrics
Response: {
  "tasks_total": 150,
  "tasks_success": 142,
  "tasks_failed": 8,
  "success_rate": 94.67,
  "avg_execution_time": 32.5,
  "devices_active": 3,
  "policy_performance": {...}
}

GET /api/metrics/prometheus
# Prometheus-formatted metrics
```

#### RL Policy Management

```bash
GET /api/policies
# List all RL policies
Response: {
  "active": { "id": "policy_v1", "success_rate": 94.5 },
  "shadow": { "id": "policy_v2", "success_rate": 96.2 },
  "archived": [...]
}

POST /api/policies/promote
# Promote shadow policy to active
Body: { "policy_id": "policy_v2", "strategy": "gradual" }

POST /api/policies/upload
# Upload new policy
Body: (multipart/form-data with policy file)
```

#### Plugin Management

```bash
GET /api/plugins
# List all available plugins
Response: [
  {
    "id": "vision_boost",
    "name": "Vision Boost",
    "version": "1.0.0",
    "enabled": true,
    "config": {...}
  }
]

POST /api/plugins/{plugin_id}/exec
# Execute a plugin
Body: { "input_data": {...} }
Response: { "status": "success", "output": {...} }

POST /api/plugins/{plugin_id}/enable
# Enable a plugin

POST /api/plugins/{plugin_id}/disable
# Disable a plugin
```

### WebSocket API

Connect to `ws://localhost:5000/ws` for real-time updates.

#### Event Types

| Event | Description | Data Schema |
|-------|-------------|-------------|
| `connected` | WebSocket connection established | `{ "client_id": "uuid" }` |
| `perception` | UI analysis completed | `{ "screenshot": "base64", "elements": [...], "text": "..." }` |
| `planning` | Action plan generated | `{ "actions": [...], "confidence": 0.95 }` |
| `execution_start` | Task execution begins | `{ "task_id": "uuid", "device": "..." }` |
| `execution_step` | Individual action executed | `{ "action": "tap", "target": "button", "success": true }` |
| `error` | Error occurred | `{ "error_type": "ElementNotFound", "message": "...", "screenshot": "..." }` |
| `recovery_initiated` | Recovery process started | `{ "strategy": "scroll_and_retry", "attempts": 1 }` |
| `recovery_succeeded` | Recovery successful | `{ "recovery_time": 5.2, "strategy_used": "..." }` |
| `recovery_failed` | Recovery failed | `{ "final_error": "...", "attempts": 3 }` |
| `completed` | Task completed | `{ "task_id": "uuid", "success": true, "duration": 45.2, "result": {...} }` |
| `memory_saved` | Learning data stored | `{ "experience_id": "uuid", "reward": 1.0 }` |
| `metrics_update` | Metrics updated | `{ "success_rate": 94.5, "tasks_completed": 150 }` |

#### Usage Example

```javascript
const ws = new WebSocket('ws://localhost:5000/ws');

// Connection opened
ws.onopen = () => {
  console.log('Connected to AutoRL');
};

// Receive messages
ws.onmessage = (event) => {
  const message = JSON.parse(event.data);
  console.log(`[${message.event}]`, message.data);
  
  // Handle specific events
  if (message.event === 'error') {
    handleError(message.data);
  }
};

// Connection closed
ws.onclose = () => {
  console.log('Disconnected, attempting reconnect...');
  // Implement reconnection logic
};

// Send messages (if needed)
ws.send(JSON.stringify({
  event: 'subscribe',
  data: { task_id: 'uuid' }
}));
```

### AI Agents

#### Perception Agent
- Screenshot capture
- OCR text extraction
- UI element detection
- Screen state analysis

#### Planning Agent
- LLM-powered action planning
- Natural language understanding
- Context-aware sequencing
- Confidence scoring

#### Execution Agent
- Action execution with retries
- Element interaction
- Timing management
- State verification

#### Recovery Agent
- Error detection
- Root cause analysis
- Recovery plan generation
- Fallback strategies

## 🔌 Plugin System

Create custom plugins by extending `BasePlugin`:

```python
from plugins.base_plugin import BasePlugin

class MyPlugin(BasePlugin):
    def initialize(self, config):
        # Setup code
        pass
    
    def process(self, input_data):
        # Plugin logic
        return {"result": "success"}
    
    def shutdown(self):
        # Cleanup code
        pass
```

Place plugins in the `plugins/` directory for automatic discovery.

## 📈 Metrics & Monitoring

### Prometheus Metrics
Available at `http://localhost:8000/metrics`

- `autorl_task_success_total` - Successful task count
- `autorl_task_failure_total` - Failed task count
- `autorl_tasks_in_progress` - Currently running tasks
- `autorl_avg_task_runtime_seconds` - Average execution time

### Activity Logging
- Structured JSON logs in `logs/`
- Sensitive data masking
- Secure audit logs for critical events

## 🧪 Testing

### Run Tests
```bash
# All tests
pytest

# Specific test suite
pytest tests/test_error_handling_basic.py
pytest tests/test_agent_service.py

# With coverage
pytest --cov=src tests/
```

### Mock Integration Testing
```bash
# Start mock server
cd autorl-demo/backend
python app.py

# Run integration tests
pytest tests/test_automation_suite.py
```

## 🚢 Deployment

### Docker

```bash
# Build and run all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Production Setup

1. Configure environment variables
2. Set up Prometheus for monitoring
3. Configure device farm or cloud device provider
4. Enable secure logging and audit trails
5. Set up load balancing for API server

See `DEPLOYMENT_GUIDE.md` for detailed instructions.

## 📚 Documentation

- **Quick Start**: `QUICK_START.md`
- **Error Handling**: `ERROR_HANDLING_GUIDE.md`
- **OMH Integration**: `OMH_INTEGRATION_GUIDE.md`
- **Deployment**: `DEPLOYMENT_GUIDE.md`
- **Production Readiness**: `PRODUCTION_ENHANCEMENTS.md`

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch
3. Write tests for new functionality
4. Ensure all tests pass
5. Submit a pull request

## 📝 Use Cases

- **Mobile App Testing**: Automated regression testing
- **User Flow Validation**: End-to-end journey testing
- **Performance Monitoring**: Real-world performance metrics
- **Accessibility Testing**: Screen reader and interaction testing
- **Data Collection**: User interaction patterns and analytics
- **Competitive Analysis**: Monitor competitor app features

## 🔐 Security

- Sensitive data masking in logs
- Secure credential storage
- API authentication support
- Audit trail for critical operations
- Plugin sandboxing

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

Built with:
- **React** - Frontend framework
- **Tailwind CSS** - Styling
- **Flask/FastAPI** - Backend APIs
- **Appium** - Mobile automation
- **PyTorch** - Reinforcement learning
- **OpenAI** - LLM integration

---

**Built with ❤️ for intelligent mobile automation**

For questions, issues, or feature requests, please open a GitHub issue.
