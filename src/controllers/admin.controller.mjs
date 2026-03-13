// src/controllers/admin.controller.mjs

export const getSystemStats = async (req, res, next) => {
  res.json({ message: "system stats endpoint" })
}

export const listAllDevices = async (req, res, next) => {
  res.json({ message: "list all devices endpoint" })
}

export const listAllInferences = async (req, res, next) => {
  res.json({ message: "list all inference logs endpoint" })
}