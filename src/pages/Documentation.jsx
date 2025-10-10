import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BookOpen, Code, Zap, Shield } from 'lucide-react'

export default function Documentation() {
  const sections = [
    {
      title: 'Getting Started',
      icon: Zap,
      items: [
        'Installation & Setup',
        'Connecting Devices',
        'Creating Your First Task',
        'Understanding the Dashboard'
      ]
    },
    {
      title: 'API Reference',
      icon: Code,
      items: [
        'POST /api/v1/execute - Execute automation task',
        'GET /api/v1/devices - List connected devices',
        'GET /api/v1/tasks/{id} - Get task status',
        'POST /api/v1/train - Start RL training'
      ]
    },
    {
      title: 'Best Practices',
      icon: BookOpen,
      items: [
        'Writing Effective Task Descriptions',
        'Device Management Tips',
        'Optimizing Task Performance',
        'Debugging Failed Tasks'
      ]
    },
    {
      title: 'Security',
      icon: Shield,
      items: [
        'PII Data Masking',
        'Safety Guardrails',
        'Secure API Access',
        'Privacy Guidelines'
      ]
    }
  ]

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Documentation</h1>
        <p className="text-muted-foreground">
          Guides, API reference, and best practices for AutoRL
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sections.map((section) => {
          const Icon = section.icon
          return (
            <Card key={section.title}>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Icon className="w-5 h-5 mr-2 text-primary" />
                  {section.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {section.items.map((item, index) => (
                    <li
                      key={index}
                      className="text-sm hover:text-primary cursor-pointer transition-colors p-2 rounded hover:bg-accent"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Quick Start Example</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
            <code className="text-sm">
{`// Example: Execute a task
const response = await fetch('/api/v1/execute', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    device_id: 'android_pixel_7',
    task_description: 'Open Instagram and like the latest post',
    max_steps: 10
  })
});

const result = await response.json();
console.log(result);`}
            </code>
          </pre>
        </CardContent>
      </Card>
    </div>
  )
}
