"use client"

import { useEffect } from "react"

import { useState } from "react"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  CreditCard,
  User,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  DollarSign,
  Activity,
  UserCheck,
  AlertCircle,
} from "lucide-react"

interface DashboardStats {
  totalUsers: number
  activeUsers: number
  pendingPayments: number
  totalRevenue: number
  todaySignups: number
  approvedPayments: number
  rejectedPayments: number
  totalWithdrawals: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    activeUsers: 0,
    pendingPayments: 0,
    totalRevenue: 0,
    todaySignups: 0,
    approvedPayments: 0,
    rejectedPayments: 0,
    totalWithdrawals: 0,
  })

  const [recentActivity, setRecentActivity] = useState<any[]>([])

  useEffect(() => {
    // Load stats from localStorage (in real app, fetch from API)
    const payments = JSON.parse(localStorage.getItem("manual-payments") || "[]")
    const users = JSON.parse(localStorage.getItem("everett-users") || "[]")

    const pendingPayments = payments.filter((p: any) => p.status === "pending").length
    const approvedPayments = payments.filter((p: any) => p.status === "approved").length
    const rejectedPayments = payments.filter((p: any) => p.status === "rejected").length
    const totalRevenue = payments
      .filter((p: any) => p.status === "approved")
      .reduce((sum: number, p: any) => sum + p.amount, 0)

    setStats({
      totalUsers: users.length + 1247, // Add some demo data
      activeUsers: Math.floor((users.length + 1247) * 0.7),
      pendingPayments,
      totalRevenue,
      todaySignups: Math.floor(Math.random() * 20) + 5,
      approvedPayments,
      rejectedPayments,
      totalWithdrawals: Math.floor(totalRevenue * 0.3),
    })

    // Generate recent activity
    const activities = [
      { type: "payment", message: "New payment submission from John Doe", time: "2 minutes ago", status: "pending" },
      { type: "user", message: "New user registration: jane@example.com", time: "15 minutes ago", status: "success" },
      { type: "payment", message: "Payment approved for Bronze package", time: "1 hour ago", status: "success" },
      { type: "withdrawal", message: "Withdrawal request: KES 2,500", time: "2 hours ago", status: "pending" },
      { type: "payment", message: "Payment rejected - Invalid M-Pesa code", time: "3 hours ago", status: "error" },
    ]
    setRecentActivity(activities)
  }, [])

  const quickActions = [
    { title: "Manual Payments", href: "/admin/manual-payments", icon: CreditCard, count: stats.pendingPayments },
    { title: "User Management", href: "/admin/users", icon: User, count: stats.totalUsers },
    { title: "Withdrawal Requests", href: "/admin/withdrawals", icon: DollarSign, count: 12 },
    { title: "System Settings", href: "/admin/settings", icon: Activity, count: 0 },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-900 via-yellow-800 to-amber-900">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-yellow-400 mb-2">Admin Dashboard</h1>
          <p className="text-yellow-300">Welcome back! Here's what's happening with Everett today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-yellow-900/20 border-yellow-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-300 text-sm font-medium">Total Users</p>
                  <p className="text-2xl font-bold text-yellow-400">{stats.totalUsers.toLocaleString()}</p>
                </div>
                <User className="w-8 h-8 text-yellow-500" />
              </div>
              <div className="flex items-center mt-2">
                <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
                <span className="text-green-400 text-sm">+{stats.todaySignups} today</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-yellow-900/20 border-yellow-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-300 text-sm font-medium">Active Users</p>
                  <p className="text-2xl font-bold text-yellow-400">{stats.activeUsers.toLocaleString()}</p>
                </div>
                <UserCheck className="w-8 h-8 text-green-500" />
              </div>
              <div className="flex items-center mt-2">
                <span className="text-yellow-300 text-sm">
                  {Math.round((stats.activeUsers / stats.totalUsers) * 100)}% of total
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-yellow-900/20 border-yellow-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-300 text-sm font-medium">Total Revenue</p>
                  <p className="text-2xl font-bold text-yellow-400">KES {stats.totalRevenue.toLocaleString()}</p>
                </div>
                <DollarSign className="w-8 h-8 text-green-500" />
              </div>
              <div className="flex items-center mt-2">
                <span className="text-yellow-300 text-sm">{stats.approvedPayments} approved payments</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-yellow-900/20 border-yellow-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-300 text-sm font-medium">Pending Payments</p>
                  <p className="text-2xl font-bold text-yellow-400">{stats.pendingPayments}</p>
                </div>
                <Clock className="w-8 h-8 text-yellow-500" />
              </div>
              <div className="flex items-center mt-2">
                {stats.pendingPayments > 0 ? (
                  <Badge variant="secondary" className="bg-yellow-600 text-white">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    Needs Attention
                  </Badge>
                ) : (
                  <span className="text-green-400 text-sm">All caught up!</span>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Quick Actions */}
          <Card className="bg-yellow-900/20 border-yellow-700">
            <CardHeader>
              <CardTitle className="text-yellow-400">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {quickActions.map((action, index) => (
                  <Link key={index} href={action.href}>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-yellow-800/20 hover:bg-yellow-800/30 transition-colors cursor-pointer">
                      <div className="flex items-center gap-3">
                        <action.icon className="w-5 h-5 text-yellow-400" />
                        <span className="text-yellow-300">{action.title}</span>
                      </div>
                      {action.count > 0 && (
                        <Badge variant="secondary" className="bg-yellow-600 text-white">
                          {action.count}
                        </Badge>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="bg-yellow-900/20 border-yellow-700">
            <CardHeader>
              <CardTitle className="text-yellow-400">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div
                      className={`w-2 h-2 rounded-full mt-2 ${
                        activity.status === "success"
                          ? "bg-green-400"
                          : activity.status === "pending"
                            ? "bg-yellow-400"
                            : "bg-red-400"
                      }`}
                    />
                    <div className="flex-1">
                      <p className="text-yellow-300 text-sm">{activity.message}</p>
                      <p className="text-yellow-500 text-xs">{activity.time}</p>
                    </div>
                    {activity.status === "pending" && (
                      <Badge variant="secondary" className="bg-yellow-600 text-white text-xs">
                        Pending
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Payment Status Overview */}
        <Card className="mt-8 bg-yellow-900/20 border-yellow-700">
          <CardHeader>
            <CardTitle className="text-yellow-400">Payment Status Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-yellow-600/20 rounded-full mx-auto mb-2">
                  <Clock className="w-6 h-6 text-yellow-400" />
                </div>
                <div className="text-2xl font-bold text-yellow-400">{stats.pendingPayments}</div>
                <div className="text-yellow-300 text-sm">Pending Approval</div>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-green-600/20 rounded-full mx-auto mb-2">
                  <CheckCircle className="w-6 h-6 text-green-400" />
                </div>
                <div className="text-2xl font-bold text-green-400">{stats.approvedPayments}</div>
                <div className="text-yellow-300 text-sm">Approved</div>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-red-600/20 rounded-full mx-auto mb-2">
                  <XCircle className="w-6 h-6 text-red-400" />
                </div>
                <div className="text-2xl font-bold text-red-400">{stats.rejectedPayments}</div>
                <div className="text-yellow-300 text-sm">Rejected</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
