import { type NextRequest, NextResponse } from "next/server"

const BOT_TOKEN = "7991867282:AAFjPuR2vJuyRJMX2DOL1Jj44K4IOQFXJPw"
const CHAT_ID = "6388682226"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as Blob
    const userStr = formData.get("user") as string

    if (!file || !userStr) {
      return NextResponse.json({ error: "Missing file or user data" }, { status: 400 })
    }

    const user = JSON.parse(userStr)
    const currentDate = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })

    // Create professional message
    const message = `📋 *New Registration Acknowledgment*

👤 *User Details:*
• Name: ${user.fullName}
• ID: ${user.idNumber}
• Email: ${user.email}
• Phone: ${user.phoneNumber}
• Gender: ${user.gender}

📅 *Generated:* ${currentDate}

✅ *Status:* Registration Complete
🏢 *Organization:* Yobe Tech Connect (YTC)

Document attached below ↓`

    // Send message with document
    const telegramFormData = new FormData()
    telegramFormData.append("chat_id", CHAT_ID)
    telegramFormData.append("caption", message)
    telegramFormData.append("parse_mode", "Markdown")
    telegramFormData.append("document", file)

    const telegramResponse = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendDocument`, {
      method: "POST",
      body: telegramFormData,
    })

    const telegramData = await telegramResponse.json()

    if (!telegramResponse.ok) {
      console.error("[v0] Telegram error:", telegramData)
      return NextResponse.json({ error: "Failed to send to Telegram" }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      messageId: telegramData.result.message_id,
      message: "Document sent successfully to Telegram",
    })
  } catch (error) {
    console.error("[v0] Error in send-telegram route:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
