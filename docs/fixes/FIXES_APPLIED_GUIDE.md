# AutoRL - Fixes Applied & Quick Start Guide

## 🔧 Issues Fixed

This document outlines all the critical fixes applied to make AutoRL run smoothly.

---

## ✅ Fixed Issues

### 1. **Missing Environment Variables (.env file)**

**Problem:** No `.env` file existed, causing missing API keys and configuration.

**Fix Applied:**
- Created `.env.example` template with all required variables
- Includes sensible defaults for demo mode
- Clear instructions for production configuration

**Action Required:**
```bash
# Copy the example file to create your .env
cp .env.example .env

# Edit .env and add your OpenAI API key (line 11)
# If you don't have an API key, the system will run in DEMO mode
```

---

### 2. **Port Mismatch (Frontend)**

**Problem:** `vite.config.js` was set to port 8080, but `config.yaml` specified 5173, causing confusion.

**Fix Applied:**
- ✅ Updated `vite.config.js` to use port **5173** (matching config.yaml)
- Frontend now correctly aligns with backend expectations

---

### 3. **Missing API/WebSocket Proxy**

**Problem:** Frontend couldn't communicate with backend - no proxy configuration in Vite.

**Fix Applied:**
- ✅ Added proxy configuration in `vite.config.js`:
  ```js
  proxy: {
    '/api': {
      target: 'http://localhost:5000',
      changeOrigin: true,
      secure: false,
    },
    '/ws': {
      target: 'ws://localhost:5000',
      ws: true,
      changeOrigin: true,
    },
  }
  ```
- Frontend now properly proxies API calls and WebSocket connections to backend

---

### 4. **CORS Configuration**

**Status:** ✅ **Already Correct**

Backend (`backend_server.py`) already has proper CORS middleware:
```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

---

### 5. **Setup Verification Script**

**New Feature:** Created `setup_autorl.py` - automated setup verification

**What it checks:**
- ✓ Python 3.9+ installed
- ✓ Node.js 16+ installed
- ✓ Appium installed (optional)
- ✓ Tesseract OCR installed (optional)
- ✓ `.env` file exists and configured
- ✓ `config.yaml` is valid
- ✓ Python packages installed
- ✓ Node packages installed
- ✓ Connected devices (Android/iOS)

**Usage:**
```bash
python setup_autorl.py
```

---

## 🚀 Quick Start (Step-by-Step)

### Prerequisites

1. **Python 3.9+** - [Download](https://www.python.org/downloads/)
2. **Node.js 16+** - [Download](https://nodejs.org/)
3. **OpenAI API Key** (optional, for AI features) - [Get Key](https://platform.openai.com/api-keys)

### Setup Steps

#### 1. Install Python Dependencies

```bash
# Create virtual environment (recommended)
python -m venv venv

# Activate virtual environment
# Windows PowerShell:
.\venv\Scripts\Activate.ps1
# Windows CMD:
venv\Scripts\activate.bat
# Linux/Mac:
source venv/bin/activate

# Install requirements
pip install -r requirements.txt
```

#### 2. Install Node.js Dependencies

```bash
npm install
```

#### 3. Configure Environment Variables

```bash
# Copy environment template
cp .env.example .env

# Edit .env file and add your OpenAI API key
# Line 11: OPENAI_API_KEY=sk-your_actual_key_here
```

**Without API Key:** System runs in **DEMO mode** with mock data (perfect for testing!)

#### 4. (Optional) Install Appium for Real Device Testing

```bash
# Install Appium globally
npm install -g appium

# Install drivers
appium driver install uiautomator2  # Android
appium driver install xcuitest      # iOS (macOS only)
```

#### 5. (Optional) Install Tesseract OCR

**Windows:**
```bash
# Download installer from: https://github.com/UB-Mannheim/tesseract/wiki
# Install and add to PATH
```

**Linux:**
```bash
sudo apt-get install tesseract-ocr
```

**MacOS:**
```bash
brew install tesseract
```

#### 6. Verify Setup

```bash
python setup_autorl.py
```

This will check all dependencies and show what's missing.

---

## ▶️ Running AutoRL

### Standard Startup (3 Terminals)

#### Terminal 1: Backend Server

```bash
# Demo mode (no real devices needed)
python backend_server.py

# Or explicitly set mode:
# Windows PowerShell:
$env:AUTORL_MODE='demo'; python backend_server.py

# Linux/Mac:
AUTORL_MODE=demo python backend_server.py
```

**Backend should start on:** `http://localhost:5000`

#### Terminal 2: Frontend

```bash
npm run dev
```

**Frontend should start on:** `http://localhost:5173`

#### Terminal 3: Appium (Optional - only for real devices)

```bash
appium
```

**Appium should start on:** `http://localhost:4723`

---

## 🌐 Access Points

| Service | URL | Purpose |
|---------|-----|---------|
| **Frontend** | http://localhost:5173 | Main dashboard UI |
| **API Health** | http://localhost:5000/api/health | Backend health check |
| **API Docs** | http://localhost:5000/docs | Swagger API documentation |
| **WebSocket** | ws://localhost:5000/ws | Real-time updates |
| **Metrics** | http://localhost:8000/metrics | Prometheus metrics |

---

## 🐛 Common Issues & Solutions

### Issue 1: "ModuleNotFoundError: No module named 'fastapi'"

**Solution:**
```bash
pip install -r requirements.txt
```

### Issue 2: "npm: command not found"

**Solution:** Install Node.js from https://nodejs.org/

### Issue 3: Frontend shows "Disconnected" badge

**Possible causes:**
1. Backend not running → Start backend first
2. Port mismatch → Verify ports (backend: 5000, frontend: 5173)
3. WebSocket blocked by firewall

**Solution:**
```bash
# Check if backend is running
curl http://localhost:5000/api/health

# Should return: {"status":"healthy","mode":"demo",...}
```

### Issue 4: "No devices available"

**For Demo Mode:** This is normal! Tasks will run with simulated data.

**For Production Mode:**
```bash
# Check connected Android devices
adb devices

# Check iOS simulators (macOS)
xcrun simctl list

# Verify Appium is running
curl http://localhost:4723/status
```

### Issue 5: "OPENAI_API_KEY not set" errors

**Option 1:** Add API key to `.env` file
```bash
OPENAI_API_KEY=sk-your_actual_key_here
```

**Option 2:** Run in demo mode (no API key needed)
```bash
# In .env file
AUTORL_MODE=demo
```

### Issue 6: Port already in use

**Solution:**
```bash
# Windows - find process using port 5000
netstat -ano | findstr :5000

# Kill process by PID
taskkill /PID <process_id> /F

# Linux/Mac
lsof -ti:5000 | xargs kill -9
```

---

## 🧪 Testing Your Setup

### 1. Test Backend Health

```bash
curl http://localhost:5000/api/health
```

Expected response:
```json
{
  "status": "healthy",
  "mode": "demo",
  "timestamp": "2025-10-11T...",
  "devices_connected": 3,
  "active_tasks": 0
}
```

### 2. Test WebSocket Connection

Open browser console on http://localhost:5173 and check for:
```
WebSocket client connected (total: 1)
```

### 3. Create a Test Task

In the frontend dashboard:
1. Enter instruction: "Open Google Maps"
2. Click "Execute Task"
3. Watch real-time updates in the activity feed

---

## 📊 Demo Mode vs Production Mode

### Demo Mode (Default)

- ✅ No real devices needed
- ✅ No API keys required
- ✅ Simulated task execution
- ✅ Perfect for testing UI/UX
- ✅ Shows all features working

**Enable Demo Mode:**
```bash
# In .env file
AUTORL_MODE=demo
```

### Production Mode

- 🔌 Requires real devices or emulators
- 🔑 Requires OpenAI API key
- 📱 Requires Appium server
- 🚀 Real AI-powered automation

**Enable Production Mode:**
```bash
# In .env file
AUTORL_MODE=production
OPENAI_API_KEY=sk-your_actual_key_here
```

---

## 📁 Key Configuration Files

| File | Purpose | Required? |
|------|---------|-----------|
| `.env` | Environment variables, API keys | ✅ Yes |
| `config.yaml` | Application configuration | ✅ Yes |
| `requirements.txt` | Python dependencies | ✅ Yes |
| `package.json` | Node.js dependencies | ✅ Yes |
| `vite.config.js` | Frontend build configuration | ✅ Yes |

---

## 🔍 Debugging Tips

### Enable Debug Logging

Edit `config.yaml`:
```yaml
server:
  debug: true
  
logging:
  level: "DEBUG"
```

### Check Logs

```bash
# Backend logs (terminal output)
# Look for errors in terminal where backend is running

# Frontend logs (browser console)
# Open DevTools (F12) → Console tab
```

### Network Inspection

1. Open browser DevTools (F12)
2. Go to "Network" tab
3. Filter by "WS" to see WebSocket traffic
4. Filter by "Fetch/XHR" to see API calls

---

## 🎯 Next Steps

1. ✅ Run `python setup_autorl.py` to verify installation
2. ✅ Start backend and frontend
3. ✅ Access http://localhost:5173
4. ✅ Create your first task
5. 📖 Read [QUICK_START.md](docs/QUICK_START.md) for advanced features
6. 🔌 Connect real devices (see [MOBILE_SIMULATION_GUIDE.md](MOBILE_SIMULATION_GUIDE.md))
7. 🚀 Deploy to production (see [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md))

---

## 📞 Getting Help

- **Setup Issues:** Run `python setup_autorl.py` for diagnostics
- **API Errors:** Check `.env` file and `config.yaml`
- **Device Issues:** See [MOBILE_SIMULATION_GUIDE.md](MOBILE_SIMULATION_GUIDE.md)
- **Deployment:** See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)

---

## 🎉 You're Ready!

All critical fixes have been applied. Your AutoRL instance should now run smoothly.

**Quick verification:**
```bash
python setup_autorl.py && python backend_server.py
```

In another terminal:
```bash
npm run dev
```

Then visit: **http://localhost:5173** 🚀

