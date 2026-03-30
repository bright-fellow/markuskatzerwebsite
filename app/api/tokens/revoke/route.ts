import { NextResponse } from "next/server"
import { revokeToken } from "@/lib/tokens"

export const dynamic = "force-dynamic"

export async function POST(request: Request) {
  try {
    const { password, id } = await request.json()
    const sitePassword = process.env.SITE_PASSWORD
    if (!sitePassword || String(password).trim() !== sitePassword.trim()) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    if (!id) {
      return NextResponse.json({ error: "Missing token id" }, { status: 400 })
    }

    revokeToken(String(id))
    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json({ error: "Invalid request", details: String(err) }, { status: 400 })
  }
}
