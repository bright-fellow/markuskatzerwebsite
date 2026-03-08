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
      if (!success) setError(language === "en" ? "Invalid password" : "Falsches Passwort")
    } catch {
      setError(language === "en" ? "Connection error" : "Verbindungsfehler")
    }
    setIsLoading(false)
  }

  return (
    <>
      <style>{`
        /* ── Login screen animations ── */
        @keyframes login-fade-up {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes login-logo-in {
          from { opacity: 0; transform: translateY(-16px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes stripe-slide {
          from { transform: translateX(-100%) skewX(-20deg); }
          to   { transform: translateX(100vw) skewX(-20deg); }
        }
        @keyframes shimmer-bar {
          0%   { width: 0%; opacity: 0; }
          10%  { opacity: 1; }
          100% { width: 100%; opacity: 0; }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes pulse-ring {
          0%   { transform: scale(0.9); opacity: 0.6; }
          70%  { transform: scale(1.15); opacity: 0; }
          100% { opacity: 0; }
        }

        .login-root {
          min-height: 100vh;
          background: #244233;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 24px;
          position: relative;
          overflow: hidden;
        }

        /* Subtle animated diagonal stripe sweep */
        .login-stripe-sweep {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
        }
        .login-stripe-sweep::before {
          content: '';
          position: absolute;
          top: 0;
          left: -200px;
          width: 120px;
          height: 100%;
          background: rgba(255,255,255,0.04);
          transform: skewX(-20deg);
          animation: stripe-slide 6s ease-in-out infinite;
          animation-delay: 1s;
        }
        .login-stripe-sweep::after {
          content: '';
          position: absolute;
          top: 0;
          left: -200px;
          width: 60px;
          height: 100%;
          background: rgba(255,255,255,0.025);
          transform: skewX(-20deg);
          animation: stripe-slide 6s ease-in-out infinite;
          animation-delay: 1.4s;
        }

        /* Shimmer bar at top */
        .login-shimmer {
          position: absolute;
          top: 0;
          left: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, #298e68, #fcda5f, #298e68, transparent);
          animation: shimmer-bar 3.5s ease-out forwards;
          animation-delay: 0.3s;
          width: 0%;
        }

        /* Grid dot texture */
        .login-dots {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px);
          background-size: 32px 32px;
          pointer-events: none;
        }

        .login-logo {
          animation: login-logo-in 0.7s cubic-bezier(0.16, 1, 0.3, 1) both;
          animation-delay: 0.1s;
          text-align: center;
          margin-bottom: 48px;
        }
        .login-logo-name {
          font-family: 'Inter', sans-serif;
          font-size: clamp(2.2rem, 8vw, 3.5rem);
          font-weight: 900;
          line-height: 0.9;
          letter-spacing: -0.03em;
          text-transform: uppercase;
          color: #f6f6f6;
        }
        .login-logo-name .accent {
          color: #298e68;
        }
        .login-logo-sub {
          font-family: 'Inter', sans-serif;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(246,246,246,0.45);
          margin-top: 10px;
        }

        /* Shield icon animated ring */
        .login-shield-wrap {
          position: relative;
          width: 56px;
          height: 56px;
          margin: 0 auto 24px;
        }
        .login-shield-ring {
          position: absolute;
          inset: -6px;
          border-radius: 50%;
          border: 1px solid #298e68;
          animation: pulse-ring 2.4s ease-out infinite;
        }
        .login-shield-ring:nth-child(2) { animation-delay: 1.2s; }

        .login-form-wrap {
          animation: login-fade-up 0.65s cubic-bezier(0.16, 1, 0.3, 1) both;
          animation-delay: 0.25s;
          width: 100%;
          max-width: 400px;
        }

        .login-input-wrap {
          position: relative;
          margin-bottom: 12px;
        }
        .login-input-icon {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          color: rgba(246,246,246,0.4);
          pointer-events: none;
        }
        .login-input {
          width: 100%;
          background: rgba(0,0,0,0.25);
          border: 1px solid rgba(246,246,246,0.12);
          color: #f6f6f6;
          font-family: 'Inter', sans-serif;
          font-size: 15px;
          padding: 16px 48px;
          outline: none;
          transition: border-color 0.2s ease, background 0.2s ease;
          box-sizing: border-box;
        }
        .login-input::placeholder {
          color: rgba(246,246,246,0.3);
        }
        .login-input:focus {
          border-color: #298e68;
          background: rgba(0,0,0,0.35);
        }
        .login-eye-btn {
          position: absolute;
          right: 16px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: rgba(246,246,246,0.4);
          cursor: pointer;
          padding: 0;
          transition: color 0.2s ease;
        }
        .login-eye-btn:hover { color: #f6f6f6; }

        .login-error {
          font-family: 'Inter', sans-serif;
          font-size: 12px;
          color: #d92631;
          text-align: center;
          margin-bottom: 12px;
          letter-spacing: 0.04em;
          animation: login-fade-up 0.3s ease both;
        }

        .login-submit {
          width: 100%;
          background: #298e68;
          color: #f6f6f6;
          border: 1px solid #298e68;
          font-family: 'Inter', sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          padding: 16px 32px;
          cursor: pointer;
          transition: background 0.2s ease, color 0.2s ease, transform 0.1s ease;
          clip-path: polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px));
          margin-top: 4px;
        }
        .login-submit:hover:not(:disabled) {
          background: #f6f6f6;
          color: #244233;
        }
        .login-submit:active:not(:disabled) { transform: scale(0.98); }
        .login-submit:disabled {
          opacity: 0.45;
          cursor: not-allowed;
        }

        .login-spinner {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(246,246,246,0.2);
          border-top-color: #f6f6f6;
          border-radius: 50%;
          display: inline-block;
          animation: spin-slow 0.7s linear infinite;
          margin-right: 8px;
          vertical-align: middle;
        }

        .login-footer {
          animation: login-fade-up 0.65s cubic-bezier(0.16, 1, 0.3, 1) both;
          animation-delay: 0.4s;
          margin-top: 40px;
          text-align: center;
          font-family: 'Inter', sans-serif;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(246,246,246,0.2);
        }

        .login-lang-btn {
          position: absolute;
          top: 20px;
          right: 20px;
          background: none;
          border: 1px solid rgba(246,246,246,0.15);
          color: rgba(246,246,246,0.5);
          font-family: 'Inter', sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 6px 12px;
          cursor: pointer;
          transition: color 0.2s, border-color 0.2s;
        }
        .login-lang-btn:hover {
          color: #f6f6f6;
          border-color: rgba(246,246,246,0.4);
        }
      `}</style>

      <div className="login-root">
        {/* Background layers */}
        <div className="login-dots" />
        <div className="login-stripe-sweep" />
        <div className="login-shimmer" />

        {/* Language toggle */}
        <button className="login-lang-btn" onClick={toggleLanguage} aria-label="Switch language">
          {language === "en" ? "DE" : "EN"}
        </button>

        {/* Logo */}
        <div className="login-logo">
          <div className="login-shield-wrap">
            <div className="login-shield-ring" />
            <div className="login-shield-ring" />
            <svg width="56" height="56" viewBox="0 0 56 56" fill="none" style={{ position: "relative", zIndex: 1 }}>
              <path d="M28 4L52 12V30C52 43 42 51 28 54C14 51 4 43 4 30V12L28 4Z" fill="#298e68" opacity="0.9" />
              <text x="28" y="36" textAnchor="middle" fill="#f6f6f6" fontSize="16" fontWeight="900" fontFamily="Inter, sans-serif">MK</text>
            </svg>
          </div>

          <div className="login-logo-name">
            MARKUS<br /><span className="accent">KATZER</span>
          </div>
          <div className="login-logo-sub">CEO Sports · SK Rapid Wien</div>
        </div>

        {/* Form */}
        <div className="login-form-wrap">
          <form onSubmit={handleSubmit}>
            <div className="login-input-wrap">
              <Lock className="login-input-icon" size={16} />
              <input
                className="login-input"
                type={showPassword ? "text" : "password"}
                placeholder={language === "en" ? "Enter password" : "Passwort eingeben"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
              />
              <button
                type="button"
                className="login-eye-btn"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {error && <div className="login-error">{error}</div>}

            <button
              type="submit"
              className="login-submit"
              disabled={isLoading || !password}
            >
              {isLoading ? (
                <>
                  <span className="login-spinner" />
                  {language === "en" ? "Authenticating…" : "Authentifizierung…"}
                </>
              ) : (
                language === "en" ? "ACCESS" : "ZUGRIFF"
              )}
            </button>
          </form>
        </div>

        <div className="login-footer">
          {language === "en" ? "SK Rapid Wien · Est. 1899" : "SK Rapid Wien · Gegr. 1899"}
        </div>
      </div>
    </>
  )
}
