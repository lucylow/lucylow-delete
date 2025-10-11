# AutoRL Integration Guide

## 🎯 Overview

This guide explains how all components of the AutoRL platform are integrated together.

## 🏗️ Architecture Integration

### Component Stack

```
┌─────────────────────────────────────────────────────────────┐
│                    React Frontend                           │
│  Components: Dashboard, Tasks, Devices, Analytics          │
│  State Management: React Hooks, WebSocket                  │
│  API Layer: apiService.js                                  │
└─────────────────┬───────────────────────────────────────────┘
                  │
        REST API + WebSocket
                  │
┌─────────────────▼───────────────────────────────────────────┐
│            Unified Backend Server                           │
│              (backend_server.py)                            │
│  - FastAPI with CORS                                        │
│  - WebSocket Connection Manager                            │
│  - REST Endpoints for all operations                       │
│  - Mock data generation for demo mode                      │
└─────────────────┬───────────────────────────────────────────┘
                  │
    ┌─────────────┼─────────────┐
    │             │             │
    ▼             ▼             ▼
┌────────┐  ┌──────────┐  ┌──────────┐
│Devices │  │Orchestrat│  │ Plugins  │
│Manager │  │   or     │  │ Registry │
└────────┘  └──────────┘  └──────────┘
    │             │             │
    └─────────────┼─────────────┘
                  │
    ┌─────────────┴─────────────┐
    │                           │
    ▼                           ▼
┌────────┐                 ┌────────┐
│AI Agent│                 │  RL    │
│ Stack  │                 │ Policy │
└────────┘                 └────────┘
    │
    │ Appium
    │
    ▼
┌────────┐
│Devices │
└────────┘
```

## 🔌 Integration Points

### 1. Frontend ↔ Backend API

**Location:** `src/services/api.js`

**Integration:**
- Centralized API service for all HTTP requests
- Environment-based URL configuration
- Error handling and retry logic
- Type-safe requests with TypeScript-compatible JSDoc

**Example:**
```javascript
import { apiService } from '@/services/api'

// Create a task
const response = await apiService.createTask(
  "Open Instagram and like latest post",
  "android_pixel_7",
  { enable_learning: true }
)
```

### 2. Frontend ↔ WebSocket

**Location:** `src/hooks/useWebSocket.js`

**Integration:**
- Real-time bidirectional communication
- Automatic reconnection on disconnect
- Event-based message handling
- Connection state management

**Example:**
```javascript
import { useWebSocket } from '@/hooks/useWebSocket'

const { isConnected, sendMessage } = useWebSocket((message) => {
  if (message.event === 'task_completed') {
    console.log('Task completed:', message)
  }
})
```

### 3. Backend ↔ AI Agents

**Location:** `backend_server.py` → `src/orchestrator.py`

**Integration:**
- Orchestrator manages AI agent workflow
- Task execution pipeline: Perception → Planning → Execution → Recovery
- State management for active tasks
- Metrics collection via Prometheus

**Flow:**
```python
# Task created via API
task_req = TaskRequest(instruction="...", device_id="...")

# Orchestrator executes
result = await orchestrator.execute_task_with_recovery(
    task_req.instruction,
    task_req.device_id,
    timeout_seconds=300
)

# Results broadcast via WebSocket
await manager.broadcast({
    "event": "completed",
    "task_id": task_id,
    "status": result.status
})
```

### 4. Backend ↔ Plugin System

**Location:** `backend_server.py` → `agents/registry.py`

**Integration:**
- Dynamic plugin discovery and loading
- Plugin execution via REST API
- Configuration injection
- Lifecycle management (init, execute, shutdown)

**API Endpoints:**
- `GET /api/plugins` - List all plugins
- `POST /api/plugins/{name}/execute` - Execute a plugin

### 5. Backend ↔ Device Manager

**Location:** `backend_server.py` → `src/runtime/device_manager.py`

**Integration:**
- Device registration and tracking
- Device pool management
- Session management for Appium connections
- Parallel task execution

**Features:**
- Device acquisition/release
- Status monitoring
- Platform detection (Android/iOS)
- Real vs Emulator tracking

### 6. Backend ↔ RL Policy Manager

**Location:** `backend_server.py` → `src/rl/policy_manager.py`

**Integration:**
- Policy registration and versioning
- Active policy switching
- Shadow mode testing
- Policy promotion via API

**API Endpoints:**
- `GET /api/policies` - List all policies
- `POST /api/policies/promote` - Promote policy to active

## 📡 Communication Protocols

### REST API Endpoints

```
Health & Status
├── GET  /api/health                    # Health check
└── GET  /api/activity                  # Activity log

Devices
├── GET  /api/devices                   # List devices
└── POST /api/devices/{id}/command      # Send command

Tasks
├── GET  /api/tasks                     # Get task history
├── POST /api/tasks                     # Create new task
└── GET  /api/tasks/{id}                # Get task details

Metrics
└── GET  /api/metrics                   # System metrics

Policies
├── GET  /api/policies                  # List RL policies
└── POST /api/policies/promote          # Promote policy

Plugins
├── GET  /api/plugins                   # List plugins
└── POST /api/plugins/{name}/execute    # Execute plugin

Agent Control
├── POST /api/agent/start               # Start orchestrator
└── POST /api/agent/stop                # Stop orchestrator
```

### WebSocket Events

**Client → Server:**
```json
{
  "action": "ping",
  "timestamp": 1234567890
}
```

**Server → Client:**
```json
{
  "event": "perception",
  "task_id": "uuid",
  "text": "Analyzing UI...",
  "confidence": 0.97
}

{
  "event": "planning",
  "task_id": "uuid",
  "plan": ["tap", "type", "confirm"],
  "confidence": 0.94
}

{
  "event": "execution_start",
  "task_id": "uuid",
  "progress": 30
}

{
  "event": "error",
  "task_id": "uuid",
  "text": "Element not found",
  "severity": "warning"
}

{
  "event": "completed",
  "task_id": "uuid",
  "success": true,
  "reward": 0.98
}
```

## 🔄 Data Flow Examples

### Creating and Executing a Task

1. **User Action:** User fills form in Dashboard
2. **Frontend:** `TaskControlPanel.jsx` calls `apiService.createTask()`
3. **Backend:** `POST /api/tasks` endpoint receives request
4. **Backend:** Creates task entry, starts async execution
5. **Orchestrator:** Executes AI agent workflow
6. **WebSocket:** Broadcasts real-time updates
7. **Frontend:** `useWebSocket` hook receives updates
8. **Dashboard:** UI updates in real-time
9. **Completion:** Task removed from active, added to history
10. **Frontend:** Refreshes metrics and device status

### Live Updates Flow

```
Task Start
    ↓
Perception Agent
    ↓ [WebSocket: perception event]
Frontend: Update "Analyzing UI..."
    ↓
Planning Agent
    ↓ [WebSocket: planning event]
Frontend: Update "Generating plan..."
    ↓
Execution Agent
    ↓ [WebSocket: execution_start event]
Frontend: Update "Executing actions..."
    ↓
Error (Optional)
    ↓ [WebSocket: error event]
Frontend: Update "⚠️ Element not found"
    ↓
Recovery Agent
    ↓ [WebSocket: recovery_execute event]
Frontend: Update "Recovering..."
    ↓
Completion
    ↓ [WebSocket: completed event]
Frontend: Update "✅ Completed"
    ↓
Metrics Update
    ↓ [REST: GET /api/metrics]
Frontend: Refresh dashboard
```

## 🎭 Demo Mode vs Production Mode

### Demo Mode (Default)
- No real devices required
- Mock data generation
- Simulated AI agent execution
- WebSocket events with delays
- Perfect for development and testing

**Activation:**
```bash
AUTORL_MODE=demo python backend_server.py
```

### Production Mode
- Real Appium connections
- Actual device automation
- Real AI agent execution
- Requires Appium server running
- Requires devices/emulators

**Activation:**
```bash
AUTORL_MODE=production python backend_server.py
```

## 📦 Mock Data Integration

Mock data is integrated throughout the stack:

1. **Backend (`backend_server.py`):**
   - `generate_mock_devices()` - Device data
   - `generate_mock_metrics()` - System metrics
   - `execute_demo_task()` - Simulated task execution

2. **Frontend (Components):**
   - Graceful fallback to mock data
   - Demo content in UI components
   - Sample tasks and history

3. **API Responses:**
   - Always return valid data structure
   - Fallback to mock on error
   - Consistent data shapes

## 🔧 Configuration

All configuration is centralized in `config.yaml`:

```yaml
server:
  mode: "demo"  # or "production"
  port: 5000

api:
  base_url: "http://localhost:5000/api"
  
frontend:
  port: 5173
  
appium:
  server_url: "http://localhost:4723/wd/hub"
  
# ... more configuration
```

## 🚀 Starting the Integrated System

### Option 1: Startup Script (Recommended)
```bash
python start_autorl.py
```

### Option 2: Manual Start
```bash
# Terminal 1: Backend
python backend_server.py

# Terminal 2: Frontend
npm run dev
```

### Option 3: Docker
```bash
docker-compose up
```

## 🧪 Testing the Integration

### 1. Health Check
```bash
curl http://localhost:5000/api/health
```

### 2. Create a Test Task
```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "instruction": "Open Instagram",
    "device_id": "android_pixel_7"
  }'
```

### 3. Monitor WebSocket
```javascript
const ws = new WebSocket('ws://localhost:5000/ws')
ws.onmessage = (event) => {
  console.log('Received:', JSON.parse(event.data))
}
```

### 4. Check Metrics
```bash
curl http://localhost:5000/api/metrics
```

## 🐛 Troubleshooting

### Frontend Can't Connect to Backend
- Check `VITE_API_BASE_URL` in `.env`
- Verify backend is running on correct port
- Check CORS settings in `backend_server.py`

### WebSocket Not Connecting
- Check `VITE_WS_URL` in `.env`
- Verify WebSocket endpoint: `ws://localhost:5000/ws`
- Check browser console for connection errors

### No Tasks Executing
- Check orchestrator is initialized
- Verify device manager has devices
- Check logs for errors
- Try demo mode first

### Mock Data Not Showing
- Verify backend is in demo mode
- Check API responses in network tab
- Ensure fallback logic is working

## 📚 Related Documentation

- `README.md` - Project overview
- `config.yaml` - Configuration reference
- `ERROR_HANDLING_GUIDE.md` - Error handling
- `DEPLOYMENT_GUIDE.md` - Production deployment

## 🤝 Contributing

When adding new integrations:

1. Update this guide
2. Add to configuration file
3. Update API documentation
4. Add tests for integration points
5. Update startup script if needed

