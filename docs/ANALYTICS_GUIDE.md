# Analytics & Insights Dashboard Guide

## Overview

The Analytics & Insights page provides comprehensive visualizations and metrics for your AutoRL automation system. It includes real-time data, historical trends, device performance, RL training progress, and error analysis.

## Features

### 📊 Key Metrics Dashboard
- **Total Tasks**: Cumulative count of all executed tasks with percentage change
- **Success Rate**: Overall task completion success percentage
- **Avg Duration**: Average time taken per task execution
- **Active Devices**: Number of currently connected devices

### 📈 Visualization Tabs

#### 1. Overview Tab
- **Task Execution Trends**: Daily breakdown of successful, failed, and pending tasks (Area Chart)
- **Task Type Distribution**: Pie chart showing task categories (UI Testing, Data Entry, Navigation, etc.)
- **Device Utilization**: Bar chart comparing task distribution across devices

#### 2. Performance Tab
- **Response Time (24h)**: Line chart tracking average task response times
- **Task Throughput**: Tasks processed per hour visualization
- **System Resource Usage**: CPU utilization over time (Area Chart)

#### 3. Devices Tab
- **Device Metrics**: Total, active, and idle device counts
- **Device Performance Comparison**: Bar chart showing task completion by device

#### 4. RL Training Tab
- **Training Rewards**: RL agent reward progression over episodes
- **Training Loss**: Model loss tracking over episodes
- **Combined Metrics**: Dual visualization of rewards and loss

#### 5. Errors Tab
- **Error Metrics**: Total errors, error rate, average recovery time
- **Error Distribution**: Pie chart of error categories
- **Error Frequency**: Bar chart showing occurrence counts by type

## Usage

### Accessing Analytics
Navigate to `/analytics` in your application or click "Analytics" in the navigation menu.

### Time Range Filtering
Use the dropdown in the top-right to filter data:
- Last 24 Hours
- Last 7 Days (default)
- Last 30 Days
- Last 90 Days

### Refreshing Data
Click the "Refresh" button to fetch the latest analytics data from the backend.

### Exporting Data
Export your analytics data in two formats:
- **CSV**: Click the "CSV" button for spreadsheet-compatible format
- **JSON**: Click the "JSON" button for raw data export

## Backend API

### Endpoint
```
GET /api/analytics?range={timeRange}
```

### Parameters
- `range` (string): Time range for data (`24h`, `7d`, `30d`, `90d`)

### Response Structure
```json
{
  "stats": {
    "totalTasks": 1247,
    "tasksChange": 18,
    "successRate": 94.2,
    "successRateChange": 2.1,
    "avgDuration": 23.4,
    "durationChange": -3.2,
    "activeUsers": 42,
    "usersChange": 7,
    "activeDevices": 8,
    "devicesChange": 2,
    "totalErrors": 73,
    "errorsChange": -12
  },
  "taskTrends": [...],
  "deviceUtilization": [...],
  "taskDistribution": [...],
  "performanceMetrics": [...],
  "rlTraining": [...],
  "errorAnalysis": [...]
}
```

## Custom Hook: useAnalytics

The analytics page uses a custom React hook for data management:

```javascript
import { useAnalytics } from '@/hooks/useAnalytics';

const {
  data,              // Analytics data object
  isLoading,         // Loading state
  error,             // Error state
  timeRange,         // Current time range
  refresh,           // Function to refresh data
  updateTimeRange,   // Function to update time range
  exportToCSV,       // Export as CSV
  exportToJSON       // Export as JSON
} = useAnalytics('7d');
```

### Hook Features
- Automatic data fetching on mount and time range changes
- Fallback to mock data when API is unavailable
- Built-in export functionality (CSV and JSON)
- Error handling with graceful degradation

## Customization

### Adding New Metrics
1. Update the backend endpoint in `backend_server.py`:
```python
@app.get("/api/analytics")
async def get_analytics(range: str = "7d"):
    # Add your custom metric here
    return {
        "stats": {...},
        "customMetric": [...]
    }
```

2. Update the frontend to display the metric:
```jsx
// In Analytics.jsx
<Card>
  <CardHeader>
    <CardTitle>Custom Metric</CardTitle>
  </CardHeader>
  <CardContent>
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={analyticsData.customMetric}>
        {/* Chart configuration */}
      </LineChart>
    </ResponsiveContainer>
  </CardContent>
</Card>
```

### Color Scheme
The analytics page uses a consistent color palette:
- Primary: `#00e676` (Green)
- Secondary: `#2196f3` (Blue)
- Warning: `#ff9800` (Orange)
- Error: `#e91e63` (Pink)
- Purple: `#9c27b0`
- Cyan: `#00bcd4`

## Dependencies

### Required Libraries
- `recharts`: Chart visualizations
- `lucide-react`: Icons
- `@radix-ui/react-tabs`: Tab navigation
- Shadcn UI components (Card, Button, etc.)

### Backend Requirements
- FastAPI
- Python 3.8+
- CORS middleware enabled

## Troubleshooting

### No Data Displayed
1. Check backend server is running on port 5000
2. Verify API endpoint is accessible: `http://localhost:5000/api/analytics`
3. Check browser console for errors
4. Ensure CORS is properly configured

### Charts Not Rendering
1. Verify `recharts` is installed: `npm list recharts`
2. Check browser console for React errors
3. Ensure data structure matches expected format

### Export Not Working
1. Check browser allows file downloads
2. Verify data exists before exporting
3. Check console for export errors

## Performance Tips

1. **Optimize Data Volume**: Limit historical data based on time range
2. **Use Memoization**: Cache expensive calculations
3. **Lazy Load Charts**: Load charts only when tab is active
4. **Debounce Refresh**: Prevent excessive API calls

## Future Enhancements

- [ ] Real-time WebSocket updates
- [ ] Custom date range picker
- [ ] Metric comparison across time periods
- [ ] Downloadable PDF reports
- [ ] Email report scheduling
- [ ] Custom dashboard layouts
- [ ] Advanced filtering options
- [ ] Drill-down detailed views

## Support

For issues or questions about the Analytics dashboard:
1. Check this guide first
2. Review the console logs
3. Verify backend API responses
4. Check network tab in browser DevTools

## API Configuration

The analytics hook automatically detects the API base URL from environment variables:
- `VITE_API_BASE_URL`
- `VITE_AUTORL_API_BASE`
- Default: `http://localhost:8000`

Set these in your `.env` file:
```bash
VITE_API_BASE_URL=http://localhost:5000
```

## Example Usage

```jsx
import Analytics from '@/pages/Analytics';

function App() {
  return (
    <Routes>
      <Route path="/analytics" element={<Analytics />} />
    </Routes>
  );
}
```

The Analytics page is already integrated into the main application at the `/analytics` route.

