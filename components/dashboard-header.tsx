"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/components/auth-provider"
import { Bell, Settings, Search, Shield, Package } from "lucide-react"
import { EverettIcon } from "@/components/everett-icon"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function DashboardHeader() {
  const { user, logout } = useAuth()
  const [notifications, setNotifications] = useState([
    { id: 1, message: "Your task reward of 270 KES has been credited", time: "2 hours ago" },
    { id: 2, message: "New referral bonus received: 240 KES", time: "Yesterday" },
    { id: 3, message: "Complete your daily tasks to earn more", time: "2 days ago" },
  ])

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-orange-900 to-orange-800 border-b border-orange-700 px-4 py-3 shadow-lg">
      <div className="flex items-center justify-between">
        <Link href="/dashboard" className="flex items-center gap-3">
          <EverettIcon size={32} />
          <h1 className="text-xl font-bold everett-text">Everett</h1>
        </Link>

        <div className="flex items-center gap-2">
          {/* Packages Button */}
          <Link href="/dashboard/packages">
            <Button variant="ghost" size="icon" className="hover:bg-orange-800/50">
              <Package className="h-5 w-5 text-orange-200" />
            </Button>
          </Link>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative hover:bg-orange-800/50">
                <Bell className="h-5 w-5 text-orange-200" />
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 bg-orange-950 border border-orange-800">
              <DropdownMenuLabel className="text-orange-300">Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-orange-800/30" />
              {notifications.map((notification) => (
                <DropdownMenuItem key={notification.id} className="py-3 px-4 focus:bg-orange-900/30 cursor-pointer">
                  <div>
                    <p className="text-white">{notification.message}</p>
                    <p className="text-orange-500 text-xs mt-1">{notification.time}</p>
                  </div>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator className="bg-orange-800/30" />
              <DropdownMenuItem className="py-2 justify-center focus:bg-orange-900/30 cursor-pointer">
                <Link href="/dashboard/notifications" className="text-orange-300 text-sm">
                  View all notifications
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Search */}
          <Link href="/dashboard/search">
            <Button variant="ghost" size="icon" className="hover:bg-orange-800/50">
              <Search className="h-5 w-5 text-orange-200" />
            </Button>
          </Link>

          {/* Settings with Admin Panel */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="hover:bg-orange-800/50">
                <Settings className="h-5 w-5 text-orange-200" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-orange-950 border border-orange-800">
              <DropdownMenuLabel className="text-orange-300">Settings</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-orange-800/30" />
              <DropdownMenuItem className="focus:bg-orange-900/30 cursor-pointer">
                <Link href="/dashboard/settings" className="flex w-full text-orange-200">
                  Account Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="focus:bg-orange-900/30 cursor-pointer">
                <Link href="/dashboard/admin-panel" className="flex w-full text-orange-200">
                  <Shield className="w-4 h-4 mr-2" />
                  Admin Panel
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="focus:bg-orange-900/30 cursor-pointer">
                <Link href="/dashboard/security" className="flex w-full text-orange-200">
                  Security
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-orange-800/30" />
              <DropdownMenuItem className="focus:bg-orange-900/30 cursor-pointer text-red-400" onClick={logout}>
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
