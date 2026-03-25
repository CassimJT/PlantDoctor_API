// // src/controllers/admin.controller.mjs

// export const getSystemStats = async (req, res, next) => {
//   res.json({ message: "system stats endpoint" })
// }

// export const listAllDevices = async (req, res, next) => {
//   res.json({ message: "list all devices endpoint" })
// }

// export const listAllInferences = async (req, res, next) => {
//   res.json({ message: "list all inference logs endpoint" })
// }


import User from "../models/User.mjs"
import Device from "../models/Device.mjs"
import Inference from "../models/Inference.mjs"

export const getSystemStats = async (req, res, next) => {
  try {
    const userCount = await User.countDocuments()
    const deviceCount = await Device.countDocuments()
    const inferenceCount = await Inference.countDocuments()

    res.json({ success: true, data: { users: userCount, devices: deviceCount, inferences: inferenceCount } })
  } catch (error) {
    next(error)
  }
}

export const listAllDevices = async (req, res, next) => {
  try {
    const devices = await Device.find().populate('owner', 'firstName lastName emailAddress')

    res.json({ success: true, data: devices })
  } catch (error) {
    next(error)
  }
}

export const listAllInferences = async (req, res, next) => {
  try {
    const inferences = await Inference.find().populate('device', 'name location')

    res.json({ success: true, data: inferences })
  } catch (error) {
    next(error)
  }
}