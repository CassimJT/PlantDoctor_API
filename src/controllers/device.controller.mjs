// // src/controllers/device.controller.mjs

// export const registerDevice = async (req, res, next) => {
//   res.json({ message: "register device endpoint" })
// }

// export const listDevices = async (req, res, next) => {
//   res.json({ message: "list devices endpoint" })
// }

// export const getDevice = async (req, res, next) => {
//   res.json({ message: `get device ${req.params.id} endpoint` })
// }

// export const updateDevice = async (req, res, next) => {
//   res.json({ message: `update device ${req.params.id} endpoint` })
// }

// export const deleteDevice = async (req, res, next) => {
//   res.json({ message: `delete device ${req.params.id} endpoint` })
// }

import Device from "../models/Device.mjs"
import {validateDeviceInput} from "../utils/validators.mjs"

// register a new  device 

export const registerDevice = async (req, res, next) => {
  try {
    const userId = req.user?.id
    const { name, serialnumber, location, deviceType } = req.body || {}

    // validate device input

    const validation = validateDeviceInput({ name, serialnumber, location, deviceType })

    if (!validation.valid) {
      return res.status(400).json({ success: false, message: validation.error })
    }

    // check if device exist 

    const existingDevice = await Device.findOne({ userId, serialnumber })
    if (existingDevice) {
      return res.status(409).json({
        success: false,
        error: "Device with this serial number already registered"
      })
    }

    // Create new device

    const newDevice = new Device({
      userId,
      name,
      serialNumber,
      location,
      deviceType,
      status: "active",
      lastSeen: new Date()
    })

    await newDevice.save()

    res.status(201).json({
      success: true,
      data: {
        id: newDevice._id,
        name: newDevice.name,
        serialNumber: newDevice.serialNumber,
        location: newDevice.location,
        deviceType: newDevice.deviceType,
        status: newDevice.status
      }
    })
  } catch (error) {
    next(error)
  }
}

//  List all devices for authenticated user

export const listDevices = async (req, res, next) => {
  try {
    const userId = req.user?.id
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const skip = (page - 1) * limit

    // Get total count
    const total = await Device.countDocuments({ userId })

    // Get paginated devices
    const devices = await Device.find({ userId })
      .select("name serialNumber location deviceType status lastSeen createdAt")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)

    res.json({
      success: true,
      data: devices,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    next(error)
  }
}

// Get a specific device by ID

export const getDevice = async (req, res, next) => {
  try {
    const userId = req.user?.id
    const { id } = req.params

    // Find device and verify ownership

    const device = await Device.findOne({ _id: id, userId })

    if (!device) {
      return res.status(404).json({
        success: false,
        error: "Device not found"
      })
    }

    res.json({
      success: true,
      data: {
        id: device._id,
        name: device.name,
        serialNumber: device.serialNumber,
        location: device.location,
        deviceType: device.deviceType,
        status: device.status,
        lastSeen: device.lastSeen,
        createdAt: device.createdAt,
        updatedAt: device.updatedAt
      }
    })
  } catch (error) {
    next(error)
  }
}

//  Update device information

export const updateDevice = async (req, res, next) => {
  try {
    const userId = req.user?.id
    const { id } = req.params
    const { name, location, deviceType } = req.body

    // Find device and verify ownership

    const device = await Device.findOne({ _id: id, userId })

    if (!device) {
      return res.status(404).json({
        success: false,
        error: "Device not found"
      })
    }

    // Update allowed fields

    if (name) device.name = name
    if (location) device.location = location
    if (deviceType) device.deviceType = deviceType

    await device.save()

    res.json({
      success: true,
      data: {
        id: device._id,
        name: device.name,
        serialNumber: device.serialNumber,
        location: device.location,
        deviceType: device.deviceType,
        status: device.status,
        updatedAt: device.updatedAt
      }
    })
  } catch (error) {
    next(error)
  }
}


//  Delete a device

export const deleteDevice = async (req, res, next) => {
  try {
    const userId = req.user?.id
    const { id } = req.params

    // Find device and verify ownership

    const device = await Device.findOne({ _id: id, userId })

    if (!device) {
      return res.status(404).json({
        success: false,
        error: "Device not found"
      })
    }

    // Delete device
    
    await Device.deleteOne({ _id: id })

    res.json({
      success: true,
      message: "Device deleted successfully",
      data: { id: device._id }
    })
  } catch (error) {
    next(error)
  }
}    
