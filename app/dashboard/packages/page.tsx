"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/components/auth-provider"
import { useToast } from "@/components/ui/use-toast"
import { ScatteredCoins } from "@/components/scattered-coins"
import { Package, Star, Crown, Diamond, CheckCircle, TrendingUp, DollarSign } from "lucide-react"

interface JobPackage {
  id: number
  name: string
  deposit: number
  tasks: number
  unitPrice: number
  dailyIncome: number
  monthlyIncome: number
  annualIncome: number
  icon: React.ReactNode
  popular?: boolean
  premium?: boolean
  features: string[]
}

export default function PackagesPage() {
  const { user, updateUser } = useAuth()
  const { toast } = useToast()
  const [selectedPackage, setSelectedPackage] = useState<JobPackage | null>(null)
  const [isActivating, setIsActivating] = useState<number | null>(null)

  const packages: JobPackage[] = [
    {
      id: 0,
      name: "Intern",
      deposit: 0,
      tasks: 5,
      unitPrice: 18,
      dailyIncome: 90,
      monthlyIncome: 0,
      annualIncome: 0,
      icon: <Package className="w-8 h-8" />,
      features: ["5 daily tasks", "Basic support", "Trial period", "No commitment"],
    },
    {
      id: 1,
      name: "Job 1",
      deposit: 3000,
      tasks: 5,
      unitPrice: 20,
      dailyIncome: 100,
      monthlyIncome: 3000,
      annualIncome: 36000,
      icon: <Package className="w-8 h-8" />,
      features: ["5 daily tasks", "Standard support", "Monthly earnings", "Referral bonuses"],
    },
    {
      id: 2,
      name: "Job 2",
      deposit: 8100,
      tasks: 10,
      unitPrice: 27,
      dailyIncome: 270,
      monthlyIncome: 8100,
      annualIncome: 97200,
      icon: <Package className="w-8 h-8" />,
      features: ["10 daily tasks", "Priority support", "Higher earnings", "Team bonuses"],
    },
    {
      id: 3,
      name: "Job 3",
      deposit: 23400,
      tasks: 15,
      unitPrice: 54,
      dailyIncome: 810,
      monthlyIncome: 24300,
      annualIncome: 291600,
      icon: <Star className="w-8 h-8" />,
      popular: true,
      features: ["15 daily tasks", "Premium support", "Best value", "Advanced features"],
    },
    {
      id: 4,
      name: "Job 4",
      deposit: 65800,
      tasks: 30,
      unitPrice: 77,
      dailyIncome: 2310,
      monthlyIncome: 69300,
      annualIncome: 831600,
      icon: <Star className="w-8 h-8" />,
      features: ["30 daily tasks", "VIP support", "High earnings", "Exclusive bonuses"],
    },
    {
      id: 5,
      name: "Job 5",
      deposit: 176000,
      tasks: 50,
      unitPrice: 135,
      dailyIncome: 6750,
      monthlyIncome: 202500,
      annualIncome: 2430000,
      icon: <Crown className="w-8 h-8" />,
      premium: true,
      features: ["50 daily tasks", "Elite support", "Premium earnings", "Leadership bonuses"],
    },
    {
      id: 6,
      name: "Job 6",
      deposit: 480000,
      tasks: 75,
      unitPrice: 238,
      dailyIncome: 17850,
      monthlyIncome: 535500,
      annualIncome: 6426000,
      icon: <Crown className="w-8 h-8" />,
      premium: true,
      features: ["75 daily tasks", "Dedicated manager", "Executive earnings", "Special privileges"],
    },
    {
      id: 7,
      name: "Job 7",
      deposit: 1080000,
      tasks: 140,
      unitPrice: 300,
      dailyIncome: 42000,
      monthlyIncome: 1260000,
      annualIncome: 15120000,
      icon: <Diamond className="w-8 h-8" />,
      premium: true,
      features: ["140 daily tasks", "Personal assistant", "Elite earnings", "Luxury benefits"],
    },
    {
      id: 8,
      name: "Job 8",
      deposit: 2250000,
      tasks: 220,
      unitPrice: 430,
      dailyIncome: 94600,
      monthlyIncome: 2838000,
      annualIncome: 34056000,
      icon: <Diamond className="w-8 h-8" />,
      premium: true,
      features: ["220 daily tasks", "Executive team", "Maximum earnings", "Ultimate privileges"],
    },
    {
      id: 9,
      name: "Job 9",
      deposit: 4260000,
      tasks: 350,
      unitPrice: 560,
      dailyIncome: 196000,
      monthlyIncome: 5880000,
      annualIncome: 70560000,
      icon: <Diamond className="w-8 h-8" />,
      premium: true,
      features: ["350 daily tasks", "CEO treatment", "Ultimate earnings", "Exclusive access"],
    },
  ]

  const activatePackage = async (pkg: JobPackage) => {
    setIsActivating(pkg.id)
    // Simulate activation process
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setSelectedPackage(pkg)
    setIsActivating(null)
  }

  const confirmActivation = () => {
    if (selectedPackage) {
      updateUser({
        isActivated: true,
        jobTier: selectedPackage.id,
      })

      toast({
        title: "Package Activated!",
        description: `You've successfully activated ${selectedPackage.name}. Start earning now!`,
      })

      setSelectedPackage(null)
    }
  }

  return (
    <div className="min-h-screen relative">
      <ScatteredCoins count={35} />

      <div className="p-4 space-y-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-yellow-400 mb-2">Choose Your Income Level</h1>
          <p className="text-yellow-200">Select a package that matches your earning goals</p>
        </div>

        {/* Current Package Display */}
        {user?.isActivated && (
          <Card className="black-section border-green-600/50 mb-6">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-green-400">Current Package: Job {user.jobTier}</h3>
                    <p className="text-sm text-green-300">
                      Daily Income: {packages.find((p) => p.id === user.jobTier)?.dailyIncome.toLocaleString()} KES
                    </p>
                  </div>
                </div>
                <Badge className="bg-green-500 text-white">Active</Badge>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Packages Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {packages.map((pkg) => (
            <Card
              key={pkg.id}
              className={`relative black-section border-yellow-600/30 hover:border-yellow-400 transition-all duration-300 cursor-pointer transform hover:scale-105 hover:shadow-2xl ${
                user?.jobTier === pkg.id ? "ring-2 ring-green-400 border-green-400 shadow-green-400/20" : ""
              } ${pkg.popular ? "ring-2 ring-orange-400" : ""} ${pkg.premium ? "ring-2 ring-purple-400" : ""}`}
              onClick={() => activatePackage(pkg)}
            >
              {pkg.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-orange-500 text-white">
                  Most Popular
                </Badge>
              )}
              {pkg.premium && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-purple-500 text-white">
                  Premium
                </Badge>
              )}

              <CardHeader className="text-center">
                <div className="w-16 h-16 mx-auto everett-gradient rounded-full flex items-center justify-center text-white mb-4">
                  {pkg.icon}
                </div>
                <CardTitle className="text-yellow-300">{pkg.name}</CardTitle>
                <div className="space-y-1">
                  <p className="text-2xl font-bold text-white">{pkg.deposit.toLocaleString()} KES</p>
                  <p className="text-sm text-yellow-500">Security Deposit</p>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="p-3 bg-yellow-900/20 rounded-lg">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <TrendingUp className="w-4 h-4 text-green-400" />
                      <span className="text-xs text-yellow-500">Daily</span>
                    </div>
                    <p className="font-bold text-green-400">{pkg.dailyIncome.toLocaleString()}</p>
                    <p className="text-xs text-yellow-600">KES</p>
                  </div>
                  <div className="p-3 bg-yellow-900/20 rounded-lg">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <DollarSign className="w-4 h-4 text-blue-400" />
                      <span className="text-xs text-yellow-500">Monthly</span>
                    </div>
                    <p className="font-bold text-blue-400">{pkg.monthlyIncome.toLocaleString()}</p>
                    <p className="text-xs text-yellow-600">KES</p>
                  </div>
                </div>

                {/* Features */}
                <div>
                  <h4 className="font-semibold text-yellow-300 mb-2">Features:</h4>
                  <ul className="space-y-1">
                    {pkg.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm text-yellow-200">
                        <CheckCircle className="w-3 h-3 text-green-400" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Button */}
                {user?.jobTier === pkg.id ? (
                  <Badge className="w-full bg-green-500 text-white justify-center py-3 text-sm font-semibold">
                    ✓ Current Package
                  </Badge>
                ) : (
                  <Button
                    className="w-full everett-gradient text-white font-bold py-3 text-sm hover:scale-105 transition-transform duration-200"
                    disabled={isActivating === pkg.id}
                    onClick={(e) => {
                      e.stopPropagation()
                      activatePackage(pkg)
                    }}
                  >
                    {isActivating === pkg.id ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Activating...
                      </div>
                    ) : pkg.id === 0 ? (
                      "Try Free"
                    ) : (
                      "Activate Package"
                    )}
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Package Comparison Table */}
        <Card className="black-section border-yellow-600/30 mt-8">
          <CardHeader>
            <CardTitle className="text-yellow-400">Package Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-yellow-600/30">
                    <th className="text-left p-3 text-yellow-400">Package</th>
                    <th className="text-right p-3 text-yellow-400">Deposit (KES)</th>
                    <th className="text-right p-3 text-yellow-400">Daily Tasks</th>
                    <th className="text-right p-3 text-yellow-400">Daily Income (KES)</th>
                    <th className="text-right p-3 text-yellow-400">Monthly Income (KES)</th>
                    <th className="text-right p-3 text-yellow-400">Annual Income (KES)</th>
                  </tr>
                </thead>
                <tbody>
                  {packages.map((pkg) => (
                    <tr
                      key={pkg.id}
                      className={`border-b border-yellow-600/20 hover:bg-yellow-900/10 ${
                        user?.jobTier === pkg.id ? "bg-green-900/20" : ""
                      }`}
                    >
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          {user?.jobTier === pkg.id && <CheckCircle className="w-4 h-4 text-green-400" />}
                          <span className="font-medium text-white">{pkg.name}</span>
                          {pkg.popular && <Badge className="bg-orange-500 text-white text-xs">Popular</Badge>}
                          {pkg.premium && <Badge className="bg-purple-500 text-white text-xs">Premium</Badge>}
                        </div>
                      </td>
                      <td className="p-3 text-right text-white">{pkg.deposit.toLocaleString()}</td>
                      <td className="p-3 text-right text-white">{pkg.tasks}</td>
                      <td className="p-3 text-right text-green-400 font-semibold">
                        {pkg.dailyIncome.toLocaleString()}
                      </td>
                      <td className="p-3 text-right text-blue-400 font-semibold">
                        {pkg.monthlyIncome.toLocaleString()}
                      </td>
                      <td className="p-3 text-right text-purple-400 font-semibold">
                        {pkg.annualIncome.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Activation Confirmation Modal */}
      {selectedPackage && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md black-section border-yellow-600">
            <CardHeader>
              <CardTitle className="text-yellow-400">Confirm Package Activation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto everett-gradient rounded-full flex items-center justify-center text-white mb-4">
                  {selectedPackage.icon}
                </div>
                <h3 className="text-xl font-bold text-white">{selectedPackage.name}</h3>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-yellow-500">Security Deposit:</span>
                  <span className="text-white font-semibold">{selectedPackage.deposit.toLocaleString()} KES</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-yellow-500">Daily Tasks:</span>
                  <span className="text-white font-semibold">{selectedPackage.tasks}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-yellow-500">Daily Income:</span>
                  <span className="text-green-400 font-semibold">
                    {selectedPackage.dailyIncome.toLocaleString()} KES
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-yellow-500">Monthly Income:</span>
                  <span className="text-blue-400 font-semibold">
                    {selectedPackage.monthlyIncome.toLocaleString()} KES
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button onClick={confirmActivation} className="flex-1 everett-gradient text-white">
                  Confirm Activation
                </Button>
                <Button
                  onClick={() => setSelectedPackage(null)}
                  variant="outline"
                  className="border-yellow-600 text-yellow-400"
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
