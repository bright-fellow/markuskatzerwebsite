import { NextResponse } from "next/server"
import { listTokens } from "@/lib/tokens"

export const dynamic = "force-dynamic"

export async function POST(request: Request) {
  try {
    const { password } = await request.json()
    const sitePassword = process.env.SITE_PASSWORD
    if (!sitePassword || String(password).trim() !== sitePassword.trim()) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const origin = `https://${request.headers.get("host")}`
    const tokens = listTokens().map((t) => ({
      ...t,
      accessUrl: `${origin}?token=${encodeURIComponent(t.token)}`,
    }))

    return NextResponse.json({ tokens })
  } catch (err) {
    return NextResponse.json({ error: "Invalid request", details: String(err) }, { status: 400 })
  }
}
