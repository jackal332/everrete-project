"use client"

export const dynamic = "force-dynamic"

import { useState } from "react"
import { useUser } from "@/context/user-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { User, Mail, Phone, Calendar, Award, TrendingUp, Users, Target, Edit, Shield, AlertCircle } from "lucide-react"

export default function UserPage() {
  const { user, loading } = useUser()
  const [isEditing, setIsEditing] = useState(false)

  if (loading) {
    return (
      <div className="container mx-auto py-6 px-4 space-y-6">
        <div className="text-center mb-6">
          <Skeleton className="h-8 w-48 mx-auto mb-2" />
          <Skeleton className="h-4 w-64 mx-auto" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4">
                <Skeleton className="h-16 w-16 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-32" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="container mx-auto py-10 px-4">
        <div className="max-w-md mx-auto text-center">
          <AlertCircle className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4 text-yellow-200">Authentication Required</h2>
          <p className="text-yellow-300 mb-6">Please log in to access your user profile.</p>
          <Button
            onClick={() => (window.location.href = "/login")}
            className="w-full bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800"
          >
            Go to Login
          </Button>
        </div>
      </div>
    )
  }

  const userStats = {
    totalEarnings: user.balance || 0,
    tasksCompleted: user.tasksCompleted || 0,
    referrals: user.referrals || 0,
    joinDate: user.createdAt || new Date().toISOString(),
    currentPackage: user.package || "Not Activated",
    level: user.jobTier || 0,
  }

  return (
    <div className="container mx-auto py-6 px-4 space-y-6">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-amber-400 bg-clip-text text-transparent">
          User Profile
        </h1>
        <p className="text-yellow-200 mt-2">Manage your account and view your progress</p>
      </div>

      {/* Profile Card */}
      <Card className="bg-black/40 border-yellow-600/30">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-yellow-400">
              <User className="h-5 w-5" />
              Profile Information
            </CardTitle>
            <Button
              variant="outline"
              size="sm"
              className="border-yellow-600 text-yellow-400 hover:bg-yellow-600/20 bg-transparent"
              onClick={() => setIsEditing(!isEditing)}
            >
              <Edit className="h-4 w-4 mr-1" />
              {isEditing ? "Cancel" : "Edit"}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="flex flex-col items-center">
              <Avatar className="h-24 w-24 border-4 border-yellow-600/50">
                <AvatarImage
                  src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}&backgroundColor=fbbf24`}
                  alt={user.name}
                />
                <AvatarFallback className="bg-yellow-600 text-white text-xl">
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <Badge className="mt-2 bg-yellow-600 text-white">
                <Shield className="h-3 w-3 mr-1" />
                Verified
              </Badge>
            </div>

            <div className="flex-1 space-y-4 text-center md:text-left">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-yellow-400 justify-center md:justify-start">
                    <User className="h-4 w-4" />
                    <span className="text-sm font-medium">Full Name</span>
                  </div>
                  <p className="text-yellow-200 font-semibold">{user.name}</p>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-yellow-400 justify-center md:justify-start">
                    <Mail className="h-4 w-4" />
                    <span className="text-sm font-medium">Email</span>
                  </div>
                  <p className="text-yellow-200">{user.email}</p>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-yellow-400 justify-center md:justify-start">
                    <Phone className="h-4 w-4" />
                    <span className="text-sm font-medium">Phone</span>
                  </div>
                  <p className="text-yellow-200">{user.phone || "Not provided"}</p>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-yellow-400 justify-center md:justify-start">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm font-medium">Member Since</span>
                  </div>
                  <p className="text-yellow-200">
                    {new Date(userStats.joinDate).toLocaleDateString("en-KE", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-black/40 border-green-600/30">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-green-600/20 rounded-full mx-auto mb-2">
              <TrendingUp className="h-6 w-6 text-green-400" />
            </div>
            <div className="text-2xl font-bold text-green-400">KES {userStats.totalEarnings.toLocaleString()}</div>
            <div className="text-sm text-yellow-300">Total Earnings</div>
          </CardContent>
        </Card>

        <Card className="bg-black/40 border-blue-600/30">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-600/20 rounded-full mx-auto mb-2">
              <Target className="h-6 w-6 text-blue-400" />
            </div>
            <div className="text-2xl font-bold text-blue-400">{userStats.tasksCompleted}</div>
            <div className="text-sm text-yellow-300">Tasks Completed</div>
          </CardContent>
        </Card>

        <Card className="bg-black/40 border-purple-600/30">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-purple-600/20 rounded-full mx-auto mb-2">
              <Users className="h-6 w-6 text-purple-400" />
            </div>
            <div className="text-2xl font-bold text-purple-400">{userStats.referrals}</div>
            <div className="text-sm text-yellow-300">Referrals</div>
          </CardContent>
        </Card>

        <Card className="bg-black/40 border-yellow-600/30">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-yellow-600/20 rounded-full mx-auto mb-2">
              <Award className="h-6 w-6 text-yellow-400" />
            </div>
            <div className="text-2xl font-bold text-yellow-400">Level {userStats.level}</div>
            <div className="text-sm text-yellow-300">{userStats.currentPackage}</div>
          </CardContent>
        </Card>
      </div>

      {/* Account Status */}
      <Card className="bg-black/40 border-yellow-600/30">
        <CardHeader>
          <CardTitle className="text-yellow-400">Account Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-yellow-300 mb-2">Current Package</h4>
              <Badge className={`${user.isActivated ? "bg-green-600" : "bg-red-600"} text-white`}>
                {user.isActivated ? `Active - ${userStats.currentPackage}` : "Not Activated"}
              </Badge>
              {!user.isActivated && (
                <p className="text-sm text-yellow-400 mt-2">Activate your account to start earning daily income</p>
              )}
            </div>

            <div>
              <h4 className="font-semibold text-yellow-300 mb-2">Account Health</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-sm text-yellow-200">Email Verified</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 ${user.phone ? "bg-green-400" : "bg-red-400"} rounded-full`}></div>
                  <span className="text-sm text-yellow-200">Phone {user.phone ? "Verified" : "Not Verified"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 ${user.isActivated ? "bg-green-400" : "bg-yellow-400"} rounded-full`}></div>
                  <span className="text-sm text-yellow-200">Package {user.isActivated ? "Active" : "Pending"}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Button
          className="bg-gradient-to-r from-yellow-600 to-amber-600 hover:from-yellow-700 hover:to-amber-700 text-white font-semibold py-3"
          onClick={() => (window.location.href = "/dashboard/packages")}
        >
          {user.isActivated ? "Upgrade Package" : "Activate Account"}
        </Button>

        <Button
          variant="outline"
          className="border-yellow-600 text-yellow-400 hover:bg-yellow-600/20 font-semibold py-3 bg-transparent"
          onClick={() => (window.location.href = "/dashboard/settings")}
        >
          Account Settings
        </Button>
      </div>
    </div>
  )
}
