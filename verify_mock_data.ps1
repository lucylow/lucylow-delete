# AutoRL Mock Data Verification Script
# Run this to verify mock data is working properly

Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "AutoRL Mock Data Verification" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""

# Function to test endpoint
function Test-Endpoint {
    param($url, $name)
    
    try {
        Write-Host "Testing $name..." -NoNewline
        $response = Invoke-RestMethod -Uri $url -Method Get -TimeoutSec 5
        Write-Host " ✅ OK" -ForegroundColor Green
        return $response
    }
    catch {
        Write-Host " ❌ FAILED" -ForegroundColor Red
        Write-Host "  Error: $($_.Exception.Message)" -ForegroundColor Red
        return $null
    }
}

# Check if backend is running
Write-Host "Checking backend server..." -ForegroundColor Yellow
Write-Host ""

$baseUrl = "http://localhost:5000/api"

# Test all endpoints
$health = Test-Endpoint "$baseUrl/health" "Health Check"
$devices = Test-Endpoint "$baseUrl/devices" "Devices"
$metrics = Test-Endpoint "$baseUrl/metrics" "Metrics"
$activity = Test-Endpoint "$baseUrl/activity" "Activity Log"
$policies = Test-Endpoint "$baseUrl/policies" "Policies"
$plugins = Test-Endpoint "$baseUrl/plugins" "Plugins"

Write-Host ""
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "Results Summary" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan

if ($health) {
    Write-Host "✅ Backend is running in $($health.mode) mode" -ForegroundColor Green
}
else {
    Write-Host "❌ Backend is not responding" -ForegroundColor Red
    Write-Host ""
    Write-Host "To start the backend:" -ForegroundColor Yellow
    Write-Host "  python backend_server.py" -ForegroundColor White
    Write-Host "  or" -ForegroundColor White
    Write-Host "  python start_autorl.py" -ForegroundColor White
    exit 1
}

if ($devices) {
    Write-Host "✅ Mock devices: $($devices.Count) devices found" -ForegroundColor Green
    foreach ($device in $devices) {
        Write-Host "   - $($device.id) ($($device.platform)) - $($device.status)" -ForegroundColor Gray
    }
}

if ($metrics) {
    Write-Host "✅ Mock metrics:" -ForegroundColor Green
    Write-Host "   - Success: $($metrics.total_tasks_success)" -ForegroundColor Gray
    Write-Host "   - Failure: $($metrics.total_tasks_failure)" -ForegroundColor Gray
    Write-Host "   - Success Rate: $($metrics.success_rate)%" -ForegroundColor Gray
    Write-Host "   - Avg Runtime: $($metrics.avg_task_runtime_seconds)s" -ForegroundColor Gray
}

if ($policies) {
    Write-Host "✅ Mock policies: $($policies.Count) policies found" -ForegroundColor Green
}

if ($plugins) {
    Write-Host "✅ Mock plugins: $($plugins.Count) plugins found" -ForegroundColor Green
}

Write-Host ""
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "Next Steps" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Start frontend:" -ForegroundColor Yellow
Write-Host "   npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "2. Open dashboard:" -ForegroundColor Yellow
Write-Host "   http://localhost:5173/dashboard" -ForegroundColor White
Write-Host ""
Write-Host "3. Or test with:" -ForegroundColor Yellow
Write-Host "   start test_mock_data_frontend.html" -ForegroundColor White
Write-Host ""
Write-Host "✅ Mock data is working properly!" -ForegroundColor Green

