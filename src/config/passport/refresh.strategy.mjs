import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt"
import dotenv from "dotenv"
import User from "../../models/User.mjs"

dotenv.config()

const options = {
  jwtFromRequest: ExtractJwt.fromBodyField("refreshToken"),
  secretOrKey: process.env.JWT_REFRESH_SECRET
}

const refreshStrategy = new JwtStrategy(options, async (payload, done) => {
try {
const user = await User.findById(payload.id).select("-password")

if (!user) {
  return done(null, false)
}

return done(null, user)


} catch (error) {
return done(error, false)
}
})

export default refreshStrategy
