"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface User {
  id: string
  name: string
  email: string
  phone?: string
  balance: number
  inviteBalance: number
  isActivated: boolean
  jobTier: number | null
  package?: string
  tasksCompleted: number
  totalEarned: number
  referrals: number
  createdAt: string
}

interface UserContextType {
  user: User | null
  loading: boolean
  updateUser: (updates: Partial<User>) => void
  setUser: (user: User | null) => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Load user from localStorage on mount
    const loadUser = () => {
      try {
        const storedUser = localStorage.getItem("everett-user")
        if (storedUser) {
          const userData = JSON.parse(storedUser)
          setUser(userData)
        }
      } catch (error) {
        console.error("Error loading user:", error)
      } finally {
        setLoading(false)
      }
    }

    loadUser()
  }, [])

  const updateUser = (updates: Partial<User>) => {
    if (!user) return

    const updatedUser = { ...user, ...updates }
    setUser(updatedUser)
    localStorage.setItem("everett-user", JSON.stringify(updatedUser))
  }

  const setUserData = (userData: User | null) => {
    setUser(userData)
    if (userData) {
      localStorage.setItem("everett-user", JSON.stringify(userData))
    } else {
      localStorage.removeItem("everett-user")
    }
  }

  return (
    <UserContext.Provider value={{ user, loading, updateUser, setUser: setUserData }}>{children}</UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}
