import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Brain, PlayCircle } from 'lucide-react'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'

export const TaskControlPanel = ({ devices, onTaskCreated }) => {
  const [taskForm, setTaskForm] = useState({
    description: '',
    deviceId: '',
    priority: 'medium',
    maxSteps: 50
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmitTask = async () => {
    if (!taskForm.description || !taskForm.deviceId) return
    
    setIsSubmitting(true)
    try {
      const response = await fetch(`${API_BASE_URL}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(taskForm)
      })
      
      if (response.ok) {
        setTaskForm({ ...taskForm, description: '' })
        onTaskCreated?.()
      }
    } catch (error) {
      console.error('Failed to create task:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="shadow-lg border-primary/30">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Brain className="w-5 h-5 mr-2 text-primary" />
          Create New Task
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Task Description
          </label>
          <Textarea
            placeholder="Describe what you want the AI agent to do..."
            value={taskForm.description}
            onChange={(e) => setTaskForm({ ...taskForm, description: e.target.value })}
            className="min-h-[80px]"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Target Device
            </label>
            <Select 
              value={taskForm.deviceId} 
              onValueChange={(value) => setTaskForm({ ...taskForm, deviceId: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select device" />
              </SelectTrigger>
              <SelectContent>
                {devices.map((device) => (
                  <SelectItem key={device.id} value={device.id}>
                    {device.id} ({device.platform})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Priority
            </label>
            <Select 
              value={taskForm.priority} 
              onValueChange={(value) => setTaskForm({ ...taskForm, priority: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Max Steps
            </label>
            <Input 
              type="number" 
              value={taskForm.maxSteps}
              onChange={(e) => setTaskForm({ ...taskForm, maxSteps: parseInt(e.target.value) || 50 })}
            />
          </div>
        </div>
        
        <div className="flex justify-end">
          <Button 
            onClick={handleSubmitTask}
            disabled={!taskForm.description || !taskForm.deviceId || isSubmitting}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <PlayCircle className="w-4 h-4 mr-2" />
            {isSubmitting ? 'Starting...' : 'Start Task'}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
