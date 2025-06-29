"use client"

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

export default function WealthPage() {
  const { user, updateUser } = useUser()
  const [depositAmount, setDepositAmount] = useState("")
  const { toast } = useToast()
  const [transactionHistory, setTransactionHistory] = useState([
    {
      id: "1",
      type: "deposit",
      amount: 1000,
      date: "2021-09-30T16:00:00.000Z",
      status: "completed",
      method: "card",
    },
    {
      id: "2",
      type: "withdrawal",
      amount: 500,
      date: "2021-10-01T16:00:00.000Z",
      status: "completed",
      method: "bank",
    },
    {
      id: "3",
      type: "deposit",
      amount: 2000,
      date: "2021-10-02T16:00:00.000Z",
      status: "pending",
      method: "paypal",
    },
  ])

  const [showMpesaModal, setShowMpesaModal] = useState(false)
  const [paymentAmount, setPaymentAmount] = useState(0)

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
  }

  const handlePaymentError = (error: string) => {
    console.error("Payment error:", error)
  }

  return (
    <div className="container mx-auto py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* User Profile Card */}
        <Card>
          <CardHeader>
            <CardTitle>Your Profile</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{user?.name}</p>
              <p className="text-xs text-muted-foreground">{user?.email}</p>
            </div>
          </CardContent>
        </Card>

        {/* Balance Card */}
        <Card>
          <CardHeader>
            <CardTitle>Your Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">KES {user?.balance || 0}</div>
            <p className="text-sm text-muted-foreground">Available for trading</p>
          </CardContent>
        </Card>
      </div>

      {/* Deposit Form */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Deposit Funds</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="deposit">Amount</Label>
            <Input
              type="number"
              id="deposit"
              placeholder="Enter amount"
              className="col-span-3"
              value={depositAmount}
              onChange={(e) => setDepositAmount(e.target.value)}
            />
          </div>
          <Button
            className="w-full everett-gradient text-white font-bold"
            onClick={() => {
              const amount = Number.parseFloat(depositAmount)
              if (amount >= 100) {
                handleMpesaPayment(amount)
              } else {
                toast({
                  title: "Invalid Amount",
                  description: "Minimum deposit amount is 100 KES",
                  variant: "destructive",
                })
              }
            }}
            disabled={!depositAmount || Number.parseFloat(depositAmount) < 100}
          >
            Deposit with M-Pesa
          </Button>
        </CardContent>
      </Card>

      {/* Transaction History Table */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableCaption>A history of your transactions.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Method</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactionHistory.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{transaction.type}</TableCell>
                  <TableCell>KES {transaction.amount}</TableCell>
                  <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
                  <TableCell>{transaction.status}</TableCell>
                  <TableCell>{transaction.method}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* MPesa Payment Modal */}
      {showMpesaModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-md">
            <MpesaSTKPush amount={paymentAmount} onSuccess={handlePaymentSuccess} onError={handlePaymentError} />
            <Button
              variant="outline"
              className="mt-4 w-full border-yellow-600 text-yellow-400"
              onClick={() => setShowMpesaModal(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
