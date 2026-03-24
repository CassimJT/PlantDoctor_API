import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt"
import dotenv from "dotenv"
import User from "../../models/User.mjs"

//dotenv.config()

const options = {
jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
secretOrKey: process.env.JWT_ACCESS_SECRET
}

const jwtStrategy = new JwtStrategy(options, async (payload, done) => {
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

export default jwtStrategy
