# AutoRL Error Handling System - Comprehensive Guide

## Overview

The AutoRL Error Handling System provides enterprise-grade error management with:

- **Custom Exception Hierarchy** - Structured exceptions with rich context
- **Error Tracking & Reporting** - Centralized error tracking with metrics
- **Circuit Breaker Pattern** - Prevent cascading failures
- **Input Validation** - Comprehensive validation utilities
- **Error Recovery** - Sophisticated recovery strategies with Dead Letter Queue
- **Retry Mechanisms** - Exponential backoff and retry decorators
- **Comprehensive Logging** - Structured logging with multiple handlers

## Quick Start

### Basic Error Handling

```python
from src.error_handling import (
    DeviceConnectionException,
    with_error_handling,
    track_error
)

@with_error_handling()
async def connect_to_device(device_id: str):
    """Function with automatic error handling"""
    if not device_id:
        raise DeviceConnectionException(
            f"Cannot connect to device: {device_id}",
            device_id=device_id
        )
    # ... connection logic
```

### Using Retry Decorator

```python
from src.error_handling import with_retry, ElementNotFoundException

@with_retry(max_attempts=3, delay=1.0, backoff=2.0)
async def find_element(locator: str):
    """Automatically retries on failure with exponential backoff"""
    element = await driver.find_element(locator)
    if not element:
        raise ElementNotFoundException(
            f"Element not found: {locator}",
            element_id=locator
        )
    return element
```

### Circuit Breaker for External Services

```python
from src.error_handling import circuit_breaker, CircuitBreakerConfig

# Automatic circuit breaker
@circuit_breaker("llm_service")
async def call_llm_api(prompt: str):
    """Calls are blocked if service is failing"""
    response = await llm_client.generate(prompt)
    return response

# Custom configuration
config = CircuitBreakerConfig(
    failure_threshold=5,  # Open after 5 failures
    success_threshold=2,  # Close after 2 successes
    timeout=60.0  # Try again after 60 seconds
)

@circuit_breaker("external_api", config=config)
async def call_external_api():
    ...
```

### Input Validation

```python
from src.error_handling import (
    validate_string,
    validate_number,
    validate_dict,
    validate_args
)

# Direct validation
device_id = validate_string(
    device_id,
    "device_id",
    not_empty=True,
    pattern=r'^[a-zA-Z0-9-]+$'
)

timeout = validate_number(
    timeout,
    "timeout",
    positive=True,
    min_value=1,
    max_value=300
)

# Decorator-based validation
@validate_args(
    device_id=lambda x: validate_string(x, "device_id", not_empty=True),
    timeout=lambda x: validate_number(x, "timeout", positive=True)
)
async def connect_with_timeout(device_id: str, timeout: int):
    ...
```

### Error Recovery with Dead Letter Queue

```python
from src.error_handling import (
    get_recovery_manager,
    RecoveryStrategy,
    TaskExecutionException
)

recovery_manager = get_recovery_manager()

async def execute_task(task_name: str):
    try:
        # ... task execution
        result = await perform_task()
        return result
    except Exception as e:
        # Convert to AutoRL exception
        error = TaskExecutionException(
            f"Task '{task_name}' failed: {e}",
            task_id=task_name
        )
        
        # Attempt recovery
        recovered = await recovery_manager.recover(
            operation_name=task_name,
            error=error,
            context={"attempt": 1},
            strategy=RecoveryStrategy.RETRY
        )
        
        if not recovered:
            raise error
```

## Exception Hierarchy

### Infrastructure Exceptions
- `InfrastructureException` - Base for infrastructure errors
- `DeviceConnectionException` - Device connection failures
- `AppiumServerException` - Appium server issues
- `ResourceExhaustedException` - System resource exhaustion

### Validation Exceptions
- `ValidationException` - Base for validation errors
- `InvalidInputException` - Invalid input parameters
- `ConfigurationException` - Configuration errors

### Business Logic Exceptions
- `BusinessLogicException` - Base for business logic errors
- `TaskExecutionException` - Task execution failures
- `PlanningException` - Action planning failures
- `PerceptionException` - UI perception failures

### External Service Exceptions
- `ExternalServiceException` - Base for external service errors
- `LLMServiceException` - LLM service failures
- `DatabaseException` - Database operation failures
- `VectorDBException` - Vector database failures

### Timeout Exceptions
- `TimeoutException` - General operation timeout
- `ElementTimeoutException` - UI element not found within timeout

### Security Exceptions
- `SecurityException` - Base for security errors
- `AuthenticationException` - Authentication failures
- `AuthorizationException` - Authorization failures
- `PIIException` - PII data handling errors

### UI Exceptions
- `UIException` - Base for UI interaction errors
- `ElementNotFoundException` - UI element not found
- `ElementInteractionException` - Failed to interact with element
- `StaleElementException` - Element reference is stale

## Error Tracking

```python
from src.error_handling import get_error_tracker, track_error

tracker = get_error_tracker()

# Track an error
error_id = track_error(
    error=my_exception,
    additional_context={"user_id": "123", "device": "emulator-5554"}
)

# Get error summary
summary = tracker.get_error_summary()
print(f"Total errors: {summary['total_errors']}")
print(f"By category: {summary['by_category']}")

# Get error rate
rates = tracker.get_error_rate(time_window_seconds=300)
print(f"Errors per minute: {rates}")

# Get critical errors
critical = tracker.get_critical_errors(limit=5)

# Export errors
tracker.export_errors(
    output_file="error_report.json",
    start_time=start_timestamp,
    end_time=end_timestamp
)
```

## Circuit Breaker Management

```python
from src.error_handling import get_circuit_breaker_manager

manager = get_circuit_breaker_manager()

# Get breaker for a service
breaker = manager.get_breaker("my_service")

# Get all circuit breaker stats
all_stats = manager.get_all_stats()
for service_name, stats in all_stats.items():
    print(f"{service_name}: {stats['state']} - "
          f"Success rate: {stats['success_rate']:.1f}%")

# Reset all circuit breakers
manager.reset_all()
```

## Dead Letter Queue

```python
from src.error_handling import get_dead_letter_queue

dlq = get_dead_letter_queue()

# Get statistics
stats = dlq.get_stats()
print(f"Pending operations: {stats['pending_operations']}")
print(f"By strategy: {stats['by_strategy']}")

# Get pending operations
pending = dlq.get_pending_operations()
for operation in pending:
    print(f"Operation: {operation.operation_name}")
    print(f"  Retries: {operation.retry_count}/{operation.max_retries}")
    print(f"  Strategy: {operation.recovery_strategy.value}")

# Start auto-retry
async def retry_operation(operation):
    # Custom retry logic
    await perform_operation(operation.context)

await dlq.start_auto_retry(retry_operation)
```

## Comprehensive Logging

```python
from src.error_handling import setup_error_logging, get_error_logger
import logging

# Setup error logging
error_logger = setup_error_logging(
    log_dir="./logs",
    console_level=logging.INFO,
    file_level=logging.DEBUG,
    json_format=False
)

# Log errors with context
error_logger.log_error(
    error=my_exception,
    extra_context={"operation": "device_connection", "attempt": 3}
)

# Get underlying logger
logger = error_logger.get_logger()
logger.info("Application started")
```

## Best Practices

### 1. Use Specific Exceptions

```python
# ❌ Bad
raise Exception("Connection failed")

# ✅ Good
raise DeviceConnectionException(
    "Failed to connect to device",
    device_id=device_id,
    context=ErrorContext(
        module=__name__,
        function="connect_device",
        additional_data={"retry_count": 3}
    )
)
```

### 2. Add Context to Errors

```python
from src.error_handling import ErrorContext

context = ErrorContext(
    user_id="user123",
    device_id="emulator-5554",
    task_id="task_456",
    module=__name__,
    function="execute_task",
    additional_data={
        "attempt": 2,
        "previous_error": "timeout"
    }
)

raise TaskExecutionException(
    "Task execution failed",
    task_id="task_456",
    context=context
)
```

### 3. Use Appropriate Recovery Strategies

```python
# Retryable errors
if error.recoverable:
    strategy = RecoveryStrategy.RETRY
else:
    strategy = RecoveryStrategy.ESCALATE

await recovery_manager.recover(
    operation_name="critical_operation",
    error=error,
    strategy=strategy
)
```

### 4. Combine Decorators

```python
from src.error_handling import (
    with_error_handling,
    with_retry,
    with_timeout,
    log_execution,
    circuit_breaker
)

@circuit_breaker("external_service")
@with_retry(max_attempts=3)
@with_timeout(30)
@log_execution(include_duration=True)
@with_error_handling()
async def robust_operation(param: str):
    """Function with comprehensive error handling"""
    ...
```

### 5. Monitor Circuit Breakers

```python
import asyncio
from src.error_handling import get_circuit_breaker_manager

async def monitor_circuit_breakers():
    """Monitor circuit breakers and alert on issues"""
    manager = get_circuit_breaker_manager()
    
    while True:
        await asyncio.sleep(60)  # Check every minute
        
        stats = manager.get_all_stats()
        for service, data in stats.items():
            if data['state'] == 'open':
                logger.critical(
                    f"Circuit breaker OPEN for {service}! "
                    f"Service unavailable."
                )
            elif data['success_rate'] < 80:
                logger.warning(
                    f"Circuit breaker for {service} has low success rate: "
                    f"{data['success_rate']:.1f}%"
                )
```

## Integration with Existing Code

### Update API Server

```python
# src/main.py
from src.error_handling import (
    setup_error_logging,
    with_error_handling,
    circuit_breaker,
    TaskExecutionException
)

# Setup at startup
@app.on_event("startup")
async def startup_event():
    setup_error_logging(log_dir="./logs", json_format=True)
    logger.info("Error handling initialized")

# Use in endpoints
@app.post("/api/v1/execute")
@with_error_handling()
async def execute_task(request: TaskRequest):
    ...
```

### Update Device Manager

```python
# src/device_manager.py
from src.error_handling import (
    DeviceConnectionException,
    with_retry,
    validate_args,
    validate_string
)

class DeviceManager:
    @validate_args(
        device_id=lambda x: validate_string(x, "device_id", not_empty=True)
    )
    @with_retry(max_attempts=3, delay=2.0)
    async def connect(self, device_id: str):
        try:
            # ... connection logic
            ...
        except Exception as e:
            raise DeviceConnectionException(
                f"Failed to connect to device {device_id}",
                device_id=device_id,
                original_exception=e
            )
```

## Advanced Features

### Custom Recovery Handlers

```python
from src.error_handling import (
    get_recovery_manager,
    RecoveryStrategy,
    FailedOperation
)

recovery_manager = get_recovery_manager()

async def custom_rollback_handler(operation: FailedOperation) -> bool:
    """Custom recovery handler for rollback strategy"""
    logger.info(f"Rolling back operation: {operation.operation_name}")
    
    try:
        # Perform rollback
        await rollback_changes(operation.context)
        return True
    except Exception as e:
        logger.error(f"Rollback failed: {e}")
        return False

# Register custom handler
recovery_manager.register_handler(
    RecoveryStrategy.ROLLBACK,
    custom_rollback_handler
)
```

### Custom Validators

```python
from src.error_handling import Validator, InvalidInputException

class JSONValidator(Validator):
    """Validate JSON strings"""
    
    def validate(self, value: Any) -> Dict:
        import json
        
        if not isinstance(value, str):
            self._raise_error(
                f"{self.field_name} must be a JSON string"
            )
        
        try:
            return json.loads(value)
        except json.JSONDecodeError as e:
            self._raise_error(
                f"{self.field_name} is not valid JSON: {e}"
            )

# Use custom validator
json_validator = JSONValidator("config")
config_dict = json_validator.validate(config_string)
```

## Testing

```python
import pytest
from src.error_handling import (
    DeviceConnectionException,
    CircuitBreakerOpenException,
    get_circuit_breaker_manager
)

def test_error_context():
    """Test error contains proper context"""
    error = DeviceConnectionException(
        "Connection failed",
        device_id="test-device"
    )
    
    assert error.error_code == "DEVICE_CONNECTION_ERROR"
    assert error.context.device_id == "test-device"
    assert error.recoverable == True

@pytest.mark.asyncio
async def test_circuit_breaker():
    """Test circuit breaker opens after failures"""
    manager = get_circuit_breaker_manager()
    breaker = manager.get_breaker("test_service")
    
    # Simulate failures
    for _ in range(5):
        try:
            await breaker.call_async(failing_function)
        except:
            pass
    
    # Circuit should be open
    assert breaker.state == CircuitState.OPEN
    
    # Next call should raise CircuitBreakerOpenException
    with pytest.raises(CircuitBreakerOpenException):
        await breaker.call_async(any_function)
```

## Metrics and Monitoring

The error handling system exposes various metrics:

- Total errors by category
- Error rates over time
- Circuit breaker states
- Dead letter queue size
- Recovery success/failure rates

These can be exported to Prometheus or other monitoring systems for visualization and alerting.

## Conclusion

The AutoRL Error Handling System provides robust, production-ready error management. Use it consistently across your application for better reliability, observability, and maintainability.

For more examples, see the `/examples` directory.

