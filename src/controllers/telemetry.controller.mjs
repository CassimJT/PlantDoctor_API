// // src/controllers/telemetry.controller.mjs

// export const receiveTelemetry = async (req, res, next) => {
//   try {
//     const { device, value, unit } = req.body
//     // Save telemetry to DB (MVP example)
//     // const newTelemetry = await Telemetry.create({ device, value, unit })

//     // Emit event to all clients
//     const io = req.app.get("io")
//     io.emit("telemetry:update", { device, value, unit })

//     res.json({ message: "Telemetry received and broadcasted" })
//   } catch (error) {
//     next(error)
//   }
// }

// export const getDeviceTelemetry = async (req, res, next) => {
//   res.json({ message: `get telemetry for device ${req.params.id}` })
// }

// export const listTelemetry = async (req, res, next) => {
//   res.json({ message: "list all telemetry endpoint" })
// }

// src/controllers/telemetry.controller.mjs

import Telemetry from "../models/Telemetry.mjs"
import Device from "../models/Device.mjs"
import { telemetrySchema } from "../utils/validators.mjs"

export const receiveTelemetry = async (req, res, next) => {
  try {
    const { error } = telemetrySchema.validate(req.body)
    if (error) {
      return res.status(400).json({ error: error.details[0].message })
    }

    const { device: apiKey, value, unit } = req.body

    // Find device by apiKey
    const device = await Device.findOne({ apiKey })
    if (!device) {
      return res.status(404).json({ error: "Device not found" })
    }

    // Save telemetry to DB
    const newTelemetry = new Telemetry({
      device: device._id,
      value,
      unit
    })
    await newTelemetry.save()

    // Emit event to all clients
    const io = req.app.get("io")
    io.emit("telemetry:update", { device: device._id, value, unit, timestamp: newTelemetry.timestamp })

    res.json({ message: "Telemetry received and broadcasted" })
  } catch (error) {
    next(error)
  }
}

export const getDeviceTelemetry = async (req, res, next) => {
  try {
    const deviceId = req.params.id
    const userId = req.user?.id
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const skip = (page - 1) * limit

    // Check if device exists and user owns it or is admin
    const device = await Device.findById(deviceId)
    if (!device) {
      return res.status(404).json({ error: "Device not found" })
    }

    // Assuming user can access their own devices' telemetry
    if (device.owner.toString() !== userId && !req.user.roles.includes('admin')) {
      return res.status(403).json({ error: "Access denied" })
    }

    // Get telemetry count
    const total = await Telemetry.countDocuments({ device: deviceId })

    // Get paginated telemetry
    const telemetry = await Telemetry.find({ device: deviceId })
      .sort({ timestamp: -1 })
      .skip(skip)
      .limit(limit)

    res.json({
      success: true,
      data: telemetry,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    next(error)
  }
}

export const listTelemetry = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const skip = (page - 1) * limit

    // Get total count
    const total = await Telemetry.countDocuments()

    // Get paginated telemetry
    const telemetry = await Telemetry.find()
      .populate('device', 'name location')
      .sort({ timestamp: -1 })
      .skip(skip)
      .limit(limit)

    res.json({
      success: true,
      data: telemetry,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    next(error)
  }
}