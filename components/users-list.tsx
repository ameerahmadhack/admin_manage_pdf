"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import jsPDF from "jspdf"
import { useState } from "react"

interface User {
  id: string
  fullName: string
  email: string
  phoneNumber: string
  gender: string
  imageUrl: string | null
  createdAt: Date
  idNumber: string
}

interface UsersListProps {
  users: User[]
}

export default function UsersList({ users }: UsersListProps) {
  const [sendingToTelegram, setSendingToTelegram] = useState<string | null>(null)

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getGenderColor = (gender: string) => {
    switch (gender.toLowerCase()) {
      case "male":
        return "bg-blue-100 text-blue-800"
      case "female":
        return "bg-pink-100 text-pink-800"
      default:
        return "bg-slate-100 text-slate-800"
    }
  }

  const generateUserPDF = async (user: User): Promise<Blob> => {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    })

    const pageWidth = doc.internal.pageSize.getWidth()
    const pageHeight = doc.internal.pageSize.getHeight()
    const margin = 15
    let yPosition = 15

    // Color scheme
    const primaryGold = [184, 134, 11]
    const darkNavy = [25, 45, 85]
    const lightBg = [248, 248, 252]
    const borderColor = [150, 150, 150]
    const textDark = [35, 35, 35]
    const textLight = [80, 80, 80]

    // Background
    doc.setFillColor(255, 255, 255)
    doc.rect(0, 0, pageWidth, pageHeight, "F")

    // Decorative top border
    doc.setFillColor(primaryGold[0], primaryGold[1], primaryGold[2])
    doc.rect(0, 0, pageWidth, 3, "F")

    // Decorative bottom border
    doc.rect(0, pageHeight - 3, pageWidth, 3, "F")

    // Left and right decorative lines
    doc.setDrawColor(primaryGold[0], primaryGold[1], primaryGold[2])
    doc.setLineWidth(0.5)
    doc.line(margin - 2, 8, margin - 2, pageHeight - 8)
    doc.line(pageWidth - margin + 2, 8, pageWidth - margin + 2, pageHeight - 8)

    yPosition = 12

    // Load and display logo centered
    try {
      doc.addImage(
        "https://firebasestorage.googleapis.com/v0/b/backup-file-78994.appspot.com/o/file_000000002274620a8bc1c942af702bb7.png?alt=media&token=4b43cfa9-7608-453d-8089-fe0e990a1e21",
        "PNG",
        pageWidth / 2 - 12,
        yPosition,
        24,
        24,
      )
    } catch (error) {
      console.log("[v0] Logo not loaded")
    }

    yPosition += 28

    // Main title - Yobe Tech Connect
    doc.setFont("helvetica", "bold")
    doc.setFontSize(24)
    doc.setTextColor(darkNavy[0], darkNavy[1], darkNavy[2])
    doc.text("YOBE TECH CONNECT", pageWidth / 2, yPosition, { align: "center" })

    yPosition += 8

    // Slogan
    doc.setFont("helvetica", "italic")
    doc.setFontSize(11)
    doc.setTextColor(primaryGold[0], primaryGold[1], primaryGold[2])
    doc.text("Building Yobe Through Innovation and Unity", pageWidth / 2, yPosition, { align: "center" })

    yPosition += 12

    // Decorative separator line
    doc.setDrawColor(primaryGold[0], primaryGold[1], primaryGold[2])
    doc.setLineWidth(1)
    doc.line(margin + 15, yPosition, pageWidth - margin - 15, yPosition)

    yPosition += 8

    // Certification title
    doc.setFont("helvetica", "bold")
    doc.setFontSize(14)
    doc.setTextColor(darkNavy[0], darkNavy[1], darkNavy[2])
    doc.text("REGISTRATION ACKNOWLEDGMENT SLIP", pageWidth / 2, yPosition, { align: "center" })

    yPosition += 10

    // Main content with two-column layout
    const leftColX = margin + 3
    const rightColX = pageWidth / 2 + 5
    const contentWidth = (pageWidth - 2 * margin - 10) / 2

    // Left column - Profile image and user ID
    doc.setDrawColor(borderColor[0], borderColor[1], borderColor[2])
    doc.setLineWidth(0.3)

    if (user.imageUrl) {
      try {
        // Image frame
        doc.setDrawColor(primaryGold[0], primaryGold[1], primaryGold[2])
        doc.setLineWidth(1.5)
        doc.rect(leftColX + 2, yPosition, 45, 60)

        doc.addImage(user.imageUrl, "JPEG", leftColX + 3, yPosition + 1, 43, 58)
      } catch (error) {
        console.log("[v0] Profile image not loaded")
      }
    }

    // Right column - Certification text centered
    const rightBoxX = rightColX - 5
    const rightBoxWidth = contentWidth + 5

    doc.setFont("helvetica", "normal")
    doc.setFontSize(10)
    doc.setTextColor(textDark[0], textDark[1], textDark[2])

    const certificationMessage = `This is to certify that the bearer of this slip has successfully completed registration with Yobe Tech Connect (YTC).

We acknowledge your commitment to innovation, technology, and youth development.

Welcome to the Yobe Tech Connect (YTC) Family, where ideas grow, leaders emerge, and change begins.`

    const certLines = doc.splitTextToSize(certificationMessage, rightBoxWidth - 4)
    doc.text(certLines, rightBoxX + 2, yPosition + 5, { align: "left" })

    yPosition += 65

    // User Information Section
    doc.setFont("helvetica", "bold")
    doc.setFontSize(10)
    doc.setTextColor(darkNavy[0], darkNavy[1], darkNavy[2])
    doc.text("REGISTRANT INFORMATION", margin + 2, yPosition)

    yPosition += 7

    // Information boxes
    doc.setFont("helvetica", "normal")
    doc.setFontSize(9)

    const infoFields = [
      { label: "Full Name:", value: user.fullName },
      { label: "Registration ID:", value: user.idNumber },
      { label: "Email Address:", value: user.email },
      { label: "Phone Number:", value: user.phoneNumber },
      { label: "Gender:", value: user.gender.charAt(0).toUpperCase() + user.gender.slice(1) },
      { label: "Submit Date:", value: formatDate(user.createdAt) },
    ]

    infoFields.forEach((field, index) => {
      const col = index % 2 === 0 ? margin + 2 : pageWidth / 2 + 5
      const row = yPosition + Math.floor(index / 2) * 8

      doc.setTextColor(textLight[0], textLight[1], textLight[2])
      doc.setFont("helvetica", "bold")
      doc.text(field.label, col, row)

      doc.setTextColor(textDark[0], textDark[1], textDark[2])
      doc.setFont("helvetica", "normal")
      doc.text(field.value, col + 35, row)
    })

    yPosition += 28

    // Authorized Execution Section
    doc.setFont("helvetica", "bold")
    doc.setFontSize(10)
    doc.setTextColor(darkNavy[0], darkNavy[1], darkNavy[2])
    doc.text("AUTHORIZED EXECUTION & CERTIFICATION", margin + 2, yPosition)

    yPosition += 10

    // Signature lines
    const signLineY = yPosition + 12
    const lineLength = 40
    const signLeftX = margin + 5
    const signRightX = pageWidth / 2 + 10

    doc.setDrawColor(textDark[0], textDark[1], textDark[2])
    doc.setLineWidth(0.5)

    // Authorized officer signature line
    doc.line(signLeftX, signLineY, signLeftX + lineLength, signLineY)
    doc.setFont("helvetica", "normal")
    doc.setFontSize(8)
    doc.setTextColor(textLight[0], textLight[1], textLight[2])
    doc.text("Authorized Officer Signature", signLeftX + 2, signLineY + 4)

    // Date line
    doc.line(signRightX, signLineY, signRightX + lineLength, signLineY)
    doc.text("Date", signRightX + 15, signLineY + 4)

    yPosition = pageHeight - 18

    // Decorative footer line
    doc.setDrawColor(primaryGold[0], primaryGold[1], primaryGold[2])
    doc.setLineWidth(0.8)
    doc.line(margin, yPosition, pageWidth - margin, yPosition)

    yPosition += 5

    // Footer text
    doc.setFont("helvetica", "bold")
    doc.setFontSize(9)
    doc.setTextColor(darkNavy[0], darkNavy[1], darkNavy[2])
    doc.text("Powered by Yobe Tech Connect", pageWidth / 2, yPosition, { align: "center" })

    yPosition += 4

    doc.setFont("helvetica", "normal")
    doc.setFontSize(7)
    doc.setTextColor(textLight[0], textLight[1], textLight[2])
    doc.text(
      "This is an official document for record and confirmation. Generated: " + formatDate(new Date()),
      pageWidth / 2,
      yPosition,
      { align: "center" },
    )

    yPosition += 3

    doc.setFontSize(7)
    doc.text("Document ID: " + user.id, pageWidth / 2, yPosition, { align: "center" })

    return doc.output("blob") as Blob
  }

  const sendToTelegram = async (user: User) => {
    setSendingToTelegram(user.id)
    try {
      // Generate PDF as blob
      const pdfBlob = await generateUserPDF(user)

      // Create form data for multipart upload
      const formData = new FormData()
      formData.append("file", pdfBlob, `${user.fullName.replace(/\s+/g, "_")}_YTC_Acknowledgment.pdf`)
      formData.append("user", JSON.stringify(user))

      // Send to API route
      const response = await fetch("/api/send-telegram", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()

      if (response.ok) {
        alert(`Successfully sent to Telegram! Message ID: ${data.messageId}`)
      } else {
        alert(`Error: ${data.error}`)
      }
    } catch (error) {
      console.error("[v0] Error sending to Telegram:", error)
      alert("Failed to send to Telegram. Please try again.")
    } finally {
      setSendingToTelegram(null)
    }
  }

  const downloadPDF = async (user: User) => {
    const pdfBlob = await generateUserPDF(user)
    const url = window.URL.createObjectURL(pdfBlob)
    const link = document.createElement("a")
    link.href = url
    link.download = `${user.fullName.replace(/\s+/g, "_")}_YTC_Acknowledgment_Slip.pdf`
    document.body.appendChild(link)
    link.click()
    window.URL.revokeObjectURL(url)
    document.body.removeChild(link)
  }

  return (
    <Card className="shadow-md border-slate-200">
      <CardHeader className="bg-gradient-to-r from-slate-50 to-blue-50 border-b border-slate-200">
        <CardTitle className="text-xl text-slate-900">Registered Users</CardTitle>
        <CardDescription>{users.length} user(s) registered</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        {users.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-500 text-sm">No users registered yet. Add your first user to get started.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {users.map((user) => (
              <div key={user.id} className="border border-slate-200 rounded-lg p-4 hover:bg-slate-50 transition-colors">
                <div className="flex gap-4 items-start">
                  {user.imageUrl && (
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-slate-300 flex-shrink-0">
                      <img
                        src={user.imageUrl || "/placeholder.svg"}
                        alt={user.fullName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-slate-900 text-sm">{user.fullName}</h3>
                      <Badge className={`text-xs ${getGenderColor(user.gender)}`}>{user.gender}</Badge>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-slate-600">
                        <span className="font-medium">Email:</span> {user.email}
                      </p>
                      <p className="text-xs text-slate-600">
                        <span className="font-medium">Phone:</span> {user.phoneNumber}
                      </p>
                      <p className="text-xs text-slate-500 mt-2">
                        <span className="font-medium">ID:</span> {user.idNumber} •{" "}
                        <span className="font-medium">Submitted:</span> {formatDate(user.createdAt)}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <Button
                      onClick={() => downloadPDF(user)}
                      variant="outline"
                      size="sm"
                      className="border-blue-300 text-blue-600 hover:bg-blue-50"
                    >
                      Export PDF
                    </Button>
                    <Button
                      onClick={() => sendToTelegram(user)}
                      disabled={sendingToTelegram === user.id}
                      size="sm"
                      className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
                    >
                      {sendingToTelegram === user.id ? "Sending..." : "Send to Telegram"}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
