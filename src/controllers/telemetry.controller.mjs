// src/controllers/telemetry.controller.mjs

export const receiveTelemetry = async (req, res, next) => {
  try {
    const { device, value, unit } = req.body
    // Save telemetry to DB (MVP example)
    // const newTelemetry = await Telemetry.create({ device, value, unit })

    // Emit event to all clients
    const io = req.app.get("io")
    io.emit("telemetry:update", { device, value, unit })

    res.json({ message: "Telemetry received and broadcasted" })
  } catch (error) {
    next(error)
  }
}

export const getDeviceTelemetry = async (req, res, next) => {
  res.json({ message: `get telemetry for device ${req.params.id}` })
}

export const listTelemetry = async (req, res, next) => {
  res.json({ message: "list all telemetry endpoint" })
}