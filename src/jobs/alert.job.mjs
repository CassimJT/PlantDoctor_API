import Telemetry from "../models/Telemetry.mjs"
import { sendEmail } from "../utils/email.mjs"

export const alertJob = async () => {
  try {
    const alerts = await Telemetry.find({ value: { $gt: 100 } }) 
    if (alerts.length) {
      console.log(`Alert! ${alerts.length} telemetry entries exceed threshold.`)

      // Send email to admins
      await sendEmail({
        to: "admin@example.com",
        subject: "PlantDoctor Alert: Telemetry Threshold Exceeded",
        html: `<p>${alerts.length} telemetry entries exceed threshold.</p>`
      })
    }
  } catch (error) {
    console.error("Alert job error:", error.message)
  }
}

// Example usage: run every 1 minute
// import cron from "node-cron"
// cron.schedule("* * * * *", alertJob)