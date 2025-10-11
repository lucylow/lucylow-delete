# Mock Data Verification Guide

## Overview
This guide helps you verify that mock data is displaying properly in the AutoRL frontend.

## Prerequisites
- Backend server running on port 5000
- Frontend development server running on port 5173

## Quick Start

### 1. Start the Backend Server

**Option A: Using the startup script**
```bash
python start_autorl.py
```

**Option B: Backend only**
```bash
python backend_server.py
```

**Option C: Master backend with all features**
```bash
python master_backend.py
```

The backend will automatically run in **DEMO MODE** by default, which generates mock data.

### 2. Start the Frontend

In a separate terminal:
```bash
npm run dev
```

The frontend will start on `http://localhost:5173`

### 3. Verify Mock Data

#### Using the Test Page
Open `test_mock_data_frontend.html` in your browser:
```bash
# Open in default browser
start test_mock_data_frontend.html  # Windows
open test_mock_data_frontend.html   # Mac
xdg-open test_mock_data_frontend.html  # Linux
```

Click **"Test All"** to verify all endpoints are returning mock data.

## Mock Data Endpoints

### Health Check
```bash
GET http://localhost:5000/api/health
```
**Expected Response:**
```json
{
  "status": "healthy",
  "mode": "demo",
  "timestamp": "2024-10-11T...",
  "devices_connected": 0,
  "active_tasks": 0
}
```

### Devices (Mock)
```bash
GET http://localhost:5000/api/devices
```
**Expected Response:**
```json
[
  {
    "id": "android_pixel_7",
    "platform": "Android",
    "status": "connected",
    "is_real": false,
    "battery": 85,
    "current_task": null
  },
  {
    "id": "iphone_14",
    "platform": "iOS",
    "status": "connected",
    "is_real": false,
    "battery": 92,
    "current_task": null
  },
  {
    "id": "emulator-5554",
    "platform": "Android",
    "status": "idle",
    "is_real": false,
    "battery": 100,
    "current_task": null
  }
]
```

### Metrics (Mock)
```bash
GET http://localhost:5000/api/metrics
```
**Expected Response:**
```json
{
  "total_tasks_success": 47,
  "total_tasks_failure": 3,
  "tasks_in_progress": 0,
  "avg_task_runtime_seconds": 23.4,
  "success_rate": 94.0
}
```

### Activity Log (Mock)
```bash
GET http://localhost:5000/api/activity
```
**Expected Response:**
```json
[
  {
    "timestamp": "10:30:45",
    "message": "WebSocket client connected",
    "level": "info"
  }
]
```

### Policies (Mock)
```bash
GET http://localhost:5000/api/policies
```
**Expected Response:**
```json
[
  {
    "name": "initial_policy",
    "version": null,
    "is_active": true,
    "strategy": "explore"
  },
  {
    "name": "optimized_policy",
    "version": null,
    "is_active": false,
    "strategy": "exploit"
  }
]
```

### Plugins (Mock)
```bash
GET http://localhost:5000/api/plugins
```
**Expected Response:**
```json
[
  {
    "name": "vision_boost",
    "status": "initialized",
    "path": "plugins/vision_boost.py"
  },
  {
    "name": "error_recovery",
    "status": "initialized",
    "path": "plugins/error_recovery.py"
  }
]
```

## WebSocket Mock Data

### Connection
```javascript
ws://localhost:5000/ws
```

### Mock Events Sequence
When you create a task in demo mode, you'll receive these WebSocket events:

1. **perception** - UI analysis
```json
{
  "event": "perception",
  "run_id": 123456,
  "task_id": "abc-123",
  "text": "Capturing screenshot and analyzing UI...",
  "confidence": 0.97
}
```

2. **planning** - Action plan generation
```json
{
  "event": "planning",
  "run_id": 123456,
  "task_id": "abc-123",
  "text": "LLM generating action plan...",
  "plan": ["tap_element", "type_text", "confirm"],
  "confidence": 0.94
}
```

3. **execution_start** - Task execution begins
```json
{
  "event": "execution_start",
  "run_id": 123456,
  "task_id": "abc-123",
  "text": "Executing actions...",
  "progress": 10
}
```

4. **error** (30% chance) - Simulated error
```json
{
  "event": "error",
  "run_id": 123456,
  "task_id": "abc-123",
  "text": "Element not found - initiating recovery...",
  "severity": "warning"
}
```

5. **recovery_analyze** - Recovery analysis
```json
{
  "event": "recovery_analyze",
  "run_id": 123456,
  "task_id": "abc-123",
  "text": "Analyzing UI state for recovery..."
}
```

6. **recovery_execute** - Recovery execution
```json
{
  "event": "recovery_execute",
  "run_id": 123456,
  "task_id": "abc-123",
  "text": "Executing recovery actions...",
  "progress": 70
}
```

7. **completed** - Task completion
```json
{
  "event": "completed",
  "run_id": 123456,
  "task_id": "abc-123",
  "text": "Task 'Open Instagram' completed successfully",
  "success": true,
  "reward": 0.98
}
```

8. **memory_saved** - Learning complete
```json
{
  "event": "memory_saved",
  "run_id": 123456,
  "task_id": "abc-123",
  "text": "Episode learned and stored in memory"
}
```

## Frontend Dashboard Verification

### 1. Open Dashboard
Navigate to: `http://localhost:5173/dashboard`

### 2. Check WebSocket Connection
- Look for green badge: **"WebSocket Connected"**
- If red "WebSocket Disconnected", check backend is running

### 3. Verify Mock Data Display

#### Metric Cards
You should see 4 metric cards displaying:
- **Tasks Completed**: 47
- **Success Rate**: 94.0%
- **Avg Execution**: 23.4s
- **Active Devices**: 3

#### Device Panel
You should see 3 mock devices:
- android_pixel_7 (Android, 85% battery)
- iphone_14 (iOS, 92% battery)
- emulator-5554 (Android, 100% battery)

#### Task Execution
- Initially shows "No active task"
- Create a task to see real-time execution

### 4. Create a Test Task

1. Enter task instruction: `"Open Instagram and like first post"`
2. Select device (or leave empty for auto)
3. Click "Start Task"
4. Watch real-time execution with mock data

## Troubleshooting

### Backend Not Starting

**Check if port 5000 is already in use:**
```bash
# Windows
netstat -ano | findstr :5000

# Linux/Mac
lsof -i :5000
```

**Solution:**
```bash
# Kill the process or use a different port
```

### Frontend Not Connecting to Backend

**1. Check CORS**
Backend has CORS enabled for all origins by default in `backend_server.py`:
```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

**2. Check API URL**
Verify frontend is using correct URL. Check browser console:
```
🔧 API Service initialized with base URL: http://localhost:5000/api
```

**3. Check Network Tab**
Open browser DevTools → Network tab
- Should see requests to `http://localhost:5000/api/*`
- Status should be 200 OK

### WebSocket Not Connecting

**1. Check WebSocket URL**
Browser console should show:
```
🔌 Connecting to WebSocket: ws://localhost:5000/ws
```

**2. Check Backend Logs**
Backend should log:
```
WebSocket client connected (total: 1)
```

**3. Test WebSocket Manually**
Use test page: `test_mock_data_frontend.html` → Click "Connect WebSocket"

### Mock Data Not Displaying

**1. Check Browser Console**
Look for API request/response logs:
```
📤 API Request: GET http://localhost:5000/api/devices
📥 API Response [/devices]: [...]
```

**2. Check Backend Mode**
Backend should log on startup:
```
📊 Mode: DEMO
```

**3. Verify Mock Data Generation**
Open `test_mock_data_frontend.html` and click "Test All"
- All tests should return ✅ status
- Data should display in cards

### Empty Data Arrays

**If you see empty arrays `[]`:**
1. Backend is running but `generate_mock_*` functions not called
2. Check `backend_server.py` lines 139-166 and 168-196
3. Verify `PRODUCTION_MODE` is False

**Fix:**
```bash
# Ensure demo mode
$env:AUTORL_MODE='demo'  # Windows
export AUTORL_MODE=demo  # Linux/Mac

python backend_server.py
```

## Testing Checklist

- [ ] Backend starts without errors
- [ ] Backend logs show "Mode: DEMO"
- [ ] Health endpoint returns `{"status": "healthy"}`
- [ ] Devices endpoint returns 3 mock devices
- [ ] Metrics endpoint returns mock metrics (47 success, 3 failure)
- [ ] Activity endpoint returns activity array
- [ ] Policies endpoint returns 2 policies
- [ ] Plugins endpoint returns 2 plugins
- [ ] WebSocket connects (green badge)
- [ ] Dashboard displays 4 metric cards with data
- [ ] Dashboard displays 3 devices
- [ ] Create task triggers WebSocket events
- [ ] Task execution shows in dashboard
- [ ] Task completes successfully

## Success Criteria

✅ **All mock data is displaying when:**
1. Backend running in DEMO mode (default)
2. All API endpoints return mock data
3. WebSocket connects successfully
4. Dashboard shows metrics, devices, and can execute tasks
5. Task execution shows real-time updates via WebSocket
6. No errors in browser console or backend logs

## Additional Resources

- **Test Page**: `test_mock_data_frontend.html` - Comprehensive API testing
- **Backend Code**: `backend_server.py` - Mock data generators at lines 139-196
- **Frontend API**: `src/services/api.js` - API service with logging
- **WebSocket Hook**: `src/hooks/useWebSocket.js` - WebSocket connection manager
- **Dashboard**: `src/pages/Dashboard.jsx` - Main dashboard component

## Contact

If mock data still isn't displaying after following this guide:
1. Check all endpoints with `test_mock_data_frontend.html`
2. Review browser console for errors
3. Review backend logs for errors
4. Verify network requests in browser DevTools
5. Ensure AUTORL_MODE=demo (or not set to production)

