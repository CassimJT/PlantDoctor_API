import express from "express"
import authMiddleware from "../middleware/auth.middleware.mjs"
import roleMiddleware from "../middleware/role.middleware.mjs"
import * as inferenceController from "../controllers/inference.controller.mjs"

const router = express.Router()

// Upload inference result
router.post("/", authMiddleware, roleMiddleware("researcher", "admin", "superadmin"), inferenceController.createInference)

// List all inference results
router.get("/", authMiddleware, roleMiddleware("admin", "superadmin"), inferenceController.listInferences)

// Get inference by ID
router.get("/:id", authMiddleware, inferenceController.getInference)

export default router