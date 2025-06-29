import type React from "react"
import DashboardHeader from "@/app/ui/dashboard/dashboard-header/dashboard-header"
import BottomNavigation from "@/app/ui/dashboard/bottom-navigation/bottom-navigation"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-black">
      <div className="flex flex-col min-h-screen">
        <DashboardHeader />
        <main className="flex-1 pb-16 sm:pb-0">{children}</main>
        <BottomNavigation />
      </div>
    </div>
  )
}
