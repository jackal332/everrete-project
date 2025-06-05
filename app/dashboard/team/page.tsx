"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/components/auth-provider"
import { useToast } from "@/components/ui/use-toast"
import { Users, Share2, Copy, TrendingUp, Award, DollarSign } from "lucide-react"

interface TeamMember {
  id: string
  name: string
  joinDate: string
  jobTier: number
  totalEarned: number
  status: "active" | "inactive"
  commission: number
}

export default function TeamPage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    {
      id: "1",
      name: "John Doe",
      joinDate: "2024-04-15", // More recent date
      jobTier: 3,
      totalEarned: 15000,
      status: "active",
      commission: 1200,
    },
    {
      id: "2",
      name: "Jane Smith",
      joinDate: "2024-04-22", // More recent date
      jobTier: 2,
      totalEarned: 8500,
      status: "active",
      commission: 680,
    },
    {
      id: "3",
      name: "Mike Johnson",
      joinDate: "2024-05-01", // More recent date
      jobTier: 1,
      totalEarned: 3000,
      status: "inactive",
      commission: 240,
    },
  ])

  const [teamStats, setTeamStats] = useState({
    totalMembers: 0,
    activeMembers: 0,
    totalCommissions: 0,
    monthlyCommissions: 0,
  })

  useEffect(() => {
    calculateTeamStats()
  }, [teamMembers])

  const calculateTeamStats = () => {
    const totalMembers = teamMembers.length
    const activeMembers = teamMembers.filter((m) => m.status === "active").length
    const totalCommissions = teamMembers.reduce((sum, m) => sum + m.commission, 0)
    const monthlyCommissions = totalCommissions * 0.3 // Assuming 30% is from this month

    setTeamStats({
      totalMembers,
      activeMembers,
      totalCommissions,
      monthlyCommissions,
    })
  }

  const copyReferralCode = () => {
    if (user?.referralCode) {
      navigator.clipboard.writeText(user.referralCode)
      toast({
        title: "Copied!",
        description: "Referral code copied to clipboard",
      })
    }
  }

  const shareReferralLink = () => {
    const referralLink = `https://everett-platform.vercel.app/register?ref=${user?.referralCode}`

    if (navigator.share) {
      navigator.share({
        title: "Join Everett and Start Earning!",
        text: "I'm earning real money daily with Everett. Join me and start your financial journey!",
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

  const getJobTierColor = (tier: number) => {
    const colors = [
      "bg-gray-500",
      "bg-green-500",
      "bg-blue-500",
      "bg-purple-500",
      "bg-yellow-500",
      "bg-orange-500",
      "bg-red-500",
      "bg-pink-500",
      "bg-indigo-500",
      "bg-cyan-500",
    ]
    return colors[tier] || "bg-gray-500"
  }

  return (
    <div className="max-w-md mx-auto p-4 space-y-6">
      {/* Team Overview */}
      <Card className="bg-gradient-to-r from-blue-900 to-purple-800">
        <CardContent className="p-6 text-center">
          <h1 className="text-2xl font-bold mb-2">Build Your Team 🤝</h1>
          <p className="text-blue-200">Invite members and earn 8% commission</p>
        </CardContent>
      </Card>

      {/* Team Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="bg-green-950/20 border-green-900/50">
          <CardContent className="p-4 text-center">
            <Users className="w-8 h-8 mx-auto mb-2 text-green-500" />
            <p className="text-2xl font-bold text-green-400">{teamStats.totalMembers}</p>
            <p className="text-sm text-green-600">Total Members</p>
          </CardContent>
        </Card>

        <Card className="bg-blue-950/20 border-blue-900/50">
          <CardContent className="p-4 text-center">
            <TrendingUp className="w-8 h-8 mx-auto mb-2 text-blue-500" />
            <p className="text-2xl font-bold text-blue-400">{teamStats.activeMembers}</p>
            <p className="text-sm text-blue-600">Active Members</p>
          </CardContent>
        </Card>
      </div>

      {/* Commission Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="bg-yellow-950/20 border-yellow-900/50">
          <CardContent className="p-4 text-center">
            <DollarSign className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
            <p className="text-2xl font-bold text-yellow-400">{teamStats.totalCommissions.toLocaleString()}</p>
            <p className="text-sm text-yellow-600">Total Earned (KES)</p>
          </CardContent>
        </Card>

        <Card className="bg-purple-950/20 border-purple-900/50">
          <CardContent className="p-4 text-center">
            <Award className="w-8 h-8 mx-auto mb-2 text-purple-500" />
            <p className="text-2xl font-bold text-purple-400">{teamStats.monthlyCommissions.toLocaleString()}</p>
            <p className="text-sm text-purple-600">This Month (KES)</p>
          </CardContent>
        </Card>
      </div>

      {/* Referral Code */}
      <Card className="bg-yellow-950/20 border-yellow-900/50">
        <CardHeader>
          <CardTitle className="text-yellow-500">Your Referral Code</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Input
                value={user?.referralCode || ""}
                readOnly
                className="bg-black/30 border-yellow-900 text-white font-mono text-lg text-center"
              />
              <Button onClick={copyReferralCode} size="icon" className="gold-gradient text-black">
                <Copy className="w-4 h-4" />
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Button onClick={shareReferralLink} className="gold-gradient text-black">
                <Share2 className="w-4 h-4 mr-2" />
                Share Link
              </Button>
              <Button variant="outline" className="border-yellow-600 text-yellow-500">
                <Users className="w-4 h-4 mr-2" />
                Invite Friends
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Commission Structure */}
      <Card className="bg-yellow-950/20 border-yellow-900/50">
        <CardHeader>
          <CardTitle className="text-yellow-500">Commission Structure</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-black/30 rounded-lg">
              <span>Direct Referral</span>
              <Badge className="bg-green-500 text-white">8% of deposit</Badge>
            </div>
            <div className="flex justify-between items-center p-3 bg-black/30 rounded-lg">
              <span>Level 2 (A-Level)</span>
              <Badge className="bg-blue-500 text-white">3% of deposit</Badge>
            </div>
            <div className="flex justify-between items-center p-3 bg-black/30 rounded-lg">
              <span>Level 3 (B-Level)</span>
              <Badge className="bg-purple-500 text-white">2% of deposit</Badge>
            </div>
            <div className="flex justify-between items-center p-3 bg-black/30 rounded-lg">
              <span>Level 4 (C-Level)</span>
              <Badge className="bg-orange-500 text-white">1% of deposit</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Team Members */}
      <Card className="bg-yellow-950/20 border-yellow-900/50">
        <CardHeader>
          <CardTitle className="text-yellow-500">Your Team</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {teamMembers.map((member) => (
              <div key={member.id} className="p-4 bg-black/30 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center text-black font-bold">
                      {member.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold">{member.name}</p>
                      <p className="text-sm text-yellow-600">Joined {new Date(member.joinDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className={member.status === "active" ? "bg-green-500" : "bg-gray-500"}>
                      {member.status}
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-sm">
                  <div className="text-center">
                    <Badge className={getJobTierColor(member.jobTier)}>Job {member.jobTier}</Badge>
                    <p className="text-yellow-600 mt-1">Tier</p>
                  </div>
                  <div className="text-center">
                    <p className="font-bold">{member.totalEarned.toLocaleString()}</p>
                    <p className="text-yellow-600">Total Earned</p>
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-green-400">+{member.commission}</p>
                    <p className="text-yellow-600">Your Commission</p>
                  </div>
                </div>
              </div>
            ))}

            {teamMembers.length === 0 && (
              <div className="text-center py-8">
                <Users className="w-16 h-16 mx-auto mb-4 text-yellow-600" />
                <p className="text-yellow-600 mb-4">No team members yet</p>
                <Button onClick={shareReferralLink} className="gold-gradient text-black">
                  Invite Your First Member
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Team Building Tips */}
      <Card className="bg-purple-950/20 border-purple-900/50">
        <CardHeader>
          <CardTitle className="text-purple-400">Team Building Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            <div className="p-3 bg-black/30 rounded-lg">
              <p className="text-purple-200">
                Share your success story! People are more likely to join when they see real results.
              </p>
            </div>
            <div className="p-3 bg-black/30 rounded-lg">
              <p className="text-purple-200">
                Focus on quality over quantity. Help your referrals succeed to maximize long-term earnings.
              </p>
            </div>
            <div className="p-3 bg-black/30 rounded-lg">
              <p className="text-purple-200">Best sharing times: 7-9 PM when people are most active on social media.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
