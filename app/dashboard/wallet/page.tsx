"use client"

export const dynamic = "force-dynamic"

import { useState } from "react"
import { useUser } from "@/context/user-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/components/ui/use-toast"
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  Plus,
  Minus,
  History,
  AlertCircle,
  DollarSign,
  CreditCard,
} from "lucide-react"

export default function WalletPage() {
  const { user, loading } = useUser()
  const { toast } = useToast()
  const [transactions] = useState([
    {
      id: "1",
      type: "deposit",
      amount: 1500,
      date: "2024-01-15T10:30:00.000Z",
      status: "completed",
      description: "M-Pesa Deposit",
    },
    {
      id: "2",
      type: "withdrawal",
      amount: 800,
      date: "2024-01-14T14:20:00.000Z",
      status: "completed",
      description: "Withdrawal to M-Pesa",
    },
    {
      id: "3",
      type: "deposit",
      amount: 2000,
      date: "2024-01-13T09:15:00.000Z",
      status: "pending",
      description: "M-Pesa Deposit",
    },
    {
      id: "4",
      type: "earning",
      amount: 270,
      date: "2024-01-12T16:45:00.000Z",
      status: "completed",
      description: "Task Completion Reward",
    },
  ])

  if (loading) {
    return (
      <div className="container mx-auto py-6 px-4 space-y-6">
        <div className="text-center mb-6">
          <Skeleton className="h-8 w-48 mx-auto mb-2" />
          <Skeleton className="h-4 w-64 mx-auto" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-12 w-32 mb-2" />
              <Skeleton className="h-4 w-24" />
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="container mx-auto py-10 px-4">
        <div className="max-w-md mx-auto text-center">
          <AlertCircle className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4 text-yellow-200">Authentication Required</h2>
          <p className="text-yellow-300 mb-6">Please log in to access your wallet.</p>
          <Button
            onClick={() => (window.location.href = "/login")}
            className="w-full bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800"
          >
            Go to Login
          </Button>
        </div>
      </div>
    )
  }

  const handleDeposit = () => {
    window.location.href = "/deposit-manual"
  }

  const handleWithdraw = () => {
    if ((user.balance || 0) < 500) {
      toast({
        title: "Insufficient Balance",
        description: "Minimum withdrawal amount is KES 500",
        variant: "destructive",
      })
      return
    }
    window.location.href = "/withdraw-manual"
  }

  const totalDeposits = transactions
    .filter((t) => t.type === "deposit" && t.status === "completed")
    .reduce((sum, t) => sum + t.amount, 0)

  const totalWithdrawals = transactions
    .filter((t) => t.type === "withdrawal" && t.status === "completed")
    .reduce((sum, t) => sum + t.amount, 0)

  const totalEarnings = transactions
    .filter((t) => t.type === "earning" && t.status === "completed")
    .reduce((sum, t) => sum + t.amount, 0)

  return (
    <div className="container mx-auto py-6 px-4 space-y-6">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-amber-400 bg-clip-text text-transparent">
          My Wallet
        </h1>
        <p className="text-yellow-200 mt-2">Manage your deposits, withdrawals, and earnings</p>
      </div>

      {/* Balance Card */}
      <Card className="bg-gradient-to-r from-yellow-600/20 to-amber-600/20 border-yellow-600/50">
        <CardContent className="p-6 text-center">
          <div className="flex items-center justify-center w-16 h-16 bg-yellow-600/30 rounded-full mx-auto mb-4">
            <Wallet className="h-8 w-8 text-yellow-400" />
          </div>
          <div className="text-4xl font-bold text-yellow-400 mb-2">KES {(user.balance || 0).toLocaleString()}</div>
          <p className="text-yellow-200 mb-6">Available Balance</p>

          <div className="grid grid-cols-2 gap-4">
            <Button
              onClick={handleDeposit}
              className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold"
            >
              <Plus className="h-4 w-4 mr-2" />
              Deposit
            </Button>
            <Button
              onClick={handleWithdraw}
              variant="outline"
              className="border-red-600 text-red-400 hover:bg-red-600/20 font-semibold bg-transparent"
            >
              <Minus className="h-4 w-4 mr-2" />
              Withdraw
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-black/40 border-green-600/30">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-green-600/20 rounded-full mx-auto mb-2">
              <TrendingUp className="h-6 w-6 text-green-400" />
            </div>
            <div className="text-xl font-bold text-green-400">KES {totalDeposits.toLocaleString()}</div>
            <div className="text-sm text-yellow-300">Total Deposits</div>
          </CardContent>
        </Card>

        <Card className="bg-black/40 border-red-600/30">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-red-600/20 rounded-full mx-auto mb-2">
              <TrendingDown className="h-6 w-6 text-red-400" />
            </div>
            <div className="text-xl font-bold text-red-400">KES {totalWithdrawals.toLocaleString()}</div>
            <div className="text-sm text-yellow-300">Total Withdrawals</div>
          </CardContent>
        </Card>

        <Card className="bg-black/40 border-blue-600/30">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-600/20 rounded-full mx-auto mb-2">
              <DollarSign className="h-6 w-6 text-blue-400" />
            </div>
            <div className="text-xl font-bold text-blue-400">KES {totalEarnings.toLocaleString()}</div>
            <div className="text-sm text-yellow-300">Total Earnings</div>
          </CardContent>
        </Card>
      </div>

      {/* Transaction History */}
      <Card className="bg-black/40 border-yellow-600/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-yellow-400">
            <History className="h-5 w-5" />
            Recent Transactions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-4 rounded-lg bg-yellow-900/10 border border-yellow-600/20"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      transaction.type === "deposit"
                        ? "bg-green-600/20"
                        : transaction.type === "withdrawal"
                          ? "bg-red-600/20"
                          : "bg-blue-600/20"
                    }`}
                  >
                    {transaction.type === "deposit" ? (
                      <TrendingUp className="h-5 w-5 text-green-400" />
                    ) : transaction.type === "withdrawal" ? (
                      <TrendingDown className="h-5 w-5 text-red-400" />
                    ) : (
                      <CreditCard className="h-5 w-5 text-blue-400" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-yellow-200">{transaction.description}</p>
                    <p className="text-sm text-yellow-400">
                      {new Date(transaction.date).toLocaleDateString("en-KE", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-bold ${transaction.type === "withdrawal" ? "text-red-400" : "text-green-400"}`}>
                    {transaction.type === "withdrawal" ? "-" : "+"}KES {transaction.amount.toLocaleString()}
                  </p>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      transaction.status === "completed"
                        ? "bg-green-600/20 text-green-400"
                        : "bg-yellow-600/20 text-yellow-400"
                    }`}
                  >
                    {transaction.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-black/40 border-yellow-600/30 hover:border-yellow-400/50 transition-colors cursor-pointer">
          <CardContent className="p-6 text-center">
            <Plus className="h-8 w-8 text-green-400 mx-auto mb-2" />
            <h3 className="font-semibold text-yellow-300 mb-1">Make a Deposit</h3>
            <p className="text-sm text-yellow-400 mb-3">Add funds to your wallet via M-Pesa</p>
            <Button
              onClick={handleDeposit}
              className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
            >
              Deposit Now
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-black/40 border-yellow-600/30 hover:border-yellow-400/50 transition-colors cursor-pointer">
          <CardContent className="p-6 text-center">
            <Minus className="h-8 w-8 text-red-400 mx-auto mb-2" />
            <h3 className="font-semibold text-yellow-300 mb-1">Request Withdrawal</h3>
            <p className="text-sm text-yellow-400 mb-3">Withdraw funds to your M-Pesa account</p>
            <Button
              onClick={handleWithdraw}
              variant="outline"
              className="w-full border-red-600 text-red-400 hover:bg-red-600/20 bg-transparent"
            >
              Withdraw Now
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
