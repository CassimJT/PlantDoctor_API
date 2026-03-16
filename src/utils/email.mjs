// src/utils/email.mjs

import Resend from "@resendlabs/resend"
import dotenv from "dotenv"

dotenv.config()

const resend = new Resend(process.env.RESEND_API_KEY)

export const sendEmail = async ({ to, subject, html }) => {
  try {
    const response = await resend.emails.send({
      from: "no-reply@plantdoctor.com",
      to,
      subject,
      html
    })
    console.log("Email sent:", response)
    return response
  } catch (error) {
    console.error("Error sending email:", error)
    throw error
  }
}