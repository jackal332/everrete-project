"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { Home, User, Wallet, Settings } from "lucide-react"
import { useState, useEffect } from "react"

export function MobileBottomNav() {
  const pathname = usePathname()
  const [activeTab, setActiveTab] = useState("")

  useEffect(() => {
    setActiveTab(pathname)
  }, [pathname])

  const navItems = [
    { icon: Home, label: "Home", href: "/dashboard", key: "/dashboard" },
    { icon: User, label: "User", href: "/dashboard/user", key: "/dashboard/user" },
    { icon: Wallet, label: "Wallet", href: "/dashboard/wallet", key: "/dashboard/wallet" },
    { icon: Settings, label: "Settings", href: "/dashboard/settings", key: "/dashboard/settings" },
  ]

  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === "/dashboard"
    }
    return pathname.startsWith(href)
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-amber-900 via-yellow-800 to-amber-900 border-t border-yellow-700 z-50 shadow-2xl md:hidden">
      <div className="grid grid-cols-4 max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon
          const active = isActive(item.href)

          return (
            <Link
              key={item.key}
              href={item.href}
              className={`relative flex flex-col items-center py-3 px-2 transition-all duration-300 ${
                active ? "text-yellow-200 transform scale-105" : "text-yellow-400 hover:text-yellow-200 hover:scale-105"
              }`}
              onClick={() => setActiveTab(item.href)}
            >
              {/* Ripple effect background */}
              {active && (
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-600/30 to-amber-600/30 rounded-lg animate-pulse" />
              )}

              {/* Gold highlight indicator */}
              {active && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-gradient-to-r from-yellow-400 to-amber-400 rounded-full shadow-lg" />
              )}

              <div className="relative z-10 flex flex-col items-center">
                <Icon className={`h-5 w-5 mb-1 transition-all duration-300 ${active ? "drop-shadow-lg" : ""}`} />
                <span className={`text-xs font-medium transition-all duration-300 ${active ? "font-bold" : ""}`}>
                  {item.label}
                </span>
              </div>

              {/* Animated gold ring for active state */}
              {active && <div className="absolute inset-2 border-2 border-yellow-400/50 rounded-lg animate-ping" />}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
