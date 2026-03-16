
// ================= Roles =================
export const ROLES = {
  SUPERADMIN: "superadmin",
  ADMIN: "admin",
  RESEARCHER: "researcher",
  USER: "user"
}

// ================= HTTP Status Codes =================
export const STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500
}

// ================= Default Thresholds =================
export const THRESHOLDS = {
  TEMPERATURE: 35, // Example: degree Celsius
  HUMIDITY: 80,    // Percentage
  SENSOR_VALUE: 100
}

// ================= Email Subjects =================
export const EMAIL_SUBJECTS = {
  WELCOME: "Welcome to PlantDoctor",
  PASSWORD_RESET: "Reset Your PlantDoctor Password",
  TELEMETRY_ALERT: "PlantDoctor Alert: Telemetry Threshold Exceeded",
  INFERENCE_NOTIFICATION: "PlantDoctor: New AI Inference Available"
}

// ================= Email Templates =================
export const EMAIL_TEMPLATES = {
  WELCOME: (firstName) => `<p>Hello ${firstName}, welcome to PlantDoctor!</p>`,

  PASSWORD_RESET: (resetLink) => `
    <p>You requested a password reset. Click the link below to reset your password:</p>
    <a href="${resetLink}">Reset Password</a>
  `,

  TELEMETRY_ALERT: (alertCount, threshold) => `
    <p>Alert! ${alertCount} telemetry entries exceed the threshold of ${threshold}.</p>
  `,

  INFERENCE_NOTIFICATION: (device, result, confidence) => `
    <p>New inference for device <strong>${device}</strong>:</p>
    <p>Result: ${result}</p>
    <p>Confidence: ${(confidence * 100).toFixed(2)}%</p>
  `
}

// ================= App Info =================
export const APP = {
  NAME: "PlantDoctor",
  SUPPORT_EMAIL: "support@plantdoctor.com",
  BASE_URL: process.env.BASE_URL || "http://localhost:5000"
}