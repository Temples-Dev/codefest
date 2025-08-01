"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import {
  Database,
  Users,
  Settings,
  Shield,
  Activity,
  HardDrive,
  Clock,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Download,
  Upload,
  Trash2,
  Edit,
  Plus,
  BarChart3,
  Server,
  Key,
  Bell,
  Mail,
} from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"

export default function AdminPage() {
  const [user, setUser] = useState<any>(null)
  const [users, setUsers] = useState<any[]>([])
  const [systemStats, setSystemStats] = useState({
    uptime: "15 days, 4 hours",
    totalRequests: "1,234,567",
    avgResponseTime: "120ms",
    errorRate: "0.02%",
    dbSize: "2.4 MB",
    lastBackup: "2024-01-15 10:30 AM",
    activeConnections: 12,
    memoryUsage: 68,
  })
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/")
    } else {
      const parsedUser = JSON.parse(userData)
      if (parsedUser.role !== "Administrator") {
        router.push("/control")
        return
      }
      setUser(parsedUser)
      // Load sample users
      setUsers([
        {
          id: 1,
          username: "admin",
          firstName: "John",
          surname: "Admin",
          email: "admin@htu.edu.gh",
          role: "Administrator",
          status: "Active",
          lastLogin: "2024-01-15 09:30 AM",
          loginCount: 245,
          createdAt: "2023-09-01",
        },
        {
          id: 2,
          username: "cashier1",
          firstName: "Mary",
          surname: "Johnson",
          email: "mary.johnson@htu.edu.gh",
          role: "Cashier",
          status: "Active",
          lastLogin: "2024-01-14 04:15 PM",
          loginCount: 156,
          createdAt: "2023-10-15",
        },
        {
          id: 3,
          username: "supervisor1",
          firstName: "David",
          surname: "Wilson",
          email: "david.wilson@htu.edu.gh",
          role: "Supervisor",
          status: "Inactive",
          lastLogin: "2024-01-10 02:45 PM",
          loginCount: 89,
          createdAt: "2023-11-01",
        },
      ])
    }
  }, [router])

  const handleDatabaseBackup = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    alert("Database backup created successfully!")
    setIsLoading(false)
  }

  const handleSystemReset = () => {
    if (confirm("Are you sure you want to reset the system? This action cannot be undone.")) {
      alert("System reset completed!")
    }
  }

  const handleUserStatusToggle = (userId: number) => {
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, status: user.status === "Active" ? "Inactive" : "Active" } : user,
      ),
    )
  }

  if (!user) return null

  return (
    <DashboardLayout user={user}>
      <div className="p-3 sm:p-4 lg:p-6 space-y-4 sm:space-y-6">
        {/* Clean Header */}
        <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-orange-brand rounded-lg flex items-center justify-center">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 text-heading">Administrator Panel</h1>
                <p className="text-gray-600">System administration and configuration</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-center px-4 py-2 bg-gray-50 rounded-lg">
                <div className="text-sm font-semibold text-gray-900">{systemStats.uptime}</div>
                <div className="text-xs text-gray-500">System Uptime</div>
              </div>
              <div className="text-center px-4 py-2 bg-gray-50 rounded-lg">
                <div className="text-sm font-semibold text-gray-900">{systemStats.activeConnections}</div>
                <div className="text-xs text-gray-500">Active Users</div>
              </div>
            </div>
          </div>
        </div>

        {/* Minimal System Health Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <Card className="bg-white py-0 shadow-sm border border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">System Status</CardTitle>
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-lg font-semibold text-gray-900">Healthy</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">All systems operational</p>
            </CardContent>
          </Card>

          <Card className="bg-white py-0 shadow-sm border border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Response Time</CardTitle>
              <Clock className="h-4 w-4 text-orange-brand" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{systemStats.avgResponseTime}</div>
              <p className="text-xs text-gray-500 mt-1">Average response time</p>
            </CardContent>
          </Card>

          <Card className="bg-white py-0 shadow-sm border border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Memory Usage</CardTitle>
              <HardDrive className="h-4 w-4 text-yellow-brand" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{systemStats.memoryUsage}%</div>
              <div className="w-full bg-gray-100 rounded-full h-2 mt-2">
                <div
                  className="bg-yellow-brand h-2 rounded-full transition-all duration-300"
                  style={{ width: `${systemStats.memoryUsage}%` }}
                ></div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white py-0 shadow-sm border border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Error Rate</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{systemStats.errorRate}</div>
              <p className="text-xs text-gray-500 mt-1">Last 24 hours</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="database" className="space-y-6">
          <TabsList className="bg-white border border-gray-200 p-1">
            <TabsTrigger
              value="database"
              className="data-[state=active]:bg-orange-brand data-[state=active]:text-white text-gray-600"
            >
              <Database className="h-4 w-4 mr-2" />
              Database
            </TabsTrigger>
            <TabsTrigger
              value="users"
              className="data-[state=active]:bg-orange-brand data-[state=active]:text-white text-gray-600"
            >
              <Users className="h-4 w-4 mr-2" />
              Users
            </TabsTrigger>
            <TabsTrigger
              value="system"
              className="data-[state=active]:bg-orange-brand data-[state=active]:text-white text-gray-600"
            >
              <Settings className="h-4 w-4 mr-2" />
              System
            </TabsTrigger>
            <TabsTrigger
              value="security"
              className="data-[state=active]:bg-orange-brand data-[state=active]:text-white text-gray-600"
            >
              <Shield className="h-4 w-4 mr-2" />
              Security
            </TabsTrigger>
          </TabsList>

          <TabsContent value="database">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <Card className="bg-white py-0 shadow-sm border border-gray-200">
                <CardHeader className="border-b border-gray-100">
                  <CardTitle className="flex items-center gap-2 text-gray-900">
                    <Database className="h-5 w-5 text-orange-brand" />
                    Database Operations
                  </CardTitle>
                  <CardDescription className="text-gray-600">Manage database structure and operations</CardDescription>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Button
                      onClick={handleDatabaseBackup}
                      disabled={isLoading}
                      className="bg-orange-brand hover:bg-orange-600 text-white flex items-center gap-2"
                    >
                      {isLoading ? (
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <Download className="h-4 w-4" />
                      )}
                      Backup Database
                    </Button>
                    <Button variant="outline" className="flex items-center gap-2 border-gray-300 bg-transparent">
                      <Upload className="h-4 w-4" />
                      Restore Backup
                    </Button>
                    <Button variant="outline" className="flex items-center gap-2 border-gray-300 bg-transparent">
                      <BarChart3 className="h-4 w-4" />
                      Optimize Database
                    </Button>
                    <Button variant="destructive" onClick={handleSystemReset} className="flex items-center gap-2">
                      <Trash2 className="h-4 w-4" />
                      Reset System
                    </Button>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4 mt-6">
                    <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                      <Server className="h-4 w-4 text-orange-brand" />
                      Database Health
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Connection Status:</span>
                        <Badge className="bg-green-50 text-green-700 border-green-200">Connected</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Query Performance:</span>
                        <Badge className="bg-blue-50 text-blue-700 border-blue-200">Optimal</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Index Health:</span>
                        <Badge className="bg-green-50 text-green-700 border-green-200">Good</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white py-0 shadow-sm border border-gray-200">
                <CardHeader className="border-b border-gray-100">
                  <CardTitle className="text-gray-900">Database Statistics</CardTitle>
                  <CardDescription className="text-gray-600">Current database information and metrics</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-gray-900">150</div>
                      <div className="text-sm text-gray-600">Total Students</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-gray-900">25</div>
                      <div className="text-sm text-gray-600">System Users</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-gray-900">342</div>
                      <div className="text-sm text-gray-600">Total Payments</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-gray-900">{systemStats.dbSize}</div>
                      <div className="text-sm text-gray-600">Database Size</div>
                    </div>
                  </div>

                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Last Backup:</span>
                      <span className="font-medium text-gray-900">{systemStats.lastBackup}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Backup Status:</span>
                      <Badge className="bg-green-50 text-green-700 border-green-200">Up to date</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Auto Backup:</span>
                      <Badge className="bg-orange-50 text-orange-700 border-orange-200">Enabled</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users">
            <div className="space-y-6">
              <Card className="bg-white py-0 shadow-sm border border-gray-200">
                <CardHeader className="border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2 text-gray-900">
                        <Users className="h-5 w-5 text-orange-brand" />
                        User Management
                      </CardTitle>
                      <CardDescription className="text-gray-600">
                        Manage system users and their permissions
                      </CardDescription>
                    </div>
                    <Button className="bg-orange-brand hover:bg-orange-600 text-white">
                      <Plus className="h-4 w-4 mr-2" />
                      Add User
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-gray-50 border-b border-gray-100">
                          <TableHead className="font-semibold text-gray-900">User Details</TableHead>
                          <TableHead className="font-semibold text-gray-900">Role</TableHead>
                          <TableHead className="font-semibold text-gray-900">Status</TableHead>
                          <TableHead className="font-semibold text-gray-900">Activity</TableHead>
                          <TableHead className="font-semibold text-gray-900">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {users.map((user) => (
                          <TableRow
                            key={user.id}
                            className="hover:bg-gray-50 transition-colors border-b border-gray-100"
                          >
                            <TableCell>
                              <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-orange-brand rounded-full flex items-center justify-center">
                                  <span className="text-white font-medium text-sm">
                                    {user.firstName.charAt(0)}
                                    {user.surname.charAt(0)}
                                  </span>
                                </div>
                                <div>
                                  <div className="font-medium text-gray-900">
                                    {user.firstName} {user.surname}
                                  </div>
                                  <div className="text-sm text-gray-500">@{user.username}</div>
                                  <div className="text-xs text-gray-400">{user.email}</div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge
                                className={
                                  user.role === "Administrator"
                                    ? "bg-red-50 text-red-700 border-red-200"
                                    : user.role === "Supervisor"
                                      ? "bg-blue-50 text-blue-700 border-blue-200"
                                      : user.role === "Cashier"
                                        ? "bg-green-50 text-green-700 border-green-200"
                                        : "bg-gray-50 text-gray-700 border-gray-200"
                                }
                              >
                                {user.role}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                <Switch
                                  checked={user.status === "Active"}
                                  onCheckedChange={() => handleUserStatusToggle(user.id)}
                                />
                                <Badge
                                  className={
                                    user.status === "Active"
                                      ? "bg-green-50 text-green-700 border-green-200"
                                      : "bg-red-50 text-red-700 border-red-200"
                                  }
                                >
                                  {user.status}
                                </Badge>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="text-sm">
                                <div className="text-gray-900">Last: {user.lastLogin}</div>
                                <div className="text-gray-500">{user.loginCount} logins</div>
                                <div className="text-xs text-gray-400">Since {user.createdAt}</div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="h-8 w-8 p-0 border-gray-300 bg-transparent"
                                >
                                  <Edit className="h-3 w-3" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="h-8 w-8 p-0 border-gray-300 text-red-600 hover:text-red-700 hover:border-red-300 bg-transparent"
                                >
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="system">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <Card className="bg-white py-0 shadow-sm border border-gray-200">
                <CardHeader className="border-b border-gray-100">
                  <CardTitle className="flex items-center gap-2 text-gray-900">
                    <Settings className="h-5 w-5 text-orange-brand" />
                    System Configuration
                  </CardTitle>
                  <CardDescription className="text-gray-600">Configure system-wide settings</CardDescription>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="defaultDues" className="text-sm font-medium text-gray-700">
                        Default Dues Amount (₵)
                      </Label>
                      <Input
                        id="defaultDues"
                        type="number"
                        defaultValue="500"
                        className="border-gray-300 focus:border-orange-brand focus:ring-orange-brand/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="academicYear" className="text-sm font-medium text-gray-700">
                        Current Academic Year
                      </Label>
                      <Input
                        id="academicYear"
                        defaultValue="2023/2024"
                        className="border-gray-300 focus:border-orange-brand focus:ring-orange-brand/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="paymentDeadline" className="text-sm font-medium text-gray-700">
                        Payment Deadline
                      </Label>
                      <Input
                        id="paymentDeadline"
                        type="date"
                        defaultValue="2024-03-31"
                        className="border-gray-300 focus:border-orange-brand focus:ring-orange-brand/20"
                      />
                    </div>
                  </div>
                  <Button className="w-full bg-orange-brand hover:bg-orange-600 text-white">
                    <Settings className="h-4 w-4 mr-2" />
                    Save Configuration
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-white py-0 shadow-sm border border-gray-200">
                <CardHeader className="border-b border-gray-100">
                  <CardTitle className="flex items-center gap-2 text-gray-900">
                    <Bell className="h-5 w-5 text-yellow-brand" />
                    Notification Settings
                  </CardTitle>
                  <CardDescription className="text-gray-600">Configure system notifications</CardDescription>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-sm font-medium text-gray-700">Email Notifications</Label>
                        <p className="text-xs text-gray-500">Send email alerts for important events</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-sm font-medium text-gray-700">Payment Reminders</Label>
                        <p className="text-xs text-gray-500">Automatic payment reminder emails</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-sm font-medium text-gray-700">System Alerts</Label>
                        <p className="text-xs text-gray-500">Critical system notifications</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="adminEmail" className="text-sm font-medium text-gray-700">
                        Admin Email
                      </Label>
                      <Input
                        id="adminEmail"
                        type="email"
                        defaultValue="admin@htu.edu.gh"
                        className="border-gray-300 focus:border-yellow-brand focus:ring-yellow-brand/20"
                      />
                    </div>
                  </div>
                  <Button className="w-full bg-yellow-brand hover:bg-yellow-400 text-black">
                    <Mail className="h-4 w-4 mr-2" />
                    Update Notifications
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="security">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <Card className="bg-white py-0 shadow-sm border border-gray-200">
                <CardHeader className="border-b border-gray-100">
                  <CardTitle className="flex items-center gap-2 text-gray-900">
                    <Shield className="h-5 w-5 text-orange-brand" />
                    Security Settings
                  </CardTitle>
                  <CardDescription className="text-gray-600">Manage security and access controls</CardDescription>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="sessionTimeout" className="text-sm font-medium text-gray-700">
                        Session Timeout (minutes)
                      </Label>
                      <Input
                        id="sessionTimeout"
                        type="number"
                        defaultValue="30"
                        className="border-gray-300 focus:border-orange-brand focus:ring-orange-brand/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="passwordPolicy" className="text-sm font-medium text-gray-700">
                        Minimum Password Length
                      </Label>
                      <Input
                        id="passwordPolicy"
                        type="number"
                        defaultValue="8"
                        className="border-gray-300 focus:border-orange-brand focus:ring-orange-brand/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="maxLoginAttempts" className="text-sm font-medium text-gray-700">
                        Max Login Attempts
                      </Label>
                      <Input
                        id="maxLoginAttempts"
                        type="number"
                        defaultValue="3"
                        className="border-gray-300 focus:border-orange-brand focus:ring-orange-brand/20"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-sm font-medium text-gray-700">Two-Factor Authentication</Label>
                        <p className="text-xs text-gray-500">Require 2FA for admin accounts</p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                  <Button className="w-full bg-orange-brand hover:bg-orange-600 text-white">
                    <Key className="h-4 w-4 mr-2" />
                    Update Security Settings
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-white py-0 shadow-sm border border-gray-200">
                <CardHeader className="border-b border-gray-100">
                  <CardTitle className="flex items-center gap-2 text-gray-900">
                    <Activity className="h-5 w-5 text-orange-brand" />
                    Security Logs
                  </CardTitle>
                  <CardDescription className="text-gray-600">Recent security events and activities</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg border border-green-100">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-900">Successful Login</div>
                        <div className="text-xs text-gray-500">admin@htu.edu.gh - 2 hours ago</div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg border border-yellow-100">
                      <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-900">Failed Login Attempt</div>
                        <div className="text-xs text-gray-500">unknown@domain.com - 4 hours ago</div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg border border-blue-100">
                      <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5" />
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-900">Password Changed</div>
                        <div className="text-xs text-gray-500">cashier1@htu.edu.gh - 1 day ago</div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 p-3 bg-red-50 rounded-lg border border-red-100">
                      <XCircle className="h-5 w-5 text-red-500 mt-0.5" />
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-900">Account Locked</div>
                        <div className="text-xs text-gray-500">Multiple failed attempts - 2 days ago</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
