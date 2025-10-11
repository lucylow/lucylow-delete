# Analytics & Insights - Quick Start Guide

## 🚀 Get Started in 3 Steps

### Step 1: Start the Backend
```bash
python backend_server.py
```
Expected output:
```
🚀 Starting AutoRL Unified Backend Server
📊 Mode: PRODUCTION (or DEMO)
🌐 API: http://localhost:5000
📈 Metrics: http://localhost:8000/metrics
```

### Step 2: Start the Frontend
```bash
npm run dev
```
Expected output:
```
VITE v4.5.14  ready in 1234 ms

➜  Local:   http://localhost:5173/
```

### Step 3: Access Analytics
Open your browser to:
```
http://localhost:5173/analytics
```

## 📊 What You'll See

### Dashboard Overview

```
┌─────────────────────────────────────────────────────────────────┐
│  Analytics & Insights                    [7d ▼] [🔄] [⬇ CSV] [⬇ JSON]
│  Comprehensive metrics and performance analytics
├─────────────────────────────────────────────────────────────────┤
│  ┌───────────┐  ┌───────────┐  ┌───────────┐  ┌───────────┐  │
│  │ 📊 1,247  │  │ 🎯 94.2%  │  │ ⚡ 23.4s  │  │ 📱 8      │  │
│  │ Total     │  │ Success   │  │ Avg       │  │ Active    │  │
│  │ Tasks     │  │ Rate      │  │ Duration  │  │ Devices   │  │
│  │ +18%      │  │ +2.1%     │  │ -3.2s     │  │ +2        │  │
│  └───────────┘  └───────────┘  └───────────┘  └───────────┘  │
├─────────────────────────────────────────────────────────────────┤
│  [Overview] [Performance] [Devices] [RL Training] [Errors]     │
├─────────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────┐  ┌─────────────────────────┐    │
│  │ Task Execution Trends   │  │ Task Type Distribution  │    │
│  │                         │  │                         │    │
│  │ [Interactive Chart]     │  │ [Interactive Chart]     │    │
│  │                         │  │                         │    │
│  └─────────────────────────┘  └─────────────────────────┘    │
│  ┌─────────────────────────────────────────────────────┐     │
│  │ Device Utilization                                  │     │
│  │ [Interactive Chart]                                 │     │
│  └─────────────────────────────────────────────────────┘     │
└─────────────────────────────────────────────────────────────────┘
```

## 🎯 Key Features

### 1. Overview Tab
- Task execution trends (last 7 days)
- Task type distribution
- Device utilization

### 2. Performance Tab
- Response time tracking
- Task throughput
- System resource usage

### 3. Devices Tab
- Device performance comparison
- Active vs idle devices
- Task distribution per device

### 4. RL Training Tab
- Training rewards progression
- Model loss tracking
- Combined metrics view

### 5. Errors Tab
- Error type distribution
- Error frequency analysis
- Recovery time metrics

## 💡 Pro Tips

### Time Range Selection
Click the dropdown in the top-right to change the time range:
- **24h**: Last 24 hours (detailed view)
- **7d**: Last 7 days (default, balanced view)
- **30d**: Last 30 days (trend analysis)
- **90d**: Last 90 days (long-term patterns)

### Refresh Data
Click the 🔄 button to manually refresh the analytics data.

### Export Data
- **CSV**: Perfect for Excel/Google Sheets analysis
- **JSON**: Ideal for programmatic processing

### Navigate Tabs
Click any tab to switch between different analytics views.

## 🔧 Troubleshooting

### "Cannot connect to backend"
Make sure the backend is running:
```bash
python backend_server.py
```

### "No data displayed"
1. Check backend is on port 5000
2. Verify frontend proxy in `vite.config.js`
3. Check browser console for errors

### Charts not rendering
1. Verify `recharts` is installed: `npm list recharts`
2. Clear browser cache and reload
3. Check browser console for errors

## 📖 More Information

- **Full Guide**: See `docs/ANALYTICS_GUIDE.md`
- **Implementation Details**: See `ANALYTICS_IMPLEMENTATION_SUMMARY.md`
- **API Documentation**: See `docs/ANALYTICS_GUIDE.md#backend-api`

## 🎨 Customization

### Change Colors
Edit the COLORS array in `src/pages/Analytics.jsx`:
```javascript
const COLORS = ['#00e676', '#2196f3', '#ff9800', '#e91e63', '#9c27b0', '#00bcd4'];
```

### Add New Metrics
1. Update backend endpoint in `backend_server.py`
2. Add visualization in `Analytics.jsx`
3. Update `useAnalytics` hook if needed

### Modify Time Ranges
Edit the time range options:
```javascript
<select value={timeRange} onChange={(e) => updateTimeRange(e.target.value)}>
  <option value="24h">Last 24 Hours</option>
  <option value="7d">Last 7 Days</option>
  <option value="30d">Last 30 Days</option>
  <option value="90d">Last 90 Days</option>
  <option value="1y">Last Year</option> {/* NEW */}
</select>
```

## ✅ Verification Checklist

Before using analytics, verify:
- [ ] Backend server is running (port 5000)
- [ ] Frontend dev server is running (port 5173)
- [ ] Can access http://localhost:5173/analytics
- [ ] Charts are rendering properly
- [ ] Data refreshes when clicking refresh button
- [ ] Export buttons work (CSV and JSON)
- [ ] All 5 tabs are accessible
- [ ] No console errors in browser

## 🎉 You're All Set!

Your analytics dashboard is ready to provide insights into:
- Task performance
- Device utilization
- RL training progress
- Error patterns
- System health

Enjoy exploring your automation analytics! 📊✨

