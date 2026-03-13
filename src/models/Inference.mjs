import mongoose from "mongoose"

const inferenceSchema = new mongoose.Schema({
  device: { type: mongoose.Schema.Types.ObjectId, ref: "Device", required: true },
  result: { type: String, required: true },
  confidence: { type: Number },
  timestamp: { type: Date, default: Date.now }
}, { timestamps: true })

export default mongoose.model("Inference", inferenceSchema)