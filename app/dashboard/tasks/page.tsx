"use client"

import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { VideoTaskPlayer } from "@/components/video-task-player"
import { BackButton } from "@/components/back-button"
import { Lock, Play, Clock, CheckCircle } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"

const packageNames = {
  1: "Bronze",
  2: "Silver",
  3: "Gold",
  4: "Platinum",
  5: "Diamond",
  6: "Elite",
  7: "Premium",
  8: "Ultimate",
  9: "Supreme",
}

export default function TasksPage() {
  const { user, updateUser } = useAuth()
  const [currentVideo, setCurrentVideo] = useState<string | null>(null)
  const [completedToday, setCompletedToday] = useState(0)
  const [dailyLimit, setDailyLimit] = useState(0)

  useEffect(() => {
    if (user?.jobTier) {
      setDailyLimit(user.jobTier * 5) // Each tier allows 5x more tasks
    }
  }, [user?.jobTier])

  const canAccessTasks = user?.isActivated && user?.jobTier !== null

  const handleVideoComplete = (earnings: number) => {
    if (user) {
      updateUser({
        balance: user.balance + earnings,
        tasksCompleted: user.tasksCompleted + 1,
        totalEarned: user.totalEarned + earnings,
      })
      setCompletedToday((prev) => prev + 1)
      setCurrentVideo(null)
    }
  }

  const startNewTask = () => {
    // Generate a random video ID for demo
    const videoId = `video_${Math.random().toString(36).substr(2, 9)}`
    setCurrentVideo(videoId)
  }

  if (!canAccessTasks) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-900 via-yellow-800 to-amber-900">
        <div className="container mx-auto px-4 py-8">
          <BackButton />

          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto bg-yellow-900/30 rounded-full flex items-center justify-center mb-4">
              <Lock className="w-8 h-8 text-yellow-500" />
            </div>
            <h2 className="text-xl font-bold text-yellow-400 mb-2">Tasks Locked</h2>
            <p className="text-yellow-300 mb-4">You need to activate a package to access tasks</p>
            <Button
              asChild
              className="bg-gradient-to-r from-yellow-600 to-amber-600 hover:from-yellow-700 hover:to-amber-700 text-white"
            >
              <Link href="/dashboard/packages">Activate a Package</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-900 via-yellow-800 to-amber-900">
      <div className="container mx-auto px-4 py-8">
        <BackButton />

        <div className="mb-6">
          <h1 className="text-2xl font-bold text-yellow-400 mb-2">Daily Tasks</h1>
          <p className="text-yellow-300">
            Package: {packageNames[user?.jobTier as keyof typeof packageNames]} | Completed: {completedToday}/
            {dailyLimit}
          </p>
        </div>

        {currentVideo ? (
          <VideoTaskPlayer
            videoId={currentVideo}
            onComplete={handleVideoComplete}
            earnings={user?.jobTier ? user.jobTier * 10 : 50}
          />
        ) : (
          <div className="grid gap-6">
            {/* Task Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-yellow-900/20 border-yellow-700">
                <CardContent className="p-4 text-center">
                  <Clock className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                  <p className="text-yellow-300 text-sm">Tasks Today</p>
                  <p className="text-yellow-400 text-xl font-bold">
                    {completedToday}/{dailyLimit}
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-yellow-900/20 border-yellow-700">
                <CardContent className="p-4 text-center">
                  <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-2" />
                  <p className="text-yellow-300 text-sm">Total Completed</p>
                  <p className="text-yellow-400 text-xl font-bold">{user?.tasksCompleted || 0}</p>
                </CardContent>
              </Card>

              <Card className="bg-yellow-900/20 border-yellow-700">
                <CardContent className="p-4 text-center">
                  <div className="w-8 h-8 text-yellow-400 mx-auto mb-2 font-bold text-lg">KES</div>
                  <p className="text-yellow-300 text-sm">Earnings Per Task</p>
                  <p className="text-yellow-400 text-xl font-bold">{user?.jobTier ? user.jobTier * 10 : 50}</p>
                </CardContent>
              </Card>
            </div>

            {/* Start Task Button */}
            {completedToday < dailyLimit ? (
              <Card className="bg-yellow-900/20 border-yellow-700">
                <CardHeader>
                  <CardTitle className="text-yellow-400 text-center">Ready for Next Task?</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-yellow-300 mb-4">
                    Watch a video and earn KES {user?.jobTier ? user.jobTier * 10 : 50}
                  </p>
                  <Button
                    onClick={startNewTask}
                    className="bg-gradient-to-r from-yellow-600 to-amber-600 hover:from-yellow-700 hover:to-amber-700 text-white"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Start New Task
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-yellow-900/20 border-yellow-700">
                <CardContent className="p-6 text-center">
                  <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
                  <h3 className="text-yellow-400 text-lg font-bold mb-2">Daily Limit Reached!</h3>
                  <p className="text-yellow-300">
                    You've completed all {dailyLimit} tasks for today. Come back tomorrow for more!
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
