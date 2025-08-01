"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Users,
  CreditCard,
  FileText,
  Database,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  DollarSign,
  UserCheck,
  Calendar,
} from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"

export default function ControlPage() {
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  // Sample dashboard data
  const dashboardStats = {
    totalStudents: 150,
    totalDues: 75000,
    totalPaid: 45000,
    outstanding: 30000,
    recentPayments: 12,
    activeUsers: 8,
  }

  const recentActivities = [
    { id: 1, action: "Payment received", student: "John Doe", amount: 500, time: "2 hours ago" },
    { id: 2, action: "New student added", student: "Alice Johnson", amount: null, time: "4 hours ago" },
    { id: 3, action: "Payment received", student: "Bob Wilson", amount: 300, time: "6 hours ago" },
    { id: 4, action: "Report generated", student: "System", amount: null, time: "1 day ago" },
  ]

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/")
    } else {
      setUser(JSON.parse(userData))
    }
  }, [router])

  if (!user) return null

  return (
    <DashboardLayout user={user}>
      <div className="p-3 sm:p-4 lg:p-6 space-y-4 sm:space-y-6">
        {/* Welcome Section */}
        <div className="bg-orange-brand rounded-xl p-4 sm:p-6 text-white shadow-brand-lg">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div className="min-w-0">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-heading mb-2 truncate">
                Welcome back, {user.username}!
              </h1>
              <p className="text-sm sm:text-base lg:text-lg text-white/90">
                {user.role} Dashboard - HTU COMPSSA Dues Management
              </p>
            </div>
            <div className="bg-white/20 rounded-full p-3 sm:p-4 self-start sm:self-auto">
              <UserCheck className="h-8 sm:h-10 lg:h-12 w-8 sm:w-10 lg:w-12 text-white" />
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          <Card className="bg-white pt-0 shadow-brand border-l-4 border-l-blue-brand">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium text-gray-600">Total Students</CardTitle>
              <Users className="h-4 sm:h-5 w-4 sm:w-5 text-blue-brand" />
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-brand text-heading">
                {dashboardStats.totalStudents}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                <span className="text-green-600">+12%</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white pt-0 shadow-brand border-l-4 border-l-orange-brand">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium text-gray-600">Total Dues</CardTitle>
              <DollarSign className="h-4 sm:h-5 w-4 sm:w-5 text-orange-brand" />
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-orange-brand text-heading">
                ₵{dashboardStats.totalDues.toLocaleString()}
              </div>
              <p className="text-xs text-gray-500 mt-1">Academic year 2023/2024</p>
            </CardContent>
          </Card>

          <Card className="bg-white pt-0 shadow-brand border-l-4 border-l-green-600">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium text-gray-600">Amount Paid</CardTitle>
              <CheckCircle className="h-4 sm:h-5 w-4 sm:w-5 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-green-600 text-heading">
                ₵{dashboardStats.totalPaid.toLocaleString()}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {Math.round((dashboardStats.totalPaid / dashboardStats.totalDues) * 100)}% collection rate
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white pt-0 shadow-brand border-l-4 border-l-red-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium text-gray-600">Outstanding</CardTitle>
              <AlertCircle className="h-4 sm:h-5 w-4 sm:w-5 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-red-500 text-heading">
                ₵{dashboardStats.outstanding.toLocaleString()}
              </div>
              <p className="text-xs text-gray-500 mt-1">Requires attention</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions & Recent Activity */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
          {/* Quick Actions */}
          <Card className="bg-white pt-0 shadow-brand">
            <CardHeader className="bg-yellow-brand">
              <CardTitle className="text-black text-heading flex items-center gap-2 text-sm sm:text-base">
                <TrendingUp className="h-4 sm:h-5 w-4 sm:w-5" />
                Quick Actions
              </CardTitle>
              <CardDescription className="text-black/80 text-xs sm:text-sm">Frequently used functions</CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-3 sm:space-y-4">
              <Button
                onClick={() => router.push("/data")}
                className="w-full bg-blue-brand hover:bg-blue-800 text-white justify-start h-10 sm:h-12 text-sm sm:text-base"
              >
                <Users className="h-4 sm:h-5 w-4 sm:w-5 mr-2 sm:mr-3" />
                Manage Student Data
              </Button>

              <Button
                onClick={() => router.push("/payment")}
                className="w-full bg-orange-brand hover:bg-orange-600 text-white justify-start h-10 sm:h-12 text-sm sm:text-base"
              >
                <CreditCard className="h-4 sm:h-5 w-4 sm:w-5 mr-2 sm:mr-3" />
                Process Payments
              </Button>

              <Button
                onClick={() => router.push("/reports")}
                className="w-full bg-yellow-brand hover:bg-yellow-400 text-black justify-start h-10 sm:h-12 text-sm sm:text-base"
              >
                <FileText className="h-4 sm:h-5 w-4 sm:w-5 mr-2 sm:mr-3" />
                Generate Reports
              </Button>

              {user.role === "Administrator" && (
                <Button
                  onClick={() => router.push("/admin")}
                  className="w-full bg-gray-800 hover:bg-gray-700 text-white justify-start h-10 sm:h-12 text-sm sm:text-base"
                >
                  <Database className="h-4 sm:h-5 w-4 sm:w-5 mr-2 sm:mr-3" />
                  Admin Panel
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="bg-white pt-0 shadow-brand">
            <CardHeader className="bg-blue-brand text-white">
              <CardTitle className="text-white text-heading flex items-center gap-2 text-sm sm:text-base">
                <Calendar className="h-4 sm:h-5 w-4 sm:w-5" />
                Recent Activity
              </CardTitle>
              <CardDescription className="text-white/80 text-xs sm:text-sm">Latest system activities</CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <div className="space-y-3 sm:space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm font-medium text-gray-900 truncate">{activity.action}</p>
                      <p className="text-xs sm:text-sm text-gray-600 truncate">
                        {activity.student}
                        {activity.amount && <span className="ml-2 text-green-600 font-medium">₵{activity.amount}</span>}
                      </p>
                    </div>
                    <div className="text-xs text-gray-500 ml-2 flex-shrink-0">{activity.time}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* System Overview */}
        <Card className="bg-white pt-0 shadow-brand">
          <CardHeader className="bg-gradient-to-r from-orange-brand to-yellow-brand">
            <CardTitle className="text-white text-heading text-sm sm:text-base">System Overview</CardTitle>
            <CardDescription className="text-white/90 text-xs sm:text-sm">
              Current system status and performance metrics
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              <div className="text-center p-3 sm:p-4 bg-blue-50 rounded-lg">
                <div className="text-xl sm:text-2xl font-bold text-blue-brand text-heading mb-2">
                  {Math.round((dashboardStats.totalPaid / dashboardStats.totalDues) * 100)}%
                </div>
                <p className="text-xs sm:text-sm text-gray-600">Payment Collection Rate</p>
              </div>

              <div className="text-center p-3 sm:p-4 bg-orange-50 rounded-lg">
                <div className="text-xl sm:text-2xl font-bold text-orange-brand text-heading mb-2">
                  {dashboardStats.recentPayments}
                </div>
                <p className="text-xs sm:text-sm text-gray-600">Payments This Week</p>
              </div>

              <div className="text-center p-3 sm:p-4 bg-yellow-50 rounded-lg">
                <div className="text-xl sm:text-2xl font-bold text-yellow-600 text-heading mb-2">
                  {dashboardStats.activeUsers}
                </div>
                <p className="text-xs sm:text-sm text-gray-600">Active System Users</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
