import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const { name, email, phone } = await req.json()
  if (!name || !email || !phone) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
  }
  return NextResponse.json({ ok: true, codeHint: "Use 123456" })
}
