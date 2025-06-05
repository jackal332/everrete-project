"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { ScatteredCoins } from "@/components/scattered-coins"
import { useToast } from "@/components/ui/use-toast"
import {
  Users,
  TrendingUp,
  DollarSign,
  Activity,
  Search,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  Shield,
  Lock,
  CreditCard,
  Smartphone,
  AlertTriangle,
  Settings,
} from "lucide-react"

interface AdminUser {
  id: string
  name: string
  email: string
  phone: string
  registrationDate: string
  isActivated: boolean
  jobTier: number | null
  balance: number
  inviteBalance: number
  tasksCompleted: number
  totalEarned: number
  referralCount: number
  lastActive: string
  status: "active" | "inactive" | "suspended"
  withdrawalHistory: Array<{
    id: string
    amount: number
    method: "mpesa" | "airtel"
    status: "pending" | "approved" | "rejected"
    date: string
  }>
  depositHistory: Array<{
    id: string
    amount: number
    method: "mpesa" | "airtel"
    status: "completed" | "pending"
    date: string
  }>
}

interface AdminStats {
  totalUsers: number
  activeUsers: number
  totalEarnings: number
  totalWithdrawals: number
  pendingWithdrawals: number
  dailySignups: number
  mpesaTransactions: number
  airtelTransactions: number
}

export default function AdminPanel() {
  const router = useRouter()
  const { toast } = useToast()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loginCredentials, setLoginCredentials] = useState({ username: "", password: "" })
  const [users, setUsers] = useState<AdminUser[]>([])
  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 0,
    activeUsers: 0,
    totalEarnings: 0,
    totalWithdrawals: 0,
    pendingWithdrawals: 0,
    dailySignups: 0,
    mpesaTransactions: 0,
    airtelTransactions: 0,
  })
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null)
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    // Check if admin is already authenticated
    const adminToken = localStorage.getItem("admin-dashboard-token")
    if (adminToken === "authenticated") {
      setIsAuthenticated(true)
      generateMockData()
    }
  }, [])

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    // Admin credentials validation
    if (loginCredentials.username === "admin" && loginCredentials.password === "everett2024") {
      localStorage.setItem("admin-dashboard-token", "authenticated")
      setIsAuthenticated(true)
      generateMockData()
      toast({
        title: "Admin Access Granted",
        description: "Welcome to the Everett Admin Panel",
      })
    } else {
      toast({
        title: "Access Denied",
        description: "Invalid admin credentials",
        variant: "destructive",
      })
    }
  }

  const generateMockData = () => {
    const mockUsers: AdminUser[] = Array.from({ length: 50 }, (_, index) => ({
      id: `user-${index + 1}`,
      name: `User ${index + 1}`,
      email: `user${index + 1}@example.com`,
      phone: `+254${Math.floor(Math.random() * 900000000) + 100000000}`,
      registrationDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
      isActivated: Math.random() > 0.3,
      jobTier: Math.random() > 0.3 ? Math.floor(Math.random() * 10) : null,
      balance: Math.floor(Math.random() * 50000),
      inviteBalance: Math.floor(Math.random() * 20000),
      tasksCompleted: Math.floor(Math.random() * 100),
      totalEarned: Math.floor(Math.random() * 100000),
      referralCount: Math.floor(Math.random() * 20),
      lastActive: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
      status: ["active", "inactive", "suspended"][Math.floor(Math.random() * 3)] as "active" | "inactive" | "suspended",
      withdrawalHistory: Array.from({ length: Math.floor(Math.random() * 5) }, (_, i) => ({
        id: `w-${index}-${i}`,
        amount: Math.floor(Math.random() * 10000) + 500,
        method: Math.random() > 0.5 ? "mpesa" : "airtel",
        status: ["pending", "approved", "rejected"][Math.floor(Math.random() * 3)] as
          | "pending"
          | "approved"
          | "rejected",
        date: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
      })),
      depositHistory: Array.from({ length: Math.floor(Math.random() * 8) }, (_, i) => ({
        id: `d-${index}-${i}`,
        amount: Math.floor(Math.random() * 50000) + 1000,
        method: Math.random() > 0.5 ? "mpesa" : "airtel",
        status: Math.random() > 0.2 ? "completed" : "pending",
        date: new Date(Date.now() - Math.random() * 14 * 24 * 60 * 60 * 1000).toISOString(),
      })),
    }))

    setUsers(mockUsers)

    // Calculate stats
    const totalUsers = mockUsers.length
    const activeUsers = mockUsers.filter((u) => u.status === "active").length
    const totalEarnings = mockUsers.reduce((sum, u) => sum + u.totalEarned, 0)
    const totalWithdrawals = mockUsers.reduce(
      (sum, u) =>
        sum + u.withdrawalHistory.filter((w) => w.status === "approved").reduce((wSum, w) => wSum + w.amount, 0),
      0,
    )
    const pendingWithdrawals = mockUsers.reduce(
      (sum, u) =>
        sum + u.withdrawalHistory.filter((w) => w.status === "pending").reduce((wSum, w) => wSum + w.amount, 0),
      0,
    )
    const dailySignups = mockUsers.filter(
      (u) => new Date(u.registrationDate).toDateString() === new Date().toDateString(),
    ).length
    const mpesaTransactions = mockUsers.reduce(
      (sum, u) =>
        sum +
        u.withdrawalHistory.filter((w) => w.method === "mpesa").length +
        u.depositHistory.filter((d) => d.method === "mpesa").length,
      0,
    )
    const airtelTransactions = mockUsers.reduce(
      (sum, u) =>
        sum +
        u.withdrawalHistory.filter((w) => w.method === "airtel").length +
        u.depositHistory.filter((d) => d.method === "airtel").length,
      0,
    )

    setStats({
      totalUsers,
      activeUsers,
      totalEarnings,
      totalWithdrawals,
      pendingWithdrawals,
      dailySignups,
      mpesaTransactions,
      airtelTransactions,
    })
  }

  const approveWithdrawal = (userId: string, withdrawalId: string) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === userId
          ? {
              ...user,
              withdrawalHistory: user.withdrawalHistory.map((w) =>
                w.id === withdrawalId ? { ...w, status: "approved" as const } : w,
              ),
            }
          : user,
      ),
    )
    toast({
      title: "Withdrawal Approved",
      description: "The withdrawal request has been approved successfully.",
    })
  }

  const rejectWithdrawal = (userId: string, withdrawalId: string) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === userId
          ? {
              ...user,
              withdrawalHistory: user.withdrawalHistory.map((w) =>
                w.id === withdrawalId ? { ...w, status: "rejected" as const } : w,
              ),
            }
          : user,
      ),
    )
    toast({
      title: "Withdrawal Rejected",
      description: "The withdrawal request has been rejected.",
    })
  }

  const suspendUser = (userId: string) => {
    setUsers((prev) => prev.map((user) => (user.id === userId ? { ...user, status: "suspended" as const } : user)))
    toast({
      title: "User Suspended",
      description: "The user account has been suspended.",
    })
  }

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === "all" || user.status === filterStatus
    return matchesSearch && matchesFilter
  })

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 relative">
        <ScatteredCoins count={20} />

        <Card className="w-full max-w-md black-section border-yellow-600 relative z-10">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-yellow-400 flex items-center justify-center gap-2">
              <Shield className="w-6 h-6" />
              Admin Panel Access
            </CardTitle>
            <p className="text-yellow-200">Secure Administrator Authentication</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAdminLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-yellow-300">
                  Username
                </Label>
                <Input
                  id="username"
                  type="text"
                  value={loginCredentials.username}
                  onChange={(e) => setLoginCredentials((prev) => ({ ...prev, username: e.target.value }))}
                  placeholder="Enter admin username"
                  required
                  className="bg-black/50 border-yellow-600/50 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-yellow-300">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={loginCredentials.password}
                  onChange={(e) => setLoginCredentials((prev) => ({ ...prev, password: e.target.value }))}
                  placeholder="Enter admin password"
                  required
                  className="bg-black/50 border-yellow-600/50 text-white"
                />
              </div>

              <Button type="submit" className="w-full everett-gradient text-white font-bold">
                Access Admin Panel
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen relative">
      <ScatteredCoins count={30} />

      <div className="p-6 space-y-6 relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-yellow-400">Admin Panel</h1>
            <p className="text-yellow-200">Everett Platform Management</p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              onClick={() => {
                localStorage.removeItem("admin-dashboard-token")
                setIsAuthenticated(false)
              }}
              variant="outline"
              className="border-red-600 text-red-400"
              size="sm"
            >
              <Lock className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-2 overflow-x-auto">
          {[
            { id: "overview", label: "Overview", icon: TrendingUp },
            { id: "users", label: "Users", icon: Users },
            { id: "transactions", label: "Transactions", icon: CreditCard },
            { id: "withdrawals", label: "Withdrawals", icon: DollarSign },
            { id: "security", label: "Security", icon: Shield },
          ].map((tab) => (
            <Button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              variant={activeTab === tab.id ? "default" : "outline"}
              className={
                activeTab === tab.id
                  ? "everett-gradient text-white"
                  : "border-yellow-600 text-yellow-400 hover:bg-yellow-900/20"
              }
              size="sm"
            >
              <tab.icon className="w-4 h-4 mr-2" />
              {tab.label}
            </Button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="black-section border-yellow-600/30">
                <CardContent className="p-4 text-center">
                  <Users className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
                  <p className="text-2xl font-bold text-yellow-300">{stats.totalUsers.toLocaleString()}</p>
                  <p className="text-sm text-yellow-500">Total Users</p>
                </CardContent>
              </Card>

              <Card className="black-section border-green-600/30">
                <CardContent className="p-4 text-center">
                  <Activity className="w-8 h-8 mx-auto mb-2 text-green-400" />
                  <p className="text-2xl font-bold text-green-300">{stats.activeUsers.toLocaleString()}</p>
                  <p className="text-sm text-green-500">Active Users</p>
                </CardContent>
              </Card>

              <Card className="black-section border-blue-600/30">
                <CardContent className="p-4 text-center">
                  <DollarSign className="w-8 h-8 mx-auto mb-2 text-blue-400" />
                  <p className="text-2xl font-bold text-blue-300">{stats.totalEarnings.toLocaleString()}</p>
                  <p className="text-sm text-blue-500">Total Earnings (KES)</p>
                </CardContent>
              </Card>

              <Card className="black-section border-red-600/30">
                <CardContent className="p-4 text-center">
                  <Clock className="w-8 h-8 mx-auto mb-2 text-red-400" />
                  <p className="text-2xl font-bold text-red-300">{stats.pendingWithdrawals.toLocaleString()}</p>
                  <p className="text-sm text-red-500">Pending Withdrawals (KES)</p>
                </CardContent>
              </Card>
            </div>

            {/* M-Pesa & Airtel Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="black-section border-green-600/30">
                <CardHeader>
                  <CardTitle className="text-green-400 flex items-center gap-2">
                    <Smartphone className="w-5 h-5" />
                    M-Pesa Transactions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-green-300">{stats.mpesaTransactions}</p>
                    <p className="text-sm text-green-500">Total M-Pesa Transactions</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="black-section border-red-600/30">
                <CardHeader>
                  <CardTitle className="text-red-400 flex items-center gap-2">
                    <Smartphone className="w-5 h-5" />
                    Airtel Money Transactions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-red-300">{stats.airtelTransactions}</p>
                    <p className="text-sm text-red-500">Total Airtel Transactions</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === "users" && (
          <div className="space-y-6">
            {/* Search and Filters */}
            <Card className="black-section border-yellow-600/30">
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-yellow-500" />
                    <Input
                      placeholder="Search users..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 bg-black/50 border-yellow-600/50 text-white"
                    />
                  </div>
                  <div className="flex gap-2">
                    {["all", "active", "inactive", "suspended"].map((status) => (
                      <Button
                        key={status}
                        onClick={() => setFilterStatus(status)}
                        variant={filterStatus === status ? "default" : "outline"}
                        className={
                          filterStatus === status ? "everett-gradient text-white" : "border-yellow-600 text-yellow-400"
                        }
                        size="sm"
                      >
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Users Table */}
            <Card className="black-section border-yellow-600/30">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-yellow-600/30">
                        <th className="text-left p-4 text-yellow-400">User</th>
                        <th className="text-left p-4 text-yellow-400">Status</th>
                        <th className="text-left p-4 text-yellow-400">Job Tier</th>
                        <th className="text-left p-4 text-yellow-400">Balance</th>
                        <th className="text-left p-4 text-yellow-400">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.slice(0, 10).map((user) => (
                        <tr key={user.id} className="border-b border-yellow-600/20 hover:bg-yellow-900/10">
                          <td className="p-4">
                            <div>
                              <p className="font-semibold text-white">{user.name}</p>
                              <p className="text-sm text-yellow-500">{user.email}</p>
                            </div>
                          </td>
                          <td className="p-4">
                            <Badge
                              className={
                                user.status === "active"
                                  ? "bg-green-500"
                                  : user.status === "inactive"
                                    ? "bg-yellow-500"
                                    : "bg-red-500"
                              }
                            >
                              {user.status}
                            </Badge>
                          </td>
                          <td className="p-4">
                            <span className="text-white">
                              {user.jobTier !== null ? `Job ${user.jobTier}` : "Not Set"}
                            </span>
                          </td>
                          <td className="p-4">
                            <div>
                              <p className="text-green-400 font-semibold">{user.balance.toLocaleString()} KES</p>
                              <p className="text-sm text-yellow-500">
                                Invite: {user.inviteBalance.toLocaleString()} KES
                              </p>
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                onClick={() => setSelectedUser(user)}
                                className="everett-gradient text-white"
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                onClick={() => suspendUser(user.id)}
                                variant="outline"
                                className="border-red-600 text-red-400"
                              >
                                <AlertTriangle className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Withdrawals Tab */}
        {activeTab === "withdrawals" && (
          <div className="space-y-6">
            <Card className="black-section border-yellow-600/30">
              <CardHeader>
                <CardTitle className="text-yellow-400">Pending Withdrawal Requests</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {users
                    .flatMap((user) =>
                      user.withdrawalHistory
                        .filter((w) => w.status === "pending")
                        .map((w) => ({ ...w, userName: user.name, userId: user.id })),
                    )
                    .slice(0, 10)
                    .map((withdrawal) => (
                      <div
                        key={withdrawal.id}
                        className="flex items-center justify-between p-4 bg-yellow-900/20 rounded-lg border border-yellow-600/30"
                      >
                        <div>
                          <p className="font-semibold text-white">{withdrawal.userName}</p>
                          <p className="text-sm text-yellow-500">
                            {withdrawal.amount.toLocaleString()} KES via {withdrawal.method.toUpperCase()}
                          </p>
                          <p className="text-xs text-yellow-600">{new Date(withdrawal.date).toLocaleDateString()}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => approveWithdrawal(withdrawal.userId, withdrawal.id)}
                            className="bg-green-600 text-white hover:bg-green-700"
                          >
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => rejectWithdrawal(withdrawal.userId, withdrawal.id)}
                            variant="outline"
                            className="border-red-600 text-red-400"
                          >
                            <XCircle className="w-4 h-4 mr-1" />
                            Reject
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* User Detail Modal */}
        {selectedUser && (
          <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-4xl black-section border-yellow-600 max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-yellow-400">User Details: {selectedUser.name}</CardTitle>
                  <Button
                    onClick={() => setSelectedUser(null)}
                    variant="outline"
                    size="sm"
                    className="border-yellow-600 text-yellow-400"
                  >
                    Close
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* User Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-yellow-300 mb-3">Basic Information</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-yellow-500">Name:</span>
                        <span className="text-white">{selectedUser.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-yellow-500">Email:</span>
                        <span className="text-white">{selectedUser.email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-yellow-500">Phone:</span>
                        <span className="text-white">{selectedUser.phone}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-yellow-500">Status:</span>
                        <Badge
                          className={
                            selectedUser.status === "active"
                              ? "bg-green-500"
                              : selectedUser.status === "inactive"
                                ? "bg-yellow-500"
                                : "bg-red-500"
                          }
                        >
                          {selectedUser.status}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-yellow-300 mb-3">Account Details</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-yellow-500">Job Tier:</span>
                        <span className="text-white">
                          {selectedUser.jobTier !== null ? `Job ${selectedUser.jobTier}` : "Not Set"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-yellow-500">Tasks Completed:</span>
                        <span className="text-white">{selectedUser.tasksCompleted}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-yellow-500">Referrals:</span>
                        <span className="text-white">{selectedUser.referralCount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-yellow-500">Total Earned:</span>
                        <span className="text-green-400">{selectedUser.totalEarned.toLocaleString()} KES</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Transaction History */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-yellow-300 mb-3">Withdrawal History</h4>
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {selectedUser.withdrawalHistory.map((withdrawal) => (
                        <div key={withdrawal.id} className="p-3 bg-yellow-900/20 rounded border border-yellow-600/30">
                          <div className="flex justify-between items-center">
                            <span className="text-white">{withdrawal.amount.toLocaleString()} KES</span>
                            <Badge
                              className={
                                withdrawal.status === "approved"
                                  ? "bg-green-500"
                                  : withdrawal.status === "pending"
                                    ? "bg-yellow-500"
                                    : "bg-red-500"
                              }
                            >
                              {withdrawal.status}
                            </Badge>
                          </div>
                          <p className="text-xs text-yellow-500">
                            {withdrawal.method.toUpperCase()} • {new Date(withdrawal.date).toLocaleDateString()}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-yellow-300 mb-3">Deposit History</h4>
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {selectedUser.depositHistory.map((deposit) => (
                        <div key={deposit.id} className="p-3 bg-green-900/20 rounded border border-green-600/30">
                          <div className="flex justify-between items-center">
                            <span className="text-white">{deposit.amount.toLocaleString()} KES</span>
                            <Badge className={deposit.status === "completed" ? "bg-green-500" : "bg-yellow-500"}>
                              {deposit.status}
                            </Badge>
                          </div>
                          <p className="text-xs text-green-500">
                            {deposit.method.toUpperCase()} • {new Date(deposit.date).toLocaleDateString()}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Admin Actions */}
                <div>
                  <h4 className="font-semibold text-yellow-300 mb-3">Admin Actions</h4>
                  <div className="flex gap-2">
                    <Button size="sm" className="everett-gradient text-white">
                      <Settings className="w-4 h-4 mr-1" />
                      Edit User
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => suspendUser(selectedUser.id)}
                      variant="outline"
                      className="border-red-600 text-red-400"
                    >
                      <AlertTriangle className="w-4 h-4 mr-1" />
                      Suspend Account
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
