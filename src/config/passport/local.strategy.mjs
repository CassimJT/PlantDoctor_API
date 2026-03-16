import { Strategy as LocalStrategy } from "passport-local"
import User from "../../models/User.mjs"
import { comparePassword } from "../../utils/helpers.mjs"

/*

## Local Strategy (Email + Password)

*/

const localStrategy = new LocalStrategy(
{
usernameField: "emailAddress",
passwordField: "password",
session: false
},
async (emailAddress, password, done) => {
try {
const user = await User.findOne({ emailAddress })


  if (!user) {
    return done(null, false, { message: "Invalid email or password" })
  }

  const isMatch = await comparePassword(password, user.password)

  if (!isMatch) {
    return done(null, false, { message: "Invalid email or password" })
  }

  return done(null, user)
} catch (error) {
  return done(error)
}


}
)

export default localStrategy
