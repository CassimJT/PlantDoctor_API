import express from "express"
import passport from "passport"
import * as authController from "../controllers/auth.controller.mjs"
import authMiddleware from "../middleware/auth.middleware.mjs"

const router = express.Router()

// Register
router.post("/register", authController.register)

// Login
router.post("/login", authController.login)

// Refresh Token
router.post("/refresh", authController.refresh)

// Logout
router.post("/logout", authController.logout)

// Current User
router.get("/me", authMiddleware, authController.me)

export default router
