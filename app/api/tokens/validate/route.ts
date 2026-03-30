import { NextResponse } from "next/server"
import { validateToken } from "@/lib/tokens"

export const dynamic = "force-dynamic"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const token = String(body.token || "")

    if (!token) {
      return NextResponse.json({ valid: false, error: "No token provided" }, { status: 400 })
    }

    const result = validateToken(token)
    return NextResponse.json(result, { status: result.valid ? 200 : 401 })
  } catch (err) {
    return NextResponse.json({ valid: false, error: "Invalid request", details: String(err) }, { status: 400 })
  }
}
