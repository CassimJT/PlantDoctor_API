import express from "express"
import http from "http"
import { Server as SocketIOServer } from "socket.io"
import dotenv from "dotenv"
import connectDB from "./config/db.mjs"
import passport from "./config/passport/index.mjs"
import { initializeSocket } from "./utils/socket.mjs"


// Import routes
import authRoutes from "./routes/auth.routes.mjs"
import userRoutes from "./routes/user.routes.mjs"
import deviceRoutes from "./routes/device.routes.mjs"
import telemetryRoutes from "./routes/telemetry.routes.mjs"
import inferenceRoutes from "./routes/inference.routes.mjs"
import adminRoutes from "./routes/admin.routes.mjs"
import dashboardRoutes from "./routes/dashboard.routes.mjs"


dotenv.config()
connectDB()

const app = express()
const server = http.createServer(app)
const io = new SocketIOServer(server, {
  cors: { origin: "*" } 
})

// Middleware
app.use(express.json())
app.use(passport.initialize())
app.use(passport.session())

// Mount routes
app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/devices", deviceRoutes)
app.use("/api/telemetry", telemetryRoutes)
app.use("/api/inference", inferenceRoutes)
app.use("/api/admin", adminRoutes)
app.use("/api/dashboard", dashboardRoutes)

// Socket.IO connection
io.on("connection", (socket) => {
  console.log("New client connected", socket.id)

  socket.on("disconnect", () => {
    console.log("Client disconnected", socket.id)
  })
})

// Initialize all Socket.IO event listeners
initializeSocket(io)
// Make io accessible in controllers
app.set("io", io)

const PORT = process.env.PORT || 5000
server.listen(PORT, () => console.log(`Server running on port ${PORT}`))