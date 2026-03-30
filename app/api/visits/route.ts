import { NextResponse } from "next/server"
import { visits, recordVisit } from "@/lib/tokens"

export const dynamic = "force-dynamic"

// GET — list visits (protected)
export async function GET(request: Request) {
  const url = new URL(request.url)
  const password = url.searchParams.get("password")
  const sitePassword = process.env.SITE_PASSWORD
  if (!sitePassword || String(password).trim() !== sitePassword.trim()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  return NextResponse.json({ visits })
}

// POST — record a visit (no auth required, called from client)
export async function POST(request: Request) {
  try {
    const { method } = await request.json()
    const userAgent = request.headers.get("user-agent") || "Unknown"
    if (method === "password" || method === "token") {
      recordVisit(method, userAgent)
    }
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }
}
