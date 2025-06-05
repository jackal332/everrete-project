"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useAuth } from "@/components/auth-provider"
import { useToast } from "@/components/ui/use-toast"
import { TwoFactorAuth } from "@/components/two-factor-auth"
import { ScatteredCoins } from "@/components/scattered-coins"
import { User, Lock, Bell, Smartphone, Mail, Shield } from "lucide-react"

export default function SettingsPage() {
  const { user, updateUser } = useAuth()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)

  // Form states
  const [name, setName] = useState(user?.name || "")
  const [email, setEmail] = useState(user?.email || "")
  const [phone, setPhone] = useState("")
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  // Notification settings
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [smsNotifications, setSmsNotifications] = useState(false)
  const [pushNotifications, setPushNotifications] = useState(true)
  const [taskReminders, setTaskReminders] = useState(true)

  const handleProfileUpdate = async () => {
    setIsLoading(true)
    try {
      updateUser({ name, email })
      toast({
        title: "Profile Updated",
        description: "Your profile information has been updated successfully.",
      })
    } catch (error) {
      toast({
        title: "Update Failed",
        description: "There was an error updating your profile.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "New passwords do not match.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      toast({
        title: "Password Changed",
        description: "Your password has been updated successfully.",
      })
      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")
    } catch (error) {
      toast({
        title: "Password Change Failed",
        description: "There was an error changing your password.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleNotificationUpdate = () => {
    toast({
      title: "Notifications Updated",
      description: "Your notification preferences have been saved.",
    })
  }

  const handle2FAToggle = (enabled: boolean) => {
    setTwoFactorEnabled(enabled)
  }

  const handle2FAVerify = async (code: string): Promise<boolean> => {
    // Simulate verification
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return code === "123456" // Demo code
  }

  return (
    <div className="min-h-screen relative">
      <ScatteredCoins count={25} />

      <div className="max-w-2xl mx-auto p-4 space-y-6 relative z-10">
        {/* Profile Settings */}
        <Card className="black-section border-yellow-600/30">
          <CardHeader>
            <CardTitle className="text-yellow-400 flex items-center gap-2">
              <User className="w-5 h-5" />
              Profile Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name" className="text-yellow-300">
                  Full Name
                </Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-black/50 border-yellow-600/50 text-white"
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-yellow-300">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-black/50 border-yellow-600/50 text-white"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="phone" className="text-yellow-300">
                Phone Number
              </Label>
              <Input
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+254 700 123 456"
                className="bg-black/50 border-yellow-600/50 text-white"
              />
            </div>
            <div>
              <Label className="text-yellow-300">Referral Code</Label>
              <Input
                value={user?.referralCode || ""}
                readOnly
                className="bg-black/50 border-yellow-600/50 text-white font-mono"
              />
            </div>
            <Button onClick={handleProfileUpdate} disabled={isLoading} className="everett-gradient text-white">
              {isLoading ? "Updating..." : "Update Profile"}
            </Button>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card className="black-section border-yellow-600/30">
          <CardHeader>
            <CardTitle className="text-yellow-400 flex items-center gap-2">
              <Lock className="w-5 h-5" />
              Security Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="currentPassword" className="text-yellow-300">
                Current Password
              </Label>
              <Input
                id="currentPassword"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="bg-black/50 border-yellow-600/50 text-white"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="newPassword" className="text-yellow-300">
                  New Password
                </Label>
                <Input
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="bg-black/50 border-yellow-600/50 text-white"
                />
              </div>
              <div>
                <Label htmlFor="confirmPassword" className="text-yellow-300">
                  Confirm New Password
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="bg-black/50 border-yellow-600/50 text-white"
                />
              </div>
            </div>
            <Button
              onClick={handlePasswordChange}
              disabled={isLoading || !currentPassword || !newPassword}
              className="everett-gradient text-white"
            >
              {isLoading ? "Changing..." : "Change Password"}
            </Button>
          </CardContent>
        </Card>

        {/* Two-Factor Authentication */}
        <TwoFactorAuth isEnabled={twoFactorEnabled} onToggle={handle2FAToggle} onVerify={handle2FAVerify} />

        {/* Notification Settings */}
        <Card className="black-section border-yellow-600/30">
          <CardHeader>
            <CardTitle className="text-yellow-400 flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Notification Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-yellow-400" />
                <div>
                  <p className="font-medium text-white">Email Notifications</p>
                  <p className="text-sm text-yellow-500">Receive updates via email</p>
                </div>
              </div>
              <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Smartphone className="w-5 h-5 text-yellow-400" />
                <div>
                  <p className="font-medium text-white">SMS Notifications</p>
                  <p className="text-sm text-yellow-500">Receive updates via SMS</p>
                </div>
              </div>
              <Switch checked={smsNotifications} onCheckedChange={setSmsNotifications} />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-yellow-400" />
                <div>
                  <p className="font-medium text-white">Push Notifications</p>
                  <p className="text-sm text-yellow-500">Receive browser notifications</p>
                </div>
              </div>
              <Switch checked={pushNotifications} onCheckedChange={setPushNotifications} />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-yellow-400" />
                <div>
                  <p className="font-medium text-white">Task Reminders</p>
                  <p className="text-sm text-yellow-500">Daily task completion reminders</p>
                </div>
              </div>
              <Switch checked={taskReminders} onCheckedChange={setTaskReminders} />
            </div>

            <Button onClick={handleNotificationUpdate} className="everett-gradient text-white">
              Save Notification Settings
            </Button>
          </CardContent>
        </Card>

        {/* Account Information */}
        <Card className="black-section border-yellow-600/30">
          <CardHeader>
            <CardTitle className="text-yellow-400">Account Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex justify-between">
                <span className="text-yellow-500">Account Status:</span>
                <span className={user?.isActivated ? "text-green-400" : "text-red-400"}>
                  {user?.isActivated ? "Activated" : "Not Activated"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-yellow-500">Job Tier:</span>
                <span className="text-white">{user?.jobTier !== null ? `Job ${user.jobTier}` : "Not Set"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-yellow-500">2FA Status:</span>
                <span className={twoFactorEnabled ? "text-green-400" : "text-red-400"}>
                  {twoFactorEnabled ? "Enabled" : "Disabled"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-yellow-500">Total Earnings:</span>
                <span className="text-green-400">{user?.totalEarned?.toLocaleString() || 0} KES</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
