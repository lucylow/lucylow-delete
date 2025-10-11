"""
Basic tests for the error handling system.

Run with: pytest tests/test_error_handling_basic.py -v
"""

import pytest
import asyncio
from pathlib import Path

# Import error handling components
import sys
sys.path.insert(0, str(Path(__file__).parent.parent))

from src.error_handling import (
    # Exceptions
    DeviceConnectionException,
    TaskExecutionException,
    ElementNotFoundException,
    InvalidInputException,
    TimeoutException,
    ErrorCategory,
    ErrorSeverity,
    # Validators
    validate_string,
    validate_number,
    validate_list,
    StringValidator,
    NumberValidator,
    # Decorators
    with_error_handling,
    with_retry,
    with_timeout,
    log_execution,
    # Circuit Breaker
    CircuitBreaker,
    CircuitBreakerConfig,
    CircuitState,
    CircuitBreakerOpenException,
    # Tracking
    ErrorTracker,
    # Recovery
    DeadLetterQueue,
    RecoveryStrategy
)


class TestExceptions:
    """Test custom exceptions"""
    
    def test_device_connection_exception(self):
        """Test DeviceConnectionException creation"""
        error = DeviceConnectionException(
            "Connection failed",
            device_id="test-device"
        )
        
        assert error.error_code == "DEVICE_CONNECTION_ERROR"
        assert error.category == ErrorCategory.INFRASTRUCTURE
        assert error.severity == ErrorSeverity.CRITICAL
        assert error.recoverable == True
        assert "test-device" in str(error)
    
    def test_exception_context(self):
        """Test error context"""
        error = TaskExecutionException(
            "Task failed",
            task_id="task123"
        )
        
        assert error.context.task_id == "task123"
        assert error.context.timestamp > 0
        assert error.context.stack_trace is not None
    
    def test_exception_to_dict(self):
        """Test exception serialization"""
        error = ElementNotFoundException(
            "Element not found",
            element_id="button1"
        )
        
        error_dict = error.to_dict()
        
        assert error_dict["error_code"] == "ELEMENT_NOT_FOUND"
        assert error_dict["message"] == "Element not found"
        assert error_dict["category"] == "business_logic"
        assert error_dict["recoverable"] == True
        assert len(error_dict["recovery_suggestions"]) > 0


class TestValidators:
    """Test input validators"""
    
    def test_string_validator_valid(self):
        """Test string validation with valid input"""
        result = validate_string(
            "test_device",
            "device_id",
            not_empty=True,
            min_length=3,
            max_length=50
        )
        assert result == "test_device"
    
    def test_string_validator_invalid_empty(self):
        """Test string validation with empty string"""
        with pytest.raises(InvalidInputException) as exc_info:
            validate_string("", "device_id", not_empty=True)
        
        assert "cannot be empty" in str(exc_info.value)
    
    def test_string_validator_invalid_length(self):
        """Test string validation with invalid length"""
        with pytest.raises(InvalidInputException):
            validate_string("ab", "device_id", min_length=3)
    
    def test_number_validator_valid(self):
        """Test number validation with valid input"""
        result = validate_number(
            10,
            "timeout",
            positive=True,
            min_value=1,
            max_value=100
        )
        assert result == 10
    
    def test_number_validator_invalid_negative(self):
        """Test number validation with negative number"""
        with pytest.raises(InvalidInputException) as exc_info:
            validate_number(-5, "timeout", positive=True)
        
        assert "must be positive" in str(exc_info.value)
    
    def test_number_validator_invalid_range(self):
        """Test number validation with out of range"""
        with pytest.raises(InvalidInputException):
            validate_number(150, "timeout", max_value=100)
    
    def test_list_validator_valid(self):
        """Test list validation"""
        result = validate_list(
            ["item1", "item2"],
            "items",
            not_empty=True,
            min_length=1
        )
        assert result == ["item1", "item2"]
    
    def test_list_validator_empty(self):
        """Test list validation with empty list"""
        with pytest.raises(InvalidInputException):
            validate_list([], "items", not_empty=True)


class TestDecorators:
    """Test error handling decorators"""
    
    @pytest.mark.asyncio
    async def test_with_error_handling(self):
        """Test with_error_handling decorator"""
        
        @with_error_handling(reraise=False, default_return="default")
        async def failing_function():
            raise Exception("Test error")
        
        result = await failing_function()
        assert result == "default"
    
    @pytest.mark.asyncio
    async def test_with_retry_success(self):
        """Test with_retry decorator - eventual success"""
        
        attempt_count = 0
        
        @with_retry(max_attempts=3, delay=0.1)
        async def flaky_function():
            nonlocal attempt_count
            attempt_count += 1
            if attempt_count < 2:
                raise Exception("Temporary failure")
            return "success"
        
        result = await flaky_function()
        assert result == "success"
        assert attempt_count == 2
    
    @pytest.mark.asyncio
    async def test_with_retry_failure(self):
        """Test with_retry decorator - all attempts fail"""
        
        @with_retry(max_attempts=2, delay=0.1)
        async def always_failing():
            raise Exception("Permanent failure")
        
        with pytest.raises(Exception) as exc_info:
            await always_failing()
        
        assert "Permanent failure" in str(exc_info.value)
    
    @pytest.mark.asyncio
    async def test_with_timeout_success(self):
        """Test with_timeout decorator - completes in time"""
        
        @with_timeout(1.0)
        async def quick_function():
            await asyncio.sleep(0.1)
            return "completed"
        
        result = await quick_function()
        assert result == "completed"
    
    @pytest.mark.asyncio
    async def test_with_timeout_failure(self):
        """Test with_timeout decorator - exceeds timeout"""
        
        @with_timeout(0.1)
        async def slow_function():
            await asyncio.sleep(1.0)
            return "completed"
        
        with pytest.raises(TimeoutException) as exc_info:
            await slow_function()
        
        assert "timed out" in str(exc_info.value)
    
    @pytest.mark.asyncio
    async def test_log_execution(self):
        """Test log_execution decorator"""
        
        @log_execution(include_duration=True, include_result=True)
        async def logged_function(x, y):
            return x + y
        
        result = await logged_function(2, 3)
        assert result == 5


class TestCircuitBreaker:
    """Test circuit breaker pattern"""
    
    @pytest.mark.asyncio
    async def test_circuit_breaker_closed_state(self):
        """Test circuit breaker in CLOSED state"""
        config = CircuitBreakerConfig(failure_threshold=3, timeout=1.0)
        breaker = CircuitBreaker("test_service", config)
        
        # Should allow calls in closed state
        result = await breaker.call_async(lambda: asyncio.sleep(0))
        assert breaker.state == CircuitState.CLOSED
    
    @pytest.mark.asyncio
    async def test_circuit_breaker_opens_after_failures(self):
        """Test circuit breaker opens after threshold failures"""
        config = CircuitBreakerConfig(failure_threshold=3, timeout=1.0)
        breaker = CircuitBreaker("test_service", config)
        
        async def failing_call():
            raise Exception("Service unavailable")
        
        # Trigger failures
        for _ in range(3):
            try:
                await breaker.call_async(failing_call)
            except Exception:
                pass
        
        # Circuit should now be OPEN
        assert breaker.state == CircuitState.OPEN
        
        # Next call should raise CircuitBreakerOpenException
        with pytest.raises(CircuitBreakerOpenException):
            await breaker.call_async(lambda: asyncio.sleep(0))
    
    @pytest.mark.asyncio
    async def test_circuit_breaker_half_open_transition(self):
        """Test circuit breaker transitions to HALF_OPEN after timeout"""
        config = CircuitBreakerConfig(failure_threshold=2, timeout=0.2)
        breaker = CircuitBreaker("test_service", config)
        
        # Trigger failures to open circuit
        for _ in range(2):
            try:
                await breaker.call_async(lambda: 1/0)
            except:
                pass
        
        assert breaker.state == CircuitState.OPEN
        
        # Wait for timeout
        await asyncio.sleep(0.3)
        
        # Should transition to HALF_OPEN
        assert breaker.state == CircuitState.HALF_OPEN


class TestErrorTracker:
    """Test error tracking system"""
    
    def test_error_tracker_track_error(self):
        """Test tracking an error"""
        tracker = ErrorTracker(log_dir="./test_logs")
        
        error = DeviceConnectionException(
            "Connection failed",
            device_id="test-device"
        )
        
        error_id = tracker.track_error(error)
        
        assert error_id is not None
        assert error_id.startswith("DEVICE_CONNECTION_ERROR")
        
        # Verify tracking
        summary = tracker.get_error_summary()
        assert summary["total_errors"] >= 1
    
    def test_error_tracker_get_critical_errors(self):
        """Test getting critical errors"""
        tracker = ErrorTracker(log_dir="./test_logs")
        
        # Track a critical error
        error = DeviceConnectionException(
            "Critical failure",
            device_id="device1"
        )
        tracker.track_error(error)
        
        critical = tracker.get_critical_errors(limit=5)
        assert len(critical) >= 1


class TestDeadLetterQueue:
    """Test Dead Letter Queue"""
    
    def test_dlq_add_operation(self):
        """Test adding failed operation to DLQ"""
        dlq = DeadLetterQueue(storage_dir="./test_logs/dlq")
        
        error = TaskExecutionException("Task failed", task_id="task1")
        
        operation_id = dlq.add(
            operation_name="test_task",
            error=error,
            recovery_strategy=RecoveryStrategy.RETRY
        )
        
        assert operation_id is not None
        
        # Verify operation was added
        operation = dlq.get(operation_id)
        assert operation is not None
        assert operation.operation_name == "test_task"
    
    def test_dlq_get_pending_operations(self):
        """Test getting pending operations"""
        dlq = DeadLetterQueue(storage_dir="./test_logs/dlq")
        
        error = TaskExecutionException("Task failed", task_id="task1")
        operation_id = dlq.add("test_task", error)
        
        pending = dlq.get_pending_operations()
        assert len(pending) >= 1
        
        # Mark as resolved
        dlq.mark_resolved(operation_id)
        
        pending_after = dlq.get_pending_operations()
        assert len(pending_after) == len(pending) - 1
    
    def test_dlq_stats(self):
        """Test DLQ statistics"""
        dlq = DeadLetterQueue(storage_dir="./test_logs/dlq")
        
        error = TaskExecutionException("Task failed", task_id="task1")
        dlq.add("test_task", error, recovery_strategy=RecoveryStrategy.RETRY)
        
        stats = dlq.get_stats()
        assert "total_operations" in stats
        assert "pending_operations" in stats
        assert "by_strategy" in stats
        assert stats["by_strategy"]["retry"] >= 1


# Run tests
if __name__ == "__main__":
    pytest.main([__file__, "-v", "--tb=short"])

