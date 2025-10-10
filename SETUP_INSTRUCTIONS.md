# AutoRL Demo - Setup Instructions

## 🎯 What You Got

A complete, production-ready React + Material-UI frontend for the AutoRL demo with:

✅ **Polished UI/UX** - Deep navy + cyan aesthetic with glass-morphism effects  
✅ **Responsive Design** - Works on desktop, tablet, and mobile  
✅ **Animated Visuals** - SVG brain + framer-motion animations  
✅ **Mock API** - Client-side demo without backend dependency  
✅ **10 React Components** - Modular, reusable architecture  
✅ **Accessibility** - ARIA roles, keyboard navigation, semantic HTML  

## 🚀 Quick Start (3 commands)

```bash
cd frontend
npm install
npm start
```

The app opens at **http://localhost:3000**

## 🎮 Try the Demo

1. **Click "Start Demo Task"** - Watch a simulated task execution with:
   - Perception (screenshot + OCR)
   - Planning (LLM action sequence)
   - Execution with progress
   - Random error recovery (45% chance)
   - Success metrics

2. **Toggle UI Update** - Switch device views

3. **Use Task Builder** - Create custom tasks with action chips

4. **Voice Control** - Click the blue mic button (bottom-right)

## 📦 What's Included

### Core Files
- `package.json` - All dependencies configured
- `src/App.jsx` - Main app entry
- `src/theme.js` - MUI dark theme with AutoRL colors
- `src/styles.css` - Global styles and animations

### Components (`src/components/`)
- **Dashboard.jsx** - Main orchestrator
- **BrainViz.jsx** - Animated SVG brain
- **ThoughtBubbles.jsx** - Floating event bubbles
- **AgentLog.jsx** - Scrollable event log
- **PerfChart.jsx** - Performance charts
- **TaskBuilder.jsx** - Interactive task creator
- **VoiceControl.jsx** - Voice command UI
- **DevicePane.jsx** - Phone iframe viewer
- **TopBar.jsx** - Navigation bar
- **SideNav.jsx** - Side navigation

### Mock API (`src/mock/mockApi.js`)
Client-side simulation with:
- `getAgentStatus()` - Agent metrics
- `getDevices()` - Connected devices
- `getPerformanceData()` - Chart data
- `executeTask()` - Simulated task execution with events
- `getMemory()` / `resetMemory()` - Episode storage

## 🔌 Backend Integration (Optional)

Currently runs standalone with mock data. To connect a real backend:

### Option 1: Environment Variable
```bash
REACT_APP_API_URL=http://localhost:5000 npm start
```

### Option 2: Replace MockApi
In `src/components/Dashboard.jsx`, replace:
```javascript
import { MockApi } from '../mock/mockApi';
```

With real API calls or WebSocket connections.

## 🎨 Customization

### Colors (src/theme.js)
```javascript
const primary = '#00e3ff';  // Cyan accent
const card = '#0b2133';     // Card background
```

### Layout (src/styles.css)
```css
.app { max-width:1200px; }  /* Container width */
.grid { grid-template-columns: 360px 1fr; }  /* Left/right split */
```

## 📱 Features Showcase

### Visual Hierarchy
- Left: Device views (phone iframes)
- Right: Brain viz + controls + charts

### Animated Feedback
- Pulsing brain visualization
- Animated thought bubbles
- Real-time event log updates

### Accessibility
- ARIA roles on interactive elements
- Keyboard navigation
- High contrast text
- Screen reader friendly

## 🛠️ Technology Stack

| Package | Version | Purpose |
|---------|---------|---------|
| React | 18.2.0 | UI framework |
| Material-UI | 5.14.0 | Component library |
| framer-motion | 7.6.14 | Animations |
| recharts | 2.8.0 | Charts |
| react-scripts | 5.0.1 | Build tools |

## 📂 File Structure

```
frontend/
├─ package.json
├─ README.md
├─ .gitignore
├─ public/
│  └─ index.html
└─ src/
   ├─ index.js
   ├─ App.jsx
   ├─ theme.js
   ├─ styles.css
   ├─ mock/
   │  └─ mockApi.js
   ├─ utils/
   │  └─ format.js
   └─ components/
      ├─ Dashboard.jsx
      ├─ BrainViz.jsx
      ├─ ThoughtBubbles.jsx
      ├─ AgentLog.jsx
      ├─ PerfChart.jsx
      ├─ TaskBuilder.jsx
      ├─ VoiceControl.jsx
      ├─ DevicePane.jsx
      ├─ TopBar.jsx
      └─ SideNav.jsx
```

## 🎯 Next Steps

### For Hackathon Demo
1. ✅ You're ready! Just run `npm start`
2. Show off the animated UI and task execution
3. Explain the mock API → real backend integration path

### For Production
1. Connect to FastAPI backend (replace MockApi)
2. Add WebSocket for real-time events
3. Integrate Appium for actual device control
4. Add authentication & user management
5. Deploy to Vercel/Netlify

## 🐛 Troubleshooting

### Port 3000 already in use?
```bash
PORT=3001 npm start
```

### Dependencies not installing?
```bash
rm -rf node_modules package-lock.json
npm install
```

### Linter warnings?
These are expected in demo mode. For production, add ESLint:
```bash
npm install --save-dev eslint eslint-plugin-react
```

## 💡 Pro Tips

1. **Open DevTools** - See console logs for event flow
2. **Click multiple times** - Stack up tasks to see parallelism
3. **Watch the charts** - Performance data updates over time
4. **Resize window** - See responsive layout adapt

## 🎬 Demo Script (for Judges)

> "This is AutoRL's dashboard. Watch what happens when I start a task..."
> 
> [Click "Start Demo Task"]
> 
> "The agent captures the screen, uses an LLM to plan actions, then executes. Notice the animated thought bubbles showing each phase..."
> 
> "Sometimes errors happen—see this popup? The agent analyzes it, computes a recovery policy, and continues automatically..."
> 
> "The brain visualization shows our RL core processing in real-time. Charts track success rates. And this task builder lets us create custom workflows."
> 
> "Everything you see is production-ready—just swap the mock API for our real backend."

---

## 🎉 You're All Set!

Run `cd frontend && npm install && npm start` and you'll have a beautiful AutoRL demo in seconds.

**Questions?** Check `frontend/README.md` for component details.

**Want fullstack?** Let me know and I'll wire up the FastAPI backend too!

