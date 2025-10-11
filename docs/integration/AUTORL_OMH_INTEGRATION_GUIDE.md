```markdown
# AutoRL + OMH Integration - Complete Guide

## 🎉 Overview

The AutoRL system is now fully integrated with **Open Mobile Hub (OMH)** for OAuth2 authentication and location-aware mobile automation workflows. This integration enables:

✅ **Secure OAuth2 Authentication** via OMH  
✅ **Location-Aware Task Execution** with real-time GPS context  
✅ **User Profile Management** with roles and permissions  
✅ **Pre-Built Workflow Templates** for common location-based tasks  
✅ **Frontend Dashboard** with OMH authentication UI  
✅ **Docker Deployment** with all services integrated  

---

## 🚀 Quick Start

### Option 1: Docker Compose (Recommended)

```bash
cd autorl_project
docker-compose up --build
```

**Access the services:**
- Frontend: http://localhost:80
- AutoRL API: http://localhost:5000
- OMH Mock Server: http://localhost:8001
- OMH API Docs: http://localhost:8001/docs

### Option 2: Manual Setup

**Terminal 1 - OMH Mock Server:**
```bash
cd src/agent_service
python omh_mock_server.py
```

**Terminal 2 - AutoRL API:**
```bash
cd src/agent_service
uvicorn api_server:app --host 0.0.0.0 --port 8000
```

**Terminal 3 - Frontend:**
```bash
cd autorl_project/autorl-frontend
npm install
npm run dev
```

---

## 🔐 OMH Authentication Features

### Backend Integration

The AutoRL API server now supports OMH OAuth authentication:

```python
# src/agent_service/omh_auth.py
from omh_auth import get_omh_user, get_omh_user_with_location

@app.post("/api/v1/execute/location-aware")
async def execute_location_aware_task(
    req: TaskRequest,
    user_with_location=Depends(get_omh_user_with_location)
):
    username, user_record, location = user_with_location
    # Task now has user context and location
    ...
```

### New API Endpoints

#### Authentication
- `POST /api/v1/auth/omh/login` - Login with OMH credentials
- `GET /api/v1/user/profile/omh` - Get user profile via OMH

#### Location Services
- `POST /api/v1/execute/location-aware` - Execute task with location context
- `GET /api/v1/location/current` - Get user's current location
- `GET /api/v1/location/nearby-tasks` - Get tasks near user

#### Admin
- `POST /api/v1/admin/reset-quota` - Admin-only endpoint (requires admin role)

---

## 🗺️ Location-Aware Workflows

### Pre-Built Templates

```python
from src.agent_service.autorl_omh_workflows import (
    get_authenticated_engine,
    WorkflowTemplates
)

# Authenticate
engine, context = get_authenticated_engine("alice.smith", "test")

# Execute location-aware workflows
result = WorkflowTemplates.restaurant_finder(
    engine, context, "Italian", device_id="emulator-5554"
)

result = WorkflowTemplates.gas_station_locator(
    engine, context, device_id="emulator-5554"
)

result = WorkflowTemplates.commute_optimizer(
    engine, context, "Downtown Office", device_id="emulator-5554"
)
```

### Available Workflow Templates

| Template | Description |
|----------|-------------|
| `restaurant_finder` | Find restaurants by cuisine near user |
| `gas_station_locator` | Find nearby gas stations with prices |
| `pharmacy_finder` | Find pharmacies (with open/closed filter) |
| `commute_optimizer` | Optimize route with traffic data |
| `local_events_finder` | Find events near user |
| `price_comparison_workflow` | Compare prices at nearby stores |

### Custom Workflows

```python
from src.agent_service.autorl_omh_workflows import OMHWorkflowEngine

engine = OMHWorkflowEngine()
context = engine.create_context_from_token(access_token)

# Custom location-based search
result = engine.execute_location_based_search(
    context,
    "Find coffee shops with WiFi",
    device_id="emulator-5554"
)

# Navigation workflow
result = engine.execute_navigation_workflow(
    context,
    destination="123 Main St",
    device_id="emulator-5554"
)

# Multi-location workflow
result = engine.execute_multi_location_workflow(
    context,
    locations=["Store A", "Store B", "Store C"],
    task_per_location="Check opening hours",
    device_id="emulator-5554"
)
```

---

## 💻 Frontend Integration

### OMH Authentication UI

The AutoRL frontend now includes:

1. **OMHAuthContext** - React context for authentication state
2. **OMHLoginForm** - Login component with quick mock user selection
3. **OMHIntegrationPage** - Dashboard showing user profile, location, and nearby tasks

### Using OMH Auth in Frontend

```javascript
import { useOMHAuth } from '../contexts/OMHAuthContext';

function MyComponent() {
  const {
    user,
    accessToken,
    location,
    isAuthenticated,
    login,
    logout,
    executeLocationAwareTask
  } = useOMHAuth();

  // Login
  const handleLogin = async () => {
    const result = await login('alice.smith', 'test123');
    if (result.success) {
      console.log('Logged in:', result.user);
    }
  };

  // Execute location-aware task
  const handleTask = async () => {
    const result = await executeLocationAwareTask(
      "Find restaurants nearby",
      "emulator-5554",
      { cuisine: "Italian" }
    );
    console.log('Task result:', result);
  };

  return (
    <div>
      {isAuthenticated ? (
        <>
          <p>Welcome, {user.full_name}!</p>
          <p>Location: {location?.address}</p>
          <button onClick={handleTask}>Execute Task</button>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
    </div>
  );
}
```

### Accessing the OMH Integration Page

Visit: http://localhost/omh-integration

Features:
- User profile display
- Location context with map link
- OAuth access token display
- Nearby location-aware tasks
- AutoRL integration status

---

## 🧪 Testing & Examples

### Run Integration Demo

```bash
python examples/autorl_omh_integration_demo.py
```

This demo covers:
1. OMH Authentication
2. Location Context Retrieval
3. Location-Based Search Workflows
4. Navigation & Route Planning
5. Advanced Location-Aware Workflows
6. Multi-Location Workflows
7. Role-Based Access Control
8. Task History & Metrics

### Run OMH Mock Server Tests

```bash
cd src/agent_service
python test_omh_mock.py
```

### Test API Endpoints

```bash
# Login and get token
TOKEN=$(curl -s -X POST http://localhost:8001/auth/token \
  -H "Content-Type: application/json" \
  -d '{"grant_type":"password","username":"alice.smith","password":"test"}' \
  | jq -r '.access_token')

# Get user profile via AutoRL API
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:8000/api/v1/user/profile/omh | jq

# Get current location
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:8000/api/v1/location/current | jq

# Execute location-aware task
curl -X POST http://localhost:8000/api/v1/execute/location-aware \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "instruction": "Find Italian restaurants",
    "device_id": "emulator-5554",
    "parameters": {}
  }' | jq
```

---

## 👥 Mock Users

| Username | Password | Roles | Status |
|----------|----------|-------|--------|
| alice.smith | any | user, tester | active |
| bob.jones | any | admin | active |
| carol.wu | any | user | inactive |
| testuser | any | user, beta_tester | active |

> **Note:** In mock mode, any password works for testing.

---

## 📁 Project Structure

```
autorl_project/
├── src/agent_service/
│   ├── api_server.py                    # AutoRL API (OMH integrated)
│   ├── omh_auth.py                      # OMH authentication middleware
│   ├── autorl_omh_workflows.py          # Location-aware workflow engine
│   ├── omh_mock_server.py               # OMH Mock Server
│   ├── mock_data/
│   │   └── omh_mock_data.json           # Mock users, tokens, locations
│   ├── Dockerfile.omh-mock              # Docker for OMH Mock Server
│   └── OMH_MOCK_SERVER_README.md        # OMH Mock Server docs
│
├── autorl-frontend/
│   └── src/
│       ├── contexts/
│       │   └── OMHAuthContext.jsx        # React OMH auth context
│       ├── components/
│       │   └── OMHLoginForm.jsx          # Login form component
│       ├── pages/
│       │   └── OMHIntegrationPage.jsx    # OMH dashboard page
│       └── App.js                         # Updated with OMH provider
│
├── examples/
│   ├── omh_mock_integration_example.py   # OMH Mock Server examples
│   └── autorl_omh_integration_demo.py    # Complete integration demo
│
├── docker-compose.yml                     # All services including OMH
└── .env.example                           # Environment variables template
```

---

## 🔧 Configuration

### Environment Variables

Create `.env` file in `autorl_project/`:

```bash
# OMH Configuration
VITE_OMH_API_BASE=http://localhost:8001
VITE_AUTORL_API_BASE=http://localhost:8000
OMH_BASE_URL=http://localhost:8001

# API Configuration
API_PORT=5000
APPIUM_SERVER_URL=http://localhost:4723/wd/hub
```

### Custom Mock Data

Edit `src/agent_service/mock_data/omh_mock_data.json`:

```json
{
  "user_profiles": [
    {
      "user_id": "user_custom",
      "username": "myuser",
      "email": "myuser@example.com",
      "full_name": "My Custom User",
      "roles": ["user"],
      "profile_picture_url": "https://...",
      "account_status": "active",
      "last_login": "2025-10-10T12:00:00Z"
    }
  ],
  "token_mappings": {
    "custom_token_123": "user_custom"
  }
}
```

---

## 🛠️ Development Workflow

### 1. Start All Services

```bash
# Using Docker
cd autorl_project
docker-compose up --build

# Or manually
# Terminal 1: OMH Mock Server
cd src/agent_service && python omh_mock_server.py

# Terminal 2: AutoRL API
cd src/agent_service && uvicorn api_server:app --port 8000

# Terminal 3: Frontend
cd autorl_project/autorl-frontend && npm run dev
```

### 2. Develop Workflows

Create custom workflows in `src/agent_service/autorl_omh_workflows.py`:

```python
def custom_workflow(engine, context, device_id):
    """Your custom location-aware workflow"""
    return engine.execute_location_based_search(
        context,
        "Your search query",
        device_id
    )
```

### 3. Test Workflows

```bash
python examples/autorl_omh_integration_demo.py
```

### 4. Deploy

```bash
docker-compose -f autorl_project/docker-compose.yml up -d --build
```

---

## 📊 Architecture

```
┌─────────────────┐
│   Frontend      │
│   (React)       │◄──────┐
└────────┬────────┘       │
         │                │
         │ OMH OAuth      │ Location Data
         │                │
         ▼                │
┌─────────────────┐       │
│  OMH Mock       │───────┘
│  Server         │
└─────────────────┘
         │
         │ Token Validation
         │
         ▼
┌─────────────────┐
│  AutoRL API     │
│  (FastAPI)      │
└────────┬────────┘
         │
         │ Task Execution
         │
         ▼
┌─────────────────┐
│  Mobile Device  │
│  (Appium)       │
└─────────────────┘
```

---

## 🎯 Use Cases

1. **Restaurant Discovery**: Find and navigate to restaurants near user
2. **Price Comparison**: Compare prices at nearby stores
3. **Service Locator**: Find pharmacies, gas stations, etc. with hours
4. **Route Optimization**: Get fastest route considering traffic
5. **Event Discovery**: Find local events and activities
6. **Geo-fenced Reminders**: Set location-based reminders
7. **Multi-location Tasks**: Check multiple stores simultaneously

---

## 🚨 Troubleshooting

### OMH Mock Server Not Starting

```bash
# Check if port 8001 is available
lsof -i :8001  # Mac/Linux
netstat -ano | findstr :8001  # Windows

# Start on different port
cd src/agent_service
# Edit omh_mock_server.py, change port to 8002
python omh_mock_server.py
```

### Authentication Fails

```bash
# Check OMH Mock Server health
curl http://localhost:8001/health

# Get available tokens
curl http://localhost:8001/mock/tokens
```

### Location Not Available

```bash
# Test location endpoint directly
TOKEN="mock_access_token_abc123xyz456"
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:8001/api/v1/maps/location
```

### Frontend Can't Connect

Check `.env` variables:
```bash
VITE_OMH_API_BASE=http://localhost:8001
VITE_AUTORL_API_BASE=http://localhost:8000
```

---

## 📚 Additional Resources

- **OMH Mock Server Docs**: `src/agent_service/OMH_MOCK_SERVER_README.md`
- **OMH Setup Guide**: `OMH_MOCK_SERVER_SETUP.md`
- **API Documentation**: http://localhost:8000/docs (AutoRL) & http://localhost:8001/docs (OMH)
- **Integration Examples**: `examples/` directory
- **AutoRL Project README**: `autorl_project/README.md`

---

## 🤝 Contributing

When adding new location-aware features:

1. Add workflow templates to `autorl_omh_workflows.py`
2. Add API endpoints to `api_server.py`
3. Add frontend components for UI
4. Write tests in `test_omh_mock.py`
5. Update this guide with examples

---

## 📄 License

MIT License - Use freely for development and production.

---

**Built with ❤️ by integrating AutoRL with Open Mobile Hub**

For support or questions, check the comprehensive documentation in:
- `OMH_MOCK_SERVER_SETUP.md`
- `src/agent_service/OMH_MOCK_SERVER_README.md`
- `autorl_project/README.md`
```

