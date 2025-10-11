# AutoRL - Error Fixes Quick Reference

A quick lookup table for common AutoRL errors and their immediate fixes.

---

## 🔴 Critical Errors

### Error: `ModuleNotFoundError: No module named 'fastapi'`

**Cursor Fix:**
```bash
pip install -r requirements.txt
```

**Location:** Terminal/project root  
**Cause:** Python dependencies not installed

---

### Error: `Cannot find module 'react'`

**Cursor Fix:**
```bash
npm install
```

**Location:** Terminal/project root  
**Cause:** Node.js dependencies not installed

---

### Error: `OPENAI_API_KEY not set` or `401 Unauthorized`

**Cursor Fix:**
```bash
# Create .env file from template
cp .env.example .env

# Edit .env and add your API key on line 11
OPENAI_API_KEY=sk-your_actual_key_here
```

**Alternative (Demo Mode):**
```bash
# In .env file
AUTORL_MODE=demo
```

**Location:** `.env` file  
**Cause:** Missing or invalid OpenAI API key

---

### Error: Frontend shows "Disconnected" (Red Badge)

**Cursor Fix:**
```bash
# Check if backend is running
curl http://localhost:5000/api/health

# If not running, start backend
python backend_server.py
```

**Location:** Terminal  
**Cause:** Backend not running or port mismatch

---

### Error: `Address already in use` or `EADDRINUSE`

**Cursor Fix (Windows):**
```powershell
# Find process on port 5000
netstat -ano | findstr :5000

# Kill process by PID
taskkill /PID <process_id> /F
```

**Cursor Fix (Linux/Mac):**
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9
```

**Location:** Terminal  
**Cause:** Port already occupied by another process

---

## ⚠️ Configuration Errors

### Error: `config.yaml: No such file or directory`

**Cursor Fix:**
```bash
# Verify config.yaml exists in project root
ls config.yaml

# If missing, check if template exists
ls config.yaml.example
```

**Location:** Project root  
**Cause:** Missing configuration file

---

### Error: `Invalid YAML syntax`

**Cursor Fix:**
```yaml
# Ensure proper indentation (2 spaces, not tabs)
server:
  host: "0.0.0.0"
  port: 5000
  mode: "demo"
```

**Location:** `config.yaml`  
**Cause:** YAML syntax errors (tabs instead of spaces, misaligned indentation)

---

### Error: API calls fail with `404 Not Found`

**Cursor Fix (vite.config.js):**
```js
// Add proxy configuration
server: {
  port: 5173,
  proxy: {
    '/api': {
      target: 'http://localhost:5000',
      changeOrigin: true,
    },
    '/ws': {
      target: 'ws://localhost:5000',
      ws: true,
    },
  },
}
```

**Location:** `vite.config.js`  
**Cause:** Missing proxy configuration

---

### Error: `CORS policy` errors in browser console

**Cursor Fix (backend_server.py):**
```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Or specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

**Location:** `backend_server.py` or `src/api_server.py`  
**Cause:** Missing or incorrect CORS middleware

---

## 📱 Device Errors

### Error: "No devices available"

**Cursor Fix (Demo Mode - No Real Devices):**
```bash
# In .env file
AUTORL_MODE=demo
```

**Cursor Fix (Real Devices):**
```bash
# Check connected Android devices
adb devices

# Start Appium server
appium

# Verify device IDs in config.yaml match
```

**Location:** Terminal / `config.yaml`  
**Cause:** No devices connected or Appium not running

---

### Error: `Appium server not reachable`

**Cursor Fix:**
```bash
# Start Appium server
appium

# Verify it's running
curl http://localhost:4723/status
```

**Location:** Terminal  
**Cause:** Appium server not started

---

### Error: `pytesseract.TesseractNotFoundError`

**Cursor Fix (Windows):**
```bash
# Download and install Tesseract from:
# https://github.com/UB-Mannheim/tesseract/wiki

# Add to PATH or set in code:
pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'
```

**Cursor Fix (Linux):**
```bash
sudo apt-get install tesseract-ocr
```

**Cursor Fix (macOS):**
```bash
brew install tesseract
```

**Location:** System installation  
**Cause:** Tesseract OCR not installed or not in PATH

---

## 🔌 Plugin Errors

### Error: `Plugin 'xyz' not found`

**Cursor Fix:**
```python
# Ensure plugin file exists in plugins/ directory
# File: plugins/xyz.py

from plugins.base_plugin import BasePlugin

class XyzPlugin(BasePlugin):
    def initialize(self, config):
        self.enabled = config.get('enabled', True)
    
    def process(self, input_data):
        return {"status": "success"}
    
    def shutdown(self):
        pass
```

**Cursor Fix (config.yaml):**
```yaml
plugins:
  enabled_plugins:
    - xyz  # Add plugin name here
  xyz:
    enabled: true
```

**Location:** `plugins/` directory and `config.yaml`  
**Cause:** Plugin file missing or not registered

---

### Error: `Plugin failed to initialize`

**Cursor Fix:**
```python
# Check plugin class inherits from BasePlugin
from plugins.base_plugin import BasePlugin

class MyPlugin(BasePlugin):
    # Must implement: initialize, process, shutdown
    pass
```

**Location:** Plugin file in `plugins/`  
**Cause:** Plugin doesn't inherit from BasePlugin or missing required methods

---

## 🌐 Network Errors

### Error: WebSocket connection fails

**Cursor Fix (Frontend):**
```js
// Check WebSocket URL in environment
// .env file
VITE_WS_URL=ws://localhost:5000/ws
```

**Cursor Fix (Test Connection):**
```bash
# Install wscat
npm install -g wscat

# Test WebSocket
npx wscat -c ws://localhost:5000/ws
```

**Location:** `.env` file and terminal  
**Cause:** Incorrect WebSocket URL or backend not running

---

### Error: `Failed to fetch` in browser console

**Cursor Fix:**
```bash
# Ensure backend is running
python backend_server.py

# Check health endpoint
curl http://localhost:5000/api/health

# Verify proxy in vite.config.js (see above)
```

**Location:** Terminal and `vite.config.js`  
**Cause:** Backend not running or proxy misconfigured

---

## 🐍 Python Import Errors

### Error: `ImportError: cannot import name 'X' from 'Y'`

**Cursor Fix:**
```bash
# Ensure __init__.py exists in package directories
touch src/__init__.py
touch src/agent_service/__init__.py
touch plugins/__init__.py

# Set PYTHONPATH to project root
export PYTHONPATH=$(pwd)  # Linux/Mac
$env:PYTHONPATH="$(pwd)"  # Windows PowerShell
```

**Location:** Package directories and environment  
**Cause:** Missing `__init__.py` or incorrect PYTHONPATH

---

### Error: `AttributeError: module has no attribute 'X'`

**Cursor Fix:**
```python
# Check if function/class is exported in __init__.py
# File: src/module/__init__.py
from .submodule import MyClass

__all__ = ['MyClass']
```

**Location:** `__init__.py` files  
**Cause:** Missing exports in `__init__.py`

---

## 🎨 Frontend Errors

### Error: `Uncaught ReferenceError: process is not defined`

**Cursor Fix (vite.config.js):**
```js
export default defineConfig({
  define: {
    'process.env': {}
  },
  // ... rest of config
})
```

**Location:** `vite.config.js`  
**Cause:** Environment variables not properly defined for Vite

---

### Error: `Module not found: Can't resolve '@/components'`

**Cursor Fix (vite.config.js):**
```js
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

**Location:** `vite.config.js`  
**Cause:** Missing path alias configuration

---

## 🔍 Debugging Commands

### Check if all services are running

```bash
# Backend health
curl http://localhost:5000/api/health

# Frontend (should open browser)
curl http://localhost:5173

# WebSocket
npx wscat -c ws://localhost:5000/ws

# Appium status
curl http://localhost:4723/status

# Metrics
curl http://localhost:8000/metrics
```

---

### View real-time logs

```bash
# Backend logs (in terminal where backend runs)
python backend_server.py

# Frontend logs (browser console)
# Press F12 → Console tab

# System logs (if configured)
tail -f logs/autorl.log
```

---

### Check installed dependencies

```bash
# Python packages
pip list | grep fastapi
pip list | grep openai

# Node packages
npm list react
npm list vite

# System tools
appium --version
tesseract --version
python --version
node --version
```

---

## 🆘 Emergency Reset

### Full Reset (if everything is broken)

```bash
# 1. Clean Python environment
rm -rf venv/
python -m venv venv
source venv/bin/activate  # or .\venv\Scripts\Activate.ps1 on Windows
pip install -r requirements.txt

# 2. Clean Node modules
rm -rf node_modules/
rm package-lock.json
npm install

# 3. Reset configuration
cp .env.example .env
# Edit .env with your settings

# 4. Verify setup
python setup_autorl.py

# 5. Start fresh
python backend_server.py
# In another terminal:
npm run dev
```

---

## 📋 Pre-flight Checklist

Before starting AutoRL, verify:

- [ ] Python 3.9+ installed (`python --version`)
- [ ] Node.js 16+ installed (`node --version`)
- [ ] Dependencies installed (`pip list`, `npm list`)
- [ ] `.env` file exists and configured
- [ ] `config.yaml` exists and valid
- [ ] Ports 5000 and 5173 are available
- [ ] (Optional) Appium installed for real devices
- [ ] (Optional) Tesseract installed for OCR

**Run automated check:**
```bash
python setup_autorl.py
```

---

## 🎯 Quick Start Commands

```bash
# Terminal 1: Backend
python backend_server.py

# Terminal 2: Frontend
npm run dev

# Terminal 3 (optional): Appium
appium
```

Then visit: **http://localhost:5173** 🚀

---

## 📚 Related Documentation

- **Full Setup Guide:** [FIXES_APPLIED_GUIDE.md](FIXES_APPLIED_GUIDE.md)
- **Quick Start:** [docs/QUICK_START.md](docs/QUICK_START.md)
- **Mobile Setup:** [MOBILE_SIMULATION_GUIDE.md](MOBILE_SIMULATION_GUIDE.md)
- **Deployment:** [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)
- **Error Handling:** [docs/ERROR_HANDLING_GUIDE.md](docs/ERROR_HANDLING_GUIDE.md)

---

*This reference covers 95% of common AutoRL errors. For specific issues, check the full guides above.*

