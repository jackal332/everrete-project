export interface UserBehavior {
  taskPreferences: string[]
  completionTimes: number[]
  earningPatterns: number[]
  withdrawalFrequency: number
  referralActivity: number
}

export interface SmartRecommendation {
  type: "task" | "job-tier" | "withdrawal-method" | "earning-opportunity"
  title: string
  description: string
  confidence: number
  potentialEarning?: number
}

export class SmartEngine {
  static analyzeUserBehavior(user: any): UserBehavior {
    return {
      taskPreferences: user.completedTasks?.map((t: any) => t.category) || [],
      completionTimes: user.taskHistory?.map((t: any) => t.completionTime) || [],
      earningPatterns: user.earningHistory || [],
      withdrawalFrequency: user.withdrawalCount || 0,
      referralActivity: user.referralCount || 0,
    }
  }

  static generateRecommendations(behavior: UserBehavior, currentJobTier: number): SmartRecommendation[] {
    const recommendations: SmartRecommendation[] = []

    // Smart job tier recommendations
    if (behavior.earningPatterns.length > 0) {
      const avgEarning = behavior.earningPatterns.reduce((a, b) => a + b, 0) / behavior.earningPatterns.length
      if (avgEarning > currentJobTier * 1000 && currentJobTier < 9) {
        recommendations.push({
          type: "job-tier",
          title: `Upgrade to Job Tier ${currentJobTier + 1}`,
          description: `Based on your earning patterns, upgrading could increase your daily income by ${(currentJobTier + 1) * 100 - currentJobTier * 100}%.`,
          confidence: 0.85,
          potentialEarning: (currentJobTier + 1) * 1000,
        })
      }
    }

    // Smart task recommendations
    if (behavior.taskPreferences.length > 0) {
      const preferredCategory = behavior.taskPreferences[0]
      recommendations.push({
        type: "task",
        title: `New ${preferredCategory} Tasks Available`,
        description: `We've found high-paying ${preferredCategory} tasks that match your expertise.`,
        confidence: 0.92,
        potentialEarning: 150,
      })
    }

    // Smart withdrawal recommendations
    if (behavior.withdrawalFrequency > 5) {
      recommendations.push({
        type: "withdrawal-method",
        title: "Optimize Your Withdrawals",
        description: "Consider batching withdrawals to reduce transaction fees and maximize your earnings.",
        confidence: 0.78,
      })
    }

    return recommendations
  }

  static predictOptimalTaskTiming(behavior: UserBehavior): string[] {
    const avgCompletionTime =
      behavior.completionTimes.reduce((a, b) => a + b, 0) / behavior.completionTimes.length || 30

    if (avgCompletionTime < 15) {
      return ["9:00 AM", "2:00 PM", "7:00 PM"]
    } else if (avgCompletionTime < 30) {
      return ["10:00 AM", "3:00 PM"]
    } else {
      return ["11:00 AM"]
    }
  }

  static calculateLuckyWheelOdds(behavior: UserBehavior): number {
    // Base odds + bonus for active users
    const baseOdds = 0.1
    const activityBonus = Math.min(behavior.referralActivity * 0.02, 0.3)
    const taskBonus = Math.min(behavior.taskPreferences.length * 0.01, 0.1)

    return Math.min(baseOdds + activityBonus + taskBonus, 0.8)
  }
}

export class FraudDetection {
  static analyzeTransaction(amount: number, userHistory: any[]): { safe: boolean; riskScore: number; reason?: string } {
    let riskScore = 0

    // Check for unusual amounts
    const avgTransaction = userHistory.reduce((sum, t) => sum + t.amount, 0) / userHistory.length || 0
    if (amount > avgTransaction * 5) {
      riskScore += 0.3
    }

    // Check frequency
    const recentTransactions = userHistory.filter((t) => new Date(t.date).getTime() > Date.now() - 24 * 60 * 60 * 1000)
    if (recentTransactions.length > 10) {
      riskScore += 0.4
    }

    // Check for round numbers (potential bot activity)
    if (amount % 100 === 0 && amount > 1000) {
      riskScore += 0.2
    }

    const safe = riskScore < 0.5
    const reason = riskScore >= 0.5 ? "Unusual transaction pattern detected" : undefined

    return { safe, riskScore, reason }
  }
}
