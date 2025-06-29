"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { Phone, CreditCard, CheckCircle, AlertCircle } from "lucide-react"

interface MpesaSTKPushProps {
  amount: number
  onSuccess: (transactionId: string) => void
  onError: (error: string) => void
}

export function MpesaSTKPush({ amount, onSuccess, onError }: MpesaSTKPushProps) {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [step, setStep] = useState<"phone" | "processing" | "success" | "error">("phone")
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!phoneNumber) {
      toast({
        title: "Phone Number Required",
        description: "Please enter your M-Pesa phone number",
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

    setIsProcessing(true)
    setStep("processing")

    try {
      // Simulate M-Pesa STK Push process
      await new Promise((resolve) => setTimeout(resolve, 3000))

      // Simulate success (80% success rate)
      if (Math.random() > 0.2) {
        const transactionId = `MP${Date.now()}`
        setStep("success")
        setTimeout(() => {
          onSuccess(transactionId)
        }, 2000)
      } else {
        throw new Error("Transaction was cancelled by user or timed out")
      }
    } catch (error) {
      setStep("error")
      onError(error instanceof Error ? error.message : "Payment failed")
    } finally {
      setIsProcessing(false)
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

  if (step === "processing") {
    return (
      <Card className="w-full bg-black/40 border-blue-600/50">
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h3 className="text-xl font-bold text-blue-400 mb-2">Processing Payment</h3>
          <p className="text-yellow-200 mb-4">
            Please check your phone for the M-Pesa prompt and enter your PIN to complete the payment.
          </p>
          <div className="bg-blue-900/20 p-4 rounded-lg">
            <p className="text-sm text-blue-200">
              Amount: <span className="font-bold">KES {amount.toLocaleString()}</span>
            </p>
            <p className="text-sm text-blue-200">
              Phone: <span className="font-bold">{phoneNumber}</span>
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (step === "success") {
    return (
      <Card className="w-full bg-black/40 border-green-600/50">
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 bg-green-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-8 w-8 text-green-400" />
          </div>
          <h3 className="text-xl font-bold text-green-400 mb-2">Payment Successful!</h3>
          <p className="text-yellow-200">
            Your payment of KES {amount.toLocaleString()} has been processed successfully.
          </p>
        </CardContent>
      </Card>
    )
  }

  if (step === "error") {
    return (
      <Card className="w-full bg-black/40 border-red-600/50">
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 bg-red-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="h-8 w-8 text-red-400" />
          </div>
          <h3 className="text-xl font-bold text-red-400 mb-2">Payment Failed</h3>
          <p className="text-yellow-200 mb-4">There was an issue processing your payment. Please try again.</p>
          <Button
            onClick={() => setStep("phone")}
            className="bg-gradient-to-r from-yellow-600 to-amber-600 hover:from-yellow-700 hover:to-amber-700"
          >
            Try Again
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full bg-black/40 border-yellow-600/50">
      <CardHeader>
        <CardTitle className="text-yellow-400 flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          M-Pesa Payment
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="text-center mb-4">
            <p className="text-2xl font-bold text-yellow-400">KES {amount.toLocaleString()}</p>
            <p className="text-yellow-200 text-sm">Amount to pay</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-yellow-300">
              M-Pesa Phone Number
            </Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-yellow-400" />
              <Input
                id="phone"
                type="tel"
                placeholder="0712 345 678"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(formatPhoneNumber(e.target.value))}
                required
                className="pl-10 bg-yellow-900/20 border-yellow-600/50 text-yellow-200 placeholder-yellow-400/50"
              />
            </div>
            <p className="text-xs text-yellow-400">Enter the phone number registered with M-Pesa</p>
          </div>

          <Button
            type="submit"
            disabled={isProcessing || !phoneNumber}
            className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-3"
          >
            {isProcessing ? "Processing..." : "Pay with M-Pesa"}
          </Button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-xs text-yellow-400">
            You will receive an M-Pesa prompt on your phone to complete the payment
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
