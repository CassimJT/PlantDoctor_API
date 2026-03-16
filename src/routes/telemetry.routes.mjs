import express from "express"
import authMiddleware from "../middleware/auth.middleware.mjs"
import roleMiddleware from "../middleware/role.middleware.mjs"
import * as telemetryController from "../controllers/telemetry.controller.mjs"

const router = express.Router()

// Device sends telemetry data
router.post("/", telemetryController.receiveTelemetry)

// Admin/researcher gets all telemetry
router.get("/", authMiddleware, roleMiddleware("admin", "superadmin", "researcher"), telemetryController.listTelemetry)

// Get telemetry for a specific device
router.get("/device/:id", authMiddleware, telemetryController.getDeviceTelemetry)

export default router