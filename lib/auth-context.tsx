"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface AuthContextType {
  isAuthenticated: boolean
  login: (password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is already authenticated via session storage
    const authStatus = sessionStorage.getItem("mk_authenticated")
    if (authStatus === "true") {
      setIsAuthenticated(true)
      setIsLoading(false)
      return
    }

    // Check for token in URL
    const params = new URLSearchParams(window.location.search)
    const token = params.get("token")
    if (token) {
      validateToken(token)
    } else {
      setIsLoading(false)
    }
  }, [])

  const validateToken = async (token: string) => {
    try {
      const res = await fetch("/api/tokens/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      })
      const data = await res.json()
      if (data.valid) {
        setIsAuthenticated(true)
        sessionStorage.setItem("mk_authenticated", "true")
        // Remove token from URL without reload
        const url = new URL(window.location.href)
        url.searchParams.delete("token")
        window.history.replaceState({}, "", url.pathname)
        // Record visit
        fetch("/api/visits", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ method: "token" }) }).catch(() => {})
      }
    } catch {
      // Token validation failed, fall through to login screen
    }
    setIsLoading(false)
  }

  const login = async (password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      })
      
      const data = await response.json()
      
      if (data.success) {
        setIsAuthenticated(true)
        sessionStorage.setItem("mk_authenticated", "true")
        fetch("/api/visits", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ method: "password" }) }).catch(() => {})
        return { success: true }
      } else {
        return { success: false, error: data.error || "Invalid password" }
      }
    } catch {
      return { success: false, error: "Connection error" }
    }
  }

  const logout = () => {
    setIsAuthenticated(false)
    sessionStorage.removeItem("mk_authenticated")
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
