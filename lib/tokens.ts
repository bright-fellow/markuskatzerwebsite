import crypto from "crypto"

interface TokenPayload {
  id: string
  exp: number // Unix timestamp in ms
}

// Track used tokens in memory (best-effort one-time enforcement in serverless)
const usedTokens = new Set<string>()

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

  // Timing-safe comparison
  if (
    signature.length !== expectedSig.length ||
    !crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSig))
  ) {
    return null
  }

  try {
    const data = JSON.parse(Buffer.from(encoded, "base64url").toString())
    return data as TokenPayload
  } catch {
    return null
  }
}

/**
 * Generate a one-time access token with the given validity in minutes.
 */
export function generateToken(validityMinutes: number): { token: string; expiresAt: string } {
  const id = crypto.randomUUID()
  const exp = Date.now() + validityMinutes * 60 * 1000
  const token = sign({ id, exp })
  return {
    token,
    expiresAt: new Date(exp).toISOString(),
  }
}

/**
 * Validate a one-time access token.
 * Returns true if valid, unused, and not expired.
 */
export function validateToken(token: string): { valid: boolean; error?: string } {
  const payload = verify(token)
  if (!payload) {
    return { valid: false, error: "Invalid token" }
  }

  if (Date.now() > payload.exp) {
    return { valid: false, error: "Token expired" }
  }

  if (usedTokens.has(payload.id)) {
    return { valid: false, error: "Token already used" }
  }

  // Mark as used
  usedTokens.add(payload.id)

  // Clean up expired token IDs periodically (keep set from growing)
  if (usedTokens.size > 1000) {
    usedTokens.clear()
  }

  return { valid: true }
}
