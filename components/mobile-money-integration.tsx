"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { Smartphone, CreditCard, CheckCircle, Clock, AlertCircle, DollarSign } from "lucide-react"

interface Transaction {
  id: string
  type: "deposit" | "withdrawal"
  method: "mpesa" | "airtel"
  amount: number
  phone: string
  status: "pending" | "completed" | "failed"
  timestamp: string
  reference: string
}

interface MobileMoneyProps {
  onTransactionComplete: (transaction: Transaction) => void
}

export function MobileMoneyIntegration({ onTransactionComplete }: MobileMoneyProps) {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState<"deposit" | "withdrawal">("deposit")
  const [selectedMethod, setSelectedMethod] = useState<"mpesa" | "airtel">("mpesa")
  const [amount, setAmount] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: "TXN001",
      type: "deposit",
      method: "mpesa",
      amount: 5000,
      phone: "+254700123456",
      status: "completed",
      timestamp: "2024-01-15T10:30:00Z",
      reference: "MPE123456789",
    },
    {
      id: "TXN002",
      type: "withdrawal",
      method: "airtel",
      amount: 2000,
      phone: "+254750987654",
      status: "pending",
      timestamp: "2024-01-15T09:15:00Z",
      reference: "ART987654321",
    },
  ])

  const processTransaction = async () => {
    if (!amount || !phoneNumber) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    const numAmount = Number.parseFloat(amount)
    if (activeTab === "deposit" && numAmount < 100) {
      toast({
        title: "Minimum Deposit",
        description: "Minimum deposit amount is 100 KES",
        variant: "destructive",
      })
      return
    }

    if (activeTab === "withdrawal" && numAmount < 500) {
      toast({
        title: "Minimum Withdrawal",
        description: "Minimum withdrawal amount is 500 KES",
        variant: "destructive",
      })
      return
    }

    setIsProcessing(true)

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 3000))

      const newTransaction: Transaction = {
        id: `TXN${Date.now()}`,
        type: activeTab,
        method: selectedMethod,
        amount: numAmount,
        phone: phoneNumber,
        status: "pending",
        timestamp: new Date().toISOString(),
        reference: `${selectedMethod.toUpperCase()}${Math.random().toString(36).substr(2, 9)}`,
      }

      setTransactions((prev) => [newTransaction, ...prev])
      onTransactionComplete(newTransaction)

      // Simulate status update after 5 seconds
      setTimeout(() => {
        setTransactions((prev) =>
          prev.map((txn) =>
            txn.id === newTransaction.id ? { ...txn, status: Math.random() > 0.1 ? "completed" : "failed" } : txn,
          ),
        )
      }, 5000)

      toast({
        title: "Transaction Initiated",
        description: `${activeTab === "deposit" ? "Deposit" : "Withdrawal"} request sent successfully`,
      })

      // Reset form
      setAmount("")
      setPhoneNumber("")
    } catch (error) {
      toast({
        title: "Transaction Failed",
        description: "Please try again later",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-400" />
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-400" />
      case "failed":
        return <AlertCircle className="w-4 h-4 text-red-400" />
      default:
        return <Clock className="w-4 h-4 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500"
      case "pending":
        return "bg-yellow-500"
      case "failed":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="space-y-6">
      {/* Transaction Type Tabs */}
      <Card className="black-section border-yellow-600/30">
        <CardContent className="p-4">
          <div className="flex gap-2">
            <Button
              onClick={() => setActiveTab("deposit")}
              variant={activeTab === "deposit" ? "default" : "outline"}
              className={
                activeTab === "deposit"
                  ? "everett-gradient text-white flex-1"
                  : "border-yellow-600 text-yellow-400 flex-1"
              }
            >
              <DollarSign className="w-4 h-4 mr-2" />
              Deposit
            </Button>
            <Button
              onClick={() => setActiveTab("withdrawal")}
              variant={activeTab === "withdrawal" ? "default" : "outline"}
              className={
                activeTab === "withdrawal"
                  ? "everett-gradient text-white flex-1"
                  : "border-yellow-600 text-yellow-400 flex-1"
              }
            >
              <CreditCard className="w-4 h-4 mr-2" />
              Withdraw
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Transaction Form */}
      <Card className="black-section border-yellow-600/30">
        <CardHeader>
          <CardTitle className="text-yellow-400">
            {activeTab === "deposit" ? "Make a Deposit" : "Request Withdrawal"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Payment Method Selection */}
          <div className="space-y-3">
            <Label className="text-yellow-300">Select Payment Method</Label>
            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={() => setSelectedMethod("mpesa")}
                variant={selectedMethod === "mpesa" ? "default" : "outline"}
                className={`h-16 ${
                  selectedMethod === "mpesa"
                    ? "bg-green-600 text-white"
                    : "border-green-600 text-green-400 hover:bg-green-900/20"
                }`}
              >
                <div className="text-center">
                  <Smartphone className="w-6 h-6 mx-auto mb-1" />
                  <span className="text-sm font-semibold">M-Pesa</span>
                </div>
              </Button>
              <Button
                onClick={() => setSelectedMethod("airtel")}
                variant={selectedMethod === "airtel" ? "default" : "outline"}
                className={`h-16 ${
                  selectedMethod === "airtel"
                    ? "bg-red-600 text-white"
                    : "border-red-600 text-red-400 hover:bg-red-900/20"
                }`}
              >
                <div className="text-center">
                  <Smartphone className="w-6 h-6 mx-auto mb-1" />
                  <span className="text-sm font-semibold">Airtel Money</span>
                </div>
              </Button>
            </div>
          </div>

          {/* Amount Input */}
          <div className="space-y-2">
            <Label htmlFor="amount" className="text-yellow-300">
              Amount (KES)
            </Label>
            <Input
              id="amount"
              type="number"
              placeholder={activeTab === "deposit" ? "Minimum 100 KES" : "Minimum 500 KES"}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="bg-black/50 border-yellow-600/50 text-white"
            />
            <p className="text-xs text-yellow-500">
              {activeTab === "deposit"
                ? "Minimum deposit: 100 KES • No maximum limit"
                : "Minimum withdrawal: 500 KES • No maximum limit"}
            </p>
          </div>

          {/* Phone Number Input */}
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-yellow-300">
              {selectedMethod === "mpesa" ? "M-Pesa" : "Airtel Money"} Phone Number
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+254700123456"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="bg-black/50 border-yellow-600/50 text-white"
            />
          </div>

          {/* Transaction Button */}
          <Button
            onClick={processTransaction}
            disabled={isProcessing || !amount || !phoneNumber}
            className="w-full everett-gradient text-white font-bold py-3"
          >
            {isProcessing ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Processing...
              </div>
            ) : (
              `${activeTab === "deposit" ? "Deposit" : "Withdraw"} ${amount ? `${amount} KES` : ""}`
            )}
          </Button>

          {/* Instructions */}
          <div className="p-3 bg-blue-900/20 rounded-lg border border-blue-600/30">
            <h4 className="font-semibold text-blue-300 mb-2">Instructions:</h4>
            <ol className="text-sm text-blue-200 space-y-1">
              <li>1. Select your preferred payment method</li>
              <li>2. Enter the amount and phone number</li>
              <li>3. Click the {activeTab} button</li>
              <li>4. {activeTab === "deposit" ? "Complete payment on your phone" : "Wait for admin approval"}</li>
              <li>5. Your balance will be updated automatically</li>
            </ol>
          </div>
        </CardContent>
      </Card>

      {/* Transaction History */}
      <Card className="black-section border-yellow-600/30">
        <CardHeader>
          <CardTitle className="text-yellow-400">Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {transactions.slice(0, 5).map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-3 bg-yellow-900/20 rounded-lg border border-yellow-600/30"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      transaction.method === "mpesa" ? "bg-green-600" : "bg-red-600"
                    }`}
                  >
                    <Smartphone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">
                      {transaction.type === "deposit" ? "Deposit" : "Withdrawal"}
                    </p>
                    <p className="text-sm text-yellow-500">
                      {transaction.method.toUpperCase()} • {transaction.phone}
                    </p>
                    <p className="text-xs text-yellow-600">{new Date(transaction.timestamp).toLocaleString()}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-bold ${transaction.type === "deposit" ? "text-green-400" : "text-red-400"}`}>
                    {transaction.type === "deposit" ? "+" : "-"}
                    {transaction.amount.toLocaleString()} KES
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    {getStatusIcon(transaction.status)}
                    <Badge className={`text-xs ${getStatusColor(transaction.status)}`}>{transaction.status}</Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
