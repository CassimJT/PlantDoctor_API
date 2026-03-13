import express from "express"
import authMiddleware from "../middleware/auth.middleware.mjs"
import roleMiddleware from "../middleware/role.middleware.mjs"
import * as dashboardController from "../controllers/dashboard.controller.mjs"

const router = express.Router()

// Aggregated dashboard stats
router.get("/stats", authMiddleware, roleMiddleware("admin", "superadmin"), dashboardController.getDashboardStats)

// Recent telemetry for dashboard
router.get("/telemetry", authMiddleware, roleMiddleware("admin", "superadmin"), dashboardController.getRecentTelemetry)

// Recent inferences for dashboard
router.get("/inference", authMiddleware, roleMiddleware("admin", "superadmin"), dashboardController.getRecentInferences)

export default router