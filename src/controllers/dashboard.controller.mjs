// src/controllers/dashboard.controller.mjs

export const getDashboardStats = async (req, res, next) => {
  res.json({ message: "dashboard stats endpoint" })
}

export const getRecentTelemetry = async (req, res, next) => {
  res.json({ message: "recent telemetry endpoint" })
}

export const getRecentInferences = async (req, res, next) => {
  res.json({ message: "recent inference endpoint" })
}