export interface VideoData {
  id: string
  title: string
  description: string
  duration: number
  reward: number
  thumbnailUrl: string
  features: string[]
  category: string
  createdAt: string
  dailyEarnings: number
}

export class VideoManager {
  static generateDailyVideos(userTier: number, date: Date = new Date()): VideoData[] {
    const dateString = date.toISOString().split("T")[0]

    const videoTemplates = [
      {
        title: "Everett Success Stories",
        description: "Watch inspiring success stories from our top earners",
        category: "success",
        features: ["Real Stories", "HD Quality", "Subtitles"],
      },
      {
        title: "Financial Freedom Journey",
        description: "Learn how to achieve financial independence with Everett",
        category: "education",
        features: ["Expert Tips", "Step-by-Step", "Actionable Advice"],
      },
      {
        title: "Daily Earning Strategies",
        description: "Maximize your daily earnings with proven strategies",
        category: "strategy",
        features: ["Pro Tips", "Case Studies", "Live Examples"],
      },
      {
        title: "Team Building Mastery",
        description: "Build a successful referral network and earn more",
        category: "team",
        features: ["Leadership Skills", "Growth Tactics", "Bonus Content"],
      },
      {
        title: "Wealth Management Tips",
        description: "Smart ways to manage and grow your Everett earnings",
        category: "wealth",
        features: ["Financial Planning", "Investment Tips", "Risk Management"],
      },
    ]

    const tierConfig = {
      0: { tasks: 5, baseReward: 18 },
      1: { tasks: 5, baseReward: 20 },
      2: { tasks: 10, baseReward: 27 },
      3: { tasks: 15, baseReward: 54 },
      4: { tasks: 30, baseReward: 77 },
      5: { tasks: 50, baseReward: 135 },
      6: { tasks: 75, baseReward: 238 },
      7: { tasks: 140, baseReward: 300 },
      8: { tasks: 220, baseReward: 430 },
      9: { tasks: 350, baseReward: 560 },
    }

    const config = tierConfig[userTier as keyof typeof tierConfig] || tierConfig[0]

    return Array.from({ length: config.tasks }, (_, index) => {
      const template = videoTemplates[index % videoTemplates.length]
      const dailyEarnings = config.baseReward * config.tasks

      return {
        id: `video-${dateString}-${userTier}-${index}`,
        title: `${template.title} - Day ${index + 1}`,
        description: template.description,
        duration: Math.floor(Math.random() * 120) + 60, // 1-3 minutes
        reward: config.baseReward,
        thumbnailUrl: `/placeholder.svg?height=200&width=300&text=${encodeURIComponent(template.title)}`,
        features: template.features,
        category: template.category,
        createdAt: new Date().toISOString(),
        dailyEarnings: dailyEarnings,
      }
    })
  }

  static updateVideosAtMidnight() {
    // This would be called by a cron job or scheduled task
    const now = new Date()
    if (now.getHours() === 0 && now.getMinutes() === 0) {
      // Update videos for all users
      console.log("Updating daily videos at midnight...")
      // In a real app, this would update the database
    }
  }

  static calculateDailyEarnings(userTier: number, completedTasks: number): number {
    const tierConfig = {
      0: { baseReward: 18 },
      1: { baseReward: 20 },
      2: { baseReward: 27 },
      3: { baseReward: 54 },
      4: { baseReward: 77 },
      5: { baseReward: 135 },
      6: { baseReward: 238 },
      7: { baseReward: 300 },
      8: { baseReward: 430 },
      9: { baseReward: 560 },
    }

    const config = tierConfig[userTier as keyof typeof tierConfig] || tierConfig[0]
    return config.baseReward * completedTasks
  }
}
