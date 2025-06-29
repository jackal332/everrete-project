"use client"

import type React from "react"

export const dynamic = "force-dynamic"

import { useState } from "react"
import { useUser } from "@/context/user-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { ArrowLeft, AlertTriangle, CheckCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function WithdrawManualPage() {
  const { user } = useUser()
  const { toast } = useToast()
  const [phoneNumber, setPhoneNumber] = useState("")
  const [amount, setAmount] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!phoneNumber || !amount) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    const withdrawAmount = Number(amount)
    const userBalance = user?.balance || 0

    if (withdrawAmount < 500) {
      toast({
        title: "Invalid Amount",
        description: "Minimum withdrawal amount is KES 500",
        variant: "destructive",
      })
      return
    }

    if (withdrawAmount > userBalance) {
      toast({
        title: "Insufficient Balance",
        description: "You don't have enough balance for this withdrawal",
        variant: "destructive",
      })
      return
    }

    // Validate phone number format
    const phoneRegex = /^(\+254|254|0)[17]\d{8}$/
    if (!phoneRegex.test(phoneNumber.replace(/\s/g, ""))) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid Kenyan phone number",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Get existing withdrawals or create empty array
      const existingWithdrawals = JSON.parse(localStorage.getItem("withdrawals") || "[]")

      // Create new withdrawal record
      const newWithdrawal = {
        id: Date.now().toString(),
        user_id: user?.id || user?.email,
        amount: withdrawAmount,
        phone_number: phoneNumber,
        status: "pending",
        created_at: new Date().toISOString(),
        method: "mpesa",
      }

      // Add to withdrawals array
      const updatedWithdrawals = [newWithdrawal, ...existingWithdrawals]
      localStorage.setItem("withdrawals", JSON.stringify(updatedWithdrawals))

      setIsSubmitted(true)

      toast({
        title: "Withdrawal Request Submitted",
        description: "Your withdrawal request has been submitted. Expect processing within 24 hours.",
      })
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your withdrawal request. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const formatPhoneNumber = (value: string) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, "")

    // Format as Kenyan number
    if (digits.startsWith("254")) {
      return `+${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6, 9)} ${digits.slice(9, 12)}`
    } else if (digits.startsWith("0")) {
      return `${digits.slice(0, 4)} ${digits.slice(4, 7)} ${digits.slice(7, 10)}`
    }
    return value
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-900 via-yellow-800 to-amber-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-black/40 border-green-600/50">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-green-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-400" />
            </div>
            <h2 className="text-2xl font-bold text-green-400 mb-2">Request Submitted!</h2>
            <p className="text-yellow-200 mb-6">
              Your withdrawal request has been submitted. Expect processing within 24 hours.
            </p>
            <div className="space-y-3">
              <Button
                onClick={() => (window.location.href = "/dashboard/wallet")}
                className="w-full bg-gradient-to-r from-yellow-600 to-amber-600 hover:from-yellow-700 hover:to-amber-700"
              >
                Back to Wallet
              </Button>
              <Button
                variant="outline"
                onClick={() => (window.location.href = "/dashboard")}
                className="w-full border-yellow-600 text-yellow-400 hover:bg-yellow-600/20"
              >
                Go to Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-900 via-yellow-800 to-amber-900 p-4">
      <div className="container mx-auto max-w-md py-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => window.history.back()}
            className="text-yellow-400 hover:bg-yellow-600/20"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-yellow-400">Withdraw Funds</h1>
            <p className="text-yellow-200">Request withdrawal to M-Pesa</p>
          </div>
        </div>

        {/* Balance Info */}
        <Card className="mb-6 bg-black/40 border-yellow-600/30">
          <CardContent className="p-4 text-center">
            <p className="text-yellow-300 text-sm mb-1">Available Balance</p>
            <p className="text-2xl font-bold text-yellow-400">KES {(user?.balance || 0).toLocaleString()}</p>
          </CardContent>
        </Card>

        {/* Withdrawal Form */}
        <Card className="bg-black/40 border-yellow-600/30">
          <CardHeader>
            <CardTitle className="text-yellow-400">Withdrawal Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phoneNumber" className="text-yellow-300">
                  M-Pesa Phone Number
                </Label>
                <Input
                  id="phoneNumber"
                  type="tel"
                  placeholder="0712 345 678"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(formatPhoneNumber(e.target.value))}
                  required
                  className="bg-yellow-900/20 border-yellow-600/50 text-yellow-200 placeholder-yellow-400/50"
                />
                <p className="text-xs text-yellow-400">Enter the phone number registered with M-Pesa</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="amount" className="text-yellow-300">
                  Withdrawal Amount (KES)
                </Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="Enter amount (min. 500)"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  min="500"
                  max={user?.balance || 0}
                  required
                  className="bg-yellow-900/20 border-yellow-600/50 text-yellow-200 placeholder-yellow-400/50"
                />
                <p className="text-xs text-yellow-400">Minimum withdrawal: KES 500</p>
              </div>

              <Alert className="bg-orange-600/20 border-orange-600/50">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription className="text-orange-200">
                  <strong>Important:</strong> Make sure your phone number is correct. Withdrawals to wrong numbers
                  cannot be reversed.
                </AlertDescription>
              </Alert>

              <div className="space-y-2">
                <h4 className="font-semibold text-yellow-300">Processing Information:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-yellow-200">
                  <li>Processing time: Within 24 hours</li>
                  <li>Available: Monday to Friday, 8 AM - 6 PM</li>
                  <li>Weekend requests processed on Monday</li>
                  <li>You'll receive SMS confirmation when processed</li>
                </ul>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting || !phoneNumber || !amount || Number(amount) < 500}
                className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-3"
              >
                {isSubmitting ? "Submitting..." : "Submit Withdrawal Request"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Additional Info */}
        <Card className="mt-6 bg-black/40 border-yellow-600/30">
          <CardContent className="p-4">
            <h4 className="font-semibold text-yellow-300 mb-2">Withdrawal Policy:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-yellow-200">
              <li>Minimum withdrawal: KES 500</li>
              <li>Maximum daily withdrawal: KES 50,000</li>
              <li>No withdrawal fees for amounts above KES 1,000</li>
              <li>KES 50 processing fee for amounts below KES 1,000</li>
              <li>Ensure your M-Pesa account can receive the amount</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
