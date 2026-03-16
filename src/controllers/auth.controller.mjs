// src/controllers/auth.controller.mjs

export const register = async (req, res, next) => {
  res.json({ message: "register endpoint" })
}

export const login = async (req, res, next) => {
  res.json({ message: "login endpoint" })
}

export const refresh = async (req, res, next) => {
  res.json({ message: "refresh endpoint" })
}

export const logout = async (req, res, next) => {
  res.json({ message: "logout endpoint" })
}

export const me = async (req, res, next) => {
  res.json({ message: "current user endpoint" })
}