"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Newspaper, TrendingUp, Bell, Calendar, Eye } from "lucide-react"

interface NewsArticle {
  id: string
  title: string
  summary: string
  content: string
  category: "platform" | "financial" | "update" | "promotion"
  date: string
  readTime: number
  isNew: boolean
  views: number
}

export default function NewsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null)

  const newsArticles: NewsArticle[] = [
    {
      id: "1",
      title: "New Job Tier 10 Coming Soon!",
      summary: "We're excited to announce the upcoming launch of Job Tier 10 with unprecedented earning potential.",
      content:
        "GoldEdge is proud to announce the upcoming launch of Job Tier 10, our highest earning tier yet. This exclusive tier will offer daily earnings of up to 300,000 KES with 500 daily tasks. The security deposit will be 8,500,000 KES, making it perfect for serious earners looking to maximize their income potential. Launch date: February 1st, 2024.",
      category: "platform",
      date: "2024-01-15T10:00:00Z",
      readTime: 3,
      isNew: true,
      views: 1250,
    },
    {
      id: "2",
      title: "Enhanced Security Measures Implemented",
      summary:
        "We've upgraded our security systems to provide even better protection for your earnings and personal data.",
      content:
        "Your security is our top priority. We've implemented advanced fraud detection systems, enhanced encryption protocols, and multi-factor authentication options. These improvements ensure your earnings and personal information remain completely secure. All transactions are now processed with military-grade encryption.",
      category: "update",
      date: "2024-01-14T14:30:00Z",
      readTime: 2,
      isNew: true,
      views: 890,
    },
    {
      id: "3",
      title: "Lucky Wheel Odds Improvement",
      summary: "We've enhanced the Lucky Wheel algorithm to provide better winning chances for active users.",
      content:
        "Based on user feedback, we've improved the Lucky Wheel system. Active users who complete daily tasks and refer others now enjoy significantly better winning odds. The new smart algorithm considers your activity level, referral performance, and task completion rate to personalize your winning chances.",
      category: "update",
      date: "2024-01-13T09:15:00Z",
      readTime: 2,
      isNew: false,
      views: 2100,
    },
    {
      id: "4",
      title: "January Referral Bonus Campaign",
      summary: "Double your referral commissions throughout January with our special promotion.",
      content:
        "This January, we're doubling all referral commissions! Instead of the standard 8%, you'll earn 16% on all new referrals who activate their accounts. This promotion runs until January 31st, 2024. Additionally, refer 5 people this month and receive a bonus 1,000 KES reward.",
      category: "promotion",
      date: "2024-01-12T16:45:00Z",
      readTime: 1,
      isNew: false,
      views: 3200,
    },
    {
      id: "5",
      title: "Mobile App Beta Testing",
      summary: "Join our exclusive beta program to test the new GoldEdge mobile application.",
      content:
        "We're developing a dedicated mobile app to make earning even easier. Beta testers will get early access to features like push notifications for new tasks, one-tap withdrawals, and enhanced Lucky Wheel animations. Beta testers also receive a special 500 KES bonus upon app launch.",
      category: "platform",
      date: "2024-01-11T11:20:00Z",
      readTime: 2,
      isNew: false,
      views: 1800,
    },
    {
      id: "6",
      title: "Financial Literacy Workshop Series",
      summary: "Free online workshops to help you manage and grow your GoldEdge earnings effectively.",
      content:
        "Join our free financial literacy workshops every Saturday at 2 PM. Learn about budgeting, saving strategies, and how to reinvest your GoldEdge earnings for maximum growth. Topics include: Smart Withdrawal Strategies, Building Emergency Funds, and Planning for Financial Independence.",
      category: "financial",
      date: "2024-01-10T08:00:00Z",
      readTime: 3,
      isNew: false,
      views: 950,
    },
  ]

  const categories = [
    { id: "all", label: "All News", icon: Newspaper },
    { id: "platform", label: "Platform", icon: TrendingUp },
    { id: "update", label: "Updates", icon: Bell },
    { id: "promotion", label: "Promotions", icon: Calendar },
    { id: "financial", label: "Financial", icon: Eye },
  ]

  const filteredArticles =
    selectedCategory === "all" ? newsArticles : newsArticles.filter((article) => article.category === selectedCategory)

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "platform":
        return "bg-blue-500"
      case "update":
        return "bg-green-500"
      case "promotion":
        return "bg-purple-500"
      case "financial":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  if (selectedArticle) {
    return (
      <div className="max-w-md mx-auto p-4">
        <Button
          onClick={() => setSelectedArticle(null)}
          variant="outline"
          className="mb-4 border-yellow-600 text-yellow-500"
        >
          ← Back to News
        </Button>

        <Card className="bg-yellow-950/20 border-yellow-900/50">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <Badge className={getCategoryColor(selectedArticle.category)}>{selectedArticle.category}</Badge>
              {selectedArticle.isNew && <Badge className="bg-red-500 text-white">NEW</Badge>}
            </div>
            <CardTitle className="text-yellow-500">{selectedArticle.title}</CardTitle>
            <div className="flex items-center gap-4 text-sm text-yellow-600">
              <span>{formatDate(selectedArticle.date)}</span>
              <span>{selectedArticle.readTime} min read</span>
              <span className="flex items-center gap-1">
                <Eye className="w-3 h-3" />
                {selectedArticle.views}
              </span>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-yellow-200 leading-relaxed">{selectedArticle.content}</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto p-4 space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-purple-900 to-blue-800">
        <CardContent className="p-6 text-center">
          <h1 className="text-2xl font-bold mb-2">Company News 📰</h1>
          <p className="text-purple-200">Stay informed with the latest updates</p>
        </CardContent>
      </Card>

      {/* Category Filter */}
      <Card className="bg-yellow-950/20 border-yellow-900/50">
        <CardContent className="p-4">
          <div className="grid grid-cols-3 gap-2">
            {categories.map((category) => {
              const IconComponent = category.icon
              return (
                <Button
                  key={category.id}
                  size="sm"
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex flex-col items-center gap-1 h-auto py-2 ${
                    selectedCategory === category.id ? "gold-gradient text-black" : "border-yellow-900 text-yellow-500"
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  <span className="text-xs">{category.label}</span>
                </Button>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* News Articles */}
      <div className="space-y-4">
        {filteredArticles.map((article) => (
          <Card
            key={article.id}
            className="bg-yellow-950/20 border-yellow-900/50 hover:border-yellow-600 transition-colors cursor-pointer"
            onClick={() => setSelectedArticle(article)}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Badge className={getCategoryColor(article.category)}>{article.category}</Badge>
                  {article.isNew && <Badge className="bg-red-500 text-white animate-pulse">NEW</Badge>}
                </div>
                <div className="flex items-center gap-1 text-xs text-yellow-600">
                  <Eye className="w-3 h-3" />
                  {article.views}
                </div>
              </div>

              <h3 className="font-bold text-white mb-2">{article.title}</h3>
              <p className="text-sm text-yellow-200 mb-3 line-clamp-2">{article.summary}</p>

              <div className="flex items-center justify-between text-xs text-yellow-600">
                <span>{formatDate(article.date)}</span>
                <span>{article.readTime} min read</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Smart Insights */}
      <Card className="bg-purple-950/20 border-purple-900/50">
        <CardHeader>
          <CardTitle className="text-purple-400">Trending Topics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-2 bg-black/30 rounded">
              <span className="text-sm">New Job Tiers</span>
              <Badge className="bg-green-500 text-white">Hot</Badge>
            </div>
            <div className="flex items-center justify-between p-2 bg-black/30 rounded">
              <span className="text-sm">Security Updates</span>
              <Badge className="bg-blue-500 text-white">Important</Badge>
            </div>
            <div className="flex items-center justify-between p-2 bg-black/30 rounded">
              <span className="text-sm">Referral Bonuses</span>
              <Badge className="bg-purple-500 text-white">Popular</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
