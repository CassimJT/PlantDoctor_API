// src/controllers/inference.controller.mjs

export const createInference = async (req, res, next) => {
  try {
    const { device, result, confidence } = req.body
    // Save inference to DB (MVP example)
    // const newInference = await Inference.create({ device, result, confidence })

    const io = req.app.get("io")
    io.emit("inference:update", { device, result, confidence })

    res.json({ message: "Inference created and broadcasted" })
  } catch (error) {
    next(error)
  }
}

export const listInferences = async (req, res, next) => {
  res.json({ message: "list all inferences endpoint" })
}

export const getInference = async (req, res, next) => {
  res.json({ message: `get inference ${req.params.id} endpoint` })
}