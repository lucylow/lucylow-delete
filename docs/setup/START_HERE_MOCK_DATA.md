# 🚀 Quick Start: Verify Mock Data Display

## TL;DR - Start Here!

### Step 1: Start Backend
```bash
python backend_server.py
```
**Look for**: `Mode: DEMO` in the output

### Step 2: Verify Mock Data Works
```powershell
.\verify_mock_data.ps1
```
**Expected**: All ✅ checkmarks

### Step 3: Test in Browser
```bash
start test_mock_data_frontend.html
```
**Click**: "Test All" button

### Step 4: Start Frontend & Check Dashboard
```bash
npm run dev
```
**Open**: http://localhost:5173/dashboard

---

## ✅ What Should You See?

### In Dashboard (http://localhost:5173/dashboard)

#### Top Metrics (4 cards):
- **Tasks Completed**: 47
- **Success Rate**: 94.0%
- **Avg Execution**: 23.4s
- **Active Devices**: 3

#### Connected Devices (right panel):
- ✓ android_pixel_7 (Android, 85%)
- ✓ iphone_14 (iOS, 92%)
- ✓ emulator-5554 (Android, 100%)

#### WebSocket Status (top right):
- 🟢 **"WebSocket Connected"** (should be green)

---

## ❌ Troubleshooting

### Problem: Backend won't start
```bash
# Check if port 5000 is in use
netstat -ano | findstr :5000

# Try starting backend manually
python backend_server.py
```

### Problem: Frontend shows no data
**Check browser console (F12)**:
- Should see: `📤 API Request: GET http://localhost:5000/api/devices`
- Should see: `📥 API Response [/devices]: [...]`
- Should see: `✅ WebSocket connected`

**If you see errors**:
1. Verify backend is running
2. Check URL is `http://localhost:5000` (not 127.0.0.1)
3. Refresh page

### Problem: WebSocket not connecting
**Red badge says "WebSocket Disconnected"**:
1. Check backend logs for "WebSocket client connected"
2. Try test page: `start test_mock_data_frontend.html`
3. Click "Connect WebSocket"

---

## 🧪 Test Everything Works

### Test 1: PowerShell Script (Fastest)
```powershell
.\verify_mock_data.ps1
```
✅ All endpoints should return data

### Test 2: Browser Test Page (Most Detailed)
```bash
start test_mock_data_frontend.html
```
Click "Test All" → All tests green ✅

### Test 3: Frontend Dashboard (Full Experience)
```bash
# Terminal 1
python backend_server.py

# Terminal 2
npm run dev

# Browser
http://localhost:5173/dashboard
```
Should see metrics, devices, and green WebSocket badge

### Test 4: Create a Task (Full Flow)
1. Go to: http://localhost:5173/dashboard
2. Enter task: `"Open Instagram and like first post"`
3. Click "Start Task"
4. Watch real-time execution with mock data

---

## 📋 Files Reference

| File | Purpose |
|------|---------|
| `verify_mock_data.ps1` | Quick PowerShell test script |
| `test_mock_data_frontend.html` | Comprehensive browser test |
| `MOCK_DATA_VERIFICATION_GUIDE.md` | Full documentation |
| `MOCK_DATA_FIXES_SUMMARY.md` | What was fixed |
| `src/services/api.js` | Frontend API service (has logging) |
| `backend_server.py` | Backend with mock data |

---

## 🎯 Success Criteria

✅ **Everything is working when:**
- [ ] Backend starts with "Mode: DEMO"
- [ ] PowerShell script shows all ✅
- [ ] Test page shows all green tests
- [ ] Dashboard displays 4 metrics with data
- [ ] Dashboard shows 3 devices
- [ ] WebSocket badge is green
- [ ] Can create and execute tasks
- [ ] Browser console has no errors

---

## 💡 Pro Tips

1. **Always start backend first**: `python backend_server.py`
2. **Check demo mode**: Backend should say "Mode: DEMO"
3. **Use test tools**: Run `verify_mock_data.ps1` before frontend
4. **Check console**: Open DevTools (F12) to see API logs
5. **Read the guide**: `MOCK_DATA_VERIFICATION_GUIDE.md` has everything

---

## 🆘 Still Having Issues?

1. Run verification: `.\verify_mock_data.ps1`
2. Open test page: `start test_mock_data_frontend.html`
3. Check browser console (F12) for errors
4. Read: `MOCK_DATA_VERIFICATION_GUIDE.md`
5. Verify DEMO mode in backend logs

---

## ✨ Quick Commands Cheat Sheet

```bash
# Start everything
python start_autorl.py

# Just backend
python backend_server.py

# Just frontend
npm run dev

# Test mock data
.\verify_mock_data.ps1

# Test in browser
start test_mock_data_frontend.html

# Open dashboard
start http://localhost:5173/dashboard
```

---

**✅ Mock data is configured and ready to use!**

If you see all green checkmarks in the verification script, you're good to go! 🎉

