import { NextResponse } from "next/server"

export async function GET() {
  const sitePassword = process.env.SITE_PASSWORD
  
  return NextResponse.json({
    exists: !!sitePassword,
    length: sitePassword?.length || 0,
    value: sitePassword ? `${sitePassword.substring(0, 2)}***${sitePassword.substring(sitePassword.length - 2)}` : "NOT SET",
    allEnvKeys: Object.keys(process.env).filter(k => k.includes("SITE") || k.includes("PASSWORD")),
  })
}
