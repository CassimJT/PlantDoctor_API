
import Device from "../models/Device.mjs"
import Inference from "../models/Inference.mjs"
import Telemetry from "../models/Telemetry.mjs"

// Get dashboard statistics

export const getDashboardStats = async (req, res, next) => {
  try {
    const userId = req.user?.id

    // Get user's devices count

    const deviceCount = await Device.countDocuments({ userId })

    // Get total inferences for user's devices

    const userDevices = await Device.find({ userId }, { _id: 1 })
    const deviceIds = userDevices.map(d => d._id)
    const inferenceCount = await Inference.countDocuments({
      deviceId: { $in: deviceIds }
    })

    // Get recent alerts (inferences with alert flag)

    const alertCount = await Inference.countDocuments({
      deviceId: { $in: deviceIds },
      isAlert: true,
      createdAt: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) } // Last 24 hours
    })

    // Get average health score

    const healthData = await Telemetry.aggregate([
      { $match: { deviceId: { $in: deviceIds } } },
      { $group: { _id: null, avgHealth: { $avg: "$healthScore" } } }
    ])

    const avgHealth = healthData[0]?.avgHealth || 0

    res.json({
      success: true,
      data: {
        devices: deviceCount,
        inferences: inferenceCount,
        alerts: alertCount,
        avgHealthScore: Math.round(avgHealth * 100) / 100
      }
    })
  } catch (error) {
    next(error)
  }
}

// Get recent telemetry data

export const getRecentTelemetry = async (req, res, next) => {
  try {
    const userId = req.user?.id
    const limit = req.query.limit || 10

    // Get user's devices

    const userDevices = await Device.find({ userId }, { _id: 1 })
    const deviceIds = userDevices.map(d => d._id)

    // Get recent telemetry data, grouped by device

    const telemetryData = await Telemetry.aggregate([
      {
        $match: { deviceId: { $in: deviceIds } }
      },
      {
        $sort: { createdAt: -1 }
      },
      {
        $group: {
          _id: "$deviceId",
          latestReading: { $first: "$$ROOT" }
        }
      },
      {
        $limit: limit
      },
      {
        $lookup: {
          from: "devices",
          localField: "_id",
          foreignField: "_id",
          as: "device"
        }
      }
    ])

    res.json({
      success: true,
      data: telemetryData.map(item => ({
        deviceName: item.device[0]?.name,
        deviceId: item._id,
        humidity: item.latestReading.humidity,
        temperature: item.latestReading.temperature,
        soilMoisture: item.latestReading.soilMoisture,
        lightIntensity: item.latestReading.lightIntensity,
        healthScore: item.latestReading.healthScore,
        timestamp: item.latestReading.createdAt
      }))
    })
  } catch (error) {
    next(error)
  }
}

// Get recent inferences

export const getRecentInferences = async (req, res, next) => {
  try {
    const userId = req.user?.id
    const limit = req.query.limit || 10

    // Get user's devices

    const userDevices = await Device.find({ userId }, { _id: 1 })
    const deviceIds = userDevices.map(d => d._id)

    // Get recent inferences with device info

    const inferences = await Inference.aggregate([
      {
        $match: { deviceId: { $in: deviceIds } }
      },
      {
        $sort: { createdAt: -1 }
      },
      {
        $limit: limit
      },
      {
        $lookup: {
          from: "devices",
          localField: "deviceId",
          foreignField: "_id",
          as: "device"
        }
      }
    ])

    res.json({
      success: true,
      data: inferences.map(inference => ({
        id: inference._id,
        deviceName: inference.device[0]?.name,
        deviceId: inference.deviceId,
        disease: inference.disease,
        confidence: inference.confidence,
        severity: inference.severity,
        isAlert: inference.isAlert,
        recommendation: inference.recommendation,
        imageUrl: inference.imageUrl,
        timestamp: inference.createdAt
      }))
    })
  } catch (error) {
    next(error)
  }
}