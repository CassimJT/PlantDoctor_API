import mongoose from "mongoose"

const inferenceSchema = new mongoose.Schema({
  location: { 
    type: String, 
    required: true 
  },
  diseasname: { 
    type: String, 
    required: true 
  },
  confidence: { 
    type: Number, 
    required: true,
    min: 0,
    max: 1
  },
  variaty: { 
    type: String, 
    required: true 
  },
  timestamp: { 
    type: Date, 
    default: Date.now 
  }
}, { timestamps: true })

// Add an index for faster queries
inferenceSchema.index({ diseasname: 1 })
inferenceSchema.index({ location: 1 })
inferenceSchema.index({ timestamp: -1 })

// Optional: Add a virtual field for formatted display
inferenceSchema.virtual('formattedConfidence').get(function() {
  return `${(this.confidence * 100).toFixed(2)}%`
})

export default mongoose.model("Inference", inferenceSchema)