import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    const webhookResponse = await fetch(
      "https://services.leadconnectorhq.com/hooks/i7CCGVZUWTeOXat1IHdu/webhook-trigger/71e1153f-88ec-4d14-9a29-91b24931d104",
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
