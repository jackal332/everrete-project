"use client"

import { useState } from "react"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { BackButton } from "@/components/back-button"
import { CheckCircle, Clock, Smartphone, Copy } from "lucide-react"
import { useRouter } from "next/navigation"

const packages = [
  { id: 1, name: "Bronze", price: 500, dailyEarning: 50 },
  { id: 2, name: "Silver", price: 1000, dailyEarning: 100 },
  { id: 3, name: "Gold", price: 2000, dailyEarning: 200 },
  { id: 4, name: "Platinum", price: 5000, dailyEarning: 500 },
  { id: 5, name: "Diamond", price: 10000, dailyEarning: 1000 },
  { id: 6, name: "Elite", price: 20000, dailyEarning: 2000 },
  { id: 7, name: "Premium", price: 50000, dailyEarning: 5000 },
  { id: 8, name: "Ultimate", price: 100000, dailyEarning: 10000 },
  { id: 9, name: "Supreme", price: 200000, dailyEarning: 20000 },
]

export default function ManualPaymentPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [selectedPackage, setSelectedPackage] = useState<number | null>(null)
  const [mpesaCode, setMpesaCode] = useState("")
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const selectedPkg = packages.find((pkg) => pkg.id === selectedPackage)
  const phoneNumber = "0734821932"
  const receiverName = "Kioko Mutua - Everett Solutions"

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const handleSubmitPayment = async () => {
    if (!mpesaCode.trim()) return

    setIsSubmitting(true)

    // Simulate API call to submit payment
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Store payment submission (in real app, this would go to backend)
    const paymentData = {
      userId: user?.id,
      userName: user?.name,
      userEmail: user?.email,
      packageId: selectedPackage,
      packageName: selectedPkg?.name,
      amount: selectedPkg?.price,
      mpesaCode: mpesaCode.trim(),
      status: "pending",
      submittedAt: new Date().toISOString(),
    }

    // Store in localStorage for demo (in real app, send to backend)
    const existingPayments = JSON.parse(localStorage.getItem("manual-payments") || "[]")
    existingPayments.push(paymentData)
    localStorage.setItem("manual-payments", JSON.stringify(existingPayments))

    setIsSubmitting(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-900 via-yellow-800 to-amber-900">
        <div className="container mx-auto px-4 py-8">
          <BackButton />

          <Card className="max-w-md mx-auto bg-yellow-900/20 border-yellow-700">
            <CardContent className="p-6 text-center">
              <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-yellow-400 mb-2">Payment Submitted!</h2>
              <p className="text-yellow-300 mb-4">
                Your M-Pesa payment has been submitted for verification. You'll receive access once approved by our
                admin team.
              </p>
              <div className="bg-yellow-800/30 p-3 rounded-lg mb-4">
                <p className="text-yellow-300 text-sm">
                  <strong>Package:</strong> {selectedPkg?.name}
                  <br />
                  <strong>Amount:</strong> KES {selectedPkg?.price}
                  <br />
                  <strong>M-Pesa Code:</strong> {mpesaCode}
                </p>
              </div>
              <Button
                onClick={() => router.push("/dashboard")}
                className="bg-gradient-to-r from-yellow-600 to-amber-600 hover:from-yellow-700 hover:to-amber-700 text-white"
              >
                Back to Dashboard
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-900 via-yellow-800 to-amber-900">
      <div className="container mx-auto px-4 py-8">
        <BackButton />

        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold text-yellow-400 mb-6 text-center">Manual M-Pesa Payment</h1>

          {step === 1 && (
            <Card className="bg-yellow-900/20 border-yellow-700">
              <CardHeader>
                <CardTitle className="text-yellow-400">Step 1: Select Package</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3">
                  {packages.map((pkg) => (
                    <div
                      key={pkg.id}
                      onClick={() => setSelectedPackage(pkg.id)}
                      className={`p-3 rounded-lg border cursor-pointer transition-all ${
                        selectedPackage === pkg.id
                          ? "border-yellow-500 bg-yellow-800/30"
                          : "border-yellow-700 bg-yellow-900/10 hover:bg-yellow-800/20"
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="text-yellow-400 font-semibold">{pkg.name}</h3>
                          <p className="text-yellow-300 text-sm">Daily Earning: KES {pkg.dailyEarning}</p>
                        </div>
                        <div className="text-yellow-400 font-bold">KES {pkg.price}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {selectedPackage && (
                  <Button
                    onClick={() => setStep(2)}
                    className="w-full mt-4 bg-gradient-to-r from-yellow-600 to-amber-600 hover:from-yellow-700 hover:to-amber-700 text-white"
                  >
                    Continue to Payment
                  </Button>
                )}
              </CardContent>
            </Card>
          )}

          {step === 2 && selectedPkg && (
            <div className="space-y-6">
              <Card className="bg-yellow-900/20 border-yellow-700">
                <CardHeader>
                  <CardTitle className="text-yellow-400">Step 2: Send M-Pesa Payment</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-yellow-800/30 p-4 rounded-lg mb-4">
                    <h3 className="text-yellow-400 font-semibold mb-2">Selected Package</h3>
                    <p className="text-yellow-300">
                      <strong>{selectedPkg.name}</strong> - KES {selectedPkg.price}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-yellow-400 font-semibold flex items-center">
                      <Smartphone className="w-5 h-5 mr-2" />
                      How to Pay via M-Pesa (Send Money)
                    </h3>

                    <ol className="space-y-2 text-yellow-300">
                      <li className="flex items-start">
                        <span className="bg-yellow-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">
                          1
                        </span>
                        Open M-Pesa on your phone
                      </li>
                      <li className="flex items-start">
                        <span className="bg-yellow-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">
                          2
                        </span>
                        Go to "Send Money"
                      </li>
                      <li className="flex items-start">
                        <span className="bg-yellow-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">
                          3
                        </span>
                        <div>
                          Enter phone number:
                          <div className="flex items-center mt-1">
                            <code className="bg-yellow-800/50 px-2 py-1 rounded text-yellow-400 font-mono">
                              {phoneNumber}
                            </code>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => copyToClipboard(phoneNumber)}
                              className="ml-2 text-yellow-400 hover:text-yellow-300"
                            >
                              <Copy className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-yellow-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">
                          4
                        </span>
                        Enter amount: <strong>KES {selectedPkg.price}</strong>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-yellow-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">
                          5
                        </span>
                        Send and copy the transaction code (e.g., QJ63XZP)
                      </li>
                      <li className="flex items-start">
                        <span className="bg-yellow-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">
                          6
                        </span>
                        Paste the code below and submit
                      </li>
                    </ol>

                    <div className="bg-yellow-800/30 p-3 rounded-lg">
                      <p className="text-yellow-300 text-sm">
                        <strong>Receiver Name:</strong> {receiverName}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-yellow-900/20 border-yellow-700">
                <CardHeader>
                  <CardTitle className="text-yellow-400">Step 3: Submit Transaction Code</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="mpesa-code" className="text-yellow-300">
                        M-Pesa Transaction Code
                      </Label>
                      <Input
                        id="mpesa-code"
                        value={mpesaCode}
                        onChange={(e) => setMpesaCode(e.target.value.toUpperCase())}
                        placeholder="e.g., QJ63XZP"
                        className="mt-1 bg-yellow-900/30 border-yellow-700 text-yellow-300 placeholder-yellow-500"
                        maxLength={10}
                      />
                    </div>

                    <Button
                      onClick={handleSubmitPayment}
                      disabled={!mpesaCode.trim() || isSubmitting}
                      className="w-full bg-gradient-to-r from-yellow-600 to-amber-600 hover:from-yellow-700 hover:to-amber-700 text-white disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <Clock className="w-4 h-4 mr-2 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        "Submit Payment"
                      )}
                    </Button>

                    <p className="text-yellow-300 text-sm text-center">
                      ⏳ Once submitted, wait for admin approval. You'll receive access once verified.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
