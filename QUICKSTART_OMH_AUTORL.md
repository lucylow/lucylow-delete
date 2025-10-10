# 🚀 AutoRL + OMH Integration - Quick Start

## Start in 3 Steps

### Step 1: Start Services

**Option A - Docker (Recommended):**
```bash
cd autorl_project
docker-compose up --build
```

**Option B - Manual:**
```bash
# Terminal 1
cd src/agent_service && python omh_mock_server.py

# Terminal 2
cd src/agent_service && uvicorn api_server:app --port 8000

# Terminal 3
cd autorl_project/autorl-frontend && npm install && npm run dev
```

### Step 2: Test It

```bash
python examples/autorl_omh_integration_demo.py
```

### Step 3: Use It

Visit: http://localhost/omh-integration

Login with:
- Username: `alice.smith`
- Password: (any)

---

## 🎯 What You Get

✅ **OAuth2 Authentication** via OMH  
✅ **Location-Aware Tasks** with GPS context  
✅ **7 Pre-Built Workflows** ready to use  
✅ **Frontend Dashboard** with auth UI  
✅ **Complete API** with Swagger docs  
✅ **Docker Deployment** all-in-one  

---

## 📍 Access Points

| Service | URL |
|---------|-----|
| Frontend | http://localhost:80 |
| OMH Integration | http://localhost:80/omh-integration |
| AutoRL API | http://localhost:8000/docs |
| OMH API | http://localhost:8001/docs |

---

## 💻 Quick Code Examples

### Python
```python
from src.agent_service.autorl_omh_workflows import get_authenticated_engine, WorkflowTemplates

engine, context = get_authenticated_engine("alice.smith", "test")
result = WorkflowTemplates.restaurant_finder(engine, context, "Italian", "emulator-5554")
```

### JavaScript (React)
```javascript
const { login, executeLocationAwareTask } = useOMHAuth();
await login('alice.smith', 'test');
await executeLocationAwareTask("Find restaurants", "emulator-5554");
```

### cURL
```bash
TOKEN=$(curl -s -X POST http://localhost:8001/auth/token \
  -H "Content-Type: application/json" \
  -d '{"grant_type":"password","username":"alice.smith","password":"test"}' | jq -r '.access_token')

curl -H "Authorization: Bearer $TOKEN" http://localhost:8000/api/v1/location/current
```

---

## 👤 Test Users

- `alice.smith` - User + Tester
- `bob.jones` - Admin
- `testuser` - Beta Tester

---

## 📚 Full Documentation

- **Complete Guide**: `AUTORL_OMH_INTEGRATION_GUIDE.md`
- **Summary**: `AUTORL_OMH_INTEGRATION_SUMMARY.md`
- **OMH Setup**: `OMH_MOCK_SERVER_SETUP.md`
- **OMH API Docs**: `src/agent_service/OMH_MOCK_SERVER_README.md`

---

## 🛠️ Troubleshooting

**Services won't start?**
```bash
# Check ports
lsof -i :8000  # AutoRL
lsof -i :8001  # OMH

# Check health
curl http://localhost:8001/health
```

**Auth fails?**
```bash
# Get test tokens
curl http://localhost:8001/mock/tokens
```

---

**That's it! You're ready to go! 🎉**

Need help? Check the full guides above.

