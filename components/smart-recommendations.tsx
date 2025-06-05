"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Target, Zap, Clock } from "lucide-react"
import { SmartEngine, type SmartRecommendation } from "@/lib/smart-engine"
import { useAuth } from "@/components/auth-provider"

export function SmartRecommendations() {
  const { user } = useAuth()
  const [recommendations, setRecommendations] = useState<SmartRecommendation[]>([])
  const [optimalTimes, setOptimalTimes] = useState<string[]>([])

  useEffect(() => {
    if (user) {
      const behavior = SmartEngine.analyzeUserBehavior(user)
      const recs = SmartEngine.generateRecommendations(behavior, user.jobTier || 0)
      const times = SmartEngine.predictOptimalTaskTiming(behavior)

      setRecommendations(recs)
      setOptimalTimes(times)
    }
  }, [user])

  const getRecommendationIcon = (type: string) => {
    switch (type) {
      case "job-tier":
        return <TrendingUp className="w-5 h-5" />
      case "task":
        return <Target className="w-5 h-5" />
      case "withdrawal-method":
        return <Zap className="w-5 h-5" />
      default:
        return <TrendingUp className="w-5 h-5" />
    }
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return "bg-green-500"
    if (confidence >= 0.6) return "bg-yellow-500"
    return "bg-orange-500"
  }

  return (
    <div className="space-y-4">
      <Card className="bg-yellow-950/20 border-yellow-900/50">
        <CardHeader>
          <CardTitle className="text-yellow-500 flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Smart Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {recommendations.length > 0 ? (
            recommendations.map((rec, index) => (
              <div key={index} className="p-4 bg-black/30 rounded-lg border border-yellow-900/30">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {getRecommendationIcon(rec.type)}
                    <h4 className="font-semibold">{rec.title}</h4>
                  </div>
                  <Badge className={`${getConfidenceColor(rec.confidence)} text-white`}>
                    {Math.round(rec.confidence * 100)}% match
                  </Badge>
                </div>
                <p className="text-sm text-yellow-200 mb-3">{rec.description}</p>
                {rec.potentialEarning && (
                  <p className="text-green-400 font-semibold mb-3">
                    Potential earning: +{rec.potentialEarning.toLocaleString()} KES
                  </p>
                )}
                <Button size="sm" className="gold-gradient text-black">
                  Learn More
                </Button>
              </div>
            ))
          ) : (
            <p className="text-yellow-600">Complete more tasks to get personalized recommendations.</p>
          )}
        </CardContent>
      </Card>

      {optimalTimes.length > 0 && (
        <Card className="bg-yellow-950/20 border-yellow-900/50">
          <CardHeader>
            <CardTitle className="text-yellow-500 flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Optimal Task Times
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-yellow-200 mb-3">
              Based on your patterns, these are the best times for you to complete tasks:
            </p>
            <div className="flex flex-wrap gap-2">
              {optimalTimes.map((time, index) => (
                <Badge key={index} variant="outline" className="border-yellow-600 text-yellow-400">
                  {time}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
