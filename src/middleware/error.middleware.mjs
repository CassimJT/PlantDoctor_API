/*
## Centralized Error Handler Middleware
*/

const errorMiddleware = (err, req, res, next) => {
console.error(err.stack)

const statusCode = err.status || 500
const message = err.message || "Internal Server Error"

res.status(statusCode).json({
success: false,
message,
...(process.env.NODE_ENV === "development" && { stack: err.stack })
})
}

export default errorMiddleware
