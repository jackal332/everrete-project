"use client"

import { useState } from "react"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BackButton } from "@/components/back-button"
import { CheckCircle, Star, Crown, Diamond, Zap } from "lucide-react"
import { useRouter } from "next/navigation"

const packages = [
  {
    id: 1,
    name: "Bronze",
    price: 500,
    dailyEarning: 50,
    icon: Star,
    color: "from-amber-600 to-yellow-600",
    features: ["5 Daily Tasks", "Basic Support", "Mobile Access"],
  },
  {
    id: 2,
    name: "Silver",
    price: 1000,
    dailyEarning: 100,
    icon: Star,
    color: "from-gray-400 to-gray-600",
    features: ["10 Daily Tasks", "Priority Support", "Mobile + Web Access"],
  },
  {
    id: 3,
    name: "Gold",
    price: 2000,
    dailyEarning: 200,
    icon: Crown,
    color: "from-yellow-400 to-yellow-600",
    features: ["15 Daily Tasks", "Premium Support", "All Platform Access", "Bonus Rewards"],
  },
  {
    id: 4,
    name: "Platinum",
    price: 5000,
    dailyEarning: 500,
    icon: Crown,
    color: "from-slate-300 to-slate-500",
    features: ["20 Daily Tasks", "VIP Support", "All Features", "Higher Bonuses"],
  },
  {
    id: 5,
    name: "Diamond",
    price: 10000,
    dailyEarning: 1000,
    icon: Diamond,
    color: "from-blue-400 to-cyan-400",
    features: ["25 Daily Tasks", "Dedicated Support", "Premium Features", "Maximum Bonuses"],
  },
  {
    id: 6,
    name: "Elite",
    price: 20000,
    dailyEarning: 2000,
    icon: Diamond,
    color: "from-purple-400 to-pink-400",
    features: ["30 Daily Tasks", "Elite Support", "Exclusive Features", "Elite Bonuses"],
  },
  {
    id: 7,
    name: "Premium",
    price: 50000,
    dailyEarning: 5000,
    icon: Zap,
    color: "from-green-400 to-emerald-500",
    features: ["35 Daily Tasks", "Premium Support", "All Premium Features", "Premium Bonuses"],
  },
  {
    id: 8,
    name: "Ultimate",
    price: 100000,
    dailyEarning: 10000,
    icon: Zap,
    color: "from-red-400 to-orange-500",
    features: ["40 Daily Tasks", "Ultimate Support", "Ultimate Features", "Ultimate Bonuses"],
  },
  {
    id: 9,
    name: "Supreme",
    price: 200000,
    dailyEarning: 20000,
    icon: Crown,
    color: "from-indigo-400 to-purple-600",
    features: ["50 Daily Tasks", "Supreme Support", "All Features Unlocked", "Supreme Bonuses"],
  },
]

export default function PackagesPage() {
  const { user, updateUser } = useAuth()
  const router = useRouter()
  const [selectedPackage, setSelectedPackage] = useState<number | null>(null)

  const handleSelectPackage = (packageId: number) => {
    setSelectedPackage(packageId)
    // Redirect to manual payment page with selected package
    router.push(`/dashboard/manual-payment?package=${packageId}`)
  }

  const currentPackage = user?.jobTier ? packages.find((pkg) => pkg.id === user.jobTier) : null

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-900 via-yellow-800 to-amber-900">
      <div className="container mx-auto px-4 py-8">
        <BackButton />

        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-yellow-400 mb-2">Choose Your Package</h1>
          <p className="text-yellow-300">
            {user?.isActivated
              ? `Current Package: ${currentPackage?.name || "None"} - Upgrade to earn more!`
              : "Select a package to start earning with Everett"}
          </p>
        </div>

        {user?.isActivated && currentPackage && (
          <Card className="mb-6 bg-green-900/20 border-green-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-green-400" />
                  <div>
                    <h3 className="text-green-400 font-semibold">Active Package: {currentPackage.name}</h3>
                    <p className="text-green-300 text-sm">Daily Earning: KES {currentPackage.dailyEarning}</p>
                  </div>
                </div>
                <div className="text-green-400 font-bold">KES {currentPackage.price}</div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {packages.map((pkg) => {
            const IconComponent = pkg.icon
            const isCurrentPackage = user?.jobTier === pkg.id
            const canUpgrade = !user?.jobTier || pkg.id > user.jobTier

            return (
              <Card
                key={pkg.id}
                className={`relative overflow-hidden transition-all duration-300 hover:scale-105 ${
                  isCurrentPackage
                    ? "bg-green-900/20 border-green-500 ring-2 ring-green-500"
                    : "bg-yellow-900/20 border-yellow-700 hover:border-yellow-500"
                }`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${pkg.color} opacity-10`} />

                <CardHeader className="relative">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-yellow-400 flex items-center gap-2">
                      <IconComponent className="w-5 h-5" />
                      {pkg.name}
                    </CardTitle>
                    {isCurrentPackage && <CheckCircle className="w-5 h-5 text-green-400" />}
                  </div>
                  <div className="text-2xl font-bold text-yellow-300">KES {pkg.price.toLocaleString()}</div>
                  <div className="text-yellow-400">Daily Earning: KES {pkg.dailyEarning}</div>
                </CardHeader>

                <CardContent className="relative">
                  <ul className="space-y-2 mb-4">
                    {pkg.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-yellow-300 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {isCurrentPackage ? (
                    <Button disabled className="w-full bg-green-600 text-white">
                      Current Package
                    </Button>
                  ) : canUpgrade ? (
                    <Button
                      onClick={() => handleSelectPackage(pkg.id)}
                      className={`w-full bg-gradient-to-r ${pkg.color} hover:opacity-90 text-white`}
                    >
                      {user?.isActivated ? "Upgrade" : "Select"} Package
                    </Button>
                  ) : (
                    <Button disabled className="w-full bg-gray-600 text-gray-300">
                      Lower Tier
                    </Button>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="mt-8 text-center">
          <Card className="bg-yellow-900/20 border-yellow-700 max-w-2xl mx-auto">
            <CardContent className="p-6">
              <h3 className="text-yellow-400 font-semibold mb-2">How It Works</h3>
              <div className="text-yellow-300 text-sm space-y-1">
                <p>• Choose your preferred package above</p>
                <p>• Complete the M-Pesa payment process</p>
                <p>• Wait for admin approval (usually within 24 hours)</p>
                <p>• Start earning daily by completing simple tasks</p>
                <p>• Withdraw your earnings anytime (minimum KES 500)</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
