import mongoose from "mongoose"

const telemetrySchema = new mongoose.Schema({
  device: { type: mongoose.Schema.Types.ObjectId, ref: "Device", required: true },
  value: { type: Number, required: true },
  unit: { type: String },
  timestamp: { type: Date, default: Date.now }
}, { timestamps: true })

export default mongoose.model("Telemetry", telemetrySchema)