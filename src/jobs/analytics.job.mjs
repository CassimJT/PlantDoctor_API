// src/jobs/analytics.job.mjs

import Telemetry from "../models/Telemetry.mjs"
import Inference from "../models/Inference.mjs"

// Example analytics job: aggregate telemetry and inference counts
export const analyticsJob = async () => {
  try {
    const telemetryCount = await Telemetry.countDocuments()
    const inferenceCount = await Inference.countDocuments()

    console.log(`Telemetry count: ${telemetryCount}, Inference count: ${inferenceCount}`)
    // Could store aggregated stats in a separate collection for dashboard
  } catch (error) {
    console.error("Analytics job error:", error.message)
  }
}

// Example usage: run every hour
// import cron from "node-cron"
// cron.schedule("0 * * * *", analyticsJob)