import express from "express"
import authMiddleware from "../middleware/auth.middleware.mjs"
import roleMiddleware from "../middleware/role.middleware.mjs"
import * as deviceController from "../controllers/device.controller.mjs"

const router = express.Router()

// Register a device (admin/researcher)
router.post("/register", authMiddleware, roleMiddleware("admin", "superadmin", "researcher"), deviceController.registerDevice)

// List devices (any authenticated user)
router.get("/", authMiddleware, deviceController.listDevices)

// Get device details
router.get("/:id", authMiddleware, deviceController.getDevice)

// Update device
router.put("/:id", authMiddleware, roleMiddleware("admin", "superadmin"), deviceController.updateDevice)

// Delete device
router.delete("/:id", authMiddleware, roleMiddleware("admin", "superadmin"), deviceController.deleteDevice)

export default router