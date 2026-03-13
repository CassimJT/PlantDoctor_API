import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()


//Sign Access Token

export const signAccessToken = (payload) => {
return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_ACCESS_EXPIRATION
})
}

//Sign Refresh Token

export const signRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRATION
})
}

//Verify Token
export const verifyToken = (token, secret) => {
    return jwt.verify(token, secret)
}
