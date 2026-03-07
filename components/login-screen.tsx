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
    <div className="min-h-screen bg-rapid-black flex flex-col items-center justify-center px-6 jugendstil-pattern">
      {/* Language Toggle */}
      <button
        onClick={toggleLanguage}
        className="absolute top-6 right-6 flex items-center gap-2 text-rapid-white/60 hover:text-rapid-green transition-colors focus-rapid"
      >
        <span className="text-sm font-sohne font-medium">{language.toUpperCase()}</span>
      </button>

      <div className="w-full max-w-md">
        {/* Logo/Name */}
        <div className="text-center mb-12">
          <h1 className="text-rapid-h1 text-rapid-white mb-4">
            MARKUS<span className="text-rapid-green">KATZER</span>
          </h1>
          <p className="text-rapid-white/70 text-sm tracking-widest uppercase font-sohne">
            CEO Sports | SK Rapid Wien
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-rapid-white/60" />
            <Input
              type={showPassword ? "text" : "password"}
              placeholder={language === "en" ? "Enter password" : "Passwort eingeben"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-12 pr-12 py-6 text-lg font-sohne bg-rapid-dark border-rapid-dark text-rapid-white placeholder-rapid-white/50 focus:border-rapid-green focus-rapid"
              autoFocus
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-rapid-white/60 hover:text-rapid-green transition-colors"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>

          {error && (
            <p className="text-rapid-red text-sm text-center font-sohne">{error}</p>
          )}

          <Button
            type="submit"
            disabled={isLoading || !password}
            className="w-full btn-rapid-primary focus-rapid"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-rapid-white/30 border-t-rapid-white rounded-full viertelstunde-loader"></div>
                {language === "en" ? "Authenticating..." : "Authentifizierung..."}
              </div>
            ) : (
              language === "en" ? "ACCESS" : "ZUGRIFF"
            )}
          </Button>
        </form>

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-rapid-white/50 text-xs font-sohne uppercase tracking-widest">
            {language === "en" ? "SK Rapid Wien - Tradition × Typography" : "SK Rapid Wien - Tradition × Typografie"}
          </p>
        </div>
      </div>
    </div>
  )
}
