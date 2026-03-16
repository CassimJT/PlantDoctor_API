// src/utils/validators.mjs

import Joi from "joi"

// ================= User Validators =================
export const registerUserSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  emailAddress: Joi.string().email().required(),
  password: Joi.string().min(6).required()
})

export const loginUserSchema = Joi.object({
  emailAddress: Joi.string().email().required(),
  password: Joi.string().required()
})

// ================= Device Validators =================
export const registerDeviceSchema = Joi.object({
  name: Joi.string().required(),
  location: Joi.string().optional()
})

// ================= Telemetry Validators =================
export const telemetrySchema = Joi.object({
  device: Joi.string().required(),
  value: Joi.number().required(),
  unit: Joi.string().optional()
})

// ================= Inference Validators =================
export const inferenceSchema = Joi.object({
  device: Joi.string().required(),
  result: Joi.string().required(),
  confidence: Joi.number().min(0).max(1).optional()
})

// ================= Middleware helper =================
export const validateBody = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body)
  if (error) return res.status(400).json({ error: error.details[0].message })
  next()
}