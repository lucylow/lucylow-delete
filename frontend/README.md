# AutoRL Demo — Production UI/UX Frontend

A polished, production-ready React dashboard for the AutoRL demo with deep navy + cyan aesthetic, animated visualizations, and comprehensive accessibility features.

## 🚀 Quick Start

```bash
cd frontend
npm install
npm start
```

The app will open at `http://localhost:3000`

## ✨ Features

- **Polished Visual Design**: Deep navy + cyan AutoRL aesthetic with glass-morphism effects
- **Responsive Layouts**: Works seamlessly on desktop, tablet, and mobile
- **Animated Visualizations**: SVG-based brain visualization with framer-motion animations
- **Mock API Layer**: Client-side mock API for demo without backend dependency
- **Accessibility**: ARIA roles, keyboard navigation, semantic HTML
- **Component Architecture**: Clean, modular components ready for production

## 📁 Project Structure

```
frontend/
├─ package.json          # Dependencies and scripts
├─ public/
│  └─ index.html        # HTML entry point
├─ src/
│  ├─ index.js          # React root
│  ├─ App.jsx           # Main app component
│  ├─ theme.js          # MUI theme configuration
│  ├─ styles.css        # Global styles
│  ├─ mock/
│  │  └─ mockApi.js     # Client-side mock API
│  ├─ utils/
│  │  └─ format.js      # Formatting utilities
│  └─ components/
│     ├─ TopBar.jsx          # Top navigation bar
│     ├─ SideNav.jsx         # Side navigation
│     ├─ Dashboard.jsx       # Main dashboard orchestrator
│     ├─ DevicePane.jsx      # Device iframe viewer
│     ├─ BrainViz.jsx        # Animated brain visualization
│     ├─ ThoughtBubbles.jsx  # Floating event bubbles
│     ├─ AgentLog.jsx        # Scrollable event log
│     ├─ PerfChart.jsx       # Performance charts
│     ├─ TaskBuilder.jsx     # Interactive task builder
│     └─ VoiceControl.jsx    # Voice command interface
```

## 🎨 Key Components

### Dashboard
The main orchestrator that integrates all components and manages state.

### BrainViz
SVG-based animated "brain" representing the AutoRL cognitive core with pulsing animations.

### ThoughtBubbles
Floating animated bubbles showing the last 4 events in real-time.

### AgentLog
Scrollable log displaying detailed event information with semantic color coding.

### TaskBuilder
Interactive chip-based task builder for creating custom agent tasks.

### VoiceControl
Accessibility-focused voice command interface (currently simulated).

## 🔌 Backend Integration

The app currently uses a mock API (`src/mock/mockApi.js`) for demo purposes. To connect to a real backend:

1. Set environment variable:
   ```bash
   REACT_APP_API_URL=http://your-backend:5000
   ```

2. Replace `MockApi` calls in `Dashboard.jsx` with real API endpoints or WebSocket connections.

## 🛠️ Development

### Available Scripts

- `npm start` - Start development server (PORT 3000)
- `npm run build` - Create production build
- `npm run lint` - Run linter (currently a placeholder)

### Dependencies

- **React 18.2.0** - UI library
- **Material-UI 5.14.0** - Component library
- **framer-motion 7.6.14** - Animation library
- **recharts 2.8.0** - Charting library
- **react-scripts 5.0.1** - Build tooling

## 🎯 Next Steps

### Backend Integration
- Wire WebSocket for real-time event streaming
- Connect to FastAPI backend for device control
- Integrate with Appium for actual mobile automation

### Enhanced Features
- Add 3D brain visualization with react-three-fiber
- Implement RL Q-table visualization
- Add task history and replay functionality
- Enhanced error recovery visualization

## 📱 Demo Features

### Mock Task Execution
Click "Start Demo Task" to see a simulated task execution with:
- Perception phase (screenshot + OCR)
- Planning phase (LLM action sequence)
- Execution with progress tracking
- Random error injection & recovery (45% chance)
- Success metrics and learning feedback

### Interactive Controls
- **Toggle UI Update**: Switch between device views
- **Task Builder**: Create custom tasks with action chips
- **Voice Control**: Simulated voice command interface (bottom-right FAB)

## 🎨 UI/UX Highlights

- **Visual Hierarchy**: Clear layout with left device pane + right control pane
- **Glass-morphism**: Subtle glass effects on cards for depth
- **Animated Feedback**: Smooth transitions and real-time event visualization
- **Accessibility**: ARIA roles, keyboard navigation, high contrast
- **Responsive**: Graceful degradation on smaller screens

## 📄 License

MIT

---

Built with ❤️ for the AutoRL Hackathon


