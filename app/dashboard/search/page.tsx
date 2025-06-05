"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScatteredCoins } from "@/components/scattered-coins"
import { Search, User, DollarSign, Package, Clock, TrendingUp } from "lucide-react"

interface SearchResult {
  id: string
  type: "user" | "transaction" | "package" | "task"
  title: string
  description: string
  amount?: number
  date?: string
  status?: string
}

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [filter, setFilter] = useState("all")

  // Mock search data
  const mockData: SearchResult[] = [
    {
      id: "1",
      type: "transaction",
      title: "Task Completion Reward",
      description: "Video watching task completed",
      amount: 270,
      date: "2024-01-15",
      status: "completed",
    },
    {
      id: "2",
      type: "user",
      title: "John Doe",
      description: "Referral team member - Job Tier 3",
      date: "2024-01-10",
      status: "active",
    },
    {
      id: "3",
      type: "package",
      title: "Job Tier 5",
      description: "Premium package with 50 daily tasks",
      amount: 176000,
      status: "available",
    },
    {
      id: "4",
      type: "transaction",
      title: "Referral Bonus",
      description: "8% commission from team member",
      amount: 240,
      date: "2024-01-14",
      status: "completed",
    },
    {
      id: "5",
      type: "task",
      title: "Daily Video Task",
      description: "Watch promotional video content",
      amount: 18,
      date: "2024-01-15",
      status: "available",
    },
  ]

  useEffect(() => {
    if (searchTerm.length > 0) {
      setIsSearching(true)
      // Simulate search delay
      const timer = setTimeout(() => {
        const filtered = mockData.filter((item) => {
          const matchesSearch =
            item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.description.toLowerCase().includes(searchTerm.toLowerCase())
          const matchesFilter = filter === "all" || item.type === filter
          return matchesSearch && matchesFilter
        })
        setResults(filtered)
        setIsSearching(false)
      }, 300)

      return () => clearTimeout(timer)
    } else {
      setResults([])
      setIsSearching(false)
    }
  }, [searchTerm, filter])

  const getResultIcon = (type: string) => {
    switch (type) {
      case "user":
        return <User className="w-5 h-5 text-blue-400" />
      case "transaction":
        return <DollarSign className="w-5 h-5 text-green-400" />
      case "package":
        return <Package className="w-5 h-5 text-purple-400" />
      case "task":
        return <TrendingUp className="w-5 h-5 text-yellow-400" />
      default:
        return <Search className="w-5 h-5 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500"
      case "active":
        return "bg-blue-500"
      case "available":
        return "bg-yellow-500"
      case "pending":
        return "bg-orange-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="min-h-screen relative">
      <ScatteredCoins count={25} />

      <div className="p-4 space-y-6 relative z-10">
        {/* Search Header */}
        <Card className="black-section border-yellow-600/30">
          <CardHeader>
            <CardTitle className="text-yellow-400 flex items-center gap-2">
              <Search className="w-6 h-6" />
              Search Everett
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-yellow-500" />
              <Input
                placeholder="Search transactions, users, packages, tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 bg-black/50 border-yellow-600/50 text-white text-lg py-3"
              />
              {isSearching && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <div className="w-5 h-5 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
            </div>

            {/* Filter Buttons */}
            <div className="flex gap-2 overflow-x-auto">
              {[
                { id: "all", label: "All", icon: Search },
                { id: "transaction", label: "Transactions", icon: DollarSign },
                { id: "user", label: "Users", icon: User },
                { id: "package", label: "Packages", icon: Package },
                { id: "task", label: "Tasks", icon: TrendingUp },
              ].map((filterOption) => (
                <Button
                  key={filterOption.id}
                  onClick={() => setFilter(filterOption.id)}
                  variant={filter === filterOption.id ? "default" : "outline"}
                  className={
                    filter === filterOption.id
                      ? "everett-gradient text-white"
                      : "border-yellow-600 text-yellow-400 hover:bg-yellow-900/20"
                  }
                  size="sm"
                >
                  <filterOption.icon className="w-4 h-4 mr-2" />
                  {filterOption.label}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Search Results */}
        {searchTerm && (
          <Card className="black-section border-yellow-600/30">
            <CardHeader>
              <CardTitle className="text-yellow-400">Search Results ({results.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {results.length > 0 ? (
                <div className="space-y-3">
                  {results.map((result) => (
                    <div
                      key={result.id}
                      className="p-4 bg-yellow-900/20 rounded-lg border border-yellow-600/30 hover:bg-yellow-900/30 transition-colors cursor-pointer"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3 flex-1">
                          <div className="mt-1">{getResultIcon(result.type)}</div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-white mb-1">{result.title}</h3>
                            <p className="text-sm text-yellow-200 mb-2">{result.description}</p>
                            <div className="flex items-center gap-2">
                              <Badge className={`text-xs ${getStatusColor(result.status || "")}`}>{result.type}</Badge>
                              {result.date && (
                                <div className="flex items-center gap-1 text-xs text-yellow-500">
                                  <Clock className="w-3 h-3" />
                                  {new Date(result.date).toLocaleDateString()}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        {result.amount && (
                          <div className="text-right">
                            <p className="font-bold text-green-400">{result.amount.toLocaleString()} KES</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Search className="w-16 h-16 mx-auto mb-4 text-yellow-600" />
                  <p className="text-yellow-600 mb-2">No results found</p>
                  <p className="text-sm text-yellow-500">Try adjusting your search terms or filters</p>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Quick Actions */}
        {!searchTerm && (
          <Card className="black-section border-yellow-600/30">
            <CardHeader>
              <CardTitle className="text-yellow-400">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button
                  onClick={() => setSearchTerm("transaction")}
                  variant="outline"
                  className="border-green-600 text-green-400 hover:bg-green-900/20 h-20 flex-col"
                >
                  <DollarSign className="w-6 h-6 mb-2" />
                  <span className="text-sm">Transactions</span>
                </Button>
                <Button
                  onClick={() => setSearchTerm("referral")}
                  variant="outline"
                  className="border-blue-600 text-blue-400 hover:bg-blue-900/20 h-20 flex-col"
                >
                  <User className="w-6 h-6 mb-2" />
                  <span className="text-sm">Team Members</span>
                </Button>
                <Button
                  onClick={() => setSearchTerm("package")}
                  variant="outline"
                  className="border-purple-600 text-purple-400 hover:bg-purple-900/20 h-20 flex-col"
                >
                  <Package className="w-6 h-6 mb-2" />
                  <span className="text-sm">Packages</span>
                </Button>
                <Button
                  onClick={() => setSearchTerm("task")}
                  variant="outline"
                  className="border-yellow-600 text-yellow-400 hover:bg-yellow-900/20 h-20 flex-col"
                >
                  <TrendingUp className="w-6 h-6 mb-2" />
                  <span className="text-sm">Tasks</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
