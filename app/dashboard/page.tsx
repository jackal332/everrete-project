"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useAuth } from "@/components/auth-provider"
import { useToast } from "@/components/ui/use-toast"
import { ScatteredCoins } from "@/components/scattered-coins"
import { PackagesMenu } from "@/components/packages-menu"
import { SmartChatbot } from "@/components/smart-chatbot"
import { SmartRecommendations } from "@/components/smart-recommendations"
import {
  Coins,
  CreditCard,
  Award,
  PiggyBank,
  Target,
  Info,
  Newspaper,
  HelpCircle,
  Bell,
  Bot,
  TrendingUp,
} from "lucide-react"

export default function Dashboard() {
  const { user, updateUser } = useAuth()
  const { toast } = useToast()
  const [showChatbot, setShowChatbot] = useState(false)
  const [notifications, setNotifications] = useState([
    { id: 1, message: "Your task reward of 270 KES has been credited", time: "2 hours ago", read: false },
    { id: 2, message: "New referral bonus received: 240 KES", time: "Yesterday", read: false },
    { id: 3, message: "Complete your daily tasks to earn more", time: "2 days ago", read: true },
  ])

  const [recentTransactions, setRecentTransactions] = useState([
    { id: 1, type: "Task Reward", amount: 270, date: "Today, 10:23 AM" },
    { id: 2, type: "Referral Bonus", amount: 240, date: "Yesterday, 3:45 PM" },
  ])

  const [dailyEarnings, setDailyEarnings] = useState({
    yesterday: 270,
    today: 540,
    target: user?.jobTier ? user.jobTier * 100 : 100,
  })

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      // Update daily earnings
      setDailyEarnings((prev) => ({
        ...prev,
        today: prev.today + Math.floor(Math.random() * 50),
      }))

      // Add new notifications occasionally
      if (Math.random() > 0.95) {
        const newNotification = {
          id: Date.now(),
          message: "New task completed! Reward credited.",
          time: "Just now",
          read: false,
        }
        setNotifications((prev) => [newNotification, ...prev.slice(0, 4)])
      }
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  const markNotificationAsRead = (id: number) => {
    setNotifications((prev) => prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)))
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <div className="min-h-screen relative">
      <ScatteredCoins count={40} />
      <PackagesMenu />

      <div className="pb-20 relative z-10">
        {/* Welcome Banner */}
        <div className="dark-gold-bg p-6 relative overflow-hidden">
          <div className="max-w-md mx-auto relative z-10">
            <h1 className="text-2xl font-bold mb-2 text-yellow-300">Welcome, {user?.name?.split(" ")[0]}!</h1>
            <p className="text-yellow-200 mb-4">
              {user?.isActivated
                ? `You're on Job Tier ${user.jobTier}. Complete tasks to earn daily income.`
                : "Activate your account to start earning daily income."}
            </p>

            {/* Enhanced Balance Cards */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <Card className="wallet-card">
                <CardContent className="p-4">
                  <p className="text-yellow-400 text-sm mb-1">Income Wallet</p>
                  <p className="text-2xl font-bold text-yellow-300">{user?.balance?.toLocaleString() || 0} KES</p>
                  <p className="text-xs text-yellow-500">Task & Bonus Earnings</p>
                </CardContent>
              </Card>
              <Card className="wallet-card">
                <CardContent className="p-4">
                  <p className="text-yellow-400 text-sm mb-1">Personal Wallet</p>
                  <p className="text-2xl font-bold text-yellow-300">{user?.inviteBalance?.toLocaleString() || 0} KES</p>
                  <p className="text-xs text-yellow-500">Invitation Earnings</p>
                </CardContent>
              </Card>
            </div>

            {/* Daily Progress */}
            <Card className="black-section mb-4">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-yellow-400 text-sm">Today's Progress</span>
                  <span className="text-yellow-300 text-sm">
                    {dailyEarnings.today} / {dailyEarnings.target} KES
                  </span>
                </div>
                <div className="w-full bg-yellow-900/30 rounded-full h-2">
                  <div
                    className="everett-gradient h-2 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min((dailyEarnings.today / dailyEarnings.target) * 100, 100)}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-yellow-500 mt-1">
                  <span>Yesterday: {dailyEarnings.yesterday} KES</span>
                  <span>{Math.round((dailyEarnings.today / dailyEarnings.target) * 100)}% Complete</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Interactive Notifications */}
        <div className="max-w-md mx-auto px-4 py-4">
          <Card className="black-section mb-4">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-yellow-400 flex items-center gap-2">
                  <Bell className="w-5 h-5 notification-pulse" />
                  Notifications
                  {unreadCount > 0 && (
                    <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1">{unreadCount}</span>
                  )}
                </h3>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-yellow-400 hover:bg-yellow-900/20"
                  onClick={() => setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))}
                >
                  Mark all read
                </Button>
              </div>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {notifications.slice(0, 3).map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-3 rounded-lg cursor-pointer transition-all ${
                      notification.read ? "bg-yellow-900/10" : "bg-yellow-900/30 border border-yellow-600/50"
                    }`}
                    onClick={() => markNotificationAsRead(notification.id)}
                  >
                    <p className="text-sm text-yellow-200">{notification.message}</p>
                    <p className="text-xs text-yellow-500 mt-1">{notification.time}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="max-w-md mx-auto px-4 py-2 space-y-6">
          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-4">
            <Link href="/dashboard/wealth">
              <Card className="earnings-metric hover:scale-105 transition-transform">
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="w-10 h-10 everett-gradient rounded-full flex items-center justify-center">
                    <Coins className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <span className="font-medium text-yellow-300">Deposit</span>
                    <p className="text-xs text-yellow-500">Add funds</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
            <Link href="/dashboard/wealth">
              <Card className="earnings-metric hover:scale-105 transition-transform">
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="w-10 h-10 everett-gradient rounded-full flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <span className="font-medium text-yellow-300">Withdraw</span>
                    <p className="text-xs text-yellow-500">Cash out</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-3 gap-4">
            <Link href="/dashboard/tasks">
              <Card className="earnings-metric hover:scale-105 transition-transform">
                <CardContent className="p-4 text-center">
                  <div className="w-10 h-10 everett-gradient rounded-full flex items-center justify-center mx-auto mb-2">
                    <Award className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-sm font-medium text-yellow-300">Daily Tasks</div>
                  <div className="text-xs text-yellow-500">Earn money</div>
                </CardContent>
              </Card>
            </Link>
            <Link href="/dashboard/wealth">
              <Card className="earnings-metric hover:scale-105 transition-transform">
                <CardContent className="p-4 text-center">
                  <div className="w-10 h-10 everett-gradient rounded-full flex items-center justify-center mx-auto mb-2">
                    <PiggyBank className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-sm font-medium text-yellow-300">Wealth Fund</div>
                  <div className="text-xs text-yellow-500">Manage funds</div>
                </CardContent>
              </Card>
            </Link>
            <Link href="/dashboard/lucky-wheel">
              <Card className="earnings-metric hover:scale-105 transition-transform">
                <CardContent className="p-4 text-center">
                  <div className="w-10 h-10 everett-gradient rounded-full flex items-center justify-center mx-auto mb-2">
                    <Target className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-sm font-medium text-yellow-300">Lucky Wheel</div>
                  <div className="text-xs text-yellow-500">Win prizes</div>
                </CardContent>
              </Card>
            </Link>
            <Link href="/dashboard/about">
              <Card className="earnings-metric hover:scale-105 transition-transform">
                <CardContent className="p-4 text-center">
                  <div className="w-10 h-10 everett-gradient rounded-full flex items-center justify-center mx-auto mb-2">
                    <Info className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-sm font-medium text-yellow-300">About Us</div>
                  <div className="text-xs text-yellow-500">Learn more</div>
                </CardContent>
              </Card>
            </Link>
            <Link href="/dashboard/news">
              <Card className="earnings-metric hover:scale-105 transition-transform">
                <CardContent className="p-4 text-center">
                  <div className="w-10 h-10 everett-gradient rounded-full flex items-center justify-center mx-auto mb-2">
                    <Newspaper className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-sm font-medium text-yellow-300">Company News</div>
                  <div className="text-xs text-yellow-500">Latest updates</div>
                </CardContent>
              </Card>
            </Link>
            <Link href="/dashboard/support">
              <Card className="earnings-metric hover:scale-105 transition-transform">
                <CardContent className="p-4 text-center">
                  <div className="w-10 h-10 everett-gradient rounded-full flex items-center justify-center mx-auto mb-2">
                    <HelpCircle className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-sm font-medium text-yellow-300">Q&A</div>
                  <div className="text-xs text-yellow-500">Get help</div>
                </CardContent>
              </Card>
            </Link>
          </div>

          {/* Smart Recommendations */}
          {user?.isActivated && <SmartRecommendations />}

          {/* Recent Activity */}
          <Card className="black-section">
            <CardContent className="p-4">
              <h3 className="font-bold mb-3 text-yellow-400 flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Recent Activity
              </h3>
              <div className="space-y-3">
                {recentTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex justify-between items-center">
                    <div>
                      <p className="font-medium text-yellow-300">{transaction.type}</p>
                      <p className="text-sm text-yellow-600">{transaction.date}</p>
                    </div>
                    <p className="font-bold text-green-400">+{transaction.amount} KES</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="black-section">
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold text-yellow-300">{user?.tasksCompleted || 0}</p>
                <p className="text-sm text-yellow-600">Tasks Completed</p>
              </CardContent>
            </Card>
            <Card className="black-section">
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold text-yellow-300">{user?.totalEarned?.toLocaleString() || 0}</p>
                <p className="text-sm text-yellow-600">Total Earned (KES)</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Floating Action Buttons */}
        <div className="fixed bottom-24 right-4 flex flex-col gap-3 z-40">
          {/* AI Assistant Button */}
          <Button
            onClick={() => setShowChatbot(true)}
            className="w-14 h-14 rounded-full everett-gradient text-white shadow-lg hover:scale-110 transition-transform"
          >
            <Bot className="w-6 h-6" />
          </Button>

          {/* Quick Notification Button */}
          <Button
            onClick={() => {
              toast({
                title: "Notifications Updated",
                description: "You have new earnings and updates!",
              })
            }}
            className="w-14 h-14 rounded-full bg-blue-600 text-white shadow-lg hover:scale-110 transition-transform notification-pulse"
          >
            <Bell className="w-6 h-6" />
          </Button>
        </div>

        {/* Smart Chatbot */}
        <SmartChatbot isOpen={showChatbot} onClose={() => setShowChatbot(false)} />
      </div>
    </div>
  )
}
