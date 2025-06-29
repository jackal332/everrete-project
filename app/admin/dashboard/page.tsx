"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import {
  Users,
  DollarSign,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  CreditCard,
  Wallet,
  Activity,
  LogOut,
  UserCheck,
  AlertTriangle,
} from "lucide-react"

interface AdminStats {
  totalUsers: number
  activeUsers: number
  pendingDeposits: number
  pendingWithdrawals: number
  totalDeposits: number
  totalWithdrawals: number
  totalRevenue: number
}

export default function AdminDashboardPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 0,
    activeUsers: 0,
    pendingDeposits: 0,
    pendingWithdrawals: 0,
    totalDeposits: 0,
    totalWithdrawals: 0,
    totalRevenue: 0,
  })
  const [deposits, setDeposits] = useState<any[]>([])
  const [withdrawals, setWithdrawals] = useState<any[]>([])
  const [users, setUsers] = useState<any[]>([])

  useEffect(() => {
    // Check admin authentication
    const adminSession = localStorage.getItem("admin-session")
    if (!adminSession) {
      router.push("/admin/login")
      return
    }

    // Load data from localStorage
    const depositsData = JSON.parse(localStorage.getItem("deposits") || "[]")
    const withdrawalsData = JSON.parse(localStorage.getItem("withdrawals") || "[]")
    const usersData = JSON.parse(localStorage.getItem("everett-users") || "[]")

    setDeposits(depositsData)
    setWithdrawals(withdrawalsData)
    setUsers(usersData)

    // Calculate stats
    const pendingDeposits = depositsData.filter((d: any) => d.status === "pending").length
    const pendingWithdrawals = withdrawalsData.filter((w: any) => w.status === "pending").length
    const totalDeposits = depositsData
      .filter((d: any) => d.status === "approved")
      .reduce((sum: number, d: any) => sum + d.amount, 0)
    const totalWithdrawals = withdrawalsData
      .filter((w: any) => w.status === "approved")
      .reduce((sum: number, w: any) => sum + w.amount, 0)

    setStats({
      totalUsers: usersData.length + 1247, // Add demo data
      activeUsers: Math.floor((usersData.length + 1247) * 0.75),
      pendingDeposits,
      pendingWithdrawals,
      totalDeposits,
      totalWithdrawals,
      totalRevenue: totalDeposits - totalWithdrawals,
    })
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("admin-session")
    toast({
      title: "Logged Out",
      description: "You have been logged out of the admin panel",
    })
    router.push("/admin/login")
  }

  const approveDeposit = (depositId: string) => {
    const updatedDeposits = deposits.map((d) =>
      d.id === depositId ? { ...d, status: "approved", approved_at: new Date().toISOString() } : d,
    )
    setDeposits(updatedDeposits)
    localStorage.setItem("deposits", JSON.stringify(updatedDeposits))

    toast({
      title: "Deposit Approved",
      description: "The deposit has been approved and user balance updated",
    })
  }

  const rejectDeposit = (depositId: string) => {
    const updatedDeposits = deposits.map((d) =>
      d.id === depositId ? { ...d, status: "rejected", rejected_at: new Date().toISOString() } : d,
    )
    setDeposits(updatedDeposits)
    localStorage.setItem("deposits", JSON.stringify(updatedDeposits))

    toast({
      title: "Deposit Rejected",
      description: "The deposit has been rejected",
      variant: "destructive",
    })
  }

  const approveWithdrawal = (withdrawalId: string) => {
    const updatedWithdrawals = withdrawals.map((w) =>
      w.id === withdrawalId ? { ...w, status: "approved", approved_at: new Date().toISOString() } : w,
    )
    setWithdrawals(updatedWithdrawals)
    localStorage.setItem("withdrawals", JSON.stringify(updatedWithdrawals))

    toast({
      title: "Withdrawal Approved",
      description: "The withdrawal has been approved and will be processed",
    })
  }

  const rejectWithdrawal = (withdrawalId: string) => {
    const updatedWithdrawals = withdrawals.map((w) =>
      w.id === withdrawalId ? { ...w, status: "rejected", rejected_at: new Date().toISOString() } : w,
    )
    setWithdrawals(updatedWithdrawals)
    localStorage.setItem("withdrawals", JSON.stringify(updatedWithdrawals))

    toast({
      title: "Withdrawal Rejected",
      description: "The withdrawal has been rejected",
      variant: "destructive",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-900 via-yellow-800 to-amber-900 p-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-yellow-400">Admin Dashboard</h1>
            <p className="text-yellow-200">Everett Platform Management</p>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="border-red-600 text-red-400 hover:bg-red-600/20 bg-transparent"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-black/40 border-blue-600/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-300 text-sm font-medium">Total Users</p>
                  <p className="text-2xl font-bold text-blue-400">{stats.totalUsers.toLocaleString()}</p>
                </div>
                <Users className="w-8 h-8 text-blue-500" />
              </div>
              <div className="flex items-center mt-2">
                <UserCheck className="w-4 h-4 text-green-400 mr-1" />
                <span className="text-green-400 text-sm">{stats.activeUsers} active</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/40 border-green-600/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-300 text-sm font-medium">Total Revenue</p>
                  <p className="text-2xl font-bold text-green-400">KES {stats.totalRevenue.toLocaleString()}</p>
                </div>
                <DollarSign className="w-8 h-8 text-green-500" />
              </div>
              <div className="flex items-center mt-2">
                <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
                <span className="text-green-400 text-sm">Net profit</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/40 border-yellow-600/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-300 text-sm font-medium">Pending Deposits</p>
                  <p className="text-2xl font-bold text-yellow-400">{stats.pendingDeposits}</p>
                </div>
                <Clock className="w-8 h-8 text-yellow-500" />
              </div>
              <div className="flex items-center mt-2">
                {stats.pendingDeposits > 0 ? (
                  <Badge variant="secondary" className="bg-yellow-600 text-white">
                    <AlertTriangle className="w-3 h-3 mr-1" />
                    Needs Review
                  </Badge>
                ) : (
                  <span className="text-green-400 text-sm">All processed</span>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/40 border-red-600/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-red-300 text-sm font-medium">Pending Withdrawals</p>
                  <p className="text-2xl font-bold text-red-400">{stats.pendingWithdrawals}</p>
                </div>
                <Wallet className="w-8 h-8 text-red-500" />
              </div>
              <div className="flex items-center mt-2">
                {stats.pendingWithdrawals > 0 ? (
                  <Badge variant="secondary" className="bg-red-600 text-white">
                    <AlertTriangle className="w-3 h-3 mr-1" />
                    Action Required
                  </Badge>
                ) : (
                  <span className="text-green-400 text-sm">All processed</span>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Pending Deposits */}
          <Card className="bg-black/40 border-yellow-600/30">
            <CardHeader>
              <CardTitle className="text-yellow-400 flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Pending Deposits ({deposits.filter((d) => d.status === "pending").length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {deposits
                  .filter((d) => d.status === "pending")
                  .map((deposit) => (
                    <div key={deposit.id} className="p-4 bg-yellow-900/20 rounded-lg border border-yellow-600/30">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <p className="font-semibold text-yellow-200">KES {deposit.amount.toLocaleString()}</p>
                          <p className="text-sm text-yellow-400">User: {deposit.user_id}</p>
                        </div>
                        <Badge className="bg-yellow-600 text-white">Pending</Badge>
                      </div>
                      <div className="text-sm text-yellow-300 mb-3">
                        <p>
                          Transaction Code: <span className="font-mono">{deposit.ref_code}</span>
                        </p>
                        <p>Date: {new Date(deposit.created_at).toLocaleString()}</p>
                        <p>Method: {deposit.payment_method?.toUpperCase()}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => approveDeposit(deposit.id)}
                          className="bg-green-600 hover:bg-green-700 text-white"
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => rejectDeposit(deposit.id)}
                          className="border-red-600 text-red-400 hover:bg-red-600/20"
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  ))}
                {deposits.filter((d) => d.status === "pending").length === 0 && (
                  <div className="text-center py-8 text-yellow-400">
                    <CreditCard className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p>No pending deposits</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Pending Withdrawals */}
          <Card className="bg-black/40 border-red-600/30">
            <CardHeader>
              <CardTitle className="text-red-400 flex items-center gap-2">
                <Wallet className="h-5 w-5" />
                Pending Withdrawals ({withdrawals.filter((w) => w.status === "pending").length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {withdrawals
                  .filter((w) => w.status === "pending")
                  .map((withdrawal) => (
                    <div key={withdrawal.id} className="p-4 bg-red-900/20 rounded-lg border border-red-600/30">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <p className="font-semibold text-red-200">KES {withdrawal.amount.toLocaleString()}</p>
                          <p className="text-sm text-red-400">User: {withdrawal.user_id}</p>
                        </div>
                        <Badge className="bg-red-600 text-white">Pending</Badge>
                      </div>
                      <div className="text-sm text-red-300 mb-3">
                        <p>Phone: {withdrawal.phone_number}</p>
                        <p>Date: {new Date(withdrawal.created_at).toLocaleString()}</p>
                        <p>Method: {withdrawal.method?.toUpperCase()}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => approveWithdrawal(withdrawal.id)}
                          className="bg-green-600 hover:bg-green-700 text-white"
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => rejectWithdrawal(withdrawal.id)}
                          className="border-red-600 text-red-400 hover:bg-red-600/20"
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  ))}
                {withdrawals.filter((w) => w.status === "pending").length === 0 && (
                  <div className="text-center py-8 text-red-400">
                    <Wallet className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p>No pending withdrawals</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="mt-8 bg-black/40 border-yellow-600/30">
          <CardHeader>
            <CardTitle className="text-yellow-400 flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[...deposits, ...withdrawals]
                .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
                .slice(0, 10)
                .map((item, index) => (
                  <div
                    key={`${item.id}-${index}`}
                    className="flex items-center justify-between p-3 bg-yellow-900/10 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          item.status === "approved"
                            ? "bg-green-400"
                            : item.status === "rejected"
                              ? "bg-red-400"
                              : "bg-yellow-400"
                        }`}
                      />
                      <div>
                        <p className="text-yellow-200 text-sm">
                          {item.ref_code ? "Deposit" : "Withdrawal"} - KES {item.amount.toLocaleString()}
                        </p>
                        <p className="text-yellow-400 text-xs">{new Date(item.created_at).toLocaleString()}</p>
                      </div>
                    </div>
                    <Badge
                      className={`${
                        item.status === "approved"
                          ? "bg-green-600"
                          : item.status === "rejected"
                            ? "bg-red-600"
                            : "bg-yellow-600"
                      } text-white`}
                    >
                      {item.status}
                    </Badge>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
