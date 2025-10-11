# AutoRL Quick Start Guide - Integrated System

This guide will get you up and running with the fully integrated AutoRL platform in minutes.

## 🎯 What You'll Get

- ✅ React frontend with real-time dashboard
- ✅ Unified backend API with WebSocket support
- ✅ AI agents (Perception, Planning, Execution, Recovery)
- ✅ Plugin system integration
- ✅ Mock data for testing without devices
- ✅ Full automation workflow

## 🚀 Quick Start (5 minutes)

### Step 1: Install Dependencies

```bash
# Install Python dependencies
pip install -r requirements.txt

# Install Node.js dependencies
npm install
```

### Step 2: Start Everything (Easiest Method)

```bash
# This starts both backend and frontend
python start_autorl.py
```

That's it! The startup script will:
- ✅ Check all dependencies
- ✅ Start the backend API server (port 5000)
- ✅ Start the frontend dev server (port 5173)
- ✅ Display all service URLs
- ✅ Monitor services for errors

### Step 3: Open the Dashboard

Navigate to: **http://localhost:5173**

## 🎮 Using the Platform

### Creating Your First Task

1. **Open Dashboard** at http://localhost:5173
2. **Click "Create New Task"** panel
3. **Enter a task** like: `"Open Instagram and like the latest post"`
4. **Select a device** (or leave as auto)
5. **Click "Start Task"**

Watch the real-time execution in the "Live Task Execution" panel!

### What You'll See

The dashboard shows real-time updates as the task executes:

1. 🔍 **Perception** - "Capturing screenshot and analyzing UI..."
2. 🧠 **Planning** - "LLM generating action plan..."
3. ▶️ **Execution** - "Executing actions..."
4. ⚠️ **Error (if any)** - "Element not found - initiating recovery..."
5. 🔄 **Recovery** - "Analyzing UI state for recovery..."
6. ✅ **Completion** - "Task completed successfully"

### Understanding the Dashboard

**Top Metrics:**
- **Tasks Completed** - Total successful tasks
- **Success Rate** - Percentage of successful tasks
- **Avg Execution** - Average time per task
- **Active Devices** - Currently connected devices

**Connection Status:**
- 🟢 **WebSocket Connected** - Real-time updates active
- 🔴 **WebSocket Disconnected** - Reconnecting...
- **System Active/Idle** - Task execution status

## 📊 Available Services

After starting with `python start_autorl.py`, you'll have:

| Service | URL | Description |
|---------|-----|-------------|
| **Dashboard** | http://localhost:5173 | Main UI |
| **API Backend** | http://localhost:5000 | REST API |
| **API Docs** | http://localhost:5000/docs | Swagger UI |
| **Metrics** | http://localhost:8000/metrics | Prometheus metrics |
| **WebSocket** | ws://localhost:5000/ws | Real-time updates |

## 🔧 Alternative Start Methods

### Method 1: Separate Terminals (For Development)

```bash
# Terminal 1: Backend
python backend_server.py

# Terminal 2: Frontend
npm run dev
```

### Method 2: Using npm scripts

```bash
# Start backend in demo mode
npm run backend:demo

# In another terminal, start frontend
npm run dev
```

### Method 3: Production Mode (With Real Devices)

```bash
# Make sure Appium is running first
appium

# Start in production mode
export AUTORL_MODE=production  # or set AUTORL_MODE=production on Windows
python backend_server.py
```

## 🎭 Demo Mode vs Production Mode

### Demo Mode (Default - No Devices Needed)

Demo mode is perfect for:
- Testing the platform
- Development
- UI/UX work
- Integration testing
- Demonstrations

**Features:**
- ✅ Mock device data
- ✅ Simulated AI execution
- ✅ Real-time WebSocket updates
- ✅ Realistic delays and errors
- ✅ No Appium required
- ✅ No real devices needed

**Start Demo Mode:**
```bash
python start_autorl.py  # Default is demo mode
```

### Production Mode (For Real Automation)

Production mode for:
- Actual device automation
- Real app testing
- Production workflows

**Requirements:**
- Appium server running
- Android SDK or Xcode
- Real devices or emulators connected

**Start Production Mode:**
```bash
export AUTORL_MODE=production
python backend_server.py
```

## 🧪 Testing the Integration

### Test 1: API Health Check

```bash
curl http://localhost:5000/api/health
```

Expected response:
```json
{
  "status": "healthy",
  "mode": "demo",
  "timestamp": "2024-01-01T12:00:00",
  "devices_connected": 3,
  "active_tasks": 0
}
```

### Test 2: Create a Task via API

```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "instruction": "Open Instagram",
    "device_id": null,
    "parameters": {"enable_learning": true}
  }'
```

### Test 3: Monitor WebSocket (Browser Console)

```javascript
const ws = new WebSocket('ws://localhost:5000/ws')
ws.onmessage = (e) => console.log('WS:', JSON.parse(e.data))
ws.onopen = () => console.log('WebSocket connected')
```

### Test 4: Check Metrics

```bash
curl http://localhost:5000/api/metrics
```

## 📚 Next Steps

### Explore the Dashboard

1. **Tasks Page** - Create and monitor tasks
2. **Devices Page** - View connected devices
3. **Analytics Page** - Performance metrics and trends
4. **AI Training Page** - RL policy management
5. **Marketplace Page** - Plugin marketplace

### Try Different Tasks

Example task instructions:
- `"Open Twitter and post a tweet"`
- `"Navigate to profile settings"`
- `"Take a screenshot and save it"`
- `"Search for 'AutoRL' in the app store"`
- `"Login with username 'test' and password 'demo'"`

### Customize Configuration

Edit `config.yaml` to customize:
- Server ports
- Device settings
- AI/LLM configuration
- Plugin settings
- Logging levels

### Add Your Own Plugins

Create a plugin in `plugins/` directory:

```python
# plugins/my_plugin.py
from plugins.base_plugin import BasePlugin

class MyPlugin(BasePlugin):
    def initialize(self, config):
        print("My plugin initialized!")
    
    def process(self, input_data):
        return {"result": "success", "data": input_data}
    
    def shutdown(self):
        print("My plugin shutting down")
```

Restart the backend and your plugin will be auto-loaded!

## 🐛 Troubleshooting

### Backend won't start

**Check:**
1. Python dependencies installed: `pip install -r requirements.txt`
2. Port 5000 is not in use
3. Check logs in terminal

### Frontend won't start

**Check:**
1. Node modules installed: `npm install`
2. Port 5173 is not in use
3. Backend is running

### WebSocket won't connect

**Check:**
1. Backend is running
2. CORS settings in backend
3. Browser console for errors
4. Firewall/antivirus settings

### No tasks executing

**In Demo Mode:**
- Tasks should execute immediately with mock data

**In Production Mode:**
- Check Appium is running: `appium`
- Check devices are connected: `adb devices` (Android) or Xcode (iOS)
- Check logs for errors

### Tasks fail immediately

**Check:**
1. Device ID is correct
2. Task instruction is clear
3. In demo mode, should work regardless
4. Check backend logs

## 💡 Tips

### Faster Development

Use demo mode for:
- Frontend development
- API testing
- UI/UX work
- Integration testing

Only use production mode when testing actual device automation.

### Monitoring

Keep an eye on:
- Dashboard metrics
- Browser console (press F12)
- Backend terminal logs
- WebSocket connection status

### Performance

Demo mode is much faster:
- No real device delays
- Controlled timing
- Predictable results

## 📖 Documentation

- **README.md** - Project overview
- **INTEGRATION_GUIDE.md** - Detailed integration docs
- **config.yaml** - Configuration reference
- **API Docs** - http://localhost:5000/docs (when running)

## 🎓 Learn More

### API Endpoints

All available at http://localhost:5000/docs when running:

- `/api/health` - Health check
- `/api/devices` - Device management
- `/api/tasks` - Task operations
- `/api/metrics` - System metrics
- `/api/policies` - RL policies
- `/api/plugins` - Plugin system

### WebSocket Events

Subscribe to real-time updates:
- `perception` - UI analysis
- `planning` - Action planning
- `execution_start` - Task execution
- `error` - Error occurred
- `recovery_*` - Recovery process
- `completed` - Task completed

## 🎉 Success!

You now have a fully integrated AutoRL platform running with:

✅ Real-time dashboard  
✅ Unified backend API  
✅ AI agent orchestration  
✅ WebSocket live updates  
✅ Plugin system  
✅ Mock data for testing  

**Happy Automating! 🚀**

---

Need help? Check the troubleshooting section or open an issue on GitHub.

