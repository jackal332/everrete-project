"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, TrendingUp, DollarSign } from "lucide-react"

interface PackageCardProps {
  pkg: {
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
  isActive: boolean
  onActivate: (pkg: any) => void
  isActivating: boolean
}

export function EnhancedPackageCard({ pkg, isActive, onActivate, isActivating }: PackageCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const getCardBorderClass = () => {
    if (isActive) return "ring-2 ring-green-400 border-green-400 shadow-green-400/20"
    if (pkg.popular) return "ring-2 ring-orange-400 border-orange-400/50"
    if (pkg.premium) return "ring-2 ring-purple-400 border-purple-400/50"
    return "border-yellow-600/30 hover:border-yellow-400"
  }

  const getIconColor = () => {
    if (pkg.id <= 2) return "text-blue-400"
    if (pkg.id <= 4) return "text-yellow-400"
    if (pkg.id <= 6) return "text-purple-400"
    return "text-pink-400"
  }

  return (
    <Card
      className={`relative black-section transition-all duration-300 cursor-pointer transform hover:scale-105 hover:shadow-2xl ${getCardBorderClass()}`}
      onClick={() => !isActive && onActivate(pkg)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Badge Indicators */}
      {pkg.popular && (
        <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-orange-500 text-white z-10">
          🔥 Most Popular
        </Badge>
      )}
      {pkg.premium && (
        <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-purple-500 text-white z-10">
          👑 Premium
        </Badge>
      )}
      {isActive && <Badge className="absolute -top-3 right-4 bg-green-500 text-white z-10">✓ Active</Badge>}

      <CardHeader className="text-center pb-4">
        <div
          className={`w-16 h-16 mx-auto everett-gradient rounded-full flex items-center justify-center text-white mb-4 transition-transform duration-300 ${isHovered ? "scale-110" : ""}`}
        >
          {pkg.icon}
        </div>
        <CardTitle className={`text-xl font-bold ${getIconColor()}`}>{pkg.name}</CardTitle>
        <div className="space-y-2">
          <p className="text-3xl font-bold text-white">{pkg.deposit.toLocaleString()}</p>
          <p className="text-sm text-yellow-500">Security Deposit (KES)</p>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Enhanced Metrics Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-gradient-to-br from-green-900/30 to-green-800/20 rounded-lg border border-green-600/30">
            <div className="flex items-center justify-center gap-1 mb-2">
              <TrendingUp className="w-4 h-4 text-green-400" />
              <span className="text-xs text-green-300 font-medium">Daily</span>
            </div>
            <p className="font-bold text-green-400 text-lg">{pkg.dailyIncome.toLocaleString()}</p>
            <p className="text-xs text-green-500">KES</p>
          </div>
          <div className="p-3 bg-gradient-to-br from-blue-900/30 to-blue-800/20 rounded-lg border border-blue-600/30">
            <div className="flex items-center justify-center gap-1 mb-2">
              <DollarSign className="w-4 h-4 text-blue-400" />
              <span className="text-xs text-blue-300 font-medium">Monthly</span>
            </div>
            <p className="font-bold text-blue-400 text-lg">{pkg.monthlyIncome.toLocaleString()}</p>
            <p className="text-xs text-blue-500">KES</p>
          </div>
        </div>

        {/* Task Information */}
        <div className="p-3 bg-yellow-900/20 rounded-lg border border-yellow-600/30">
          <div className="flex items-center justify-between">
            <span className="text-yellow-300 font-medium">Daily Tasks:</span>
            <Badge className="bg-yellow-600 text-white">{pkg.tasks}</Badge>
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="text-yellow-300 font-medium">Per Task:</span>
            <span className="text-white font-semibold">{pkg.unitPrice} KES</span>
          </div>
        </div>

        {/* Features List */}
        <div>
          <h4 className="font-semibold text-yellow-300 mb-3">Package Features:</h4>
          <ul className="space-y-2">
            {pkg.features.map((feature, index) => (
              <li key={index} className="flex items-center gap-2 text-sm text-yellow-200">
                <CheckCircle className="w-3 h-3 text-green-400 flex-shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          {isActive ? (
            <Badge className="w-full bg-green-500 text-white justify-center py-3 text-sm font-semibold">
              ✓ Current Package
            </Badge>
          ) : (
            <Button
              className="w-full everett-gradient text-white font-bold py-3 text-sm hover:scale-105 transition-transform duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isActivating}
              onClick={(e) => {
                e.stopPropagation()
                onActivate(pkg)
              }}
            >
              {isActivating ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Activating...
                </div>
              ) : (
                <>{pkg.id === 0 ? "🎁 Try Free" : "🚀 Activate Package"}</>
              )}
            </Button>
          )}
        </div>

        {/* ROI Information */}
        {pkg.id > 0 && (
          <div className="text-center p-2 bg-purple-900/20 rounded-lg border border-purple-600/30">
            <p className="text-xs text-purple-300">
              Annual ROI:{" "}
              <span className="font-bold text-purple-200">{((pkg.annualIncome / pkg.deposit) * 100).toFixed(0)}%</span>
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
