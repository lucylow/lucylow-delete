# AutoRL Consolidation Plan

## Problem Identified

### Multiple Backend Servers Found:
1. ✅ `backend_server.py` (root) - New unified backend
2. ❌ `src/api_server.py` - Flask-based API
3. ❌ `autorl_project/api_server.py` - Flask-based API
4. ❌ `src/agent_service/api_server.py` - FastAPI agent service
5. ❌ `api_server.py` (root) - Flask-based API
6. ℹ️  `autorl-demo/backend/app.py` - Demo server (keep for demo)

### Multiple AI Agent Systems:
1. ✅ `src/orchestrator.py` - RobustOrchestrator
2. ❌ `main.py` (root) - Agent execution
3. ❌ `autorl_project/main.py` - Agent execution
4. ❌ `autorl_project/src/orchestration/agent_orchestrator.py` - Multi-agent orchestrator
5. ⚠️  `src/agent_service/` - Complete agent service with valuable features

## Solution: Master Backend + Master Agent System

### Architecture:
```
┌─────────────────────────────────────────┐
│   master_backend.py (Port 5000)         │
│   - REST API Endpoints                   │
│   - WebSocket Manager                    │
│   - Task Queue                           │
└───────────────┬─────────────────────────┘
                │
                ↓
┌─────────────────────────────────────────┐
│   master_agent_system.py                │
│   ┌─────────────────────────────────┐   │
│   │  AgentOrchestrator              │   │
│   │  - Perception Agent             │   │
│   │  - Planning Agent               │   │
│   │  - Execution Agent              │   │
│   │  - Recovery Agent               │   │
│   │  - Reflection Agent             │   │
│   └─────────────────────────────────┘   │
│   ┌─────────────────────────────────┐   │
│   │  Services                       │   │
│   │  - VisualPerception             │   │
│   │  - LLMPlanner                   │   │
│   │  - ActionExecutor               │   │
│   │  - RecoveryManager              │   │
│   └─────────────────────────────────┘   │
│   ┌─────────────────────────────────┐   │
│   │  Managers                       │   │
│   │  - DeviceManager                │   │
│   │  - PolicyManager                │   │
│   │  - PluginRegistry               │   │
│   └─────────────────────────────────┘   │
└─────────────────────────────────────────┘
```

## What Will Be Consolidated:

### From All Backend Servers:
- All REST endpoints
- WebSocket functionality
- Authentication/Authorization
- OMH integration
- Plugin management
- Mock API functionality
- Metrics/monitoring

### From All Agent Systems:
- Multi-agent orchestration with handoff
- Perception, Planning, Execution, Recovery
- LLM integration
- Visual perception
- Action execution
- Error recovery
- Device management
- Policy management

## Implementation Steps:

1. ✅ Create `master_backend.py` - Consolidate all backend functionality
2. ✅ Create `master_agent_system.py` - Unified agent orchestrator
3. ✅ Update `start_autorl.py` - Launch master backend only
4. ✅ Document the consolidation
5. ✅ Test the integrated system

