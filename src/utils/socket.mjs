// src/utils/socket.mjs
export const initializeSocket = (io) => {
  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id)

    socket.on("telemetry:new", (data) => {
      io.emit("telemetry:update", data)
    })

    socket.on("inference:new", (data) => {
      io.emit("inference:update", data)
    })

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id)
    })
  })
}