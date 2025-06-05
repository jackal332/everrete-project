"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useAuth } from "@/components/auth-provider"
import { useToast } from "@/components/ui/use-toast"
import { VideoTaskPlayer } from "@/components/video-task-player"
import { Play, CheckCircle, Clock, Zap, Video, Eye, Gift } from "lucide-react"

interface Task {
  id: string
  title: string
  description: string
  type: "video" | "ad" | "survey"
  duration: number
  reward: number
  difficulty: "easy" | "medium" | "hard"
  completed: boolean
  videoData?: {
    id: string
    title: string
    description: string
    duration: number
    reward: number
    thumbnailUrl: string
    features: string[]
  }
}

export default function TasksPage() {
  const { user, updateUser } = useAuth()
  const { toast } = useToast()
  const [tasks, setTasks] = useState<Task[]>([])
  const [completedToday, setCompletedToday] = useState(0)
  const [dailyTarget, setDailyTarget] = useState(5)
  const [currentTask, setCurrentTask] = useState<Task | null>(null)
  const [welcomeBonus, setWelcomeBonus] = useState(50)
  const [hasClaimedWelcome, setHasClaimedWelcome] = useState(false)

  // Job tier configurations
  const jobConfigs = {
    0: { tasks: 5, unitPrice: 18, dailyIncome: 90 },
    1: { tasks: 5, unitPrice: 20, dailyIncome: 100 },
    2: { tasks: 10, unitPrice: 27, dailyIncome: 270 },
    3: { tasks: 15, unitPrice: 54, dailyIncome: 810 },
    4: { tasks: 30, unitPrice: 77, dailyIncome: 2310 },
    5: { tasks: 50, unitPrice: 135, dailyIncome: 6750 },
    6: { tasks: 75, unitPrice: 238, dailyIncome: 17850 },
    7: { tasks: 140, unitPrice: 300, dailyIncome: 42000 },
    8: { tasks: 220, unitPrice: 430, dailyIncome: 94600 },
    9: { tasks: 350, unitPrice: 560, dailyIncome: 196000 },
  }

  useEffect(() => {
    if (user?.isActivated) {
      const config = jobConfigs[user.jobTier as keyof typeof jobConfigs] || jobConfigs[0]
      setDailyTarget(config.tasks)
      generateDailyTasks(config)
    }
  }, [user])

  const generateDailyTasks = (config: any) => {
    const videoTitles = [
      "Everett Success Stories",
      "Financial Freedom Journey",
      "Building Wealth Through Tasks",
      "Smart Money Management Tips",
      "Investment Strategies for Beginners",
      "Everett Platform Features",
      "Maximizing Your Daily Earnings",
      "Referral Program Benefits",
    ]

    const videoFeatures = [
      ["HD Quality", "Subtitles", "Mobile Optimized"],
      ["Expert Interviews", "Real Stories", "Actionable Tips"],
      ["Step-by-Step Guide", "Visual Examples", "Practical Advice"],
      ["Interactive Content", "Q&A Session", "Bonus Materials"],
      ["Case Studies", "Success Metrics", "Growth Strategies"],
    ]

    const newTasks: Task[] = Array.from({ length: config.tasks }, (_, index) => {
      const isVideo = index % 2 === 0 // Every other task is a video
      const videoTitle = videoTitles[index % videoTitles.length]
      const features = videoFeatures[index % videoFeatures.length]

      return {
        id: `task-${Date.now()}-${index}`,
        title: isVideo ? videoTitle : `Task ${index + 1}`,
        description: isVideo
          ? `Watch this educational video about ${videoTitle.toLowerCase()} and earn money`
          : getTaskDescription(index % 2 === 1 ? "ad" : "survey"),
        type: isVideo ? "video" : ((index % 2 === 1 ? "ad" : "survey") as "video" | "ad" | "survey"),
        duration: isVideo ? Math.floor(Math.random() * 120) + 60 : Math.floor(Math.random() * 30) + 15,
        reward: config.unitPrice,
        difficulty: ["easy", "medium", "hard"][Math.floor(Math.random() * 3)] as "easy" | "medium" | "hard",
        completed: false,
        videoData: isVideo
          ? {
              id: `video-${index}`,
              title: videoTitle,
              description: `Learn about ${videoTitle.toLowerCase()} in this comprehensive video`,
              duration: Math.floor(Math.random() * 120) + 60,
              reward: config.unitPrice,
              thumbnailUrl: `/placeholder.svg?height=200&width=300&text=${encodeURIComponent(videoTitle)}`,
              features: features,
            }
          : undefined,
      }
    })

    setTasks(newTasks)
  }

  const getTaskDescription = (type: string) => {
    const descriptions = {
      ad: "View this advertisement and interact with the content",
      survey: "Complete a quick survey about your preferences",
    }
    return descriptions[type as keyof typeof descriptions]
  }

  const claimWelcomeBonus = () => {
    const newBalance = (user?.balance || 0) + welcomeBonus
    updateUser({ balance: newBalance })
    setHasClaimedWelcome(true)

    toast({
      title: "Welcome Bonus Claimed! 🎉",
      description: `You received ${welcomeBonus} KES as a welcome bonus!`,
    })
  }

  const startTask = (task: Task) => {
    setCurrentTask(task)
  }

  const completeVideoTask = (reward: number) => {
    if (currentTask) {
      setTasks((prev) => prev.map((t) => (t.id === currentTask.id ? { ...t, completed: true } : t)))
      setCompletedToday((prev) => prev + 1)
      setCurrentTask(null)

      // Update user balance
      const newBalance = (user?.balance || 0) + reward
      updateUser({
        balance: newBalance,
        tasksCompleted: (user?.tasksCompleted || 0) + 1,
        totalEarned: (user?.totalEarned || 0) + reward,
      })

      toast({
        title: "Video Task Completed! 🎬",
        description: `You earned ${reward} KES for watching the video!`,
      })
    }
  }

  const completeRegularTask = (task: Task) => {
    setTasks((prev) => prev.map((t) => (t.id === task.id ? { ...t, completed: true } : t)))
    setCompletedToday((prev) => prev + 1)

    // Update user balance
    const newBalance = (user?.balance || 0) + task.reward
    updateUser({
      balance: newBalance,
      tasksCompleted: (user?.tasksCompleted || 0) + 1,
      totalEarned: (user?.totalEarned || 0) + task.reward,
    })

    toast({
      title: "Task Completed!",
      description: `You earned ${task.reward} KES. Keep going!`,
    })
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-500"
      case "medium":
        return "bg-yellow-500"
      case "hard":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Video className="w-4 h-4" />
      case "ad":
        return <Eye className="w-4 h-4" />
      case "survey":
        return <CheckCircle className="w-4 h-4" />
      default:
        return <Play className="w-4 h-4" />
    }
  }

  if (!user?.isActivated) {
    return (
      <div className="max-w-md mx-auto p-4">
        <Card className="bg-orange-950/20 border-orange-900/50">
          <CardContent className="p-6 text-center">
            <h2 className="text-xl font-bold mb-4">Activate Your Account</h2>
            <p className="text-orange-200 mb-4">
              You need to activate your account to access daily tasks and start earning.
            </p>
            <Button className="everett-gradient text-white font-bold">Activate Now</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto p-4 space-y-6">
      {/* Welcome Bonus */}
      {!hasClaimedWelcome && (
        <Card className="bg-gradient-to-r from-green-900 to-green-800 border-green-700">
          <CardContent className="p-6 text-center">
            <Gift className="w-12 h-12 mx-auto mb-4 text-green-300" />
            <h2 className="text-xl font-bold mb-2 text-green-200">Welcome Bonus!</h2>
            <p className="text-green-300 mb-4">Claim your {welcomeBonus} KES welcome bonus</p>
            <Button onClick={claimWelcomeBonus} className="everett-gradient text-white font-bold">
              Claim {welcomeBonus} KES
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Progress Overview */}
      <Card className="bg-orange-950/20 border-orange-900/50">
        <CardHeader>
          <CardTitle className="text-orange-400">Daily Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Tasks Completed</span>
                <span>
                  {completedToday}/{dailyTarget}
                </span>
              </div>
              <Progress value={(completedToday / dailyTarget) * 100} className="h-2" />
            </div>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-green-400">
                  {completedToday * (jobConfigs[user.jobTier as keyof typeof jobConfigs]?.unitPrice || 18)}
                </p>
                <p className="text-sm text-orange-500">Earned Today (KES)</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-orange-400">{dailyTarget - completedToday}</p>
                <p className="text-sm text-orange-500">Tasks Remaining</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Current Video Task */}
      {currentTask && currentTask.type === "video" && currentTask.videoData && (
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-orange-300">Current Video Task</h3>
          <VideoTaskPlayer videoData={currentTask.videoData} onComplete={completeVideoTask} />
        </div>
      )}

      {/* Available Tasks */}
      <Card className="bg-orange-950/20 border-orange-900/50">
        <CardHeader>
          <CardTitle className="text-orange-400">Available Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {tasks.map((task) => (
              <div
                key={task.id}
                className={`p-4 rounded-lg border ${
                  task.completed ? "bg-green-950/20 border-green-900/50" : "bg-black/30 border-orange-900/30"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {getTypeIcon(task.type)}
                    <h4 className="font-semibold">{task.title}</h4>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getDifficultyColor(task.difficulty)}>{task.difficulty}</Badge>
                    {task.completed && <CheckCircle className="w-5 h-5 text-green-500" />}
                  </div>
                </div>
                <p className="text-sm text-orange-200 mb-3">{task.description}</p>

                {task.type === "video" && task.videoData && (
                  <div className="mb-3">
                    <div className="flex flex-wrap gap-1">
                      {task.videoData.features.map((feature, index) => (
                        <span key={index} className="px-2 py-1 bg-orange-800/30 text-orange-300 text-xs rounded">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {Math.floor(task.duration / 60)}:{(task.duration % 60).toString().padStart(2, "0")}
                    </span>
                    <span className="flex items-center gap-1 text-green-400">
                      <Zap className="w-4 h-4" />
                      {task.reward} KES
                    </span>
                  </div>
                  {!task.completed && !currentTask && (
                    <Button
                      size="sm"
                      onClick={() => (task.type === "video" ? startTask(task) : completeRegularTask(task))}
                      className="everett-gradient text-white"
                    >
                      {task.type === "video" ? "Watch" : "Start"}
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Smart Insights */}
      <Card className="bg-purple-950/20 border-purple-900/50">
        <CardHeader>
          <CardTitle className="text-purple-400">Smart Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span>Completion Rate</span>
              <span className="text-green-400">
                {tasks.length > 0 ? Math.round((completedToday / tasks.length) * 100) : 0}%
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>Average Task Time</span>
              <span className="text-orange-400">1:32</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Best Performance Time</span>
              <span className="text-blue-400">2:00 PM</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
