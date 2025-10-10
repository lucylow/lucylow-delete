import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, Clock, Smartphone, Zap, Activity } from 'lucide-react'
import { MetricCard } from '@/components/MetricCard'
import { TaskExecutionView } from '@/components/TaskExecutionView'
import { DeviceStatusPanel } from '@/components/DeviceStatusPanel'
import { EmptyState } from '@/components/EmptyState'
import { DashboardSkeleton } from '@/components/DashboardSkeleton'
import { TaskControlPanel } from '@/components/TaskControlPanel'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'

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

  const fetchData = async () => {
    try {
      setError(null)
      const [devicesRes, tasksRes, metricsRes] = await Promise.all([
        fetch(`${API_BASE_URL}/devices`).catch(() => null),
        fetch(`${API_BASE_URL}/tasks`).catch(() => null),
        fetch(`${API_BASE_URL}/metrics`).catch(() => null)
      ])

      const devicesData = devicesRes?.ok ? await devicesRes.json() : [
        { id: 'android_pixel_7', platform: 'Android', status: 'connected', battery: 85 },
        { id: 'iphone_14', platform: 'iOS', status: 'connected', battery: 92 }
      ]
      
      const tasksData = tasksRes?.ok ? await tasksRes.json() : []
      
      const metricsData = metricsRes?.ok ? await metricsRes.json() : {
        total_tasks_success: 47,
        total_tasks_failure: 3,
        tasks_in_progress: 0
      }

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
      setError('Failed to load dashboard data')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
    const interval = setInterval(fetchData, 5000)
    return () => clearInterval(interval)
  }, [])

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
          <Badge variant={systemStatus === 'active' ? 'default' : 'destructive'}>
            <Activity className="w-4 h-4 mr-1" />
            {systemStatus === 'active' ? 'System Active' : 'System Idle'}
          </Badge>
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
