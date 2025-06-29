"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { Smartphone, CheckCircle, XCircle, Loader2 } from "lucide-react"

interface MpesaSTKProps {
  amount: number
  onSuccess: (transactionId: string) => void
  onError: (error: string) => void
}

export function MpesaSTKPush({ amount, onSuccess, onError }: MpesaSTKProps) {
  const { toast } = useToast()
  const [phoneNumber, setPhoneNumber] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [status, setStatus] = useState<"idle" | "processing" | "success" | "error">("idle")
  const [transactionId, setTransactionId] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  const validatePhoneNumber = (phone: string) => {
    // Basic validation for Kenyan phone numbers
    const regex = /^(?:254|\+254|0)?(7[0-9]{8})$/
    return regex.test(phone)
  }

  const formatPhoneNumber = (phone: string) => {
    // Remove any non-digit characters
    const digits = phone.replace(/\D/g, "")

    // Ensure it starts with 254
    if (digits.startsWith("0")) {
      return "254" + digits.substring(1)
    } else if (digits.startsWith("254")) {
      return digits
    } else if (digits.length === 9 && digits.startsWith("7")) {
      return "254" + digits
    }

    return digits
  }

  const initiateSTKPush = async () => {
    if (!phoneNumber) {
      toast({
        title: "Phone Number Required",
        description: "Please enter your M-Pesa phone number",
        variant: "destructive",
      })
      return
    }

    if (!validatePhoneNumber(phoneNumber)) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid Kenyan phone number",
        variant: "destructive",
      })
      return
    }

    setIsProcessing(true)
    setStatus("processing")

    try {
      // In a real implementation, this would be an API call to your backend
      // which would then call the M-Pesa API

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 3000))

      // Generate a random transaction ID
      const mockTransactionId = "MPESA" + Math.random().toString(36).substring(2, 10).toUpperCase()
      setTransactionId(mockTransactionId)

      // Simulate STK push sent to phone
      toast({
        title: "STK Push Sent",
        description: "Please check your phone and enter your M-Pesa PIN to complete the transaction",
      })

      // Simulate waiting for user to enter PIN
      await new Promise((resolve) => setTimeout(resolve, 5000))

      // 90% chance of success for demo purposes
      if (Math.random() > 0.1) {
        setStatus("success")
        toast({
          title: "Payment Successful",
          description: `Your payment of ${amount} KES has been received. Transaction ID: ${mockTransactionId}`,
        })
        onSuccess(mockTransactionId)
      } else {
        throw new Error("Transaction failed or cancelled by user")
      }
    } catch (error) {
      setStatus("error")
      const errorMsg = error instanceof Error ? error.message : "Transaction failed"
      setErrorMessage(errorMsg)
      toast({
        title: "Payment Failed",
        description: errorMsg,
        variant: "destructive",
      })
      onError(errorMsg)
    } finally {
      setIsProcessing(false)
    }
  }

  const retryTransaction = () => {
    setStatus("idle")
    setErrorMessage("")
  }

  return (
    <Card className="black-section border-yellow-600/30">
      <CardHeader>
        <CardTitle className="text-yellow-400 flex items-center gap-2">
          <Smartphone className="w-5 h-5" />
          M-Pesa Payment
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {status === "success" ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <h3 className="text-xl font-bold text-green-400">Payment Successful!</h3>
            <p className="text-yellow-300">Amount: {amount.toLocaleString()} KES</p>
            <p className="text-sm text-yellow-500">Transaction ID: {transactionId}</p>
            <Button
              className="everett-gradient text-white mt-4"
              onClick={() => {
                setStatus("idle")
                setPhoneNumber("")
              }}
            >
              Make Another Payment
            </Button>
          </div>
        ) : status === "error" ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto">
              <XCircle className="w-8 h-8 text-red-500" />
            </div>
            <h3 className="text-xl font-bold text-red-400">Payment Failed</h3>
            <p className="text-yellow-300">{errorMessage}</p>
            <Button className="everett-gradient text-white mt-4" onClick={retryTransaction}>
              Try Again
            </Button>
          </div>
        ) : (
          <>
            <div className="p-4 bg-green-900/20 rounded-lg border border-green-600/30 text-center">
              <h3 className="font-bold text-green-400 text-lg mb-2">Amount to Pay</h3>
              <p className="text-2xl font-bold text-white">{amount.toLocaleString()} KES</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-yellow-300">
                M-Pesa Phone Number
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="e.g. 0712345678"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="bg-black/50 border-yellow-600/50 text-white"
                disabled={isProcessing}
              />
              <p className="text-xs text-yellow-500">Enter the phone number registered with M-Pesa</p>
            </div>

            <Button
              onClick={initiateSTKPush}
              disabled={isProcessing || !phoneNumber}
              className="w-full everett-gradient text-white font-bold py-3"
            >
              {isProcessing ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Processing...
                </div>
              ) : (
                `Pay ${amount.toLocaleString()} KES with M-Pesa`
              )}
            </Button>

            <div className="p-3 bg-blue-900/20 rounded-lg border border-blue-600/30">
              <h4 className="font-semibold text-blue-300 mb-2">How it works:</h4>
              <ol className="text-sm text-blue-200 space-y-1">
                <li>1. Enter your M-Pesa registered phone number</li>
                <li>2. Click the payment button</li>
                <li>3. You will receive an STK push notification on your phone</li>
                <li>4. Enter your M-Pesa PIN to complete the payment</li>
                <li>5. Your account will be credited automatically</li>
              </ol>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
