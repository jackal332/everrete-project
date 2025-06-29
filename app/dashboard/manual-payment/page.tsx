"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/components/auth-provider"
import { useToast } from "@/components/ui/use-toast"
import { BackButton } from "@/components/back-button"
import { ScatteredCoins } from "@/components/scattered-coins"
import { Phone, Copy, CheckCircle, Clock, User, DollarSign, CreditCard, Shield } from "lucide-react"

interface PaymentPackage {
  id: number
  name: string
  amount: number
}

export default function ManualPaymentPage() {
  const { user, updateUser } = useAuth()
  const { toast } = useToast()
  const [selectedPackage, setSelectedPackage] = useState<PaymentPackage | null>(null)
  const [mpesaCode, setMpesaCode] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [paymentStep, setPaymentStep] = useState<"select" | "instructions" | "submit" | "submitted">("select")

  const packages: PaymentPackage[] = [
    { id: 1, name: "Job 1", amount: 3000 },
    { id: 2, name: "Job 2", amount: 8100 },
    { id: 3, name: "Job 3", amount: 23400 },
    { id: 4, name: "Job 4", amount: 65800 },
    { id: 5, name: "Job 5", amount: 176000 },
    { id: 6, name: "Job 6", amount: 480000 },
    { id: 7, name: "Job 7", amount: 1080000 },
    { id: 8, name: "Job 8", amount: 2250000 },
    { id: 9, name: "Job 9", amount: 4260000 },
  ]

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied!",
      description: "Phone number copied to clipboard",
    })
  }

  const handlePackageSelect = (pkg: PaymentPackage) => {
    setSelectedPackage(pkg)
    setPaymentStep("instructions")
  }

  const handleSubmitCode = async () => {
    if (!mpesaCode.trim() || !selectedPackage) return

    setIsSubmitting(true)

    try {
      // Simulate API call to submit payment
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Store pending payment in localStorage (in real app, this would be sent to backend)
      const pendingPayment = {
        id: Date.now().toString(),
        userId: user?.id,
        userName: user?.name,
        userEmail: user?.email,
        packageId: selectedPackage.id,
        packageName: selectedPackage.name,
        amount: selectedPackage.amount,
        mpesaCode: mpesaCode.trim(),
        status: "pending",
        submittedAt: new Date().toISOString(),
      }

      const existingPayments = JSON.parse(localStorage.getItem("pending-payments") || "[]")
      existingPayments.push(pendingPayment)
      localStorage.setItem("pending-payments", JSON.stringify(existingPayments))

      setPaymentStep("submitted")

      toast({
        title: "Payment Submitted!",
        description: "Your M-Pesa code has been submitted for verification. You'll be notified once approved.",
      })
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "Please try again or contact support.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen relative">
      <ScatteredCoins count={25} />

      <div className="relative z-10 p-4 space-y-6">
        <div className="flex items-center justify-between mb-6">
          <BackButton />
          <h1 className="text-2xl font-bold text-yellow-400">Manual Payment</h1>
          <div className="w-16"></div> {/* Spacer for centering */}
        </div>

        {/* Step Indicator */}
        <Card className="black-section border-yellow-600/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div
                className={`flex items-center gap-2 ${paymentStep === "select" ? "text-yellow-400" : "text-yellow-600"}`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${paymentStep === "select" ? "bg-yellow-400 text-black" : "bg-yellow-600/30"}`}
                >
                  1
                </div>
                <span className="text-sm">Select Package</span>
              </div>
              <div
                className={`flex items-center gap-2 ${paymentStep === "instructions" ? "text-yellow-400" : "text-yellow-600"}`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${paymentStep === "instructions" ? "bg-yellow-400 text-black" : "bg-yellow-600/30"}`}
                >
                  2
                </div>
                <span className="text-sm">Payment</span>
              </div>
              <div
                className={`flex items-center gap-2 ${paymentStep === "submit" ? "text-yellow-400" : "text-yellow-600"}`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${paymentStep === "submit" ? "bg-yellow-400 text-black" : "bg-yellow-600/30"}`}
                >
                  3
                </div>
                <span className="text-sm">Submit Code</span>
              </div>
              <div
                className={`flex items-center gap-2 ${paymentStep === "submitted" ? "text-green-400" : "text-yellow-600"}`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${paymentStep === "submitted" ? "bg-green-400 text-black" : "bg-yellow-600/30"}`}
                >
                  ✓
                </div>
                <span className="text-sm">Complete</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Step 1: Package Selection */}
        {paymentStep === "select" && (
          <Card className="black-section border-yellow-600/30">
            <CardHeader>
              <CardTitle className="text-yellow-400 flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                Select Package to Purchase
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {packages.map((pkg) => (
                  <Card
                    key={pkg.id}
                    className="earnings-metric hover:scale-105 transition-transform cursor-pointer border-yellow-600/50 hover:border-yellow-400"
                    onClick={() => handlePackageSelect(pkg)}
                  >
                    <CardContent className="p-4 text-center">
                      <h3 className="font-bold text-yellow-300 mb-2">{pkg.name}</h3>
                      <p className="text-2xl font-bold text-white mb-2">{pkg.amount.toLocaleString()}</p>
                      <p className="text-sm text-yellow-500">KES</p>
                      <Button className="w-full mt-3 everett-gradient text-white" size="sm">
                        Select Package
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Payment Instructions */}
        {paymentStep === "instructions" && selectedPackage && (
          <Card className="black-section border-yellow-600/30">
            <CardHeader>
              <CardTitle className="text-yellow-400 flex items-center gap-2">
                <Phone className="w-5 h-5" />
                M-Pesa Payment Instructions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Selected Package Info */}
              <Card className="bg-yellow-900/20 border-yellow-600/50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-yellow-300">Selected Package: {selectedPackage.name}</h3>
                      <p className="text-yellow-500">Amount to Pay</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-white">{selectedPackage.amount.toLocaleString()}</p>
                      <p className="text-yellow-500">KES</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Instructions */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-yellow-400 mb-4">Follow these steps:</h3>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-yellow-400 text-black rounded-full flex items-center justify-center font-bold text-sm">
                      1
                    </div>
                    <div>
                      <p className="text-white font-medium">Open M-Pesa on your phone</p>
                      <p className="text-yellow-500 text-sm">Go to your M-Pesa menu</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-yellow-400 text-black rounded-full flex items-center justify-center font-bold text-sm">
                      2
                    </div>
                    <div>
                      <p className="text-white font-medium">Select "Send Money"</p>
                      <p className="text-yellow-500 text-sm">Choose the send money option</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-yellow-400 text-black rounded-full flex items-center justify-center font-bold text-sm">
                      3
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-medium">Enter this phone number:</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Card className="bg-green-900/30 border-green-600/50 px-4 py-2">
                          <span className="text-green-300 font-bold text-lg">0734821932</span>
                        </Card>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-yellow-600 text-yellow-400 bg-transparent"
                          onClick={() => copyToClipboard("0734821932")}
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-yellow-400 text-black rounded-full flex items-center justify-center font-bold text-sm">
                      4
                    </div>
                    <div>
                      <p className="text-white font-medium">Enter the amount:</p>
                      <Card className="bg-blue-900/30 border-blue-600/50 px-4 py-2 mt-2 inline-block">
                        <span className="text-blue-300 font-bold text-lg">
                          {selectedPackage.amount.toLocaleString()} KES
                        </span>
                      </Card>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-yellow-400 text-black rounded-full flex items-center justify-center font-bold text-sm">
                      5
                    </div>
                    <div>
                      <p className="text-white font-medium">Complete the transaction</p>
                      <p className="text-yellow-500 text-sm">Enter your M-Pesa PIN and send</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-green-400 text-black rounded-full flex items-center justify-center font-bold text-sm">
                      6
                    </div>
                    <div>
                      <p className="text-white font-medium">Copy the transaction code</p>
                      <p className="text-yellow-500 text-sm">
                        You'll receive a confirmation SMS with a code like "QJ63XZP"
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Receiver Info */}
              <Card className="bg-purple-900/20 border-purple-600/50">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <User className="w-8 h-8 text-purple-400" />
                    <div>
                      <p className="text-white font-bold">Receiver Name:</p>
                      <p className="text-purple-300 text-lg">Kioko Mutua - Everett Solutions</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setPaymentStep("select")}
                  className="border-yellow-600 text-yellow-400"
                >
                  Back to Packages
                </Button>
                <Button onClick={() => setPaymentStep("submit")} className="flex-1 everett-gradient text-white">
                  I've Sent the Money
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Submit M-Pesa Code */}
        {paymentStep === "submit" && selectedPackage && (
          <Card className="black-section border-yellow-600/30">
            <CardHeader>
              <CardTitle className="text-yellow-400 flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Submit Your M-Pesa Transaction Code
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <Card className="bg-blue-900/20 border-blue-600/50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-300 font-medium">Package: {selectedPackage.name}</p>
                      <p className="text-blue-500 text-sm">Amount: {selectedPackage.amount.toLocaleString()} KES</p>
                    </div>
                    <Badge className="bg-blue-500 text-white">Awaiting Code</Badge>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="mpesa-code" className="text-yellow-400 font-medium">
                    M-Pesa Transaction Code
                  </Label>
                  <p className="text-yellow-500 text-sm mb-2">
                    Enter the code from your M-Pesa confirmation SMS (e.g., QJ63XZP)
                  </p>
                  <Input
                    id="mpesa-code"
                    type="text"
                    placeholder="e.g., QJ63XZP"
                    value={mpesaCode}
                    onChange={(e) => setMpesaCode(e.target.value.toUpperCase())}
                    className="bg-yellow-900/20 border-yellow-600/50 text-white placeholder-yellow-500/50"
                  />
                </div>

                <Card className="bg-orange-900/20 border-orange-600/50">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <Clock className="w-6 h-6 text-orange-400 mt-1" />
                      <div>
                        <p className="text-orange-300 font-medium">Important Note:</p>
                        <p className="text-orange-400 text-sm">
                          Once submitted, wait for admin approval. You'll receive access once your payment is verified.
                          This usually takes 5-30 minutes during business hours.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setPaymentStep("instructions")}
                  className="border-yellow-600 text-yellow-400"
                >
                  Back to Instructions
                </Button>
                <Button
                  onClick={handleSubmitCode}
                  disabled={!mpesaCode.trim() || isSubmitting}
                  className="flex-1 everett-gradient text-white"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Submitting...
                    </div>
                  ) : (
                    "Submit Payment Code"
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 4: Submitted */}
        {paymentStep === "submitted" && selectedPackage && (
          <Card className="black-section border-green-600/50">
            <CardContent className="p-6 text-center space-y-6">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>

              <div>
                <h2 className="text-2xl font-bold text-green-400 mb-2">Payment Submitted Successfully!</h2>
                <p className="text-green-300">Your M-Pesa transaction code has been received and is being processed.</p>
              </div>

              <Card className="bg-green-900/20 border-green-600/50">
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-green-500">Package:</span>
                      <span className="text-green-300 font-medium">{selectedPackage.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-green-500">Amount:</span>
                      <span className="text-green-300 font-medium">{selectedPackage.amount.toLocaleString()} KES</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-green-500">Status:</span>
                      <Badge className="bg-orange-500 text-white">Pending Approval</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-yellow-300">
                  <Shield className="w-5 h-5" />
                  <span className="text-sm">Your payment is secure and being verified</span>
                </div>
                <div className="flex items-center gap-3 text-yellow-300">
                  <Clock className="w-5 h-5" />
                  <span className="text-sm">Approval typically takes 5-30 minutes</span>
                </div>
              </div>

              <Button
                onClick={() => {
                  setPaymentStep("select")
                  setSelectedPackage(null)
                  setMpesaCode("")
                }}
                className="everett-gradient text-white"
              >
                Make Another Payment
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
