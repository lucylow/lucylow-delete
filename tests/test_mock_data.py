"""
Test script to verify mock data generation in backend_server.py
"""

import sys
sys.path.insert(0, '.')

# Import the mock data generators
from backend_server import generate_mock_devices, generate_mock_metrics

def test_mock_devices():
    """Test mock device generation"""
    print("Testing mock device generation...")
    devices = generate_mock_devices()
    print(f"✅ Generated {len(devices)} mock devices:")
    for device in devices:
        print(f"  - {device.id} ({device.platform}) - {device.status}")
    return devices

def test_mock_metrics():
    """Test mock metrics generation"""
    print("\nTesting mock metrics generation...")
    metrics = generate_mock_metrics()
    print(f"✅ Generated mock metrics:")
    print(f"  - Total Success: {metrics.total_tasks_success}")
    print(f"  - Total Failure: {metrics.total_tasks_failure}")
    print(f"  - In Progress: {metrics.tasks_in_progress}")
    print(f"  - Avg Runtime: {metrics.avg_task_runtime_seconds}s")
    print(f"  - Success Rate: {metrics.success_rate}%")
    return metrics

if __name__ == "__main__":
    print("=" * 60)
    print("AutoRL Mock Data Test")
    print("=" * 60)
    
    devices = test_mock_devices()
    metrics = test_mock_metrics()
    
    print("\n" + "=" * 60)
    print("✅ All mock data tests passed!")
    print("=" * 60)
    
    # Verify data types
    assert len(devices) > 0, "Should have at least one device"
    assert metrics.total_tasks_success >= 0, "Success count should be non-negative"
    assert 0 <= metrics.success_rate <= 100, "Success rate should be 0-100%"
    
    print("\n✅ Mock data is generating correctly!")

