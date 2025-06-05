"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/components/auth-provider"
import { ScatteredCoins } from "@/components/scattered-coins"
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  PiggyBank,
  Wallet,
  Calendar,
  Clock,
  Users,
  Gift,
  Shield,
  CreditCard,
  Smartphone,
} from "lucide-react"

interface EarningsData {
  yesterday: number
  today: number
  thisWeek: number
  thisMonth: number
  taskIncome: number
  invitationIncome: number
  totalIncome: number
  securityDeposit: number
}

interface WalletData {
  incomeWallet: number
  personalWallet: number
  lastUpdated: string
}

export default function WealthPage() {
  const { user } = useAuth()
  const [earnings, setEarnings] = useState<EarningsData>({
    yesterday: 270,
    today: 540,
    thisWeek: 2430,
    thisMonth: 12150,
    taskIncome: 8500,
    invitationIncome: 3650,
    totalIncome: 12150,
    securityDeposit: 23400,
  })

  const [wallets, setWallets] = useState<WalletData>({
    incomeWallet: user?.balance || 0,
    personalWallet: user?.inviteBalance || 0,
    lastUpdated: new Date().toISOString(),
  })

  const [showDepositModal, setShowDepositModal] = useState(false)
  const [showWithdrawModal, setShowWithdrawModal] = useState(false)
  const [depositAmount, setDepositAmount] = useState("")
  const [withdrawAmount, setWithdrawAmount] = useState("")
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<"mpesa" | "airtel" | "">("")
  const [phoneNumber, setPhoneNumber] = useState("")

  useEffect(() => {
    // Update wallets with user data
    setWallets({
      incomeWallet: user?.balance || 0,
      personalWallet: user?.inviteBalance || 0,
      lastUpdated: new Date().toISOString(),
    })
  }, [user])

  const handleDeposit = async () => {
    const amount = Number.parseFloat(depositAmount)
    if (amount < 1000) {
      alert("Minimum deposit is 1,000 KES")
      return
    }

    if (!selectedPaymentMethod || !phoneNumber) {
      alert("Please select payment method and enter phone number")
      return
    }

    // Simulate payment processing
    alert(`Deposit of ${amount} KES via ${selectedPaymentMethod.toUpperCase()} initiated to ${phoneNumber}`)
    setShowDepositModal(false)
    setDepositAmount("")
    setPhoneNumber("")
    setSelectedPaymentMethod("")
  }

  const handleWithdraw = async () => {
    const amount = Number.parseFloat(withdrawAmount)
    if (amount < 500) {
      alert("Minimum withdrawal is 500 KES")
      return
    }

    const totalAvailable = wallets.incomeWallet + wallets.personalWallet
    if (amount >= totalAvailable) {
      alert("❌ You cannot withdraw the entire wallet balance. Please leave some funds in your account.")
      return
    }

    if (!selectedPaymentMethod || !phoneNumber) {
      alert("Please select payment method and enter phone number")
      return
    }

    // Simulate withdrawal processing
    alert(`Withdrawal of ${amount} KES via ${selectedPaymentMethod.toUpperCase()} initiated to ${phoneNumber}`)
    setShowWithdrawModal(false)
    setWithdrawAmount("")
    setPhoneNumber("")
    setSelectedPaymentMethod("")
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString()
  }

  return (
    <div className="min-h-screen relative">
      <ScatteredCoins count={30} />

      <div className="max-w-4xl mx-auto p-4 space-y-6 relative z-10">
        {/* Job Level Banner */}
        <div className="black-section p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8 text-yellow-400" />
              <div>
                <h2 className="text-xl font-bold text-yellow-400">
                  Job Level {user?.jobTier !== null ? user.jobTier : "Not Set"}
                </h2>
                <p className="text-yellow-200">{user?.isActivated ? "Account Activated" : "Account Not Activated"}</p>
              </div>
            </div>
            <Badge className="everett-gradient text-white px-4 py-2">
              {user?.jobTier !== null ? `Tier ${user.jobTier}` : "No Tier"}
            </Badge>
          </div>
        </div>

        {/* Wallet Section */}
        <div className="grid md:grid-cols-2 gap-4">
          <Card className="wallet-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Wallet className="w-8 h-8 text-yellow-400" />
                <div>
                  <h3 className="font-bold text-yellow-300">Income Wallet</h3>
                  <p className="text-sm text-yellow-500">Task & Bonus Earnings</p>
                </div>
              </div>
              <p className="text-3xl font-bold text-yellow-400">{wallets.incomeWallet.toLocaleString()} KES</p>
            </CardContent>
          </Card>

          <Card className="wallet-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <PiggyBank className="w-8 h-8 text-yellow-400" />
                <div>
                  <h3 className="font-bold text-yellow-300">Personal Wallet</h3>
                  <p className="text-sm text-yellow-500">Invitation Earnings</p>
                </div>
              </div>
              <p className="text-3xl font-bold text-yellow-400">{wallets.personalWallet.toLocaleString()} KES</p>
            </CardContent>
          </Card>
        </div>

        {/* Effective Date */}
        <div className="black-section p-3 rounded-lg">
          <div className="flex items-center gap-2 text-yellow-300">
            <Clock className="w-4 h-4" />
            <span className="text-sm">Last Updated: {formatDate(wallets.lastUpdated)}</span>
          </div>
        </div>

        {/* Earnings Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="earnings-metric">
            <CardContent className="p-4 text-center">
              <Calendar className="w-6 h-6 mx-auto mb-2 text-yellow-400" />
              <p className="text-lg font-bold text-yellow-300">{earnings.yesterday.toLocaleString()}</p>
              <p className="text-xs text-yellow-500">Yesterday's Earnings</p>
            </CardContent>
          </Card>

          <Card className="earnings-metric">
            <CardContent className="p-4 text-center">
              <TrendingUp className="w-6 h-6 mx-auto mb-2 text-green-400" />
              <p className="text-lg font-bold text-green-300">{earnings.today.toLocaleString()}</p>
              <p className="text-xs text-yellow-500">Today's Earnings</p>
            </CardContent>
          </Card>

          <Card className="earnings-metric">
            <CardContent className="p-4 text-center">
              <Calendar className="w-6 h-6 mx-auto mb-2 text-blue-400" />
              <p className="text-lg font-bold text-blue-300">{earnings.thisWeek.toLocaleString()}</p>
              <p className="text-xs text-yellow-500">This Week's Earnings</p>
            </CardContent>
          </Card>

          <Card className="earnings-metric">
            <CardContent className="p-4 text-center">
              <Calendar className="w-6 h-6 mx-auto mb-2 text-purple-400" />
              <p className="text-lg font-bold text-purple-300">{earnings.thisMonth.toLocaleString()}</p>
              <p className="text-xs text-yellow-500">This Month's Earnings</p>
            </CardContent>
          </Card>

          <Card className="earnings-metric">
            <CardContent className="p-4 text-center">
              <Users className="w-6 h-6 mx-auto mb-2 text-orange-400" />
              <p className="text-lg font-bold text-orange-300">{earnings.taskIncome.toLocaleString()}</p>
              <p className="text-xs text-yellow-500">Task Income (Team)</p>
            </CardContent>
          </Card>

          <Card className="earnings-metric">
            <CardContent className="p-4 text-center">
              <Gift className="w-6 h-6 mx-auto mb-2 text-pink-400" />
              <p className="text-lg font-bold text-pink-300">{earnings.invitationIncome.toLocaleString()}</p>
              <p className="text-xs text-yellow-500">Invitation Income (Team)</p>
            </CardContent>
          </Card>

          <Card className="earnings-metric">
            <CardContent className="p-4 text-center">
              <DollarSign className="w-6 h-6 mx-auto mb-2 text-yellow-400" />
              <p className="text-lg font-bold text-yellow-300">{earnings.totalIncome.toLocaleString()}</p>
              <p className="text-xs text-yellow-500">Total Income</p>
            </CardContent>
          </Card>

          <Card className="earnings-metric">
            <CardContent className="p-4 text-center">
              <Shield className="w-6 h-6 mx-auto mb-2 text-red-400" />
              <p className="text-lg font-bold text-red-300">{earnings.securityDeposit.toLocaleString()}</p>
              <p className="text-xs text-yellow-500">Security Deposit</p>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <Button
            onClick={() => setShowDepositModal(true)}
            className="everett-gradient text-white py-6 text-lg font-bold"
          >
            <CreditCard className="w-6 h-6 mr-2" />
            Deposit
          </Button>
          <Button
            onClick={() => setShowWithdrawModal(true)}
            variant="outline"
            className="border-yellow-600 text-yellow-400 py-6 text-lg font-bold hover:bg-yellow-900/20"
          >
            <TrendingDown className="w-6 h-6 mr-2" />
            Withdraw
          </Button>
        </div>

        {/* Deposit Modal */}
        {showDepositModal && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-md bg-black/90 border-yellow-600">
              <CardHeader>
                <CardTitle className="text-yellow-400">Deposit Funds</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-yellow-300">Amount (KES)</label>
                  <input
                    type="number"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                    placeholder="Minimum 1,000 KES"
                    className="w-full p-3 bg-black/50 border border-yellow-600/50 rounded text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-yellow-300">Payment Method</label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant={selectedPaymentMethod === "mpesa" ? "default" : "outline"}
                      onClick={() => setSelectedPaymentMethod("mpesa")}
                      className={
                        selectedPaymentMethod === "mpesa"
                          ? "everett-gradient text-white"
                          : "border-yellow-600 text-yellow-400"
                      }
                    >
                      <Smartphone className="w-4 h-4 mr-2" />
                      M-Pesa
                    </Button>
                    <Button
                      variant={selectedPaymentMethod === "airtel" ? "default" : "outline"}
                      onClick={() => setSelectedPaymentMethod("airtel")}
                      className={
                        selectedPaymentMethod === "airtel"
                          ? "everett-gradient text-white"
                          : "border-yellow-600 text-yellow-400"
                      }
                    >
                      <Smartphone className="w-4 h-4 mr-2" />
                      Airtel Money
                    </Button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-yellow-300">Phone Number</label>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="254700123456"
                    className="w-full p-3 bg-black/50 border border-yellow-600/50 rounded text-white"
                  />
                </div>

                <div className="flex gap-2">
                  <Button onClick={handleDeposit} className="flex-1 everett-gradient text-white">
                    Deposit
                  </Button>
                  <Button
                    onClick={() => setShowDepositModal(false)}
                    variant="outline"
                    className="border-yellow-600 text-yellow-400"
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Withdraw Modal */}
        {showWithdrawModal && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-md bg-black/90 border-yellow-600">
              <CardHeader>
                <CardTitle className="text-yellow-400">Withdraw Funds</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 bg-yellow-900/20 rounded border border-yellow-600/30">
                  <p className="text-sm text-yellow-200">
                    Available: {(wallets.incomeWallet + wallets.personalWallet).toLocaleString()} KES
                  </p>
                  <p className="text-xs text-yellow-500 mt-1">Note: You cannot withdraw your entire balance</p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-yellow-300">Amount (KES)</label>
                  <input
                    type="number"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    placeholder="Minimum 500 KES"
                    className="w-full p-3 bg-black/50 border border-yellow-600/50 rounded text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-yellow-300">Payment Method</label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant={selectedPaymentMethod === "mpesa" ? "default" : "outline"}
                      onClick={() => setSelectedPaymentMethod("mpesa")}
                      className={
                        selectedPaymentMethod === "mpesa"
                          ? "everett-gradient text-white"
                          : "border-yellow-600 text-yellow-400"
                      }
                    >
                      <Smartphone className="w-4 h-4 mr-2" />
                      M-Pesa
                    </Button>
                    <Button
                      variant={selectedPaymentMethod === "airtel" ? "default" : "outline"}
                      onClick={() => setSelectedPaymentMethod("airtel")}
                      className={
                        selectedPaymentMethod === "airtel"
                          ? "everett-gradient text-white"
                          : "border-yellow-600 text-yellow-400"
                      }
                    >
                      <Smartphone className="w-4 h-4 mr-2" />
                      Airtel Money
                    </Button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-yellow-300">Phone Number</label>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="254700123456"
                    className="w-full p-3 bg-black/50 border border-yellow-600/50 rounded text-white"
                  />
                </div>

                <div className="flex gap-2">
                  <Button onClick={handleWithdraw} className="flex-1 everett-gradient text-white">
                    Withdraw
                  </Button>
                  <Button
                    onClick={() => setShowWithdrawModal(false)}
                    variant="outline"
                    className="border-yellow-600 text-yellow-400"
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
