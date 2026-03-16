import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import crypto from "crypto"
import dotenv from "dotenv"

dotenv.config()

// ================= Password Helpers =================
export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10)
  return bcrypt.hash(password, salt)
}

export const comparePassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword)
}

// ================= JWT Helpers =================
export const signAccessToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.emailAddress, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "15m" }
  )
}

export const signRefreshToken = (user) => {
  return jwt.sign(
    { id: user._id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || "7d" }
  )
}

export const verifyAccessToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET)
}

export const verifyRefreshToken = (token) => {
  return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET)
}

// ================= Random Token =================
export const generateRandomToken = (length = 32) => {
  return crypto.randomBytes(length).toString("hex")
}

// ================= Helper Utilities =================
export const formatDate = (date) => {
  return date.toISOString().replace("T", " ").substring(0, 19)
}

export const capitalize = (str) => {
  if (!str) return ""
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

// Example: simple sleep / delay
export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))