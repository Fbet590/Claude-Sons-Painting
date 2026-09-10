import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    const webhookResponse = await fetch(
      "https://services.leadconnectorhq.com/hooks/AQO9rTexfaPKZhlT1L3h/webhook-trigger/3cfed59d-6435-45d2-813d-f6332b00f6e1",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    )
    
    if (!webhookResponse.ok) {
      console.error("[v0] Webhook error response:", await webhookResponse.text())
      return NextResponse.json(
        { success: false, error: "Webhook request failed" },
        { status: 500 }
      )
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Server error:", error)
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    )
  }
}
