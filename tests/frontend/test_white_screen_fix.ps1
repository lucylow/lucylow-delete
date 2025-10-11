# AutoRL White Screen Fix - Testing Script
# Run this script to test the fixes applied

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  AutoRL White Screen Fix - Test Script" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Check if Python is available
Write-Host "[1/6] Checking Python..." -ForegroundColor Yellow
try {
    $pythonVersion = python --version 2>&1
    Write-Host "  ✅ Python found: $pythonVersion" -ForegroundColor Green
} catch {
    Write-Host "  ❌ Python not found. Please install Python first." -ForegroundColor Red
    exit 1
}

# Step 2: Check if Node.js is available
Write-Host "[2/6] Checking Node.js..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version 2>&1
    Write-Host "  ✅ Node.js found: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "  ❌ Node.js not found. Please install Node.js first." -ForegroundColor Red
    exit 1
}

# Step 3: Check if port 5000 is available
Write-Host "[3/6] Checking if port 5000 is available..." -ForegroundColor Yellow
$port5000 = netstat -ano | Select-String ":5000"
if ($port5000) {
    Write-Host "  ⚠️  Port 5000 is already in use" -ForegroundColor Yellow
    Write-Host "     Backend server may already be running" -ForegroundColor Gray
} else {
    Write-Host "  ✅ Port 5000 is available" -ForegroundColor Green
}

# Step 4: Check if port 8080 is available
Write-Host "[4/6] Checking if port 8080 is available..." -ForegroundColor Yellow
$port8080 = netstat -ano | Select-String ":8080"
if ($port8080) {
    Write-Host "  ⚠️  Port 8080 is already in use" -ForegroundColor Yellow
    Write-Host "     Frontend server may already be running" -ForegroundColor Gray
} else {
    Write-Host "  ✅ Port 8080 is available" -ForegroundColor Green
}

# Step 5: Check if node_modules exists
Write-Host "[5/6] Checking node_modules..." -ForegroundColor Yellow
if (Test-Path "node_modules") {
    Write-Host "  ✅ node_modules found" -ForegroundColor Green
} else {
    Write-Host "  ⚠️  node_modules not found. Running npm install..." -ForegroundColor Yellow
    npm install
    if ($LASTEXITCODE -eq 0) {
        Write-Host "  ✅ npm install completed" -ForegroundColor Green
    } else {
        Write-Host "  ❌ npm install failed" -ForegroundColor Red
        exit 1
    }
}

# Step 6: Check critical files
Write-Host "[6/6] Checking critical files..." -ForegroundColor Yellow
$criticalFiles = @(
    "vite.config.js",
    "src/App.jsx",
    "src/App.backup.jsx",
    "src/main.jsx",
    "index.html",
    "backend_server.py"
)

$allFilesExist = $true
foreach ($file in $criticalFiles) {
    if (Test-Path $file) {
        Write-Host "  ✅ $file" -ForegroundColor Green
    } else {
        Write-Host "  ❌ $file - NOT FOUND" -ForegroundColor Red
        $allFilesExist = $false
    }
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Pre-flight Check Complete" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

if (-not $allFilesExist) {
    Write-Host "❌ Some critical files are missing. Please check your setup." -ForegroundColor Red
    exit 1
}

Write-Host "Ready to start servers!" -ForegroundColor Green
Write-Host ""
Write-Host "Next Steps:" -ForegroundColor Yellow
Write-Host "  1. Start Backend:  python backend_server.py" -ForegroundColor White
Write-Host "  2. Start Frontend: npm run dev" -ForegroundColor White
Write-Host "  3. Open Browser:   http://localhost:8080" -ForegroundColor White
Write-Host ""
Write-Host "Or run the automated test:" -ForegroundColor Yellow
Write-Host "  .\test_white_screen_fix.ps1 -AutoStart" -ForegroundColor White
Write-Host ""

# Auto-start option
param(
    [switch]$AutoStart
)

if ($AutoStart) {
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host "  Starting Servers Automatically" -ForegroundColor Cyan
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host ""
    
    # Start backend in new window
    Write-Host "Starting backend server..." -ForegroundColor Yellow
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "python backend_server.py"
    Start-Sleep -Seconds 3
    
    # Test backend
    Write-Host "Testing backend health endpoint..." -ForegroundColor Yellow
    try {
        $response = Invoke-WebRequest -Uri "http://localhost:5000/api/health" -UseBasicParsing -TimeoutSec 5
        if ($response.StatusCode -eq 200) {
            Write-Host "  ✅ Backend is running!" -ForegroundColor Green
            Write-Host "  Response: $($response.Content)" -ForegroundColor Gray
        }
    } catch {
        Write-Host "  ⚠️  Backend not responding yet (this is normal if still starting)" -ForegroundColor Yellow
    }
    
    # Start frontend in new window
    Write-Host "Starting frontend server..." -ForegroundColor Yellow
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "npm run dev"
    Start-Sleep -Seconds 3
    
    # Open browser
    Write-Host "Opening browser..." -ForegroundColor Yellow
    Start-Sleep -Seconds 2
    Start-Process "http://localhost:8080"
    
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "  Servers Started!" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "Check your browser at: http://localhost:8080" -ForegroundColor Cyan
    Write-Host "You should see the AutoRL Debug Page" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Press F12 in the browser to open Developer Tools" -ForegroundColor Yellow
    Write-Host "and check the Console for any errors." -ForegroundColor Yellow
    Write-Host ""
}

