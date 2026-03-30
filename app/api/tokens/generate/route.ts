import { NextResponse } from "next/server"
import { generateToken } from "@/lib/tokens"

export const dynamic = "force-dynamic"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { password, validityMinutes = 60 } = body

    const sitePassword = process.env.SITE_PASSWORD
    if (!sitePassword) {
      return NextResponse.json({ error: "SITE_PASSWORD not set" }, { status: 500 })
    }
    if (String(password).trim() !== sitePassword.trim()) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const mins = Math.max(1, Math.min(43200, Number(validityMinutes)))
    const { token, id, expiresAt } = generateToken(mins)

    const origin = request.headers.get("origin") || `https://${request.headers.get("host")}`
    const accessUrl = `${origin}?token=${encodeURIComponent(token)}`

    return NextResponse.json({ success: true, token, id, expiresAt, validityMinutes: mins, accessUrl })
  } catch (err) {
    return NextResponse.json({ error: "Invalid request", details: String(err) }, { status: 400 })
  }
}
