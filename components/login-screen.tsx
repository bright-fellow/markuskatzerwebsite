"use client"

import { useState } from "react"
import { Lock, Eye, EyeOff } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { useLanguage } from "@/lib/language-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function LoginScreen() {
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()
  const { language, toggleLanguage } = useLanguage()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const success = await login(password)
      
      if (success) {
        // Auth context will handle the state update
        // No need to manually set storage or reload
      } else {
        setError("Invalid password")
      }
    } catch (err) {
      setError("Connection error")
      console.error("[v0] Login error:", err)
    }
    
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6">
      {/* Language Toggle */}
      <button
        onClick={toggleLanguage}
        className="absolute top-6 right-6 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
      >
        <span className="text-sm font-medium">{language.toUpperCase()}</span>
      </button>

      <div className="w-full max-w-md">
        {/* Logo/Name */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight">
            MARKUS<span className="text-primary">KATZER</span>
          </h1>
          <p className="text-muted-foreground mt-2 text-sm tracking-widest uppercase">
            CEO Sports
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type={showPassword ? "text" : "password"}
              placeholder={language === "en" ? "Enter password" : "Passwort eingeben"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-12 pr-12 py-6 text-lg bg-card border-border"
              autoFocus
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>

          {error && (
            <p className="text-destructive text-sm text-center">{error}</p>
          )}

          <Button
            type="submit"
            disabled={isLoading || !password}
            className="w-full py-6 text-lg font-bold bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            {isLoading 
              ? (language === "en" ? "Verifying..." : "Überprüfe...") 
              : (language === "en" ? "Access" : "Zugang")
            }
          </Button>
        </form>

        <p className="text-center text-muted-foreground text-sm mt-8">
          {language === "en" 
            ? "This site is password protected" 
            : "Diese Seite ist passwortgeschützt"
          }
        </p>
      </div>
    </div>
  )
}
