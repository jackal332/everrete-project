"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

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
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (userData: Omit<User, "id" | "balance" | "isActivated" | "joinDate" | "referralCode">) => Promise<void>
  logout: () => void
  updateUser: (updates: Partial<User>) => void
  refreshSession: () => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate checking for existing user session
    const checkSession = async () => {
      try {
        // Check localStorage for user session
        const storedUser = localStorage.getItem("everett_user")
        if (storedUser) {
          const userData = JSON.parse(storedUser)
          setUser(userData)
        }
      } catch (error) {
        console.error("Error checking session:", error)
      } finally {
        setLoading(false)
      }
    }

    checkSession()
  }, [])

  const login = async (email: string, password: string) => {
    setLoading(true)
    try {
      // Simulate login - replace with actual auth logic
      const mockUser: User = {
        id: "1",
        name: "John Doe",
        email: email,
        phone: "+254700000000",
        package: "Bronze",
        balance: 1500,
        isActivated: true,
        joinDate: new Date().toISOString(),
        referralCode: "REF123456",
      }

      localStorage.setItem("everett_user", JSON.stringify(mockUser))
      setUser(mockUser)
    } catch (error) {
      throw new Error("Login failed")
    } finally {
      setLoading(false)
    }
  }

  const register = async (userData: Omit<User, "id" | "balance" | "isActivated" | "joinDate" | "referralCode">) => {
    setLoading(true)
    try {
      // Simulate registration - replace with actual auth logic
      const newUser: User = {
        ...userData,
        id: Date.now().toString(),
        balance: 50, // Welcome bonus
        isActivated: false,
        joinDate: new Date().toISOString(),
        referralCode: `REF${Date.now()}`,
      }

      localStorage.setItem("everett_user", JSON.stringify(newUser))
      setUser(newUser)
    } catch (error) {
      throw new Error("Registration failed")
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem("everett_user")
    setUser(null)
  }

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates }
      setUser(updatedUser)
      localStorage.setItem("everett_user", JSON.stringify(updatedUser))
    }
  }

  const refreshSession = () => {
    // Refresh user session if needed
    const storedUser = localStorage.getItem("everett_user")
    if (storedUser) {
      const userData = JSON.parse(storedUser)
      setUser(userData)
    }
  }

  const value = {
    user,
    loading,
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
