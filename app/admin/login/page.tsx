"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { EverettIcon } from "@/components/everett-icon"
import { ScatteredCoins } from "@/components/scattered-coins"
import { useToast } from "@/components/ui/use-toast"
import { Shield, Lock, User, KeyRound } from "lucide-react"

export default function AdminLogin() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [otpSent, setOtpSent] = useState(false)
  const [otp, setOtp] = useState("")
  const router = useRouter()
  const { toast } = useToast()

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulate credential verification
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Check admin credentials (in production, this would be server-side)
      if (username === "admin" && password === "everett2024") {
        // Simulate OTP sending
        await new Promise((resolve) => setTimeout(resolve, 500))

        setOtpSent(true)
        toast({
          title: "Verification Code Sent",
          description: "A one-time password has been sent to your registered device",
        })
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid admin credentials",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Login Error",
        description: "An error occurred during login",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!otp || otp.length !== 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter the 6-digit verification code",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      // Simulate OTP verification
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // For demo purposes, any 6-digit code works
      if (otp.length === 6) {
        localStorage.setItem("admin-token", "authenticated")
        toast({
          title: "Admin Login Successful",
          description: "Welcome to the Everett Admin Panel",
        })
        router.push("/admin")
      } else {
        toast({
          title: "Invalid Code",
          description: "The verification code is incorrect",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Verification Error",
        description: "An error occurred during verification",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      <ScatteredCoins count={20} />

      <Card className="w-full max-w-md bg-black/80 border-yellow-600 relative z-10">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <EverettIcon size={64} />
          </div>
          <CardTitle className="text-2xl text-yellow-400 flex items-center justify-center gap-2">
            <Shield className="w-6 h-6" />
            Admin Panel
          </CardTitle>
          <p className="text-yellow-200">Secure Administrator Access</p>
        </CardHeader>
        <CardContent>
          {!otpSent ? (
            <form onSubmit={handleSendOTP} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-yellow-300 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Username
                </Label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter admin username"
                  required
                  className="bg-black/50 border-yellow-600/50 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-yellow-300 flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  required
                  className="bg-black/50 border-yellow-600/50 text-white"
                />
              </div>

              <Button type="submit" className="w-full everett-gradient text-white font-bold" disabled={isLoading}>
                {isLoading ? "Verifying..." : "Continue"}
              </Button>

              <div className="text-center mt-4">
                <p className="text-yellow-300 text-sm">
                  Need an admin account?{" "}
                  <Link href="/admin/register" className="text-yellow-400 hover:underline">
                    Register
                  </Link>
                </p>
              </div>
            </form>
          ) : (
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="p-4 bg-yellow-900/20 rounded-lg border border-yellow-600/30 mb-4">
                <p className="text-yellow-200 text-sm">
                  A verification code has been sent to your registered device. Please enter it below to complete login.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="otp" className="text-yellow-300 flex items-center gap-2">
                  <KeyRound className="w-4 h-4" />
                  Verification Code (OTP)
                </Label>
                <Input
                  id="otp"
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter 6-digit code"
                  required
                  maxLength={6}
                  className="bg-black/50 border-yellow-600/50 text-white text-center text-xl tracking-widest"
                />
              </div>

              <Button type="submit" className="w-full everett-gradient text-white font-bold" disabled={isLoading}>
                {isLoading ? "Verifying..." : "Login to Admin Panel"}
              </Button>

              <Button
                type="button"
                variant="outline"
                className="w-full border-yellow-600/50 text-yellow-400"
                onClick={() => setOtpSent(false)}
              >
                Back
              </Button>
            </form>
          )}

          <div className="mt-6 p-4 bg-yellow-900/20 rounded-lg border border-yellow-600/30">
            <h4 className="font-semibold text-yellow-300 mb-2">Demo Credentials:</h4>
            <p className="text-sm text-yellow-200">Username: admin</p>
            <p className="text-sm text-yellow-200">Password: everett2024</p>
            <p className="text-xs text-yellow-500 mt-2">For demo purposes, any 6-digit code will work as the OTP</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
