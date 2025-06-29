"use client"

import { Home, CheckSquare, DollarSign, Users, User } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"

const navigationItems = [
  {
    name: "Home",
    href: "/dashboard",
    icon: Home,
  },
  {
    name: "Tasks",
    href: "/dashboard/tasks",
    icon: CheckSquare,
  },
  {
    name: "Wealth",
    href: "/dashboard/wealth",
    icon: DollarSign,
  },
  {
    name: "Team",
    href: "/dashboard/team",
    icon: Users,
  },
  {
    name: "Profile",
    href: "/dashboard/profile",
    icon: User,
  },
]

export default function BottomNavigation() {
  const pathname = usePathname()
  const router = useRouter()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t md:hidden">
      <div className="grid grid-cols-5 h-16">
        {navigationItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon

          return (
            <button
              key={item.name}
              onClick={() => router.push(item.href)}
              className={cn(
                "flex flex-col items-center justify-center gap-1 text-xs transition-colors",
                isActive ? "text-yellow-600 bg-yellow-50" : "text-muted-foreground hover:text-foreground",
              )}
            >
              <Icon className={cn("h-5 w-5", isActive && "text-yellow-600")} />
              <span className={cn("text-xs", isActive && "font-medium text-yellow-600")}>{item.name}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
