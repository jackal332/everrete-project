"use client"

export const dynamic = "force-dynamic"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/components/ui/use-toast"
import { useUser } from "@/context/user-context"
import { MpesaSTKPush } from "@/components/mpesa-stk-push"
import { Skeleton } from "@/components/ui/skeleton"
import { AlertCircle, Wallet, TrendingUp, History } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function WealthPage() {
  const { user, loading, updateUser } = useUser()
  const [depositAmount, setDepositAmount] = useState("")
  const { toast } = useToast()
  const [transactionHistory, setTransactionHistory] = useState([
    {
      id: "1",
      type: "deposit",
      amount: 1000,
      date: "2024-01-15T10:30:00.000Z",
      status: "completed",
      method: "mpesa",
    },
    {
      id: "2",
      type: "withdrawal",
      amount: 500,
      date: "2024-01-14T14:20:00.000Z",
      status: "completed",
      method: "bank",
    },
    {
      id: "3",
      type: "deposit",
      amount: 2000,
      date: "2024-01-13T09:15:00.000Z",
      status: "pending",
      method: "mpesa",
    },
  ])

  const [showMpesaModal, setShowMpesaModal] = useState(false)
  const [paymentAmount, setPaymentAmount] = useState(0)

  // Loading state
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
            <CardContent className="flex items-center space-x-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-32" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-24 mb-2" />
              <Skeleton className="h-4 w-32" />
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-32" />
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </CardContent>
        </Card>
      </div>
    )
  }

  // Authentication check
  if (!user) {
    return (
      <div className="container mx-auto py-10 px-4">
        <div className="max-w-md mx-auto text-center">
          <AlertCircle className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">Authentication Required</h2>
          <p className="text-muted-foreground mb-6">
            Please log in to access your wealth dashboard and manage your finances.
          </p>
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

  const handleMpesaPayment = (amount: number) => {
    setPaymentAmount(amount)
    setShowMpesaModal(true)
  }

  const handlePaymentSuccess = (transactionId: string) => {
    // Update user balance
    updateUser({
      balance: (user?.balance || 0) + paymentAmount,
    })

    // Add transaction to history
    setTransactionHistory((prev) => [
      {
        id: transactionId,
        type: "deposit",
        amount: paymentAmount,
        date: new Date().toISOString(),
        status: "completed",
        method: "mpesa",
      },
      ...prev,
    ])

    setShowMpesaModal(false)
    setDepositAmount("")

    toast({
      title: "Deposit Successful!",
      description: `KES ${paymentAmount} has been added to your account.`,
    })
  }

  const handlePaymentError = (error: string) => {
    console.error("Payment error:", error)
    toast({
      title: "Payment Failed",
      description: error || "There was an error processing your payment. Please try again.",
      variant: "destructive",
    })
  }

  const handleWithdrawal = () => {
    if ((user?.balance || 0) < 500) {
      toast({
        title: "Insufficient Balance",
        description: "Minimum withdrawal amount is KES 500",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Withdrawal Request Submitted",
      description: "Your withdrawal request is being processed. You'll receive your funds within 24 hours.",
    })
  }

  return (
    <div className="container mx-auto py-6 px-4 space-y-6">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-600 to-yellow-800 bg-clip-text text-transparent">
          Wealth Dashboard
        </h1>
        <p className="text-muted-foreground mt-2">Manage your deposits, withdrawals, and track your financial growth</p>
      </div>

      {/* User Profile and Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* User Profile Card */}
        <Card className="border-yellow-200">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarFallback className="text-xs bg-yellow-100">{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              Your Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-center space-x-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`} alt={user.name} />
              <AvatarFallback className="bg-yellow-100 text-yellow-800">
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user.name}</p>
              <p className="text-xs text-muted-foreground truncate">{user.email}</p>
              <p className="text-xs text-yellow-600 font-medium">Package: {user.package || "Not Activated"}</p>
            </div>
          </CardContent>
        </Card>

        {/* Balance Card */}
        <Card className="border-yellow-200">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <Wallet className="h-5 w-5 text-yellow-600" />
              Account Balance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-700 mb-1">KES {user.balance?.toLocaleString() || "0"}</div>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              <TrendingUp className="h-4 w-4" />
              Available for withdrawal
            </p>
            <Button
              variant="outline"
              size="sm"
              className="mt-3 border-yellow-600 text-yellow-700 hover:bg-yellow-50 bg-transparent"
              onClick={handleWithdrawal}
            >
              Request Withdrawal
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Deposit Form */}
      <Card className="border-yellow-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-green-600" />
            Deposit Funds
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Minimum deposit amount is KES 100. Deposits are processed instantly via M-Pesa.
            </AlertDescription>
          </Alert>

          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="deposit">Deposit Amount (KES)</Label>
              <Input
                type="number"
                id="deposit"
                placeholder="Enter amount (min. 100)"
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
                className="text-lg"
                min="100"
              />
            </div>

            <Button
              className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-3"
              onClick={() => {
                const amount = Number.parseFloat(depositAmount)
                if (amount >= 100) {
                  handleMpesaPayment(amount)
                } else {
                  toast({
                    title: "Invalid Amount",
                    description: "Minimum deposit amount is KES 100",
                    variant: "destructive",
                  })
                }
              }}
              disabled={!depositAmount || Number.parseFloat(depositAmount) < 100}
            >
              Deposit with M-Pesa
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Transaction History */}
      <Card className="border-yellow-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="h-5 w-5 text-blue-600" />
            Transaction History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableCaption>Your recent financial transactions</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Type</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead className="hidden sm:table-cell">Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden md:table-cell">Method</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactionHistory.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="font-medium">
                      <span
                        className={`capitalize ${transaction.type === "deposit" ? "text-green-600" : "text-red-600"}`}
                      >
                        {transaction.type}
                      </span>
                    </TableCell>
                    <TableCell className="font-semibold">KES {transaction.amount.toLocaleString()}</TableCell>
                    <TableCell className="hidden sm:table-cell text-sm text-muted-foreground">
                      {new Date(transaction.date).toLocaleDateString("en-KE", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          transaction.status === "completed"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {transaction.status}
                      </span>
                    </TableCell>
                    <TableCell className="hidden md:table-cell capitalize text-sm">{transaction.method}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* MPesa Payment Modal */}
      {showMpesaModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-md">
            <MpesaSTKPush amount={paymentAmount} onSuccess={handlePaymentSuccess} onError={handlePaymentError} />
            <Button
              variant="outline"
              className="mt-4 w-full border-yellow-600 text-yellow-700 hover:bg-yellow-50 bg-transparent"
              onClick={() => setShowMpesaModal(false)}
            >
              Cancel Payment
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
