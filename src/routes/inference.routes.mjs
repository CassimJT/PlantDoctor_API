import express from "express"
import authMiddleware from "../middleware/auth.middleware.mjs"
import roleMiddleware from "../middleware/role.middleware.mjs"
import * as inferenceController from "../controllers/inference.controller.mjs"

const router = express.Router()

// Upload inference result
router.post("/",inferenceController.createInference)
// In your router file
router.post("/batch", inferenceController.createBatchInferences)

// List all inference results
router.get("/", authMiddleware, roleMiddleware("admin", "superadmin"), inferenceController.listInferences)

// Get inference by ID
router.get("/:id", authMiddleware, inferenceController.getInference)
// Add these to your router

router.get("/stats/diseases", authMiddleware, roleMiddleware("admin", "superadmin"), inferenceController.getDiseaseStats)
router.get("/location/:location", authMiddleware, inferenceController.getInferencesByLocation)
router.get("/disease/:disease", authMiddleware, inferenceController.getInferencesByDisease)

export default router