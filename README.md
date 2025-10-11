# AutoRL - Intelligent Mobile Automation Platform

An advanced AI-powered mobile automation system that uses Reinforcement Learning and Large Language Models to autonomously execute tasks on mobile devices.

## 🎯 Project Overview

AutoRL is a comprehensive platform that combines:
- **AI Agents**: Perception, Planning, Execution, and Recovery agents working in coordination
- **Reinforcement Learning**: Adaptive policies that learn and improve over time
- **LLM Integration**: Natural language task understanding and action planning
- **Real-time Dashboard**: Modern React frontend for monitoring and control
- **Plugin System**: Extensible architecture for custom functionality
- **Multi-device Support**: Simultaneous automation across Android and iOS devices

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    React Frontend                           │
│  (Dashboard, Tasks, Devices, Analytics, AI Training)        │
└─────────────────┬───────────────────────────────────────────┘
                  │ WebSocket + REST API
┌─────────────────▼───────────────────────────────────────────┐
│                 Backend API Server                          │
│  (Flask/FastAPI - Task Queue, Metrics, Device Management)   │
└─────────────────┬───────────────────────────────────────────┘
                  │
┌─────────────────▼───────────────────────────────────────────┐
│                  AI Orchestrator                            │
│  ┌──────────────┬────────────┬──────────────┬─────────┐    │
│  │  Perception  │  Planning  │  Execution   │ Recovery│    │
│  │    Agent     │   Agent    │    Agent     │  Agent  │    │
│  └──────────────┴────────────┴──────────────┴─────────┘    │
│                         │                                   │
│              ┌──────────┴──────────┐                       │
│              │  Plugin System      │                       │
│              │  (Vision, OMH, etc) │                       │
│              └─────────────────────┘                       │
└─────────────────┬───────────────────────────────────────────┘
                  │ Appium Protocol
┌─────────────────▼───────────────────────────────────────────┐
│            Mobile Devices (Android/iOS)                     │
│     ┌────────────┐  ┌────────────┐  ┌────────────┐        │
│     │  Emulator  │  │ Real Device│  │  Emulator  │        │
│     └────────────┘  └────────────┘  └────────────┘        │
└─────────────────────────────────────────────────────────────┘
```

## 🚀 Features

### Intelligent Automation
- **Natural Language Tasks**: Describe tasks in plain English
- **Visual Perception**: Screenshot analysis and OCR for UI understanding
- **Smart Planning**: LLM-powered action sequence generation
- **Error Recovery**: Automatic detection and recovery from failures
- **Learning System**: Continuous improvement through RL policies

### Real-time Monitoring
- **Live Dashboard**: Monitor task execution in real-time
- **Device Status**: Track all connected devices and their states
- **Performance Metrics**: Success rates, execution times, and trends
- **Activity Logs**: Detailed event tracking and debugging

### Extensibility
- **Plugin Architecture**: Easy integration of custom functionality
- **Policy Management**: Hot-swap RL policies without downtime
- **Shadow Mode**: Test new policies safely alongside production
- **API-First Design**: RESTful and WebSocket APIs for integration

## 📂 Project Structure

```
├── src/
│   ├── components/          # React UI components
│   ├── pages/              # Dashboard pages
│   ├── agent_service/      # AI agent implementations
│   ├── runtime/            # Device and task management
│   ├── llm/                # LLM integration
│   ├── rl/                 # Reinforcement learning
│   ├── perception/         # Visual perception
│   └── api_server.py       # Backend API
├── autorl_project/
│   ├── main.py             # Main orchestrator
│   ├── api_server.py       # Production API server
│   └── autorl-frontend/    # Frontend build
├── plugins/                # Extensible plugin system
├── agents/                 # Agent registry
├── autorl-demo/            # Demo with mock data
└── tests/                  # Test suites
```

## 🛠️ Getting Started

### Prerequisites
- **Node.js** 16+ (for frontend)
- **Python** 3.9+ (for backend)
- **Appium Server** (for device automation)
- **Android SDK** or **Xcode** (for emulators)

### Installation

#### 1. Install Dependencies

**Backend:**
```bash
pip install -r requirements.txt
```

**Frontend:**
```bash
npm install
```

#### 2. Start Services

**Terminal 1 - Backend API Server:**
```bash
python autorl_project/api_server.py
```

**Terminal 2 - Frontend Development Server:**
```bash
npm run dev
```

**Terminal 3 - Appium Server (if using real devices):**
```bash
appium
```

#### 3. Access Dashboard
```
http://localhost:5173
```

### Quick Demo (Mock Mode)

For testing without real devices:

```bash
# Terminal 1 - Demo Backend
cd autorl-demo/backend
python app.py

# Terminal 2 - Frontend (point to demo backend)
npm run dev
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file:

```bash
# Backend
APPIUM_SERVER_URL=http://localhost:4723/wd/hub
DEVICE_MODE=appium  # or 'mock' for demo mode
API_BASE_URL=http://localhost:5000

# Frontend
VITE_API_BASE_URL=http://localhost:5000/api
VITE_WS_URL=ws://localhost:5000/ws

# LLM (optional)
OPENAI_API_KEY=your_key_here
```

### Device Configuration

Edit `autorl_project/main.py` to add your devices:

```python
await device_manager.add_device(Device("emulator-5554", "android", False))
await device_manager.add_device(Device("iPhone 15", "ios", False))
```

## 📊 Key Components

### Frontend (React + Tailwind)
- **Dashboard**: Real-time task monitoring and system metrics
- **Tasks**: Create and manage automation tasks
- **Devices**: Device connection and status management
- **Analytics**: Performance tracking and visualization
- **AI Training**: RL policy management and monitoring

### Backend APIs

#### REST Endpoints
- `GET /api/health` - Health check
- `GET /api/devices` - List all devices
- `GET /api/tasks` - Get task history
- `POST /api/tasks` - Create new task
- `GET /api/metrics` - Get system metrics
- `GET /api/policies` - List RL policies
- `POST /api/policies/promote` - Promote policy to active

#### WebSocket Events
- `perception` - UI analysis updates
- `planning` - Action plan generation
- `execution_start` - Task execution begins
- `error` - Error occurred
- `recovery_*` - Recovery process updates
- `completed` - Task completed
- `memory_saved` - Learning update stored

### AI Agents

#### Perception Agent
- Screenshot capture
- OCR text extraction
- UI element detection
- Screen state analysis

#### Planning Agent
- LLM-powered action planning
- Natural language understanding
- Context-aware sequencing
- Confidence scoring

#### Execution Agent
- Action execution with retries
- Element interaction
- Timing management
- State verification

#### Recovery Agent
- Error detection
- Root cause analysis
- Recovery plan generation
- Fallback strategies

## 🔌 Plugin System

Create custom plugins by extending `BasePlugin`:

```python
from plugins.base_plugin import BasePlugin

class MyPlugin(BasePlugin):
    def initialize(self, config):
        # Setup code
        pass
    
    def process(self, input_data):
        # Plugin logic
        return {"result": "success"}
    
    def shutdown(self):
        # Cleanup code
        pass
```

Place plugins in the `plugins/` directory for automatic discovery.

## 📈 Metrics & Monitoring

### Prometheus Metrics
Available at `http://localhost:8000/metrics`

- `autorl_task_success_total` - Successful task count
- `autorl_task_failure_total` - Failed task count
- `autorl_tasks_in_progress` - Currently running tasks
- `autorl_avg_task_runtime_seconds` - Average execution time

### Activity Logging
- Structured JSON logs in `logs/`
- Sensitive data masking
- Secure audit logs for critical events

## 🧪 Testing

### Run Tests
```bash
# All tests
pytest

# Specific test suite
pytest tests/test_error_handling_basic.py
pytest tests/test_agent_service.py

# With coverage
pytest --cov=src tests/
```

### Mock Integration Testing
```bash
# Start mock server
cd autorl-demo/backend
python app.py

# Run integration tests
pytest tests/test_automation_suite.py
```

## 🚢 Deployment

### Docker

```bash
# Build and run all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Production Setup

1. Configure environment variables
2. Set up Prometheus for monitoring
3. Configure device farm or cloud device provider
4. Enable secure logging and audit trails
5. Set up load balancing for API server

See `DEPLOYMENT_GUIDE.md` for detailed instructions.

## 📚 Documentation

- **Quick Start**: `QUICK_START.md`
- **Error Handling**: `ERROR_HANDLING_GUIDE.md`
- **OMH Integration**: `OMH_INTEGRATION_GUIDE.md`
- **Deployment**: `DEPLOYMENT_GUIDE.md`
- **Production Readiness**: `PRODUCTION_ENHANCEMENTS.md`

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch
3. Write tests for new functionality
4. Ensure all tests pass
5. Submit a pull request

## 📝 Use Cases

- **Mobile App Testing**: Automated regression testing
- **User Flow Validation**: End-to-end journey testing
- **Performance Monitoring**: Real-world performance metrics
- **Accessibility Testing**: Screen reader and interaction testing
- **Data Collection**: User interaction patterns and analytics
- **Competitive Analysis**: Monitor competitor app features

## 🔐 Security

- Sensitive data masking in logs
- Secure credential storage
- API authentication support
- Audit trail for critical operations
- Plugin sandboxing

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

Built with:
- **React** - Frontend framework
- **Tailwind CSS** - Styling
- **Flask/FastAPI** - Backend APIs
- **Appium** - Mobile automation
- **PyTorch** - Reinforcement learning
- **OpenAI** - LLM integration

---

**Built with ❤️ for intelligent mobile automation**

For questions, issues, or feature requests, please open a GitHub issue.
