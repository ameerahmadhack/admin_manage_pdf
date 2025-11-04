import html2pdf from "html2pdf.js"

interface User {
  id: string
  fullName: string
  email: string
  phoneNumber: string
  gender: string
  imageUrl: string | null
  createdAt: Date
}

export async function generatePDF(user: User) {
  const element = document.createElement("div")
  element.innerHTML = `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 40px; background-color: #f8f9fa; min-height: 100vh;">
      <!-- Header -->
      <div style="text-align: center; margin-bottom: 30px; padding-bottom: 20px; border-bottom: 3px solid #0066cc;">
        <img src="https://firebasestorage.googleapis.com/v0/b/backup-file-78994.appspot.com/o/file_000000002274620a8bc1c942af702bb7.png?alt=media&token=4b43cfa9-7608-453d-8089-fe0e990a1e21" alt="Logo" style="height: 60px; margin-bottom: 15px;">
        <h1 style="color: #1a1a1a; margin: 0; font-size: 28px;">OFFICIAL DOCUMENT</h1>
        <p style="color: #666; margin: 5px 0 0 0;">User Record & Confirmation Certificate</p>
      </div>

      <!-- Main Content -->
      <div style="background-color: white; padding: 40px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
        <!-- User Image -->
        ${
          user.imageUrl
            ? `
          <div style="text-align: center; margin-bottom: 30px;">
            <img src="${user.imageUrl}" alt="${user.fullName}" style="width: 150px; height: 150px; border-radius: 8px; border: 3px solid #0066cc; object-fit: cover;">
          </div>
        `
            : ""
        }

        <!-- User Details Section -->
        <div style="margin-bottom: 30px;">
          <h2 style="color: #0066cc; border-bottom: 2px solid #0066cc; padding-bottom: 10px; margin: 0 0 20px 0;">USER INFORMATION</h2>
          
          <table style="width: 100%; border-collapse: collapse;">
            <tr style="background-color: #f0f4f8;">
              <td style="padding: 12px; border: 1px solid #ddd; font-weight: 600; color: #333; width: 30%;">User ID:</td>
              <td style="padding: 12px; border: 1px solid #ddd; color: #0066cc; font-family: monospace; font-weight: 600;">${user.id}</td>
            </tr>
            <tr>
              <td style="padding: 12px; border: 1px solid #ddd; font-weight: 600; color: #333;">Full Name:</td>
              <td style="padding: 12px; border: 1px solid #ddd; color: #1a1a1a;">${user.fullName}</td>
            </tr>
            <tr style="background-color: #f0f4f8;">
              <td style="padding: 12px; border: 1px solid #ddd; font-weight: 600; color: #333;">Email Address:</td>
              <td style="padding: 12px; border: 1px solid #ddd; color: #1a1a1a;">${user.email}</td>
            </tr>
            <tr>
              <td style="padding: 12px; border: 1px solid #ddd; font-weight: 600; color: #333;">Phone Number:</td>
              <td style="padding: 12px; border: 1px solid #ddd; color: #1a1a1a;">${user.phoneNumber}</td>
            </tr>
            <tr style="background-color: #f0f4f8;">
              <td style="padding: 12px; border: 1px solid #ddd; font-weight: 600; color: #333;">Gender:</td>
              <td style="padding: 12px; border: 1px solid #ddd; color: #1a1a1a;">${user.gender}</td>
            </tr>
            <tr>
              <td style="padding: 12px; border: 1px solid #ddd; font-weight: 600; color: #333;">Document Date:</td>
              <td style="padding: 12px; border: 1px solid #ddd; color: #1a1a1a;">${new Date(
                user.createdAt,
              ).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}</td>
            </tr>
          </table>
        </div>

        <!-- Certificate Section -->
        <div style="background: linear-gradient(135deg, #f0f4f8 0%, #e8ecf1 100%); padding: 30px; border-radius: 8px; border-left: 4px solid #0066cc; margin-bottom: 30px;">
          <p style="margin: 0; color: #333; font-size: 14px; line-height: 1.6;">
            <strong>CERTIFICATION:</strong> This document certifies that the above-mentioned individual has been registered in our system with the unique identification number as stated. This record is official and for all intents and purposes related to confirmation and verification.
          </p>
        </div>

        <!-- Footer -->
        <div style="border-top: 2px solid #ddd; padding-top: 20px; text-align: center; color: #666; font-size: 12px;">
          <p style="margin: 0;">Powered by <strong>Yobe Tech Connect</strong></p>
          <p style="margin: 5px 0 0 0;">These are the official documents for record and confirmation purposes only.</p>
          <p style="margin: 10px 0 0 0; color: #999;">Generated on ${new Date().toLocaleString()}</p>
        </div>
      </div>
    </div>
  `

  const options = {
    margin: 0,
    filename: `User_${user.id}_${new Date().getTime()}.pdf`,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { orientation: "portrait", unit: "mm", format: "a4" },
  }

  html2pdf().set(options).from(element).save()
}
