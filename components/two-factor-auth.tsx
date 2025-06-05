"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { Shield, Smartphone, CheckCircle } from "lucide-react"

interface TwoFactorAuthProps {
  isEnabled: boolean
  onToggle: (enabled: boolean) => void
  onVerify: (code: string) => Promise<boolean>
}

export function TwoFactorAuth({ isEnabled, onToggle, onVerify }: TwoFactorAuthProps) {
  const [step, setStep] = useState<"setup" | "verify" | "enabled">(isEnabled ? "enabled" : "setup")
  const [verificationCode, setVerificationCode] = useState("")
  const [qrCode, setQrCode] = useState("")
  const [backupCodes, setBackupCodes] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const generateQRCode = async () => {
    setIsLoading(true)
    // Simulate QR code generation
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setQrCode("EVERETT-2FA-SECRET-KEY-EXAMPLE")
    setBackupCodes(["ABC123DEF", "GHI456JKL", "MNO789PQR", "STU012VWX", "YZ345ABC6"])
    setStep("verify")
    setIsLoading(false)
  }

  const verifyCode = async () => {
    setIsLoading(true)
    try {
      const isValid = await onVerify(verificationCode)
      if (isValid) {
        setStep("enabled")
        onToggle(true)
        toast({
          title: "2FA Enabled Successfully!",
          description: "Your account is now protected with two-factor authentication.",
        })
      } else {
        toast({
          title: "Invalid Code",
          description: "Please check your authenticator app and try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Verification Failed",
        description: "There was an error verifying your code.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const disable2FA = () => {
    setStep("setup")
    onToggle(false)
    toast({
      title: "2FA Disabled",
      description: "Two-factor authentication has been disabled for your account.",
    })
  }

  return (
    <Card className="bg-black/60 border-yellow-600/30">
      <CardHeader>
        <CardTitle className="text-yellow-400 flex items-center gap-2">
          <Shield className="w-5 h-5" />
          Two-Factor Authentication
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {step === "setup" && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-4 bg-yellow-900/20 rounded-lg border border-yellow-600/30">
              <Smartphone className="w-8 h-8 text-yellow-400" />
              <div>
                <h4 className="font-semibold text-yellow-300">Secure Your Account</h4>
                <p className="text-sm text-yellow-200">Add an extra layer of security with two-factor authentication</p>
              </div>
            </div>
            <Button onClick={generateQRCode} disabled={isLoading} className="w-full everett-gradient text-white">
              {isLoading ? "Setting up..." : "Enable 2FA"}
            </Button>
          </div>
        )}

        {step === "verify" && (
          <div className="space-y-4">
            <div className="text-center">
              <div className="w-32 h-32 mx-auto mb-4 bg-white p-4 rounded-lg">
                <div className="w-full h-full bg-gray-200 flex items-center justify-center text-xs">
                  QR Code
                  <br />
                  {qrCode}
                </div>
              </div>
              <p className="text-sm text-yellow-200 mb-4">
                Scan this QR code with your authenticator app (Google Authenticator, Authy, etc.)
              </p>
            </div>

            <div>
              <Label htmlFor="verification-code" className="text-yellow-300">
                Enter Verification Code
              </Label>
              <Input
                id="verification-code"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                placeholder="000000"
                maxLength={6}
                className="bg-black/30 border-yellow-600/50 text-white text-center text-lg font-mono"
              />
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold text-yellow-300">Backup Codes</h4>
              <p className="text-sm text-yellow-200">Save these codes in a safe place:</p>
              <div className="grid grid-cols-1 gap-1 p-3 bg-black/30 rounded border border-yellow-600/30">
                {backupCodes.map((code, index) => (
                  <code key={index} className="text-yellow-300 font-mono text-sm">
                    {code}
                  </code>
                ))}
              </div>
            </div>

            <Button
              onClick={verifyCode}
              disabled={isLoading || verificationCode.length !== 6}
              className="w-full everett-gradient text-white"
            >
              {isLoading ? "Verifying..." : "Verify & Enable"}
            </Button>
          </div>
        )}

        {step === "enabled" && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-4 bg-green-900/20 rounded-lg border border-green-600/30">
              <CheckCircle className="w-8 h-8 text-green-400" />
              <div>
                <h4 className="font-semibold text-green-300">2FA is Active</h4>
                <p className="text-sm text-green-200">Your account is protected with two-factor authentication</p>
              </div>
            </div>
            <Button onClick={disable2FA} variant="outline" className="w-full border-red-600 text-red-400">
              Disable 2FA
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
