# Quick Error Handling Reference

## Quick Start - Most Common Use Cases

### 1. Basic Error Handling

```python
from src.error_handling import with_error_handling, DeviceConnectionException

@with_error_handling()
async def my_function():
    if error_condition:
        raise DeviceConnectionException("Connection failed", device_id="device1")
```

### 2. Retry on Failure

```python
from src.error_handling import with_retry

@with_retry(max_attempts=3, delay=2.0, backoff=2.0)
async def unstable_operation():
    # Will automatically retry up to 3 times with exponential backoff
    ...
```

### 3. Validate Inputs

```python
from src.error_handling import validate_string, validate_number

def process_request(device_id: str, timeout: int):
    device_id = validate_string(device_id, "device_id", not_empty=True)
    timeout = validate_number(timeout, "timeout", positive=True, max_value=300)
    ...
```

### 4. Circuit Breaker for External Services

```python
from src.error_handling import circuit_breaker

@circuit_breaker("llm_service")
async def call_api():
    # Automatically blocks requests if service is failing
    response = await external_api.call()
    return response
```

### 5. Add Timeout

```python
from src.error_handling import with_timeout

@with_timeout(30)  # 30 second timeout
async def long_operation():
    ...
```

## Common Exceptions

| Exception | Use Case |
|-----------|----------|
| `DeviceConnectionException` | Device connection failures |
| `AppiumServerException` | Appium server unavailable |
| `TaskExecutionException` | Task execution failures |
| `ElementNotFoundException` | UI element not found |
| `ElementTimeoutException` | Element not found within timeout |
| `TimeoutException` | Operation timeout |
| `LLMServiceException` | LLM API failures |
| `ValidationException` | Input validation errors |
| `AuthenticationException` | Authentication failures |

## Common Patterns

### Pattern 1: Function with Full Error Handling

```python
from src.error_handling import (
    with_error_handling,
    with_retry,
    with_timeout,
    log_execution,
    validate_args,
    validate_string
)

@log_execution(include_duration=True)
@with_timeout(60)
@with_retry(max_attempts=3)
@validate_args(device_id=lambda x: validate_string(x, "device_id", not_empty=True))
@with_error_handling()
async def robust_function(device_id: str):
    """Function with comprehensive error handling"""
    ...
```

### Pattern 2: Error Recovery

```python
from src.error_handling import (
    get_recovery_manager,
    RecoveryStrategy,
    TaskExecutionException
)

recovery_manager = get_recovery_manager()

try:
    await execute_task()
except Exception as e:
    error = TaskExecutionException("Task failed", task_id="task1")
    
    recovered = await recovery_manager.recover(
        operation_name="task_execution",
        error=error,
        strategy=RecoveryStrategy.RETRY
    )
    
    if not recovered:
        raise error
```

### Pattern 3: Track and Monitor Errors

```python
from src.error_handling import get_error_tracker, track_error

# Track error
error_id = track_error(my_exception, additional_context={"user_id": "123"})

# Get statistics
tracker = get_error_tracker()
summary = tracker.get_error_summary()
critical_errors = tracker.get_critical_errors(limit=10)
```

## Validator Quick Reference

```python
from src.error_handling import (
    validate_string,
    validate_number,
    validate_list,
    validate_dict,
    validate_path,
    validate_email,
    validate_url
)

# String validation
validate_string(value, "field_name", 
    not_empty=True,
    min_length=3,
    max_length=50,
    pattern=r'^[a-zA-Z0-9-]+$',
    allowed_values=["option1", "option2"]
)

# Number validation
validate_number(value, "field_name",
    positive=True,
    integer_only=True,
    min_value=1,
    max_value=100
)

# List validation
validate_list(value, "field_name",
    not_empty=True,
    min_length=1,
    max_length=10,
    unique_items=True
)

# Dict validation
validate_dict(value, "field_name",
    required_keys=["key1", "key2"],
    optional_keys=["key3"],
    allow_extra_keys=False
)

# Path validation
validate_path(value, "field_name",
    must_exist=True,
    must_be_file=True,
    create_if_missing=False
)
```

## Setup at Startup

```python
from src.error_handling import setup_error_logging
import logging

# Initialize error logging at application startup
setup_error_logging(
    log_dir="./logs",
    console_level=logging.INFO,
    file_level=logging.DEBUG,
    json_format=False  # Set to True for structured logging
)
```

## Monitor Circuit Breakers

```python
from src.error_handling import get_circuit_breaker_manager

manager = get_circuit_breaker_manager()
stats = manager.get_all_stats()

for service_name, service_stats in stats.items():
    print(f"{service_name}:")
    print(f"  State: {service_stats['state']}")
    print(f"  Success Rate: {service_stats['success_rate']:.1f}%")
    print(f"  Total Calls: {service_stats['total_calls']}")
```

## Check Dead Letter Queue

```python
from src.error_handling import get_dead_letter_queue

dlq = get_dead_letter_queue()
stats = dlq.get_stats()

print(f"Pending Operations: {stats['pending_operations']}")
print(f"Resolved Operations: {stats['resolved_operations']}")
print(f"By Strategy: {stats['by_strategy']}")
```

## Exception Properties

Every `AutoRLBaseException` has:

```python
error = DeviceConnectionException("Connection failed", device_id="device1")

# Properties
error.error_code        # "DEVICE_CONNECTION_ERROR"
error.message          # "Connection failed"
error.category         # ErrorCategory.INFRASTRUCTURE
error.severity         # ErrorSeverity.CRITICAL
error.recoverable      # True/False
error.retry_after      # Seconds before retry (if applicable)
error.context          # ErrorContext with rich information
error.recovery_suggestions  # List of suggestions

# Context properties
error.context.device_id
error.context.task_id
error.context.user_id
error.context.timestamp
error.context.additional_data
```

## Decorator Combinations

Decorators are executed from bottom to top:

```python
@log_execution()          # 5. Log the execution
@circuit_breaker("api")   # 4. Apply circuit breaker
@with_timeout(30)         # 3. Add timeout
@with_retry(max_attempts=3)  # 2. Add retry logic
@with_error_handling()    # 1. Handle errors
async def my_function():
    ...
```

## For More Details

- **Complete Guide**: `ERROR_HANDLING_GUIDE.md`
- **Integration Example**: `src/error_handling/example_integration.py`
- **Summary**: `ERROR_HANDLING_SUMMARY.md`

