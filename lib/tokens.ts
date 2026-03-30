import crypto from "crypto"

interface TokenPayload {
  id: string
  exp: number // Unix timestamp in ms
}

export interface StoredToken {
  id: string
  token: string
  expiresAt: number
  createdAt: number
  usedAt?: number
  revoked: boolean
}

export interface Visit {
  timestamp: number
  method: "password" | "token"
  userAgent: string
}

// In-memory stores (best-effort in serverless; reset on cold start)
const tokenStore = new Map<string, StoredToken>()
const revokedIds = new Set<string>()
export const visits: Visit[] = []

function getSecret(): string {
  const secret = process.env.SITE_PASSWORD
  if (!secret) throw new Error("SITE_PASSWORD not set")
  return secret
}

function sign(payload: TokenPayload): string {
  const data = JSON.stringify(payload)
  const encoded = Buffer.from(data).toString("base64url")
  const hmac = crypto
    .createHmac("sha256", getSecret())
    .update(encoded)
    .digest("base64url")
  return `${encoded}.${hmac}`
}

function verify(token: string): TokenPayload | null {
  const parts = token.split(".")
  if (parts.length !== 2) return null

  const [encoded, signature] = parts
  const expectedSig = crypto
    .createHmac("sha256", getSecret())
    .update(encoded)
    .digest("base64url")

  if (
    signature.length !== expectedSig.length ||
    !crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSig))
  ) {
    return null
  }

  try {
    return JSON.parse(Buffer.from(encoded, "base64url").toString()) as TokenPayload
  } catch {
    return null
  }
}

/**
 * Generate a one-time access token with the given validity in minutes.
 */
export function generateToken(validityMinutes: number): { token: string; id: string; expiresAt: string } {
  const id = crypto.randomUUID()
  const exp = Date.now() + validityMinutes * 60 * 1000
  const token = sign({ id, exp })

  tokenStore.set(id, {
    id,
    token,
    expiresAt: exp,
    createdAt: Date.now(),
    revoked: false,
  })

  return { token, id, expiresAt: new Date(exp).toISOString() }
}

/**
 * Validate a one-time access token.
 */
export function validateToken(token: string): { valid: boolean; error?: string } {
  const payload = verify(token)
  if (!payload) return { valid: false, error: "Invalid token" }
  if (Date.now() > payload.exp) return { valid: false, error: "Token expired" }
  if (revokedIds.has(payload.id)) return { valid: false, error: "Token revoked" }

  const stored = tokenStore.get(payload.id)
  if (stored?.usedAt) return { valid: false, error: "Token already used" }

  // Mark as used
  if (stored) stored.usedAt = Date.now()

  return { valid: true }
}

/**
 * Revoke a token by ID.
 */
export function revokeToken(id: string): boolean {
  revokedIds.add(id)
  const stored = tokenStore.get(id)
  if (stored) {
    stored.revoked = true
    return true
  }
  return false
}

/**
 * List all tokens (active, used, revoked) — expired ones filtered out.
 */
export function listTokens(): StoredToken[] {
  const now = Date.now()
  return Array.from(tokenStore.values())
    .filter((t) => t.expiresAt > now)
    .sort((a, b) => b.createdAt - a.createdAt)
}

/**
 * Record a page visit.
 */
export function recordVisit(method: Visit["method"], userAgent: string) {
  visits.unshift({ timestamp: Date.now(), method, userAgent })
  if (visits.length > 200) visits.splice(200)
}
