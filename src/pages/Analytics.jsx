import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TrendingUp, Activity, Target, Zap } from 'lucide-react'

export default function Analytics() {
  const stats = [
    { label: 'Total Tasks', value: '1,247', change: '+18%', icon: Activity },
    { label: 'Success Rate', value: '94.2%', change: '+2.1%', icon: Target },
    { label: 'Avg Duration', value: '23.4s', change: '-3.2s', icon: Zap },
    { label: 'Active Users', value: '42', change: '+7', icon: TrendingUp }
  ]

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Analytics & Insights</h1>
        <p className="text-muted-foreground">
          Performance metrics and automation insights
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.label}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">{stat.label}</span>
                  <Icon className="w-4 h-4 text-primary" />
                </div>
                <div className="text-2xl font-bold mb-1">{stat.value}</div>
                <div className="text-xs text-green-500">{stat.change}</div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Task Success Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center text-muted-foreground">
              <div className="text-center">
                <TrendingUp className="w-12 h-12 mx-auto mb-4 text-primary" />
                <p>Chart visualization coming soon</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Device Utilization</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center text-muted-foreground">
              <div className="text-center">
                <Activity className="w-12 h-12 mx-auto mb-4 text-primary" />
                <p>Chart visualization coming soon</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
