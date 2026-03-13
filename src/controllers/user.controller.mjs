// src/controllers/user.controller.mjs

export const getProfile = async (req, res, next) => {
  res.json({ message: "get profile endpoint" })
}

export const updateProfile = async (req, res, next) => {
  res.json({ message: "update profile endpoint" })
}

export const listUsers = async (req, res, next) => {
  res.json({ message: "list users endpoint" })
}

export const deleteUser = async (req, res, next) => {
  res.json({ message: "delete user endpoint" })
}