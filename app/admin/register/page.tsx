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
import { Shield, Lock, User, Mail, Phone, KeyRound } from "lucide-react"

export default function AdminRegister() {
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    secretKey: "", // Admin registration secret key
  })
  const [isLoading, setIsLoading] = useState(false)
  const [otpSent, setOtpSent] = useState(false)
  const [otp, setOtp] = useState("")
  const router = useRouter()
  const { toast } = useToast()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (
      !formData.fullName ||
      !formData.username ||
      !formData.email ||
      !formData.phone ||
      !formData.password ||
      !formData.secretKey
    ) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match",
        variant: "destructive",
      })
      return
    }

    // Validate secret key (in production, this would be checked server-side)
    if (formData.secretKey !== "EVERETT-ADMIN-2024") {
      toast({
        title: "Invalid Secret Key",
        description: "The admin registration key is incorrect",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      // Simulate OTP sending
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setOtpSent(true)
      toast({
        title: "OTP Sent",
        description: "A verification code has been sent to your phone and email",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send OTP. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
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
      // Simulate registration process
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // In a real app, this would send the data to the server
      localStorage.setItem("admin-registered", "true")

      toast({
        title: "Registration Successful",
        description: "Your admin account has been created",
      })

      router.push("/admin/login")
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: "An error occurred during registration",
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
            Admin Registration
          </CardTitle>
          <p className="text-yellow-200">Create a secure administrator account</p>
        </CardHeader>
        <CardContent>
          {!otpSent ? (
            <form onSubmit={handleSendOTP} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-yellow-300 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Full Name
                </Label>
                <Input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                  className="bg-black/50 border-yellow-600/50 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="username" className="text-yellow-300 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Username
                </Label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Choose a username"
                  required
                  className="bg-black/50 border-yellow-600/50 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-yellow-300 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                  className="bg-black/50 border-yellow-600/50 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-yellow-300 flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
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
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a strong password"
                  required
                  className="bg-black/50 border-yellow-600/50 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-yellow-300 flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  Confirm Password
                </Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  required
                  className="bg-black/50 border-yellow-600/50 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="secretKey" className="text-yellow-300 flex items-center gap-2">
                  <KeyRound className="w-4 h-4" />
                  Admin Secret Key
                </Label>
                <Input
                  id="secretKey"
                  name="secretKey"
                  type="password"
                  value={formData.secretKey}
                  onChange={handleChange}
                  placeholder="Enter the admin secret key"
                  required
                  className="bg-black/50 border-yellow-600/50 text-white"
                />
              </div>

              <Button type="submit" className="w-full everett-gradient text-white font-bold" disabled={isLoading}>
                {isLoading ? "Sending Verification Code..." : "Continue"}
              </Button>

              <div className="text-center mt-4">
                <p className="text-yellow-300 text-sm">
                  Already have an admin account?{" "}
                  <Link href="/admin/login" className="text-yellow-400 hover:underline">
                    Login
                  </Link>
                </p>
              </div>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="p-4 bg-yellow-900/20 rounded-lg border border-yellow-600/30 mb-4">
                <p className="text-yellow-200 text-sm">
                  A verification code has been sent to your phone and email. Please enter it below to complete
                  registration.
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
                {isLoading ? "Creating Account..." : "Complete Registration"}
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
            <h4 className="font-semibold text-yellow-300 mb-2">Demo Secret Key:</h4>
            <p className="text-sm text-yellow-200">EVERETT-ADMIN-2024</p>
            <p className="text-xs text-yellow-500 mt-2">
              Note: In a production environment, this key would be securely distributed to authorized personnel only.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
