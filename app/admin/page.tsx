"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CreditCard, User, TrendingUp } from "lucide-react"

export default function AdminPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-yellow-400 mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="black-section border-yellow-600/30 hover:border-yellow-400 transition-colors">
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-yellow-300">Manual Payments</h3>
                <p className="text-yellow-500 text-sm">Approve M-Pesa transactions</p>
              </div>
            </div>
            <Link href="/admin/manual-payments">
              <Button className="w-full everett-gradient text-white">Manage Payments</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="black-section border-yellow-600/30 hover:border-yellow-400 transition-colors">
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-yellow-300">User Management</h3>
                <p className="text-yellow-500 text-sm">View and manage users</p>
              </div>
            </div>
            <Button className="w-full everett-gradient text-white" disabled>
              Coming Soon
            </Button>
          </CardContent>
        </Card>

        <Card className="black-section border-yellow-600/30 hover:border-yellow-400 transition-colors">
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-yellow-300">Analytics</h3>
                <p className="text-yellow-500 text-sm">View platform statistics</p>
              </div>
            </div>
            <Button className="w-full everett-gradient text-white" disabled>
              Coming Soon
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
