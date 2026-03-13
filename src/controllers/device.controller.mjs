// src/controllers/device.controller.mjs

export const registerDevice = async (req, res, next) => {
  res.json({ message: "register device endpoint" })
}

export const listDevices = async (req, res, next) => {
  res.json({ message: "list devices endpoint" })
}

export const getDevice = async (req, res, next) => {
  res.json({ message: `get device ${req.params.id} endpoint` })
}

export const updateDevice = async (req, res, next) => {
  res.json({ message: `update device ${req.params.id} endpoint` })
}

export const deleteDevice = async (req, res, next) => {
  res.json({ message: `delete device ${req.params.id} endpoint` })
}