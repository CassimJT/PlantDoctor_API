// // src/controllers/inference.controller.mjs

// export const createInference = async (req, res, next) => {
//   try {
//     const { device, result, confidence } = req.body
//     // Save inference to DB (MVP example)
//     // const newInference = await Inference.create({ device, result, confidence })

//     const io = req.app.get("io")
//     io.emit("inference:update", { device, result, confidence })

//     res.json({ message: "Inference created and broadcasted" })
//   } catch (error) {
//     next(error)
//   }
// }

// export const listInferences = async (req, res, next) => {
//   res.json({ message: "list all inferences endpoint" })
// }

// export const getInference = async (req, res, next) => {
//   res.json({ message: `get inference ${req.params.id} endpoint` })
// }

import Inference from "../models/Inference.mjs"


export const createInference = async (req, res, next) => {
  try {
    const { device, result, confidence, timestamp } = req.body
    const newInference = await Inference.create({ device, result, confidence, timestamp: new Date() })

    const io = req.app.get("io")
    io.emit("inference:update", { device, result, confidence, timestamp: newInference.timestamp })

    res.json({message : "Inference created and broadcasted"  })
  } catch (error) {
    next(error)
  }
}

export const listInferences = async (req, res, next) => {
  try{
    const inferences = await Inference.populate().sort({ createdAt: -1 }).limit(50)
    res.json({inferences})
  } catch (error) {
    next(error)
  }
}

export const getInference = async (req, res, next) => {
  try {
    const inference = await Inference.findById(req.params.id)
    if (!inference) {
      return res.status(404).json({ error: "Inference not found" })
    }
    res.json({
      id: inference._id,
      device: inference.device,
      result: inference.result,
      confidence: inference.confidence,
      timestamp: inference.createdAt