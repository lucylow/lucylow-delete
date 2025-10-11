#!/usr/bin/env python3
"""
Test script for Analytics API endpoint
Tests the /api/analytics endpoint to ensure it returns proper data
"""

import requests
import json
import sys

def test_analytics_endpoint():
    """Test the analytics API endpoint"""
    base_url = "http://localhost:5000"
    endpoint = "/api/analytics"
    
    print("🧪 Testing Analytics API Endpoint")
    print("=" * 50)
    
    # Test different time ranges
    time_ranges = ["24h", "7d", "30d", "90d"]
    
    for time_range in time_ranges:
        print(f"\n📊 Testing time range: {time_range}")
        try:
            response = requests.get(f"{base_url}{endpoint}?range={time_range}", timeout=5)
            
            if response.status_code == 200:
                data = response.json()
                
                # Validate response structure
                required_keys = [
                    "stats", 
                    "taskTrends", 
                    "deviceUtilization", 
                    "taskDistribution",
                    "performanceMetrics", 
                    "rlTraining", 
                    "errorAnalysis"
                ]
                
                missing_keys = [key for key in required_keys if key not in data]
                
                if missing_keys:
                    print(f"   ❌ Missing keys: {missing_keys}")
                    return False
                
                # Validate stats structure
                stats_keys = [
                    "totalTasks", "tasksChange", "successRate", "successRateChange",
                    "avgDuration", "durationChange", "activeUsers", "usersChange",
                    "activeDevices", "devicesChange", "totalErrors", "errorsChange"
                ]
                
                missing_stats = [key for key in stats_keys if key not in data["stats"]]
                
                if missing_stats:
                    print(f"   ❌ Missing stats: {missing_stats}")
                    return False
                
                # Print some sample data
                print(f"   ✅ Success!")
                print(f"   📈 Total Tasks: {data['stats']['totalTasks']}")
                print(f"   🎯 Success Rate: {data['stats']['successRate']}%")
                print(f"   ⚡ Avg Duration: {data['stats']['avgDuration']}s")
                print(f"   📱 Active Devices: {data['stats']['activeDevices']}")
                print(f"   📊 Task Trends: {len(data['taskTrends'])} data points")
                print(f"   🔧 Device Utilization: {len(data['deviceUtilization'])} devices")
                
            else:
                print(f"   ❌ Failed with status code: {response.status_code}")
                return False
                
        except requests.exceptions.ConnectionError:
            print(f"   ⚠️  Could not connect to {base_url}")
            print(f"   💡 Make sure the backend server is running: python backend_server.py")
            return False
        except Exception as e:
            print(f"   ❌ Error: {str(e)}")
            return False
    
    print("\n" + "=" * 50)
    print("✅ All tests passed!")
    return True

def test_frontend_analytics():
    """Test that the frontend analytics page exists"""
    print("\n🎨 Checking Frontend Analytics Page")
    print("=" * 50)
    
    import os
    analytics_jsx = "src/pages/Analytics.jsx"
    analytics_js = "src/pages/Analytics.js"
    hook_file = "src/hooks/useAnalytics.js"
    
    files_to_check = [
        (analytics_jsx, "Analytics page (JSX)"),
        (hook_file, "Analytics custom hook")
    ]
    
    all_exist = True
    for file_path, description in files_to_check:
        if os.path.exists(file_path):
            file_size = os.path.getsize(file_path)
            print(f"   ✅ {description}: {file_path} ({file_size:,} bytes)")
        else:
            print(f"   ❌ Missing: {description} ({file_path})")
            all_exist = False
    
    return all_exist

if __name__ == "__main__":
    print("🚀 AutoRL Analytics Test Suite")
    print("=" * 50)
    
    # Test frontend files
    frontend_ok = test_frontend_analytics()
    
    # Test backend API
    print()
    backend_ok = test_analytics_endpoint()
    
    print("\n" + "=" * 50)
    if frontend_ok and backend_ok:
        print("🎉 All analytics tests passed!")
        sys.exit(0)
    else:
        print("⚠️  Some tests failed. Please check the output above.")
        if not backend_ok:
            print("\n💡 To start the backend server, run:")
            print("   python backend_server.py")
        sys.exit(1)

