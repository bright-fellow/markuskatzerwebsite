"use client"

import { useState } from "react"
import { Lock, Copy, Check, Link, Clock, Shield } from "lucide-react"

interface GeneratedToken {
  token: string
  expiresAt: string
  validityMinutes: number
  accessUrl: string
  createdAt: string
}

const VALIDITY_OPTIONS = [
  { label: "15 Minuten", value: 15 },
  { label: "1 Stunde", value: 60 },
  { label: "4 Stunden", value: 240 },
  { label: "24 Stunden", value: 1440 },
  { label: "7 Tage", value: 10080 },
  { label: "30 Tage", value: 43200 },
]

export default function AdminPage() {
  const [password, setPassword] = useState("")
  const [isAuthed, setIsAuthed] = useState(false)
  const [authError, setAuthError] = useState("")
  const [isAuthLoading, setIsAuthLoading] = useState(false)

  const [validity, setValidity] = useState(1440)
  const [isGenerating, setIsGenerating] = useState(false)
  const [tokens, setTokens] = useState<GeneratedToken[]>([])
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setAuthError("")
    setIsAuthLoading(true)
    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      })
      const data = await res.json()
      if (data.success) {
        setIsAuthed(true)
      } else {
        setAuthError("Falsches Passwort")
      }
    } catch {
      setAuthError("Verbindungsfehler")
    }
    setIsAuthLoading(false)
  }

  const generateToken = async () => {
    setIsGenerating(true)
    try {
      const res = await fetch("/api/tokens/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, validityMinutes: validity }),
      })
      const data = await res.json()
      if (data.success) {
        setTokens((prev) => [
          {
            token: data.token,
            expiresAt: data.expiresAt,
            validityMinutes: data.validityMinutes,
            accessUrl: data.accessUrl,
            createdAt: new Date().toISOString(),
          },
          ...prev,
        ])
      }
    } catch {
      // silently fail
    }
    setIsGenerating(false)
  }

  const copyToClipboard = async (text: string, index: number) => {
    await navigator.clipboard.writeText(text)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  const formatExpiry = (iso: string) => {
    const d = new Date(iso)
    return d.toLocaleString("de-AT", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const formatValidity = (mins: number) => {
    if (mins < 60) return `${mins} Min.`
    if (mins < 1440) return `${mins / 60} Std.`
    return `${Math.round(mins / 1440)} Tage`
  }

  // Login gate
  if (!isAuthed) {
    return (
      <>
        <style>{adminStyles}</style>
        <div className="admin-root">
          <div className="admin-dots" />
          <div className="admin-card" style={{ maxWidth: 400 }}>
            <div className="admin-shield-wrap">
              <Shield size={32} color="#298e68" />
            </div>
            <h1 className="admin-title">Admin Zugang</h1>
            <p className="admin-subtitle">
              Passwort eingeben um Token zu generieren
            </p>
            <form onSubmit={handleAuth}>
              <div className="admin-input-wrap">
                <Lock className="admin-input-icon" size={16} />
                <input
                  className="admin-input"
                  type="password"
                  placeholder="Passwort"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoFocus
                />
              </div>
              {authError && <div className="admin-error">{authError}</div>}
              <button
                type="submit"
                className="admin-btn admin-btn-primary"
                disabled={isAuthLoading || !password}
              >
                {isAuthLoading ? "Prüfe…" : "ANMELDEN"}
              </button>
            </form>
          </div>
        </div>
      </>
    )
  }

  // Admin panel
  return (
    <>
      <style>{adminStyles}</style>
      <div className="admin-root">
        <div className="admin-dots" />

        <div className="admin-card" style={{ maxWidth: 560 }}>
          <div className="admin-shield-wrap">
            <Shield size={32} color="#298e68" />
          </div>
          <h1 className="admin-title">Token Generator</h1>
          <p className="admin-subtitle">
            Einmal-Token für passwortfreien Zugang erstellen
          </p>

          {/* Validity selector */}
          <div className="admin-section">
            <label className="admin-label">
              <Clock size={14} style={{ marginRight: 6, verticalAlign: -2 }} />
              Gültigkeit
            </label>
            <div className="admin-validity-grid">
              {VALIDITY_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  className={`admin-validity-btn ${validity === opt.value ? "active" : ""}`}
                  onClick={() => setValidity(opt.value)}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Generate button */}
          <button
            className="admin-btn admin-btn-primary"
            onClick={generateToken}
            disabled={isGenerating}
          >
            {isGenerating ? "Generiere…" : "TOKEN GENERIEREN"}
          </button>

          {/* Generated tokens list */}
          {tokens.length > 0 && (
            <div className="admin-section" style={{ marginTop: 32 }}>
              <label className="admin-label">
                <Link size={14} style={{ marginRight: 6, verticalAlign: -2 }} />
                Generierte Token ({tokens.length})
              </label>
              <div className="admin-token-list">
                {tokens.map((t, i) => (
                  <div key={t.token} className="admin-token-item">
                    <div className="admin-token-meta">
                      <span className="admin-token-validity">
                        {formatValidity(t.validityMinutes)}
                      </span>
                      <span className="admin-token-expiry">
                        Gültig bis {formatExpiry(t.expiresAt)}
                      </span>
                    </div>
                    <div className="admin-token-url">
                      <code>{t.accessUrl}</code>
                    </div>
                    <button
                      className="admin-btn admin-btn-copy"
                      onClick={() => copyToClipboard(t.accessUrl, i)}
                    >
                      {copiedIndex === i ? (
                        <>
                          <Check size={14} /> Kopiert!
                        </>
                      ) : (
                        <>
                          <Copy size={14} /> Link kopieren
                        </>
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

const adminStyles = `
  .admin-root {
    min-height: 100vh;
    background: #1a332a;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 24px;
    position: relative;
    overflow: auto;
  }
  .admin-dots {
    position: fixed;
    inset: 0;
    background-image: radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px);
    background-size: 32px 32px;
    pointer-events: none;
  }
  .admin-card {
    position: relative;
    width: 100%;
    background: rgba(0,0,0,0.3);
    border: 1px solid rgba(246,246,246,0.08);
    padding: 40px 32px;
    z-index: 1;
  }
  .admin-shield-wrap {
    text-align: center;
    margin-bottom: 20px;
  }
  .admin-title {
    font-family: 'Inter', sans-serif;
    font-size: 24px;
    font-weight: 900;
    letter-spacing: -0.02em;
    text-transform: uppercase;
    color: #f6f6f6;
    text-align: center;
    margin: 0 0 8px;
  }
  .admin-subtitle {
    font-family: 'Inter', sans-serif;
    font-size: 13px;
    color: rgba(246,246,246,0.45);
    text-align: center;
    margin: 0 0 32px;
  }
  .admin-section {
    margin-bottom: 20px;
  }
  .admin-label {
    display: block;
    font-family: 'Inter', sans-serif;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(246,246,246,0.5);
    margin-bottom: 10px;
  }
  .admin-input-wrap {
    position: relative;
    margin-bottom: 12px;
  }
  .admin-input-icon {
    position: absolute;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    color: rgba(246,246,246,0.4);
    pointer-events: none;
  }
  .admin-input {
    width: 100%;
    background: rgba(0,0,0,0.25);
    border: 1px solid rgba(246,246,246,0.12);
    color: #f6f6f6;
    font-family: 'Inter', sans-serif;
    font-size: 15px;
    padding: 14px 16px 14px 44px;
    outline: none;
    transition: border-color 0.2s ease;
    box-sizing: border-box;
  }
  .admin-input::placeholder { color: rgba(246,246,246,0.3); }
  .admin-input:focus { border-color: #298e68; }
  .admin-error {
    font-family: 'Inter', sans-serif;
    font-size: 12px;
    color: #d92631;
    text-align: center;
    margin-bottom: 12px;
  }
  .admin-validity-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
  }
  .admin-validity-btn {
    background: rgba(0,0,0,0.2);
    border: 1px solid rgba(246,246,246,0.1);
    color: rgba(246,246,246,0.6);
    font-family: 'Inter', sans-serif;
    font-size: 12px;
    font-weight: 600;
    padding: 10px 8px;
    cursor: pointer;
    transition: all 0.15s ease;
  }
  .admin-validity-btn:hover {
    border-color: rgba(246,246,246,0.25);
    color: #f6f6f6;
  }
  .admin-validity-btn.active {
    background: rgba(41,142,104,0.2);
    border-color: #298e68;
    color: #298e68;
  }
  .admin-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    width: 100%;
    font-family: 'Inter', sans-serif;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    padding: 14px 24px;
    cursor: pointer;
    transition: all 0.15s ease;
    border: none;
  }
  .admin-btn:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
  .admin-btn-primary {
    background: #298e68;
    color: #f6f6f6;
    clip-path: polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px));
    margin-top: 8px;
  }
  .admin-btn-primary:hover:not(:disabled) {
    background: #f6f6f6;
    color: #244233;
  }
  .admin-btn-copy {
    background: rgba(41,142,104,0.15);
    color: #298e68;
    font-size: 10px;
    padding: 8px 16px;
    border: 1px solid rgba(41,142,104,0.3);
    margin-top: 8px;
  }
  .admin-btn-copy:hover {
    background: rgba(41,142,104,0.25);
  }
  .admin-token-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  .admin-token-item {
    background: rgba(0,0,0,0.2);
    border: 1px solid rgba(246,246,246,0.06);
    padding: 16px;
  }
  .admin-token-meta {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 10px;
  }
  .admin-token-validity {
    font-family: 'Inter', sans-serif;
    font-size: 11px;
    font-weight: 700;
    color: #298e68;
    background: rgba(41,142,104,0.15);
    padding: 3px 8px;
    letter-spacing: 0.05em;
  }
  .admin-token-expiry {
    font-family: 'Inter', sans-serif;
    font-size: 11px;
    color: rgba(246,246,246,0.4);
  }
  .admin-token-url {
    background: rgba(0,0,0,0.3);
    padding: 10px 12px;
    overflow-x: auto;
  }
  .admin-token-url code {
    font-family: 'Geist Mono', monospace;
    font-size: 11px;
    color: rgba(246,246,246,0.7);
    word-break: break-all;
  }
`
