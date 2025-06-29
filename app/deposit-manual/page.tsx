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
import { ArrowLeft, Phone, CreditCard, CheckCircle, Copy } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function DepositManualPage() {
  const { user } = useUser()
  const { toast } = useToast()
  const [amount, setAmount] = useState("")
  const [transactionCode, setTransactionCode] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const paymentNumber = "+254 700 000000"
  const recipientName = "Everett Solutions"

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!amount || !transactionCode) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    if (Number(amount) < 100) {
      toast({
        title: "Invalid Amount",
        description: "Minimum deposit amount is KES 100",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Get existing deposits or create empty array
      const existingDeposits = JSON.parse(localStorage.getItem("deposits") || "[]")

      // Create new deposit record
      const newDeposit = {
        id: Date.now().toString(),
        user_id: user?.id || user?.email,
        amount: Number(amount),
        ref_code: transactionCode,
        status: "pending",
        created_at: new Date().toISOString(),
        payment_method: "mpesa",
        phone_number: paymentNumber,
      }

      // Add to deposits array
      const updatedDeposits = [newDeposit, ...existingDeposits]
      localStorage.setItem("deposits", JSON.stringify(updatedDeposits))

      setIsSubmitted(true)

      toast({
        title: "Deposit Request Submitted",
        description: "Your deposit request has been received and will be reviewed shortly.",
      })
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your deposit request. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied!",
      description: "Phone number copied to clipboard",
    })
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
            <p className="text-yellow-200 mb-6">Deposit request received. It will be reviewed shortly.</p>
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
      <div className="container mx-auto max-w-2xl py-6">
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
            <h1 className="text-2xl font-bold text-yellow-400">Manual Deposit</h1>
            <p className="text-yellow-200">Add funds to your Everett wallet</p>
          </div>
        </div>

        {/* Instructions */}
        <Alert className="mb-6 bg-blue-600/20 border-blue-600/50">
          <Phone className="h-4 w-4" />
          <AlertDescription className="text-blue-200">
            Follow the steps below to complete your deposit via M-Pesa or Airtel Money
          </AlertDescription>
        </Alert>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Payment Instructions */}
          <Card className="bg-black/40 border-yellow-600/30">
            <CardHeader>
              <CardTitle className="text-yellow-400">Payment Instructions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-yellow-900/20 rounded-lg">
                  <div>
                    <p className="text-sm text-yellow-300">Send Money To:</p>
                    <p className="font-bold text-yellow-200">{paymentNumber}</p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard(paymentNumber.replace(/\s/g, ""))}
                    className="border-yellow-600 text-yellow-400 hover:bg-yellow-600/20"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>

                <div className="p-3 bg-yellow-900/20 rounded-lg">
                  <p className="text-sm text-yellow-300">Recipient Name:</p>
                  <p className="font-bold text-yellow-200">{recipientName}</p>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-yellow-300">Steps:</h4>
                <ol className="list-decimal list-inside space-y-1 text-sm text-yellow-200">
                  <li>Open your M-Pesa or Airtel Money app</li>
                  <li>Select "Send Money"</li>
                  <li>Enter the phone number: {paymentNumber}</li>
                  <li>Enter your deposit amount</li>
                  <li>Complete the transaction</li>
                  <li>Copy the transaction code and paste it below</li>
                </ol>
              </div>
            </CardContent>
          </Card>

          {/* Deposit Form */}
          <Card className="bg-black/40 border-yellow-600/30">
            <CardHeader>
              <CardTitle className="text-yellow-400">Confirm Your Deposit</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="amount" className="text-yellow-300">
                    Deposit Amount (KES)
                  </Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="Enter amount (min. 100)"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    min="100"
                    required
                    className="bg-yellow-900/20 border-yellow-600/50 text-yellow-200 placeholder-yellow-400/50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="transactionCode" className="text-yellow-300">
                    M-Pesa/Airtel Transaction Code
                  </Label>
                  <Input
                    id="transactionCode"
                    type="text"
                    placeholder="e.g., QGH7X8Y9Z1"
                    value={transactionCode}
                    onChange={(e) => setTransactionCode(e.target.value.toUpperCase())}
                    required
                    className="bg-yellow-900/20 border-yellow-600/50 text-yellow-200 placeholder-yellow-400/50"
                  />
                  <p className="text-xs text-yellow-400">
                    Enter the confirmation code you received after sending money
                  </p>
                </div>

                <Alert className="bg-yellow-600/20 border-yellow-600/50">
                  <CreditCard className="h-4 w-4" />
                  <AlertDescription className="text-yellow-200">
                    Make sure the amount you enter here matches exactly what you sent via mobile money.
                  </AlertDescription>
                </Alert>

                <Button
                  type="submit"
                  disabled={isSubmitting || !amount || !transactionCode}
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-3"
                >
                  {isSubmitting ? "Submitting..." : "Submit Deposit Request"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Additional Info */}
        <Card className="mt-6 bg-black/40 border-yellow-600/30">
          <CardContent className="p-4">
            <h4 className="font-semibold text-yellow-300 mb-2">Important Notes:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-yellow-200">
              <li>Minimum deposit amount is KES 100</li>
              <li>Deposits are typically processed within 1-24 hours</li>
              <li>Make sure to keep your transaction code safe</li>
              <li>Contact support if you don't receive confirmation within 24 hours</li>
              <li>Double-check the phone number before sending money</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
