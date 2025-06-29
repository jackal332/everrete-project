"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"

// Add lastActive to User type
type User = {
  id: string
  name: string
  email: string
  isActivated: boolean
  jobTier: number | null
  balance: number
  inviteBalance: number
  referralCode: string
  referredBy: string | null
  tasksCompleted: number
  totalEarned: number
  lastActive: string // Add this line
}

type AuthContextType = {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string, referralCode?: string) => Promise<void>
  logout: () => void
  updateUser: (userData: Partial<User>) => void
  updateLastActive: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // Add session check in useEffect
  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem("everett-user")
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser)

      // Check if session has timed out (5 minutes)
      const lastActive = new Date(parsedUser.lastActive || Date.now())
      const now = new Date()
      const diffMinutes = (now.getTime() - lastActive.getTime()) / (1000 * 60)

      if (diffMinutes > 5) {
        // Session timed out, force logout
        logout()
        return
      }

      // Update last active time
      parsedUser.lastActive = now.toISOString()
      localStorage.setItem("everett-user", JSON.stringify(parsedUser))
      setUser(parsedUser)
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock user data - check if user has activated package
      const mockUser: User = {
        id: "user-" + Math.random().toString(36).substr(2, 9),
        name: email.split("@")[0],
        email,
        isActivated: Math.random() > 0.5, // Randomly assign for demo
        jobTier: Math.random() > 0.5 ? Math.floor(Math.random() * 9) + 1 : null,
        balance: Math.floor(Math.random() * 10000),
        inviteBalance: Math.floor(Math.random() * 5000),
        referralCode: "EV" + Math.random().toString(36).substr(2, 6).toUpperCase(),
        referredBy: null,
        tasksCompleted: Math.floor(Math.random() * 50),
        totalEarned: Math.floor(Math.random() * 50000),
        lastActive: new Date().toISOString(),
      }

      setUser(mockUser)
      localStorage.setItem("everett-user", JSON.stringify(mockUser))

      // Redirect logic: Dashboard if activated, Packages if not
      if (mockUser.isActivated && mockUser.jobTier !== null) {
        router.push("/dashboard")
      } else {
        router.push("/dashboard/packages")
      }
    } catch (error) {
      console.error("Login failed:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (name: string, email: string, password: string, referralCode?: string) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock user data
      const mockUser: User = {
        id: "user-" + Math.random().toString(36).substr(2, 9),
        name,
        email,
        isActivated: false,
        jobTier: null,
        balance: 0,
        inviteBalance: 0,
        referralCode: "EV" + Math.random().toString(36).substr(2, 6).toUpperCase(),
        referredBy: referralCode || null,
        tasksCompleted: 0,
        totalEarned: 0,
        lastActive: new Date().toISOString(),
      }

      setUser(mockUser)
      localStorage.setItem("everett-user", JSON.stringify(mockUser))
      router.push("/dashboard/packages")
    } catch (error) {
      console.error("Registration failed:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("everett-user")
    router.push("/")
  }

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData }
      setUser(updatedUser)
      localStorage.setItem("everett-user", JSON.stringify(updatedUser))
    }
  }

  // Add function to update last active time
  const updateLastActive = () => {
    if (user) {
      const updatedUser = {
        ...user,
        lastActive: new Date().toISOString(),
      }
      setUser(updatedUser)
      localStorage.setItem("everett-user", JSON.stringify(updatedUser))
    }
  }

  // Add activity listener
  useEffect(() => {
    const handleActivity = () => {
      updateLastActive()
    }

    // Add event listeners for user activity
    window.addEventListener("mousemove", handleActivity)
    window.addEventListener("keydown", handleActivity)
    window.addEventListener("click", handleActivity)
    window.addEventListener("touchstart", handleActivity)

    // Set interval to check session timeout every minute
    const interval = setInterval(() => {
      if (user) {
        const lastActive = new Date(user.lastActive)
        const now = new Date()
        const diffMinutes = (now.getTime() - lastActive.getTime()) / (1000 * 60)

        if (diffMinutes > 5) {
          logout()
          // toast({
          //   title: "Session Expired",
          //   description: "Your session has expired. Please log in again.",
          //   variant: "destructive",
          // })
        }
      }
    }, 60000)

    return () => {
      window.removeEventListener("mousemove", handleActivity)
      window.removeEventListener("keydown", handleActivity)
      window.removeEventListener("click", handleActivity)
      window.removeEventListener("touchstart", handleActivity)
      clearInterval(interval)
    }
  }, [user])

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        logout,
        updateUser,
        updateLastActive,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
