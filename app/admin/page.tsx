"use client"

import { useState, useEffect, useCallback } from "react"
import { Lock, Copy, Check, Clock, Shield, Trash2, RefreshCw, Eye, Key, Users } from "lucide-react"

interface TokenEntry {
  id: string
  token: string
  accessUrl: string
  expiresAt: number
  createdAt: number
  usedAt?: number
  revoked: boolean
  validityMinutes?: number
}

interface Visit {
  timestamp: number
  method: "password" | "token"
  userAgent: string
}

const VALIDITY_OPTIONS = [
  { label: "15 Min", value: 15 },
  { label: "1 Std", value: 60 },
  { label: "4 Std", value: 240 },
  { label: "24 Std", value: 1440 },
  { label: "7 Tage", value: 10080 },
  { label: "30 Tage", value: 43200 },
]

function formatDate(ts: number) {
  return new Date(ts).toLocaleString("de-AT", {
    day: "2-digit", month: "2-digit", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  })
}

function formatRelative(ts: number) {
  const diff = Date.now() - ts
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return "gerade eben"
  if (mins < 60) return `vor ${mins} Min.`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `vor ${hrs} Std.`
  return `vor ${Math.floor(hrs / 24)} Tagen`
}

function formatExpiry(mins: number) {
  if (mins < 60) return `${mins} Min.`
  if (mins < 1440) return `${mins / 60} Std.`
  return `${Math.round(mins / 1440)} Tage`
}

function tokenStatus(t: TokenEntry): { label: string; color: string } {
  if (t.revoked) return { label: "Widerrufen", color: "#d92631" }
  if (t.usedAt) return { label: "Verwendet", color: "#fcda5f" }
  if (t.expiresAt < Date.now()) return { label: "Abgelaufen", color: "rgba(246,246,246,0.3)" }
  return { label: "Aktiv", color: "#298e68" }
}

export default function AdminPage() {
  const [password, setPassword] = useState("")
  const [isAuthed, setIsAuthed] = useState(false)
  const [authError, setAuthError] = useState("")
  const [isAuthLoading, setIsAuthLoading] = useState(false)

  // Token generator
  const [validity, setValidity] = useState(1440)
  const [isGenerating, setIsGenerating] = useState(false)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  // Data
  const [tokens, setTokens] = useState<TokenEntry[]>([])
  const [visits, setVisits] = useState<Visit[]>([])
  const [isLoadingData, setIsLoadingData] = useState(false)
  const [revokingId, setRevokingId] = useState<string | null>(null)

  const fetchData = useCallback(async (pwd: string) => {
    setIsLoadingData(true)
    try {
      const [tokensRes, visitsRes] = await Promise.all([
        fetch("/api/tokens/list", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password: pwd }),
        }),
        fetch(`/api/visits?password=${encodeURIComponent(pwd)}`),
      ])
      const tokensData = await tokensRes.json()
      const visitsData = await visitsRes.json()
      if (tokensData.tokens) setTokens(tokensData.tokens)
      if (visitsData.visits) setVisits(visitsData.visits)
    } catch {
      // ignore
    }
    setIsLoadingData(false)
  }, [])

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
        fetchData(password)
      } else {
        setAuthError("Falsches Passwort")
      }
    } catch {
      setAuthError("Verbindungsfehler")
    }
    setIsAuthLoading(false)
  }

  // Auto-refresh every 30s when authed
  useEffect(() => {
    if (!isAuthed) return
    const id = setInterval(() => fetchData(password), 30000)
    return () => clearInterval(id)
  }, [isAuthed, password, fetchData])

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
        const newToken: TokenEntry = {
          id: data.id,
          token: data.token,
          accessUrl: data.accessUrl,
          expiresAt: new Date(data.expiresAt).getTime(),
          createdAt: Date.now(),
          revoked: false,
          validityMinutes: data.validityMinutes,
        }
        setTokens((prev) => [newToken, ...prev])
      }
    } catch {
      // ignore
    }
    setIsGenerating(false)
  }

  const revokeToken = async (id: string) => {
    setRevokingId(id)
    try {
      await fetch("/api/tokens/revoke", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, id }),
      })
      setTokens((prev) =>
        prev.map((t) => (t.id === id ? { ...t, revoked: true } : t))
      )
    } catch {
      // ignore
    }
    setRevokingId(null)
  }

  const copyToClipboard = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  // Login gate
  if (!isAuthed) {
    return (
      <>
        <style>{styles}</style>
        <div className="a-root">
          <div className="a-dots" />
          <div className="a-card" style={{ maxWidth: 400 }}>
            <div style={{ textAlign: "center", marginBottom: 20 }}>
              <Shield size={32} color="#298e68" />
            </div>
            <h1 className="a-title">Admin</h1>
            <p className="a-sub">Passwort eingeben</p>
            <form onSubmit={handleAuth}>
              <div className="a-input-wrap">
                <Lock className="a-input-icon" size={16} />
                <input
                  className="a-input"
                  type="password"
                  placeholder="Passwort"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoFocus
                />
              </div>
              {authError && <div className="a-error">{authError}</div>}
              <button type="submit" className="a-btn a-btn-primary" disabled={isAuthLoading || !password}>
                {isAuthLoading ? "Prüfe…" : "ANMELDEN"}
              </button>
            </form>
          </div>
        </div>
      </>
    )
  }

  const activeTokens = tokens.filter((t) => !t.revoked && !t.usedAt && t.expiresAt > Date.now())
  const inactiveTokens = tokens.filter((t) => t.revoked || t.usedAt || t.expiresAt <= Date.now())

  return (
    <>
      <style>{styles}</style>
      <div className="a-root" style={{ justifyContent: "flex-start", paddingTop: 40, paddingBottom: 40 }}>
        <div className="a-dots" />

        {/* Header */}
        <div className="a-card" style={{ maxWidth: 680, marginBottom: 20 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <Shield size={24} color="#298e68" />
              <h1 className="a-title" style={{ margin: 0, fontSize: 18 }}>Admin Dashboard</h1>
            </div>
            <button
              className="a-btn-icon"
              onClick={() => fetchData(password)}
              disabled={isLoadingData}
              title="Aktualisieren"
            >
              <RefreshCw size={15} className={isLoadingData ? "spin" : ""} />
            </button>
          </div>

          <div className="a-stats-row">
            <div className="a-stat">
              <Key size={14} />
              <span className="a-stat-num">{activeTokens.length}</span>
              <span className="a-stat-label">Aktive Token</span>
            </div>
            <div className="a-stat-divider" />
            <div className="a-stat">
              <Users size={14} />
              <span className="a-stat-num">{visits.length}</span>
              <span className="a-stat-label">Besuche</span>
            </div>
            <div className="a-stat-divider" />
            <div className="a-stat">
              <Eye size={14} />
              <span className="a-stat-num">
                {visits.filter((v) => v.method === "token").length}
              </span>
              <span className="a-stat-label">via Token</span>
            </div>
          </div>
        </div>

        {/* Token Generator */}
        <div className="a-card" style={{ maxWidth: 680, marginBottom: 20 }}>
          <div className="a-section-header">
            <Key size={14} />
            <span>Token generieren</span>
          </div>
          <div className="a-validity-grid">
            {VALIDITY_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                className={`a-validity-btn ${validity === opt.value ? "active" : ""}`}
                onClick={() => setValidity(opt.value)}
              >
                {opt.label}
              </button>
            ))}
          </div>
          <button className="a-btn a-btn-primary" onClick={generateToken} disabled={isGenerating} style={{ marginTop: 12 }}>
            {isGenerating ? "Generiere…" : `TOKEN ERSTELLEN · ${formatExpiry(validity)}`}
          </button>
        </div>

        {/* Active Tokens */}
        <div className="a-card" style={{ maxWidth: 680, marginBottom: 20 }}>
          <div className="a-section-header">
            <Key size={14} />
            <span>Aktive Token ({activeTokens.length})</span>
          </div>

          {activeTokens.length === 0 ? (
            <div className="a-empty">Keine aktiven Token</div>
          ) : (
            <div className="a-list">
              {activeTokens.map((t) => {
                const status = tokenStatus(t)
                return (
                  <div key={t.id} className="a-token-item">
                    <div className="a-token-row">
                      <span className="a-badge" style={{ color: status.color, borderColor: status.color }}>
                        {status.label}
                      </span>
                      <span className="a-token-expiry">
                        Läuft ab: {formatDate(t.expiresAt)}
                      </span>
                      <span style={{ flex: 1 }} />
                      <button
                        className="a-btn-icon a-btn-danger"
                        onClick={() => revokeToken(t.id)}
                        disabled={revokingId === t.id}
                        title="Token widerrufen"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                    <div className="a-token-url">
                      <code>{t.accessUrl}</code>
                    </div>
                    <div style={{ marginTop: 8 }}>
                      <button
                        className="a-btn a-btn-copy"
                        onClick={() => copyToClipboard(t.accessUrl, t.id)}
                      >
                        {copiedId === t.id ? <><Check size={12} /> Kopiert</> : <><Copy size={12} /> Link kopieren</>}
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          {/* Inactive / used / revoked */}
          {inactiveTokens.length > 0 && (
            <>
              <div className="a-section-header" style={{ marginTop: 20 }}>
                <span style={{ opacity: 0.5 }}>Inaktiv ({inactiveTokens.length})</span>
              </div>
              <div className="a-list">
                {inactiveTokens.map((t) => {
                  const status = tokenStatus(t)
                  return (
                    <div key={t.id} className="a-token-item inactive">
                      <div className="a-token-row">
                        <span className="a-badge" style={{ color: status.color, borderColor: status.color }}>
                          {status.label}
                        </span>
                        {t.usedAt && (
                          <span className="a-token-expiry">Verwendet: {formatDate(t.usedAt)}</span>
                        )}
                        {t.revoked && (
                          <span className="a-token-expiry">Widerrufen</span>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </>
          )}
        </div>

        {/* Page Visits */}
        <div className="a-card" style={{ maxWidth: 680 }}>
          <div className="a-section-header">
            <Eye size={14} />
            <span>Seitenbesuche ({visits.length})</span>
          </div>

          {visits.length === 0 ? (
            <div className="a-empty">Noch keine Besuche aufgezeichnet</div>
          ) : (
            <div className="a-list">
              {visits.map((v, i) => (
                <div key={i} className="a-visit-item">
                  <div className="a-visit-row">
                    <span
                      className="a-badge"
                      style={{
                        color: v.method === "token" ? "#298e68" : "#005081",
                        borderColor: v.method === "token" ? "#298e68" : "#005081",
                      }}
                    >
                      {v.method === "token" ? "Token" : "Passwort"}
                    </span>
                    <span className="a-visit-time">{formatRelative(v.timestamp)}</span>
                    <span className="a-visit-abs">{formatDate(v.timestamp)}</span>
                  </div>
                  <div className="a-visit-ua">{v.userAgent}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

const styles = `
  .a-root {
    min-height: 100vh;
    background: #1a332a;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 24px;
    position: relative;
    overflow: auto;
  }
  .a-dots {
    position: fixed;
    inset: 0;
    background-image: radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px);
    background-size: 32px 32px;
    pointer-events: none;
  }
  .a-card {
    position: relative;
    width: 100%;
    background: rgba(0,0,0,0.3);
    border: 1px solid rgba(246,246,246,0.08);
    padding: 24px;
    z-index: 1;
  }
  .a-title {
    font-family: 'Inter', sans-serif;
    font-size: 22px;
    font-weight: 900;
    letter-spacing: -0.02em;
    text-transform: uppercase;
    color: #f6f6f6;
    text-align: center;
    margin: 0 0 6px;
  }
  .a-sub {
    font-family: 'Inter', sans-serif;
    font-size: 13px;
    color: rgba(246,246,246,0.45);
    text-align: center;
    margin: 0 0 28px;
  }
  .a-stats-row {
    display: flex;
    align-items: center;
    gap: 0;
    margin-top: 20px;
    border: 1px solid rgba(246,246,246,0.07);
    background: rgba(0,0,0,0.15);
  }
  .a-stat {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    padding: 14px 8px;
    color: rgba(246,246,246,0.4);
  }
  .a-stat-num {
    font-family: 'Inter', sans-serif;
    font-size: 22px;
    font-weight: 900;
    color: #f6f6f6;
    line-height: 1;
  }
  .a-stat-label {
    font-family: 'Inter', sans-serif;
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: rgba(246,246,246,0.4);
  }
  .a-stat-divider {
    width: 1px;
    height: 40px;
    background: rgba(246,246,246,0.07);
  }
  .a-section-header {
    display: flex;
    align-items: center;
    gap: 8px;
    font-family: 'Inter', sans-serif;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(246,246,246,0.5);
    margin-bottom: 14px;
  }
  .a-validity-grid {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 6px;
  }
  @media (max-width: 500px) {
    .a-validity-grid { grid-template-columns: repeat(3, 1fr); }
  }
  .a-validity-btn {
    background: rgba(0,0,0,0.2);
    border: 1px solid rgba(246,246,246,0.1);
    color: rgba(246,246,246,0.6);
    font-family: 'Inter', sans-serif;
    font-size: 11px;
    font-weight: 600;
    padding: 9px 4px;
    cursor: pointer;
    transition: all 0.15s ease;
  }
  .a-validity-btn:hover { border-color: rgba(246,246,246,0.25); color: #f6f6f6; }
  .a-validity-btn.active { background: rgba(41,142,104,0.2); border-color: #298e68; color: #298e68; }
  .a-input-wrap { position: relative; margin-bottom: 12px; }
  .a-input-icon {
    position: absolute; left: 14px; top: 50%;
    transform: translateY(-50%);
    color: rgba(246,246,246,0.4); pointer-events: none;
  }
  .a-input {
    width: 100%;
    background: rgba(0,0,0,0.25);
    border: 1px solid rgba(246,246,246,0.12);
    color: #f6f6f6;
    font-family: 'Inter', sans-serif;
    font-size: 15px;
    padding: 13px 14px 13px 40px;
    outline: none;
    transition: border-color 0.2s;
    box-sizing: border-box;
  }
  .a-input::placeholder { color: rgba(246,246,246,0.3); }
  .a-input:focus { border-color: #298e68; }
  .a-error { font-family: 'Inter', sans-serif; font-size: 12px; color: #d92631; text-align: center; margin-bottom: 10px; }
  .a-btn {
    display: inline-flex; align-items: center; justify-content: center; gap: 6px;
    font-family: 'Inter', sans-serif; font-size: 11px; font-weight: 700;
    letter-spacing: 0.15em; text-transform: uppercase;
    padding: 13px 24px; cursor: pointer; transition: all 0.15s; border: none;
  }
  .a-btn:disabled { opacity: 0.4; cursor: not-allowed; }
  .a-btn-primary {
    width: 100%; background: #298e68; color: #f6f6f6;
    clip-path: polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px));
  }
  .a-btn-primary:hover:not(:disabled) { background: #f6f6f6; color: #244233; }
  .a-btn-copy {
    background: rgba(41,142,104,0.12); color: #298e68;
    border: 1px solid rgba(41,142,104,0.25); font-size: 10px; padding: 7px 14px;
  }
  .a-btn-copy:hover { background: rgba(41,142,104,0.22); }
  .a-btn-icon {
    background: rgba(255,255,255,0.05); border: 1px solid rgba(246,246,246,0.1);
    color: rgba(246,246,246,0.5); padding: 7px; cursor: pointer; transition: all 0.15s;
    display: inline-flex; align-items: center;
  }
  .a-btn-icon:hover { color: #f6f6f6; border-color: rgba(246,246,246,0.25); }
  .a-btn-icon:disabled { opacity: 0.4; cursor: not-allowed; }
  .a-btn-danger { color: rgba(217,38,49,0.6); border-color: rgba(217,38,49,0.2); }
  .a-btn-danger:hover { color: #d92631; border-color: #d92631; background: rgba(217,38,49,0.1); }
  .a-list { display: flex; flex-direction: column; gap: 8px; }
  .a-token-item {
    background: rgba(0,0,0,0.2); border: 1px solid rgba(246,246,246,0.06); padding: 14px;
  }
  .a-token-item.inactive { opacity: 0.5; }
  .a-token-row { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; }
  .a-badge {
    font-family: 'Inter', sans-serif; font-size: 10px; font-weight: 700;
    letter-spacing: 0.1em; text-transform: uppercase;
    border: 1px solid; padding: 2px 8px;
  }
  .a-token-expiry { font-family: 'Inter', sans-serif; font-size: 11px; color: rgba(246,246,246,0.4); }
  .a-token-url { background: rgba(0,0,0,0.3); padding: 9px 11px; overflow-x: auto; }
  .a-token-url code {
    font-family: 'Geist Mono', monospace; font-size: 11px;
    color: rgba(246,246,246,0.65); word-break: break-all;
  }
  .a-visit-item {
    background: rgba(0,0,0,0.15); border: 1px solid rgba(246,246,246,0.05); padding: 12px 14px;
  }
  .a-visit-row { display: flex; align-items: center; gap: 10px; margin-bottom: 6px; }
  .a-visit-time { font-family: 'Inter', sans-serif; font-size: 12px; color: rgba(246,246,246,0.7); font-weight: 600; }
  .a-visit-abs { font-family: 'Inter', sans-serif; font-size: 11px; color: rgba(246,246,246,0.3); margin-left: auto; }
  .a-visit-ua {
    font-family: 'Geist Mono', monospace; font-size: 10px;
    color: rgba(246,246,246,0.25); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  }
  .a-empty { font-family: 'Inter', sans-serif; font-size: 12px; color: rgba(246,246,246,0.3); text-align: center; padding: 20px 0; }
  @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
  .spin { animation: spin 0.8s linear infinite; }
`
