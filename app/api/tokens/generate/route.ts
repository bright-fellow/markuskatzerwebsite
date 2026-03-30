import { NextResponse } from "next/server"
import { generateToken } from "@/lib/tokens"

export const dynamic = "force-dynamic"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { password, validityMinutes = 60 } = body

    // Verify admin access via site password
    const sitePassword = process.env.SITE_PASSWORD
    if (!sitePassword) {
      return NextResponse.json({ error: "SITE_PASSWORD not set" }, { status: 500 })
    }
    if (String(password).trim() !== sitePassword.trim()) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const mins = Math.max(1, Math.min(43200, Number(validityMinutes))) // 1 min to 30 days
    const { token, expiresAt } = generateToken(mins)

    // Build the access URL
    const origin = request.headers.get("origin") || request.headers.get("host") || ""
    const protocol = origin.startsWith("http") ? "" : "https://"
    const accessUrl = `${protocol}${origin}?token=${encodeURIComponent(token)}`

    return NextResponse.json({
      success: true,
      token,
      expiresAt,
      validityMinutes: mins,
      accessUrl,
    })
  } catch (err) {
    return NextResponse.json({ error: "Invalid request", details: String(err) }, { status: 400 })
  }
}
