# OMH Mock Server - Complete Setup Guide

## 🎉 What's Been Created

A comprehensive **Open Mobile Hub (OMH) Mock Server** for testing OAuth2 authentication, user management, and location services with your AutoRL project.

## 📦 Files Created

### Core Server Files
- **`src/agent_service/omh_mock_server.py`** - FastAPI server with all OMH endpoints
- **`src/agent_service/mock_data/omh_mock_data.json`** - Sample OAuth tokens, user profiles, and locations
- **`src/agent_service/omh_mock_requirements.txt`** - Python dependencies

### Documentation
- **`src/agent_service/OMH_MOCK_SERVER_README.md`** - Complete API documentation and usage guide
- **`examples/omh_mock_integration_example.py`** - Integration examples with AutoRL

### Deployment & Testing
- **`src/agent_service/Dockerfile.omh-mock`** - Docker container configuration
- **`src/agent_service/docker-compose.omh-mock.yml`** - Docker Compose setup
- **`src/agent_service/test_omh_mock.py`** - Comprehensive test suite
- **`src/agent_service/start_omh_mock.sh`** - Linux/Mac startup script
- **`src/agent_service/start_omh_mock.bat`** - Windows startup script

## 🚀 Quick Start (Choose One Method)

### Method 1: Direct Python (Fastest)

```bash
# Navigate to the agent service directory
cd src/agent_service

# Install dependencies
pip install -r omh_mock_requirements.txt

# Start the server
python omh_mock_server.py
```

### Method 2: Using Startup Scripts

**Linux/Mac:**
```bash
cd src/agent_service
chmod +x start_omh_mock.sh
./start_omh_mock.sh
```

**Windows:**
```bash
cd src/agent_service
start_omh_mock.bat
```

### Method 3: Docker

```bash
cd src/agent_service
docker-compose -f docker-compose.omh-mock.yml up --build
```

## 🌐 Access Points

Once running, access:
- **API Base**: http://localhost:8001
- **Interactive Docs (Swagger)**: http://localhost:8001/docs
- **ReDoc**: http://localhost:8001/redoc
- **Health Check**: http://localhost:8001/health
- **Mock Tokens**: http://localhost:8001/mock/tokens

## 🧪 Test the Server

```bash
cd src/agent_service
python test_omh_mock.py
```

This will run a comprehensive test suite validating all endpoints.

## 💡 Usage Examples

### Quick Test with curl

```bash
# Get available mock tokens
curl http://localhost:8001/mock/tokens

# Login and get access token
curl -X POST http://localhost:8001/auth/token \
  -H "Content-Type: application/json" \
  -d '{"grant_type":"password","username":"alice.smith","password":"test"}'

# Get user profile (use token from previous step)
curl -H "Authorization: Bearer mock_access_token_abc123xyz456" \
  http://localhost:8001/api/v1/user/profile

# Get location
curl -H "Authorization: Bearer mock_access_token_abc123xyz456" \
  http://localhost:8001/api/v1/maps/location
```

### Run Integration Examples

```bash
# From project root
python examples/omh_mock_integration_example.py
```

This demonstrates:
- ✅ Basic authentication flow
- ✅ Location-based workflows
- ✅ AutoRL task context creation
- ✅ Multi-user scenarios
- ✅ Token refresh workflows

## 👤 Available Mock Users

| Username | Password | User ID | Roles | Status |
|----------|----------|---------|-------|--------|
| alice.smith | any | user_1001 | user, tester | active |
| bob.jones | any | user_1002 | admin | active |
| carol.wu | any | user_1003 | user | inactive |
| testuser | any | user_001 | user, beta_tester | active |

> **Note**: Password can be anything in mock mode - authentication always succeeds for valid usernames.

## 🔑 Pre-configured Tokens

For quick testing without authentication:

```
Alice (basic): mock_access_token_abc123xyz456
Alice (JWT):   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJVc2VyMTIzIiwibmFtZSI6IkFsaWNlIFNtaXRoIiwiYWRtaW4iOnRydWUsImlhdCI6MTY5NjQ2ODAwMCwiZXhwIjoxNjk2NDcxNjAwfQ._sVTeECHBI_sdMjXSQ7Vow_index53jZnZ1049k
Test User:     mock_access_token_123456789
```

## 📡 Available Endpoints

### Authentication
- `POST /auth/token` - Get access token (password, refresh_token, JWT bearer)
- `POST /auth/refresh` - Refresh access token
- `POST /mobile/platform/sso/exchange-token` - OMH SSO token exchange

### User Management
- `GET /api/v1/user/profile` - Get authenticated user profile
- `GET /api/v1/users` - List all users
- `GET /api/v1/users/{user_id}` - Get user by ID

### Maps/Location
- `GET /api/v1/maps/location` - Get location data
- `GET /api/v1/maps/locations` - List all available locations
- `POST /api/v1/maps/select-location` - Select/save a location

### System
- `GET /` - API info and endpoint listing
- `GET /health` - Health check
- `GET /mock/tokens` - Development helper for mock tokens

## 🔧 Integration with AutoRL

### Python Backend

```python
from examples.omh_mock_integration_example import OMHMockClient

# Create client and authenticate
client = OMHMockClient()
client.login("alice.smith")

# Get user context
profile = client.get_user_profile()

# Get location context
location = client.get_location()

# Use in AutoRL task
task_context = {
    "user": profile,
    "location": location["location"],
    "task": {"type": "automation", "description": "..."}
}
```

### Frontend (React/JavaScript)

```javascript
const API_BASE = 'http://localhost:8001';

// Login
const response = await fetch(`${API_BASE}/auth/token`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    grant_type: 'password',
    username: 'alice.smith',
    password: 'test'
  })
});
const { access_token } = await response.json();

// Get profile
const profile = await fetch(`${API_BASE}/api/v1/user/profile`, {
  headers: { 'Authorization': `Bearer ${access_token}` }
}).then(r => r.json());
```

### Android Kotlin

```kotlin
object MockConfig {
    const val BASE_URL = "http://10.0.2.2:8001"  // For emulator
    const val TOKEN = "mock_access_token_abc123xyz456"
}

class AuthInterceptor : Interceptor {
    override fun intercept(chain: Interceptor.Chain): Response {
        val request = chain.request().newBuilder()
            .header("Authorization", "Bearer ${MockConfig.TOKEN}")
            .build()
        return chain.proceed(request)
    }
}
```

## 🎯 Use Cases

1. **Frontend Development** - Develop and test UI without backend dependencies
2. **Integration Testing** - Test OAuth flows without real OAuth provider
3. **Mobile Testing** - Use in Android emulator with consistent mock data
4. **Demo/Presentation** - Reliable data for demonstrations
5. **CI/CD Testing** - Fast, deterministic tests in pipelines

## 📝 Customization

### Add Custom Users

Edit `src/agent_service/mock_data/omh_mock_data.json`:

```json
{
  "user_profiles": [
    {
      "user_id": "user_9999",
      "username": "newuser",
      "email": "new@example.com",
      "full_name": "New User",
      "roles": ["user"],
      "profile_picture_url": "https://example.com/pic.jpg",
      "account_status": "active",
      "last_login": "2025-10-10T12:00:00Z"
    }
  ]
}
```

Then add token mapping:

```json
{
  "token_mappings": {
    "new_user_token_123": "user_9999"
  }
}
```

### Add Custom Locations

```json
{
  "locations": [
    {
      "location": {
        "latitude": 51.5074,
        "longitude": -0.1278,
        "address": "London, UK",
        "place_id": "mock_place_london"
      }
    }
  ]
}
```

## 🔍 Troubleshooting

### Server won't start

**Issue**: Port 8001 already in use
```bash
# Check what's using the port
lsof -i :8001  # Mac/Linux
netstat -ano | findstr :8001  # Windows

# Or change the port in omh_mock_server.py
uvicorn.run(app, host="0.0.0.0", port=8002)
```

### Authentication fails

**Issue**: Token not recognized
```bash
# Check available tokens
curl http://localhost:8001/mock/tokens

# Verify token format
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:8001/api/v1/user/profile
```

### Integration examples fail

**Issue**: Server not running
```bash
# Check health
curl http://localhost:8001/health

# Check logs
python omh_mock_server.py
```

## 📚 Additional Resources

- **Full API Documentation**: `src/agent_service/OMH_MOCK_SERVER_README.md`
- **Integration Examples**: `examples/omh_mock_integration_example.py`
- **Test Suite**: `src/agent_service/test_omh_mock.py`
- **Mock Data**: `src/agent_service/mock_data/omh_mock_data.json`

## ⚠️ Important Notes

- **Development Only**: This is a mock server for testing. Not for production use.
- **No Real Security**: Tokens don't expire, passwords aren't validated
- **No Persistence**: All data is in-memory (resets on restart)
- **CORS Enabled**: Wide-open for development (restrict for production)

## 🎓 Next Steps

1. ✅ Start the mock server
2. ✅ Explore the interactive docs at `/docs`
3. ✅ Run the test suite to verify everything works
4. ✅ Try the integration examples
5. ✅ Customize mock data for your use case
6. ✅ Integrate with your AutoRL workflows

---

**For real OMH integration in production:**
- Visit: https://github.com/openmobilehub/omh-auth
- Configure actual OAuth providers
- Implement proper token validation
- Add database persistence
- Restrict CORS policies

**Questions or issues?** Check the comprehensive README at `src/agent_service/OMH_MOCK_SERVER_README.md`

