// src/controllers/user.controller.mjs

import User from "../models/User.mjs"
import { hashPassword } from "../utils/password.mjs"

export const getProfile = async (req, res, next) => {
  try {
    const userId = req.user?.id || req.user?._id

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" })
    }

    const user = await User.findById(userId).select("-password")

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" })
    }

    res.json({ success: true, data: user })
  } catch (error) {
    next(error)
  }
}

export const updateProfile = async (req, res, next) => {
  try {
    const userId = req.user?.id || req.user?._id
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" })
    }

    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" })
    }

    const { firstName, lastName, emailAddress, password } = req.body || {}

    if (emailAddress && emailAddress !== user.emailAddress) {
      const existing = await User.findOne({ emailAddress })
      if (existing) {
        return res.status(409).json({ success: false, message: "Email address already in use" })
      }
      user.emailAddress = emailAddress
    }

    if (firstName !== undefined) user.firstName = firstName
    if (lastName !== undefined) user.lastName = lastName

    if (password) {
      user.password = await hashPassword(password)
    }

    await user.save()

    const updated = await User.findById(userId).select("-password")

    res.json({ success: true, data: updated })
  } catch (error) {
    next(error)
  }
}

export const listUsers = async (req, res, next) => {
  try {
    const page = Math.max(1, parseInt(req.query.page, 10) || 1)
    const limit = Math.max(1, Math.min(100, parseInt(req.query.limit, 10) || 10))
    const skip = (page - 1) * limit

    const total = await User.countDocuments()
    const users = await User.find()
      .select("-password")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)

    res.json({
      success: true,
      data: users,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    next(error)
  }
}

export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params

    if (!id) {
      return res.status(400).json({ success: false, message: "User id is required" })
    }

    const user = await User.findById(id)
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" })
    }

    await User.deleteOne({ _id: id })

    res.json({ success: true, message: "User deleted successfully", data: { id } })
  } catch (error) {
    next(error)
  }
}
