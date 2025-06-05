"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/components/auth-provider"
import { useToast } from "@/components/ui/use-toast"
import { SmartEngine } from "@/lib/smart-engine"
import { Target, Gift, Zap, Trophy, Star } from "lucide-react"

interface WheelPrize {
  id: number
  label: string
  amount: number
  probability: number
  color: string
}

export default function LuckyWheelPage() {
  const { user, updateUser } = useAuth()
  const { toast } = useToast()
  const [isSpinning, setIsSpinning] = useState(false)
  const [rotation, setRotation] = useState(0)
  const [spinsToday, setSpinsToday] = useState(0)
  const [maxSpins] = useState(3)
  const [winRate, setWinRate] = useState(0.1)
  const [recentWins, setRecentWins] = useState([
    { user: "John K.", prize: "500 KES", time: "2 hours ago" },
    { user: "Mary W.", prize: "100 KES", time: "4 hours ago" },
    { user: "David M.", prize: "1000 KES", time: "6 hours ago" },
  ])

  const prizes: WheelPrize[] = [
    { id: 1, label: "50 KES", amount: 50, probability: 0.3, color: "#FFD700" },
    { id: 2, label: "100 KES", amount: 100, probability: 0.25, color: "#FF6B6B" },
    { id: 3, label: "Try Again", amount: 0, probability: 0.2, color: "#4ECDC4" },
    { id: 4, label: "200 KES", amount: 200, probability: 0.15, color: "#45B7D1" },
    { id: 5, label: "500 KES", amount: 500, probability: 0.08, color: "#96CEB4" },
    { id: 6, label: "1000 KES", amount: 1000, probability: 0.02, color: "#FFEAA7" },
  ]

  useEffect(() => {
    if (user) {
      const behavior = SmartEngine.analyzeUserBehavior(user)
      const calculatedWinRate = SmartEngine.calculateLuckyWheelOdds(behavior)
      setWinRate(calculatedWinRate)
    }
  }, [user])

  const spinWheel = () => {
    if (spinsToday >= maxSpins) {
      toast({
        title: "Daily Limit Reached",
        description: "You've used all your spins for today. Come back tomorrow!",
        variant: "destructive",
      })
      return
    }

    if (!user?.isActivated) {
      toast({
        title: "Account Not Activated",
        description: "Please activate your account to use the Lucky Wheel.",
        variant: "destructive",
      })
      return
    }

    setIsSpinning(true)
    setSpinsToday((prev) => prev + 1)

    // Calculate winning based on smart odds
    const isWin = Math.random() < winRate
    let selectedPrize: WheelPrize

    if (isWin) {
      // Select a winning prize based on probabilities
      const random = Math.random()
      let cumulativeProbability = 0
      selectedPrize =
        prizes.find((prize) => {
          cumulativeProbability += prize.probability
          return random <= cumulativeProbability && prize.amount > 0
        }) || prizes[0]
    } else {
      // Select "Try Again"
      selectedPrize = prizes.find((p) => p.amount === 0) || prizes[2]
    }

    // Calculate rotation to land on selected prize
    const prizeIndex = prizes.findIndex((p) => p.id === selectedPrize.id)
    const segmentAngle = 360 / prizes.length
    const targetAngle = prizeIndex * segmentAngle + segmentAngle / 2
    const spins = 5 + Math.random() * 3 // 5-8 full rotations
    const finalRotation = rotation + spins * 360 + targetAngle

    setRotation(finalRotation)

    // Handle result after animation
    setTimeout(() => {
      setIsSpinning(false)
      handlePrizeWon(selectedPrize)
    }, 4000)
  }

  const handlePrizeWon = (prize: WheelPrize) => {
    if (prize.amount > 0) {
      const newBalance = (user?.balance || 0) + prize.amount
      updateUser({ balance: newBalance })

      toast({
        title: "Congratulations! 🎉",
        description: `You won ${prize.amount} KES!`,
      })
    } else {
      toast({
        title: "Better luck next time!",
        description: "Keep spinning and you'll win soon!",
      })
    }
  }

  return (
    <div className="max-w-md mx-auto p-4 space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-purple-900 to-pink-800">
        <CardContent className="p-6 text-center">
          <h1 className="text-2xl font-bold mb-2">Lucky Wheel 🎡</h1>
          <p className="text-purple-200">Spin daily for exciting rewards!</p>
        </CardContent>
      </Card>

      {/* Smart Stats */}
      <div className="grid grid-cols-3 gap-3">
        <Card className="bg-green-950/20 border-green-900/50">
          <CardContent className="p-3 text-center">
            <Star className="w-6 h-6 mx-auto mb-1 text-green-500" />
            <p className="text-lg font-bold text-green-400">{Math.round(winRate * 100)}%</p>
            <p className="text-xs text-green-600">Your Win Rate</p>
          </CardContent>
        </Card>

        <Card className="bg-blue-950/20 border-blue-900/50">
          <CardContent className="p-3 text-center">
            <Target className="w-6 h-6 mx-auto mb-1 text-blue-500" />
            <p className="text-lg font-bold text-blue-400">
              {spinsToday}/{maxSpins}
            </p>
            <p className="text-xs text-blue-600">Spins Today</p>
          </CardContent>
        </Card>

        <Card className="bg-yellow-950/20 border-yellow-900/50">
          <CardContent className="p-3 text-center">
            <Trophy className="w-6 h-6 mx-auto mb-1 text-yellow-500" />
            <p className="text-lg font-bold text-yellow-400">1,250</p>
            <p className="text-xs text-yellow-600">Total Won (KES)</p>
          </CardContent>
        </Card>
      </div>

      {/* Lucky Wheel */}
      <Card className="bg-black/50 border-yellow-900/50">
        <CardContent className="p-6">
          <div className="relative w-64 h-64 mx-auto">
            {/* Wheel */}
            <div
              className={`w-full h-full rounded-full border-4 border-yellow-500 relative overflow-hidden transition-transform duration-4000 ease-out ${
                isSpinning ? "spinning-wheel" : ""
              }`}
              style={{ transform: `rotate(${rotation}deg)` }}
            >
              {prizes.map((prize, index) => {
                const angle = (360 / prizes.length) * index
                return (
                  <div
                    key={prize.id}
                    className="absolute w-full h-full"
                    style={{
                      transform: `rotate(${angle}deg)`,
                      clipPath: `polygon(50% 50%, 50% 0%, ${50 + 50 * Math.cos(((360 / prizes.length) * Math.PI) / 180)}% ${50 - 50 * Math.sin(((360 / prizes.length) * Math.PI) / 180)}%)`,
                      backgroundColor: prize.color,
                    }}
                  >
                    <div
                      className="absolute text-black font-bold text-sm"
                      style={{
                        top: "20%",
                        left: "50%",
                        transform: "translateX(-50%)",
                      }}
                    >
                      {prize.label}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Pointer */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
              <div className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-yellow-500"></div>
            </div>

            {/* Center Circle */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-yellow-500 rounded-full border-2 border-black"></div>
          </div>

          <div className="text-center mt-6">
            <Button
              onClick={spinWheel}
              disabled={isSpinning || spinsToday >= maxSpins}
              className="gold-gradient text-black font-bold px-8 py-3"
            >
              {isSpinning ? "Spinning..." : spinsToday >= maxSpins ? "Come Back Tomorrow" : "SPIN NOW!"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Smart Tips */}
      <Card className="bg-purple-950/20 border-purple-900/50">
        <CardHeader>
          <CardTitle className="text-purple-400 flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Smart Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            <div className="p-3 bg-black/30 rounded-lg">
              <p className="text-purple-200">
                Your win rate has increased to {Math.round(winRate * 100)}% due to your active participation and
                referrals!
              </p>
            </div>
            <div className="p-3 bg-black/30 rounded-lg">
              <p className="text-purple-200">Complete more tasks to improve your Lucky Wheel odds even further.</p>
            </div>
            <div className="p-3 bg-black/30 rounded-lg">
              <p className="text-purple-200">
                Best time to spin: Between 2-4 PM when the system shows higher win rates.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Winners */}
      <Card className="bg-yellow-950/20 border-yellow-900/50">
        <CardHeader>
          <CardTitle className="text-yellow-500">Recent Winners</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentWins.map((win, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-black/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <Gift className="w-4 h-4 text-yellow-500" />
                  <div>
                    <p className="font-semibold">{win.user}</p>
                    <p className="text-sm text-yellow-600">{win.time}</p>
                  </div>
                </div>
                <Badge className="bg-green-500 text-white">{win.prize}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
