import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Progress } from '@/components/ui/progress.jsx'
import { Button } from '@/components/ui/button.jsx'
import { AlertCircle, CheckCircle, Clock, Smartphone, Zap, Activity } from 'lucide-react'
import './App.css'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'

function App() {
  const [systemStatus, setSystemStatus] = useState('active')
  const [devices, setDevices] = useState([])
  const [currentTask, setCurrentTask] = useState(null)
  const [metrics, setMetrics] = useState({
    tasksCompleted: 0,
    successRate: 0,
    avgExecutionTime: 0,
    activeDevices: 0,
    total_tasks_success: 0,
    total_tasks_failure: 0,
    tasks_in_progress: 0
  })

  const fetchData = async () => {
    try {
      const [devicesRes, tasksRes, metricsRes, activityRes, policiesRes] = await Promise.all([
        fetch(`${API_BASE_URL}/devices`),
        fetch(`${API_BASE_URL}/tasks`),
        fetch(`${API_BASE_URL}/metrics`),
        fetch(`${API_BASE_URL}/activity`),
        fetch(`${API_BASE_URL}/policies`)
      ])

      const devicesData = await devicesRes.json()
      const tasksData = await tasksRes.json()
      const metricsData = await metricsRes.json()

      const totalTasks = metricsData.total_tasks_success + metricsData.total_tasks_failure
      const successRate = totalTasks > 0 ? ((metricsData.total_tasks_success / totalTasks) * 100) : 0

      setDevices(devicesData)
      setMetrics({
        tasksCompleted: metricsData.total_tasks_success,
        successRate: successRate,
        avgExecutionTime: 23.4,
        activeDevices: devicesData.length,
        ...metricsData
      })
      setSystemStatus(metricsData.tasks_in_progress > 0 ? 'active' : 'idle')
      
      if (tasksData.length > 0 && tasksData[0].status === 'running') {
        setCurrentTask({
          description: tasksData[0].name,
          currentStep: 1,
          totalSteps: 5,
          currentAction: tasksData[0].name,
          deviceId: tasksData[0].device || 'Unknown',
          activeAgent: 'AutoRL Agent',
          duration: tasksData[0].duration || '0'
        })
      } else {
        setCurrentTask(null)
      }

    } catch (error) {
      console.error('Failed to fetch data:', error)
    }
  }

  useEffect(() => {
    fetchData()
    const interval = setInterval(fetchData, 5000) // Refresh every 5 seconds
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Header with Real-Time Status */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              AutoRL Control Center
            </h1>
            <p className="text-muted-foreground">
              Intelligent Mobile Automation • {new Date().toLocaleString()}
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Badge 
              variant={systemStatus === 'active' ? 'default' : 'destructive'}
              className="px-3 py-1"
            >
              <Activity className="w-4 h-4 mr-1" />
              {systemStatus === 'active' ? 'System Active' : 'System Idle'}
            </Badge>
          </div>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard
          title="Tasks Completed"
          value={metrics.tasksCompleted}
          icon={<CheckCircle className="w-6 h-6 text-primary" />}
          trend="+12%"
        />
        <MetricCard
          title="Success Rate"
          value={`${metrics.successRate.toFixed(1)}%`}
          icon={<Zap className="w-6 h-6 text-primary" />}
          trend="+2.3%"
        />
        <MetricCard
          title="Avg Execution"
          value={`${metrics.avgExecutionTime}s`}
          icon={<Clock className="w-6 h-6 text-primary" />}
          trend="-5.2s"
        />
        <MetricCard
          title="Active Devices"
          value={metrics.activeDevices}
          icon={<Smartphone className="w-6 h-6 text-primary" />}
          trend="stable"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Current Task Execution */}
        <Card className="lg:col-span-2 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="w-5 h-5 mr-2 text-primary" />
              Live Task Execution
            </CardTitle>
          </CardHeader>
          <CardContent>
            {currentTask ? (
              <TaskExecutionView task={currentTask} />
            ) : (
              <EmptyState />
            )}
          </CardContent>
        </Card>

        {/* Device Status Panel */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Smartphone className="w-5 h-5 mr-2 text-primary" />
              Connected Devices
            </CardTitle>
          </CardHeader>
          <CardContent>
            <DeviceStatusPanel devices={devices} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// Reusable Metric Card Component
const MetricCard = ({ title, value, icon, trend }) => (
  <Card className="shadow-md hover:shadow-lg transition-shadow border-primary/20">
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
          <p className="text-2xl font-bold text-foreground">{value}</p>
          <p className="text-xs text-muted-foreground mt-1">{trend}</p>
        </div>
        {icon}
      </div>
    </CardContent>
  </Card>
)

// Task Execution Component with Real-Time Progress
const TaskExecutionView = ({ task }) => (
  <div className="space-y-4">
    <div className="flex items-center justify-between">
      <h3 className="font-semibold text-lg">{task.description}</h3>
      <Badge variant="outline" className="bg-accent">
        Step {task.currentStep}/{task.totalSteps}
      </Badge>
    </div>
    
    <Progress value={(task.currentStep / task.totalSteps) * 100} className="h-2" />
    
    <div className="bg-muted rounded-lg p-4">
      <p className="text-sm text-muted-foreground mb-2">Current Action:</p>
      <p className="font-medium">{task.currentAction}</p>
    </div>
    
    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
      <span>Device: {task.deviceId}</span>
      <span>•</span>
      <span>Agent: {task.activeAgent}</span>
      <span>•</span>
      <span>Duration: {task.duration}s</span>
    </div>
  </div>
)

// Device Status Panel
const DeviceStatusPanel = ({ devices }) => (
  <div className="space-y-3">
    {devices.length === 0 ? (
      <p className="text-muted-foreground text-center py-8">No devices connected</p>
    ) : (
      devices.map((device) => (
        <div key={device.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
          <div>
            <p className="font-medium">{device.id}</p>
            <p className="text-sm text-muted-foreground">{device.platform} • {device.status}</p>
          </div>
          <Badge 
            variant={device.status === 'active' ? 'default' : 'secondary'}
            className="capitalize"
          >
            {device.status}
          </Badge>
        </div>
      ))
    )}
  </div>
)

// Empty State Component
const EmptyState = () => (
  <div className="text-center py-12">
    <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
    <h3 className="font-semibold text-foreground mb-2">No Active Tasks</h3>
    <p className="text-muted-foreground mb-6">Start a new automation task to see live execution</p>
    <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
      Start New Task
    </Button>
  </div>
)

export default App

