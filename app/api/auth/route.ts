import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const password = String(body.password || "")

    const sitePassword = process.env.SITE_PASSWORD

    // Check if env variable exists
    if (!sitePassword) {
      return NextResponse.json(
        {
          error: "SITE_PASSWORD not set",
          envExists: false
        },
        { status: 500 }
      )
    }

    const inputTrimmed = password.trim()
    const envTrimmed = sitePassword.trim()

    // Password match
    if (inputTrimmed === envTrimmed) {
      return NextResponse.json({
        success: true
      })
    }

    // Debug info if incorrect
    return NextResponse.json(
      {
        error: "Invalid password",
        debug: {
          inputLength: inputTrimmed.length,
          envLength: envTrimmed.length,
          envFirstChar: envTrimmed.charAt(0),
          envLastChar: envTrimmed.charAt(envTrimmed.length - 1),
          inputFirstChar: inputTrimmed.charAt(0),
          inputLastChar: inputTrimmed.charAt(inputTrimmed.length - 1)
        }
      },
      { status: 401 }
    )
  } catch (err) {
    return NextResponse.json(
      {
        error: "Invalid request",
        details: String(err)
      },
      { status: 400 }
    )
  }
}