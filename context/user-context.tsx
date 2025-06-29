"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { auth } from "../auth"

interface User {
  id: string
  name: string
  email: string
  phone: string
  package?: string
  balance: number
  isActivated: boolean
  joinDate: string
  referralCode: string
  referredBy?: string
}

interface UserContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (userData: Omit<User, "id" | "balance" | "isActivated" | "joinDate" | "referralCode">) => Promise<void>
  logout: () => void
  updateUser: (updates: Partial<User>) => void
  refreshSession: () => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing user session on mount
    const currentUser = auth.getCurrentUser()
    setUser(currentUser)
    setIsLoading(false)

    // Set up session refresh interval
    const interval = setInterval(() => {
      const user = auth.getCurrentUser()
      if (user) {
        auth.refreshSession()
      } else if (user !== null) {
        // Session expired
        setUser(null)
      }
    }, 60000) // Check every minute

    return () => clearInterval(interval)
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      const user = await auth.login(email, password)
      setUser(user)
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (userData: Omit<User, "id" | "balance" | "isActivated" | "joinDate" | "referralCode">) => {
    setIsLoading(true)
    try {
      const user = await auth.register(userData)
      setUser(user)
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    auth.logout()
    setUser(null)
  }

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates }
      setUser(updatedUser)
      auth.updateUser(updates)
    }
  }

  const refreshSession = () => {
    auth.refreshSession()
  }

  const value = {
    user,
    isLoading,
    login,
    register,
    logout,
    updateUser,
    refreshSession,
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}
