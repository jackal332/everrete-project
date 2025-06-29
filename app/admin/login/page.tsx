"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { Shield, Lock, Mail } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function AdminLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const ADMIN_EMAIL = "teverret944@gmail.com"
  const ADMIN_PASSWORD = "Musyoki801@"

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate loading delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      // Set admin session
      localStorage.setItem(
        "admin-session",
        JSON.stringify({
          email: ADMIN_EMAIL,
          loginTime: new Date().toISOString(),
          isAdmin: true,
        }),
      )

      toast({
        title: "Login Successful",
        description: "Welcome to Everett Admin Dashboard",
      })

      router.push("/admin/dashboard")
    } else {
      toast({
        title: "Access Denied",
        description: "Invalid admin credentials. Access denied.",
        variant: "destructive",
      })
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-900 via-yellow-800 to-amber-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-black/40 border-red-600/50">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-red-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="h-8 w-8 text-red-400" />
          </div>
          <CardTitle className="text-2xl font-bold text-red-400">Admin Access</CardTitle>
          <p className="text-yellow-200">Everett Platform Management</p>
        </CardHeader>
        <CardContent>
          <Alert className="mb-6 bg-red-600/20 border-red-600/50">
            <Lock className="h-4 w-4" />
            <AlertDescription className="text-red-200">
              This area is restricted to authorized administrators only.
            </AlertDescription>
          </Alert>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-yellow-300">
                Admin Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-yellow-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter admin email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="pl-10 bg-yellow-900/20 border-yellow-600/50 text-yellow-200 placeholder-yellow-400/50"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-yellow-300">
                Admin Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-yellow-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter admin password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pl-10 bg-yellow-900/20 border-yellow-600/50 text-yellow-200 placeholder-yellow-400/50"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-3"
            >
              {isLoading ? "Authenticating..." : "Access Admin Panel"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-xs text-yellow-400">Unauthorized access attempts are logged and monitored.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
