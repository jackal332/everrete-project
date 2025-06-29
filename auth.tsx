"use client"

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

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  sessionStart: number | null
}

const SESSION_TIMEOUT = 5 * 60 * 1000 // 5 minutes in milliseconds

export const auth = {
  // Get current user from localStorage
  getCurrentUser: (): User | null => {
    if (typeof window === "undefined") return null

    try {
      const userData = localStorage.getItem("user")
      const sessionStart = localStorage.getItem("sessionStart")

      if (!userData || !sessionStart) return null

      // Check session timeout
      const now = Date.now()
      const sessionAge = now - Number.parseInt(sessionStart)

      if (sessionAge > SESSION_TIMEOUT) {
        // Session expired, clear storage
        localStorage.removeItem("user")
        localStorage.removeItem("sessionStart")
        return null
      }

      return JSON.parse(userData)
    } catch {
      return null
    }
  },

  // Login user
  login: (email: string, password: string): Promise<User> => {
    return new Promise((resolve, reject) => {
      // Simulate API call
      setTimeout(() => {
        // Mock user data - in real app, this would come from API
        const mockUsers = [
          {
            id: "1",
            name: "John Doe",
            email: "john@example.com",
            phone: "+254712345678",
            package: "Bronze",
            balance: 1250,
            isActivated: true,
            joinDate: "2024-01-15",
            referralCode: "JD123456",
            referredBy: undefined,
          },
        ]

        const user = mockUsers.find((u) => u.email === email)

        if (user && password === "password") {
          // Store user and session start time
          localStorage.setItem("user", JSON.stringify(user))
          localStorage.setItem("sessionStart", Date.now().toString())
          resolve(user)
        } else {
          reject(new Error("Invalid credentials"))
        }
      }, 1000)
    })
  },

  // Register user
  register: (userData: Omit<User, "id" | "balance" | "isActivated" | "joinDate" | "referralCode">): Promise<User> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newUser: User = {
          ...userData,
          id: Math.random().toString(36).substr(2, 9),
          balance: 0,
          isActivated: false,
          joinDate: new Date().toISOString().split("T")[0],
          referralCode: Math.random().toString(36).substr(2, 8).toUpperCase(),
        }

        localStorage.setItem("user", JSON.stringify(newUser))
        localStorage.setItem("sessionStart", Date.now().toString())
        resolve(newUser)
      }, 1000)
    })
  },

  // Logout user
  logout: (): void => {
    localStorage.removeItem("user")
    localStorage.removeItem("sessionStart")
  },

  // Update user data
  updateUser: (updates: Partial<User>): void => {
    const currentUser = auth.getCurrentUser()
    if (currentUser) {
      const updatedUser = { ...currentUser, ...updates }
      localStorage.setItem("user", JSON.stringify(updatedUser))
    }
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    return auth.getCurrentUser() !== null
  },

  // Refresh session
  refreshSession: (): void => {
    if (auth.isAuthenticated()) {
      localStorage.setItem("sessionStart", Date.now().toString())
    }
  },
}
