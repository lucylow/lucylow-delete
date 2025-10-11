import { useState, useEffect, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, Clock, Smartphone, Zap, Activity } from 'lucide-react'
import { MetricCard } from '@/components/MetricCard'
import { TaskExecutionView } from '@/components/TaskExecutionView'
import { DeviceStatusPanel } from '@/components/ui/DeviceStatusPanel'
import { EmptyState } from '@/components/EmptyState'
import { DashboardSkeleton } from '@/components/ui/DashboardSkeleton'
import { TaskControlPanel } from '@/components/TaskControlPanel'
import { apiService } from '@/services/api'
import { useWebSocket } from '@/hooks/useWebSocket'

export default function Dashboard() {
  const [systemStatus, setSystemStatus] = useState('active')
  const [devices, setDevices] = useState([])
  const [currentTask, setCurrentTask] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [metrics, setMetrics] = useState({
    tasksCompleted: 0,
    successRate: 0,
    avgExecutionTime: 0,
    activeDevices: 0,
    total_tasks_success: 0,
    total_tasks_failure: 0,
    tasks_in_progress: 0
  })

  const fetchData = useCallback(async () => {
    try {
      setError(null)
      
      // Use API service for all calls
      const [devicesData, tasksData, metricsData] = await Promise.all([
        apiService.getDevices().catch(() => []),
        apiService.getTasks().catch(() => []),
        apiService.getMetrics().catch(() => ({
          total_tasks_success: 0,
          total_tasks_failure: 0,
          tasks_in_progress: 0,
          avg_task_runtime_seconds: 0,
          success_rate: 0
        }))
      ])

      setDevices(devicesData)
      setMetrics({
        tasksCompleted: metricsData.total_tasks_success,
        successRate: metricsData.success_rate,
        avgExecutionTime: metricsData.avg_task_runtime_seconds || 23.4,
        activeDevices: devicesData.length,
        ...metricsData
      })
      setSystemStatus(metricsData.tasks_in_progress > 0 ? 'active' : 'idle')
      
      // Check for running tasks
      const runningTask = tasksData.find(t => t.status === 'running')
      if (runningTask) {
        setCurrentTask({
          description: runningTask.instruction || runningTask.name,
          currentStep: 1,
          totalSteps: 5,
          currentAction: runningTask.instruction || runningTask.name,
          deviceId: runningTask.device_id || 'Unknown',
          activeAgent: 'AutoRL Agent',
          duration: runningTask.duration || '0'
        })
      } else {
        setCurrentTask(null)
      }
    } catch (error) {
      console.error('Failed to fetch data:', error)
      setError('Failed to load dashboard data')
    } finally {
      setLoading(false)
    }
  }, [])

  // Handle WebSocket messages
  const handleWebSocketMessage = useCallback((message) => {
    console.log('📨 Dashboard received WebSocket message:', message)
    
    // Update current task based on WebSocket events
    if (message.event === 'task_started') {
      setCurrentTask({
        description: message.instruction,
        currentStep: 1,
        totalSteps: 5,
        currentAction: 'Starting task...',
        deviceId: message.device_id || 'auto',
        activeAgent: 'AutoRL Agent',
        duration: '0s'
      })
      setSystemStatus('active')
    } else if (message.event === 'perception') {
      setCurrentTask(prev => prev ? {...prev, currentAction: message.text, currentStep: 1} : null)
    } else if (message.event === 'planning') {
      setCurrentTask(prev => prev ? {...prev, currentAction: message.text, currentStep: 2} : null)
    } else if (message.event === 'execution_start') {
      setCurrentTask(prev => prev ? {...prev, currentAction: message.text, currentStep: 3} : null)
    } else if (message.event === 'error') {
      setCurrentTask(prev => prev ? {...prev, currentAction: `⚠️ ${message.text}`, currentStep: 4} : null)
    } else if (message.event === 'recovery_execute') {
      setCurrentTask(prev => prev ? {...prev, currentAction: message.text, currentStep: 4} : null)
    } else if (message.event === 'completed') {
      setCurrentTask(prev => prev ? {...prev, currentAction: '✅ Completed', currentStep: 5} : null)
      // Refresh data after completion
      setTimeout(() => {
        fetchData()
        setCurrentTask(null)
        setSystemStatus('idle')
      }, 2000)
    } else if (message.event === 'task_failed') {
      setCurrentTask(null)
      setSystemStatus('idle')
      fetchData()
    }
  }, [fetchData])

  // WebSocket connection
  const { isConnected } = useWebSocket(handleWebSocketMessage)

  useEffect(() => {
    fetchData()
    const interval = setInterval(fetchData, 10000) // Poll less frequently with WebSocket
    return () => clearInterval(interval)
  }, [fetchData])

  if (loading) return <DashboardSkeleton />
  if (error) return <div className="p-6 text-center text-destructive">{error}</div>

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">AutoRL Control Center</h1>
            <p className="text-muted-foreground">
              Intelligent Mobile Automation • {new Date().toLocaleString()}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant={isConnected ? 'outline' : 'secondary'} className="text-xs">
              <span className={`w-2 h-2 rounded-full mr-1 ${isConnected ? 'bg-green-500' : 'bg-gray-400'}`}></span>
              {isConnected ? 'WebSocket Connected' : 'WebSocket Disconnected'}
            </Badge>
            <Badge variant={systemStatus === 'active' ? 'default' : 'destructive'}>
              <Activity className="w-4 h-4 mr-1" />
              {systemStatus === 'active' ? 'System Active' : 'System Idle'}
            </Badge>
          </div>
        </div>
      </div>

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

      <div className="mb-6">
        <TaskControlPanel devices={devices} onTaskCreated={fetchData} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="w-5 h-5 mr-2 text-primary" />
              Live Task Execution
            </CardTitle>
          </CardHeader>
          <CardContent>
            {currentTask ? <TaskExecutionView task={currentTask} /> : <EmptyState />}
          </CardContent>
        </Card>

        <Card>
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
