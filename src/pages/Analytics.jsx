import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell
} from 'recharts';
import { 
  TrendingUp, Activity, Target, Zap, Download, 
  RefreshCw, Clock, CheckCircle, XCircle, Smartphone, FileJson
} from 'lucide-react';
import { useAnalytics } from '@/hooks/useAnalytics';

const COLORS = ['#00e676', '#2196f3', '#ff9800', '#e91e63', '#9c27b0', '#00bcd4'];

export default function Analytics() {
  const { 
    data: analyticsData, 
    isLoading, 
    timeRange, 
    updateTimeRange, 
    refresh, 
    exportToCSV,
    exportToJSON 
  } = useAnalytics('7d');

  if (!analyticsData) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-96">
          <RefreshCw className="w-8 h-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  const stats = analyticsData.stats;

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2">Analytics & Insights</h1>
          <p className="text-muted-foreground">
            Comprehensive metrics and performance analytics
          </p>
        </div>
        <div className="flex gap-3">
          <select
            value={timeRange}
            onChange={(e) => updateTimeRange(e.target.value)}
            className="px-4 py-2 border rounded-lg bg-background"
          >
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
          </select>
          <Button onClick={refresh} disabled={isLoading}>
            <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button onClick={exportToCSV} variant="outline">
            <Download className="w-4 h-4 mr-2" />
            CSV
          </Button>
          <Button onClick={exportToJSON} variant="outline">
            <FileJson className="w-4 h-4 mr-2" />
            JSON
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          icon={Activity}
          label="Total Tasks"
          value={stats.totalTasks.toLocaleString()}
          change={`+${stats.tasksChange}%`}
          positive={stats.tasksChange > 0}
        />
        <MetricCard
          icon={Target}
          label="Success Rate"
          value={`${stats.successRate}%`}
          change={`+${stats.successRateChange}%`}
          positive={stats.successRateChange > 0}
        />
        <MetricCard
          icon={Zap}
          label="Avg Duration"
          value={`${stats.avgDuration}s`}
          change={`${stats.durationChange}s`}
          positive={stats.durationChange < 0}
        />
        <MetricCard
          icon={TrendingUp}
          label="Active Devices"
          value={stats.activeDevices}
          change={`+${stats.devicesChange}`}
          positive={stats.devicesChange > 0}
        />
      </div>

      {/* Main Analytics Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="devices">Devices</TabsTrigger>
          <TabsTrigger value="training">RL Training</TabsTrigger>
          <TabsTrigger value="errors">Errors</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Task Success Trends */}
            <Card>
              <CardHeader>
                <CardTitle>Task Execution Trends</CardTitle>
                <CardDescription>Daily task completion statistics</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={analyticsData.taskTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area type="monotone" dataKey="successful" stackId="1" stroke="#00e676" fill="#00e676" />
                    <Area type="monotone" dataKey="failed" stackId="1" stroke="#e91e63" fill="#e91e63" />
                    <Area type="monotone" dataKey="pending" stackId="1" stroke="#ff9800" fill="#ff9800" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Task Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Task Type Distribution</CardTitle>
                <CardDescription>Breakdown by task category</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={analyticsData.taskDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {analyticsData.taskDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Device Utilization */}
          <Card>
            <CardHeader>
              <CardTitle>Device Utilization</CardTitle>
              <CardDescription>Task distribution across devices</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={analyticsData.deviceUtilization}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#2196f3">
                    {analyticsData.deviceUtilization.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.status === 'active' ? '#00e676' : '#757575'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Performance Tab */}
        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Response Time */}
            <Card>
              <CardHeader>
                <CardTitle>Response Time (24h)</CardTitle>
                <CardDescription>Average task response time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={analyticsData.performanceMetrics}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="hour" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="responseTime" stroke="#00e676" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Throughput */}
            <Card>
              <CardHeader>
                <CardTitle>Task Throughput</CardTitle>
                <CardDescription>Tasks processed per hour</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={analyticsData.performanceMetrics}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="hour" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="throughput" stroke="#2196f3" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* CPU Usage */}
          <Card>
            <CardHeader>
              <CardTitle>System Resource Usage</CardTitle>
              <CardDescription>CPU utilization over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={analyticsData.performanceMetrics}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hour" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="cpuUsage" stroke="#ff9800" fill="#ff9800" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Devices Tab */}
        <TabsContent value="devices" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <MetricCard
              icon={Smartphone}
              label="Total Devices"
              value={stats.activeDevices}
              change={`+${stats.devicesChange}`}
              positive={true}
            />
            <MetricCard
              icon={CheckCircle}
              label="Active Devices"
              value={analyticsData.deviceUtilization.filter(d => d.status === 'active').length}
              change=""
              positive={true}
            />
            <MetricCard
              icon={Clock}
              label="Idle Devices"
              value={analyticsData.deviceUtilization.filter(d => d.status === 'idle').length}
              change=""
              positive={false}
            />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Device Performance Comparison</CardTitle>
              <CardDescription>Task completion by device</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={analyticsData.deviceUtilization}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#00e676" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* RL Training Tab */}
        <TabsContent value="training" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Training Rewards */}
            <Card>
              <CardHeader>
                <CardTitle>Training Rewards</CardTitle>
                <CardDescription>RL agent reward progression</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={analyticsData.rlTraining}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="episode" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="reward" stroke="#00e676" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Training Loss */}
            <Card>
              <CardHeader>
                <CardTitle>Training Loss</CardTitle>
                <CardDescription>Model loss over episodes</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={analyticsData.rlTraining}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="episode" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="loss" stroke="#e91e63" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Training Progress</CardTitle>
              <CardDescription>Combined reward and loss metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={analyticsData.rlTraining}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="episode" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="reward" stroke="#00e676" fill="#00e676" fillOpacity={0.6} />
                  <Area type="monotone" dataKey="loss" stroke="#e91e63" fill="#e91e63" fillOpacity={0.6} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Errors Tab */}
        <TabsContent value="errors" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <MetricCard
              icon={XCircle}
              label="Total Errors"
              value={stats.totalErrors}
              change={`${stats.errorsChange}`}
              positive={stats.errorsChange < 0}
            />
            <MetricCard
              icon={Target}
              label="Error Rate"
              value={`${(100 - stats.successRate).toFixed(1)}%`}
              change=""
              positive={false}
            />
            <MetricCard
              icon={Activity}
              label="Avg Recovery Time"
              value="5.2s"
              change="-1.3s"
              positive={true}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Error Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Error Type Distribution</CardTitle>
                <CardDescription>Breakdown of error categories</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={analyticsData.errorAnalysis}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ type, percentage }) => `${type}: ${percentage}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="count"
                    >
                      {analyticsData.errorAnalysis.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Error Count */}
            <Card>
              <CardHeader>
                <CardTitle>Error Frequency</CardTitle>
                <CardDescription>Number of occurrences by type</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={analyticsData.errorAnalysis}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="type" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#e91e63" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// MetricCard Component
function MetricCard({ icon, label, value, change, positive }) {
  const IconComponent = icon;
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">{label}</span>
          <IconComponent className="w-4 h-4 text-primary" />
        </div>
        <div className="text-2xl font-bold mb-1">{value}</div>
        {change && (
          <div className={`text-xs ${positive ? 'text-green-500' : 'text-red-500'}`}>
            {change}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
