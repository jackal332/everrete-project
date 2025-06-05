"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { Home, CheckSquare, DollarSign, Users, User } from "lucide-react"

export function BottomNavigation() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-orange-900 to-orange-800 border-t border-orange-700 z-40 shadow-lg">
      <div className="grid grid-cols-5 max-w-md mx-auto">
        <Link
          href="/dashboard"
          className={`flex flex-col items-center py-3 px-2 transition-colors ${
            isActive("/dashboard") ? "text-orange-200 bg-orange-800/50" : "text-orange-400 hover:text-orange-200"
          }`}
        >
          <Home className="h-5 w-5 mb-1" />
          <span className="text-xs font-medium">Home</span>
        </Link>
        <Link
          href="/dashboard/tasks"
          className={`flex flex-col items-center py-3 px-2 transition-colors ${
            isActive("/dashboard/tasks") ? "text-orange-200 bg-orange-800/50" : "text-orange-400 hover:text-orange-200"
          }`}
        >
          <CheckSquare className="h-5 w-5 mb-1" />
          <span className="text-xs font-medium">Tasks</span>
        </Link>
        <Link
          href="/dashboard/wealth"
          className={`flex flex-col items-center py-3 px-2 transition-colors ${
            isActive("/dashboard/wealth") ? "text-orange-200 bg-orange-800/50" : "text-orange-400 hover:text-orange-200"
          }`}
        >
          <DollarSign className="h-5 w-5 mb-1" />
          <span className="text-xs font-medium">Wealth</span>
        </Link>
        <Link
          href="/dashboard/team"
          className={`flex flex-col items-center py-3 px-2 transition-colors ${
            isActive("/dashboard/team") ? "text-orange-200 bg-orange-800/50" : "text-orange-400 hover:text-orange-200"
          }`}
        >
          <Users className="h-5 w-5 mb-1" />
          <span className="text-xs font-medium">Team</span>
        </Link>
        <Link
          href="/dashboard/profile"
          className={`flex flex-col items-center py-3 px-2 transition-colors ${
            isActive("/dashboard/profile")
              ? "text-orange-200 bg-orange-800/50"
              : "text-orange-400 hover:text-orange-200"
          }`}
        >
          <User className="h-5 w-5 mb-1" />
          <span className="text-xs font-medium">Profile</span>
        </Link>
      </div>
    </div>
  )
}
