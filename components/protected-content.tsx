"use client"

import { useAuth } from "@/lib/auth-context"
import { LoginScreen } from "@/components/login-screen"

interface ProtectedContentProps {
  children: React.ReactNode
}

export function ProtectedContent({ children }: ProtectedContentProps) {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse">
          <h1 className="text-4xl font-black tracking-tight">
            MARKUS<span className="text-primary">KATZER</span>
          </h1>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <LoginScreen />
  }

  return <>{children}</>
}
