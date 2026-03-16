import express from "express"
import authMiddleware from "../middleware/auth.middleware.mjs"
import roleMiddleware from "../middleware/role.middleware.mjs"
import * as userController from "../controllers/user.controller.mjs"

const router = express.Router()

// Profile routes (logged-in user)
router.get("/me", authMiddleware, userController.getProfile)
router.put("/me", authMiddleware, userController.updateProfile)

// Admin-only routes
router.get("/", authMiddleware, roleMiddleware("admin", "superadmin"), userController.listUsers)
router.delete("/:id", authMiddleware, roleMiddleware("admin", "superadmin"), userController.deleteUser)

export default router