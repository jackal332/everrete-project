"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/components/auth-provider"
import { useToast } from "@/components/ui/use-toast"
import { ScatteredCoins } from "@/components/scattered-coins"
import {
  User,
  Mail,
  Phone,
  Calendar,
  Award,
  TrendingUp,
  Users,
  DollarSign,
  Star,
  Crown,
  Diamond,
  Package,
  Copy,
  Share2,
  Edit,
  Settings,
  Shield,
} from "lucide-react"

export default function ProfilePage() {
  const { user, logout } = useAuth()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("overview")

  const copyReferralCode = () => {
    if (user?.referralCode) {
      navigator.clipboard.writeText(user.referralCode)
      toast({
        title: "Copied!",
        description: "Referral code copied to clipboard",
      })
    }
  }

  const shareProfile = () => {
    const referralLink = `https://everett-platform.vercel.app/register?ref=${user?.referralCode}`

    if (navigator.share) {
      navigator.share({
        title: "Join Everett",
        text: `Join me on Everett and start earning! Use my referral code: ${user?.referralCode}`,
        url: referralLink,
      })
    } else {
      navigator.clipboard.writeText(referralLink)
      toast({
        title: "Link Copied!",
        description: "Referral link copied to clipboard",
      })
    }
  }

  const getJobTierIcon = (tier: number | null) => {
    if (tier === null) return <Package className="w-6 h-6" />
    if (tier <= 2) return <Package className="w-6 h-6" />
    if (tier <= 4) return <Star className="w-6 h-6" />
    if (tier <= 6) return <Crown className="w-6 h-6" />
    return <Diamond className="w-6 h-6" />
  }

  const getJobTierColor = (tier: number | null) => {
    if (tier === null) return "text-gray-400"
    if (tier <= 2) return "text-blue-400"
    if (tier <= 4) return "text-yellow-400"
    if (tier <= 6) return "text-purple-400"
    return "text-pink-400"
  }

  const achievements = [
    { id: 1, name: "First Task", description: "Complete your first task", earned: true },
    { id: 2, name: "Week Warrior", description: "Complete tasks for 7 days straight", earned: true },
    { id: 3, name: "Referral Master", description: "Refer 10 users", earned: user?.referralCount >= 10 },
    { id: 4, name: "High Earner", description: "Earn 50,000 KES", earned: (user?.totalEarned || 0) >= 50000 },
    { id: 5, name: "Team Builder", description: "Build a team of 25 referrals", earned: false },
    { id: 6, name: "Elite Member", description: "Reach Job Tier 5", earned: (user?.jobTier || 0) >= 5 },
  ]

  const recentActivity = [
    { id: 1, type: "Task Completed", description: "Video watching task", amount: 270, date: "2 hours ago" },
    { id: 2, type: "Referral Bonus", description: "New user joined", amount: 240, date: "Yesterday" },
    { id: 3, type: "Daily Bonus", description: "Login streak bonus", amount: 50, date: "2 days ago" },
    { id: 4, type: "Task Completed", description: "Survey completion", amount: 180, date: "3 days ago" },
  ]

  return (
    <div className="min-h-screen relative">
      <ScatteredCoins count={30} />

      <div className="p-4 space-y-6 relative z-10">
        {/* Profile Header */}
        <Card className="black-section border-yellow-600/30">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              {/* Avatar */}
              <div className="relative">
                <div className="w-24 h-24 everett-gradient rounded-full flex items-center justify-center text-white text-3xl font-bold">
                  {user?.name?.charAt(0) || "U"}
                </div>
                <div
                  className={`absolute -bottom-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center ${getJobTierColor(user?.jobTier)} bg-black border-2 border-yellow-600`}
                >
                  {getJobTierIcon(user?.jobTier)}
                </div>
              </div>

              {/* User Info */}
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-2xl font-bold text-white mb-2">{user?.name || "User"}</h1>
                <p className="text-yellow-400 mb-2">{user?.email}</p>
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  <Badge className={user?.isActivated ? "bg-green-500" : "bg-red-500"}>
                    {user?.isActivated ? "Activated" : "Not Activated"}
                  </Badge>
                  {user?.jobTier !== null && (
                    <Badge className="everett-gradient text-white">Job Tier {user.jobTier}</Badge>
                  )}
                  <Badge variant="outline" className="border-yellow-600 text-yellow-400">
                    Member since Jan 2024
                  </Badge>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button size="sm" className="everett-gradient text-white">
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </Button>
                <Button size="sm" variant="outline" className="border-yellow-600 text-yellow-400">
                  <Settings className="w-4 h-4 mr-1" />
                  Settings
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Navigation Tabs */}
        <div className="flex gap-2 overflow-x-auto">
          {[
            { id: "overview", label: "Overview", icon: User },
            { id: "earnings", label: "Earnings", icon: DollarSign },
            { id: "achievements", label: "Achievements", icon: Award },
            { id: "activity", label: "Activity", icon: TrendingUp },
            { id: "referrals", label: "Referrals", icon: Users },
          ].map((tab) => (
            <Button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              variant={activeTab === tab.id ? "default" : "outline"}
              className={
                activeTab === tab.id
                  ? "everett-gradient text-white"
                  : "border-yellow-600 text-yellow-400 hover:bg-yellow-900/20"
              }
              size="sm"
            >
              <tab.icon className="w-4 h-4 mr-2" />
              {tab.label}
            </Button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Quick Stats */}
            <Card className="black-section border-yellow-600/30">
              <CardHeader>
                <CardTitle className="text-yellow-400 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Quick Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-yellow-500">Tasks Completed:</span>
                  <span className="text-white font-semibold">{user?.tasksCompleted || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-yellow-500">Total Earned:</span>
                  <span className="text-green-400 font-semibold">{user?.totalEarned?.toLocaleString() || 0} KES</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-yellow-500">Referrals:</span>
                  <span className="text-blue-400 font-semibold">{user?.referralCount || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-yellow-500">Current Balance:</span>
                  <span className="text-yellow-300 font-semibold">{user?.balance?.toLocaleString() || 0} KES</span>
                </div>
              </CardContent>
            </Card>

            {/* Account Details */}
            <Card className="black-section border-yellow-600/30">
              <CardHeader>
                <CardTitle className="text-yellow-400 flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Account Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-yellow-500" />
                  <span className="text-white text-sm">{user?.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-yellow-500" />
                  <span className="text-white text-sm">+254 700 123 456</span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-yellow-500" />
                  <span className="text-white text-sm">Joined January 2024</span>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="w-4 h-4 text-yellow-500" />
                  <span className="text-white text-sm">Security: 2FA Enabled</span>
                </div>
              </CardContent>
            </Card>

            {/* Referral Code */}
            <Card className="black-section border-yellow-600/30">
              <CardHeader>
                <CardTitle className="text-yellow-400 flex items-center gap-2">
                  <Share2 className="w-5 h-5" />
                  Referral Code
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 bg-yellow-900/20 rounded-lg border border-yellow-600/30">
                  <p className="text-center font-mono text-lg text-white">{user?.referralCode || "REF123456"}</p>
                </div>
                <div className="flex gap-2">
                  <Button onClick={copyReferralCode} size="sm" className="flex-1 everett-gradient text-white">
                    <Copy className="w-4 h-4 mr-1" />
                    Copy
                  </Button>
                  <Button
                    onClick={shareProfile}
                    size="sm"
                    variant="outline"
                    className="border-yellow-600 text-yellow-400"
                  >
                    <Share2 className="w-4 h-4 mr-1" />
                    Share
                  </Button>
                </div>
                <p className="text-xs text-yellow-500 text-center">Earn 8% commission on every referral</p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Earnings Tab */}
        {activeTab === "earnings" && (
          <div className="space-y-6">
            {/* Earnings Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="black-section border-green-600/30">
                <CardContent className="p-4 text-center">
                  <DollarSign className="w-8 h-8 mx-auto mb-2 text-green-400" />
                  <p className="text-2xl font-bold text-green-300">{user?.balance?.toLocaleString() || 0}</p>
                  <p className="text-sm text-green-500">Current Balance (KES)</p>
                </CardContent>
              </Card>
              <Card className="black-section border-blue-600/30">
                <CardContent className="p-4 text-center">
                  <TrendingUp className="w-8 h-8 mx-auto mb-2 text-blue-400" />
                  <p className="text-2xl font-bold text-blue-300">{user?.totalEarned?.toLocaleString() || 0}</p>
                  <p className="text-sm text-blue-500">Total Earned (KES)</p>
                </CardContent>
              </Card>
              <Card className="black-section border-purple-600/30">
                <CardContent className="p-4 text-center">
                  <Users className="w-8 h-8 mx-auto mb-2 text-purple-400" />
                  <p className="text-2xl font-bold text-purple-300">{user?.inviteBalance?.toLocaleString() || 0}</p>
                  <p className="text-sm text-purple-500">Referral Earnings (KES)</p>
                </CardContent>
              </Card>
              <Card className="black-section border-yellow-600/30">
                <CardContent className="p-4 text-center">
                  <Award className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
                  <p className="text-2xl font-bold text-yellow-300">2,450</p>
                  <p className="text-sm text-yellow-500">This Month (KES)</p>
                </CardContent>
              </Card>
            </div>

            {/* Earnings Breakdown */}
            <Card className="black-section border-yellow-600/30">
              <CardHeader>
                <CardTitle className="text-yellow-400">Earnings Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-yellow-900/20 rounded-lg">
                    <div>
                      <p className="font-semibold text-white">Task Earnings</p>
                      <p className="text-sm text-yellow-500">Daily task completions</p>
                    </div>
                    <p className="text-green-400 font-bold">+{((user?.totalEarned || 0) * 0.7).toLocaleString()} KES</p>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-yellow-900/20 rounded-lg">
                    <div>
                      <p className="font-semibold text-white">Referral Bonuses</p>
                      <p className="text-sm text-yellow-500">8% commission from referrals</p>
                    </div>
                    <p className="text-blue-400 font-bold">+{user?.inviteBalance?.toLocaleString() || 0} KES</p>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-yellow-900/20 rounded-lg">
                    <div>
                      <p className="font-semibold text-white">Bonus Earnings</p>
                      <p className="text-sm text-yellow-500">Login streaks and special bonuses</p>
                    </div>
                    <p className="text-purple-400 font-bold">
                      +{((user?.totalEarned || 0) * 0.1).toLocaleString()} KES
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Achievements Tab */}
        {activeTab === "achievements" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {achievements.map((achievement) => (
                <Card
                  key={achievement.id}
                  className={`black-section ${achievement.earned ? "border-green-600/50" : "border-gray-600/30"}`}
                >
                  <CardContent className="p-4 text-center">
                    <div
                      className={`w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center ${
                        achievement.earned ? "bg-green-500" : "bg-gray-600"
                      }`}
                    >
                      <Award className="w-6 h-6 text-white" />
                    </div>
                    <h3 className={`font-bold mb-2 ${achievement.earned ? "text-green-400" : "text-gray-400"}`}>
                      {achievement.name}
                    </h3>
                    <p className="text-sm text-yellow-500">{achievement.description}</p>
                    {achievement.earned && <Badge className="mt-2 bg-green-500 text-white">Earned</Badge>}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Activity Tab */}
        {activeTab === "activity" && (
          <Card className="black-section border-yellow-600/30">
            <CardHeader>
              <CardTitle className="text-yellow-400">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex justify-between items-center p-3 bg-yellow-900/20 rounded-lg">
                    <div>
                      <p className="font-semibold text-white">{activity.type}</p>
                      <p className="text-sm text-yellow-500">{activity.description}</p>
                      <p className="text-xs text-yellow-600">{activity.date}</p>
                    </div>
                    <p className="text-green-400 font-bold">+{activity.amount} KES</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Referrals Tab */}
        {activeTab === "referrals" && (
          <div className="space-y-6">
            {/* Referral Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="black-section border-blue-600/30">
                <CardContent className="p-4 text-center">
                  <Users className="w-8 h-8 mx-auto mb-2 text-blue-400" />
                  <p className="text-2xl font-bold text-blue-300">{user?.referralCount || 0}</p>
                  <p className="text-sm text-blue-500">Total Referrals</p>
                </CardContent>
              </Card>
              <Card className="black-section border-green-600/30">
                <CardContent className="p-4 text-center">
                  <DollarSign className="w-8 h-8 mx-auto mb-2 text-green-400" />
                  <p className="text-2xl font-bold text-green-300">{user?.inviteBalance?.toLocaleString() || 0}</p>
                  <p className="text-sm text-green-500">Referral Earnings (KES)</p>
                </CardContent>
              </Card>
              <Card className="black-section border-purple-600/30">
                <CardContent className="p-4 text-center">
                  <TrendingUp className="w-8 h-8 mx-auto mb-2 text-purple-400" />
                  <p className="text-2xl font-bold text-purple-300">8%</p>
                  <p className="text-sm text-purple-500">Commission Rate</p>
                </CardContent>
              </Card>
            </div>

            {/* Referral Link */}
            <Card className="black-section border-yellow-600/30">
              <CardHeader>
                <CardTitle className="text-yellow-400">Your Referral Link</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 bg-yellow-900/20 rounded-lg border border-yellow-600/30">
                  <p className="text-sm text-white break-all">
                    https://everett-platform.vercel.app/register?ref={user?.referralCode || "REF123456"}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button onClick={copyReferralCode} className="flex-1 everett-gradient text-white">
                    <Copy className="w-4 h-4 mr-2" />
                    Copy Link
                  </Button>
                  <Button onClick={shareProfile} variant="outline" className="border-yellow-600 text-yellow-400">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
