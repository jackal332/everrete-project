"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { Loader2, CheckCircle, XCircle, Smartphone } from "lucide-react"

interface MpesaSTKPushProps {
  amount: number
  onSuccess: (transactionId: string) => void
  onError: (error: string) => void
}

export function MpesaSTKPush({ amount, onSuccess, onError }: MpesaSTKPushProps) {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [step, setStep] = useState<"input" | "processing" | "success" | "error">("input")
  const [countdown, setCountdown] = useState(60)
  const { toast } = useToast()

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (step === "processing" && countdown > 0) {
      interval = setInterval(() => {
        setCountdown((prev) => prev - 1)
      }, 1000)
    } else if (countdown === 0 && step === "processing") {
      setStep("error")
      onError("Payment timeout. Please try again.")
    }
    return () => clearInterval(interval)
  }, [step, countdown, onError])

  const formatPhoneNumber = (phone: string) => {
    // Remove any non-digit characters
    const cleaned = phone.replace(/\D/g, "")

    // Convert to international format
    if (cleaned.startsWith("0")) {
      return `254${cleaned.slice(1)}`
    } else if (cleaned.startsWith("254")) {
      return cleaned
    } else if (cleaned.length === 9) {
      return `254${cleaned}`
    }
    return cleaned
  }

  const validatePhoneNumber = (phone: string) => {
    const formatted = formatPhoneNumber(phone)
    return formatted.length === 12 && formatted.startsWith("254")
  }

  const handlePayment = async () => {
    if (!validatePhoneNumber(phoneNumber)) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid Kenyan phone number (e.g., 0712345678)",
        variant: "destructive",
      })
      return
    }

    setIsProcessing(true)
    setStep("processing")
    setCountdown(60)

    try {
      // Simulate M-Pesa STK Push
      const formattedPhone = formatPhoneNumber(phoneNumber)

      // In a real implementation, you would call your backend API here
      // const response = await fetch('/api/mpesa/stk-push', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ phone: formattedPhone, amount })
      // })

      // Simulate processing time
      setTimeout(() => {
        // Simulate success (80% success rate)
        if (Math.random() > 0.2) {
          const transactionId = `MP${Date.now()}`
          setStep("success")
          setTimeout(() => {
            onSuccess(transactionId)
          }, 2000)
        } else {
          setStep("error")
          onError("Payment was cancelled or failed. Please try again.")
        }
        setIsProcessing(false)
      }, 3000)
    } catch (error) {
      setStep("error")
      setIsProcessing(false)
      onError("Network error. Please check your connection and try again.")
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto border-green-200">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2">
          <Smartphone className="h-6 w-6 text-green-600" />
          M-Pesa Payment
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {step === "input" && (
          <>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-lg font-semibold text-green-800">Amount: KES {amount.toLocaleString()}</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">M-Pesa Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="0712345678"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="text-lg"
              />
              <p className="text-xs text-muted-foreground">Enter your M-Pesa registered phone number</p>
            </div>

            <Button
              onClick={handlePayment}
              disabled={!phoneNumber || isProcessing}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3"
            >
              Send Payment Request
            </Button>
          </>
        )}

        {step === "processing" && (
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <Loader2 className="h-12 w-12 animate-spin text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Payment Request Sent</h3>
              <p className="text-muted-foreground">Check your phone for the M-Pesa prompt</p>
              <p className="text-sm text-green-600 font-medium mt-2">Time remaining: {countdown}s</p>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg text-sm">
              <p className="font-medium text-blue-800">Instructions:</p>
              <ol className="list-decimal list-inside text-blue-700 mt-1 space-y-1">
                <li>Check your phone for M-Pesa notification</li>
                <li>Enter your M-Pesa PIN</li>
                <li>Confirm the payment</li>
              </ol>
            </div>
          </div>
        )}

        {step === "success" && (
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <CheckCircle className="h-16 w-16 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-lg text-green-800">Payment Successful!</h3>
              <p className="text-muted-foreground">Your deposit of KES {amount.toLocaleString()} has been processed</p>
            </div>
          </div>
        )}

        {step === "error" && (
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <XCircle className="h-16 w-16 text-red-600" />
            </div>
            <div>
              <h3 className="font-semibold text-lg text-red-800">Payment Failed</h3>
              <p className="text-muted-foreground">The payment could not be processed. Please try again.</p>
            </div>
            <Button
              onClick={() => {
                setStep("input")
                setCountdown(60)
              }}
              variant="outline"
              className="w-full border-red-600 text-red-700 hover:bg-red-50"
            >
              Try Again
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
