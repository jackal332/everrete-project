"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/components/auth-provider"
import { useToast } from "@/components/ui/use-toast"
import { Menu, X, Package, Star, Crown, Diamond } from "lucide-react"

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
}

export function PackagesMenu() {
  const { user, updateUser } = useAuth()
  const { toast } = useToast()
  const [isOpen, setIsOpen] = useState(false)
  const [selectedPackage, setSelectedPackage] = useState<JobPackage | null>(null)

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
      icon: <Package className="w-6 h-6" />,
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
      icon: <Package className="w-6 h-6" />,
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
      icon: <Package className="w-6 h-6" />,
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
      icon: <Star className="w-6 h-6" />,
      popular: true,
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
      icon: <Star className="w-6 h-6" />,
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
      icon: <Crown className="w-6 h-6" />,
      premium: true,
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
      icon: <Crown className="w-6 h-6" />,
      premium: true,
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
      icon: <Diamond className="w-6 h-6" />,
      premium: true,
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
      icon: <Diamond className="w-6 h-6" />,
      premium: true,
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
      icon: <Diamond className="w-6 h-6" />,
      premium: true,
    },
  ]

  const activatePackage = (pkg: JobPackage) => {
    setSelectedPackage(pkg)
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
      setIsOpen(false)
    }
  }

  return (
    <>
      {/* Menu Trigger */}
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed top-20 right-4 z-40 everett-gradient text-white shadow-lg"
        size="icon"
      >
        <Menu className="w-5 h-5" />
      </Button>

      {/* Packages Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <Card className="bg-black/80 border-yellow-600">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-yellow-400">Job Packages</h2>
                  <Button onClick={() => setIsOpen(false)} variant="ghost" size="icon">
                    <X className="w-5 h-5 text-yellow-400" />
                  </Button>
                </div>

                <div className="package-grid">
                  {packages.map((pkg) => (
                    <Card
                      key={pkg.id}
                      className={`relative bg-black/60 border-yellow-600/30 hover:border-yellow-400 transition-all cursor-pointer ${
                        user?.jobTier === pkg.id ? "ring-2 ring-yellow-400" : ""
                      }`}
                      onClick={() => activatePackage(pkg)}
                    >
                      <CardContent className="p-4">
                        {pkg.popular && (
                          <Badge className="absolute -top-2 -right-2 bg-orange-500 text-white">Popular</Badge>
                        )}
                        {pkg.premium && (
                          <Badge className="absolute -top-2 -right-2 bg-purple-500 text-white">Premium</Badge>
                        )}

                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 rounded-full everett-gradient flex items-center justify-center text-white">
                            {pkg.icon}
                          </div>
                          <div>
                            <h3 className="font-bold text-yellow-300">{pkg.name}</h3>
                            <p className="text-sm text-yellow-500">{pkg.tasks} daily tasks</p>
                          </div>
                        </div>

                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-yellow-500">Deposit:</span>
                            <span className="text-white font-semibold">{pkg.deposit.toLocaleString()} KES</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-yellow-500">Daily Income:</span>
                            <span className="text-green-400 font-semibold">{pkg.dailyIncome.toLocaleString()} KES</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-yellow-500">Monthly:</span>
                            <span className="text-blue-400 font-semibold">
                              {pkg.monthlyIncome.toLocaleString()} KES
                            </span>
                          </div>
                        </div>

                        {user?.jobTier === pkg.id ? (
                          <Badge className="w-full mt-3 bg-green-500 text-white justify-center">Current Package</Badge>
                        ) : (
                          <Button className="w-full mt-3 everett-gradient text-white" size="sm">
                            {pkg.id === 0 ? "Try Free" : "Activate"}
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Activation Confirmation */}
      {selectedPackage && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-60 p-4">
          <Card className="w-full max-w-md bg-black/90 border-yellow-600">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-yellow-400 mb-4">Confirm Activation</h3>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-yellow-500">Package:</span>
                  <span className="text-white font-semibold">{selectedPackage.name}</span>
                </div>
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
    </>
  )
}
