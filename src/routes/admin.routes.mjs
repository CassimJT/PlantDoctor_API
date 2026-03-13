import express from "express"
import authMiddleware from "../middleware/auth.middleware.mjs"
import roleMiddleware from "../middleware/role.middleware.mjs"
import * as adminController from "../controllers/admin.controller.mjs"

const router = express.Router()

// System stats
router.get("/stats", authMiddleware, roleMiddleware("admin", "superadmin"), adminController.getSystemStats)

// List all devices
router.get("/devices", authMiddleware, roleMiddleware("admin", "superadmin"), adminController.listAllDevices)

// List all inferences
router.get("/inference", authMiddleware, roleMiddleware("admin", "superadmin"), adminController.listAllInferences)

export default router