import passport from "passport"

import jwtStrategy from "./jwt.strategy.mjs"
import localStrategy from "./local.strategy.mjs"
import refreshStrategy from "./refresh.strategy.mjs"

/*
## Register Passport Strategies
*/

passport.use("jwt", jwtStrategy)
passport.use("local", localStrategy)
passport.use("refresh", refreshStrategy)

export default passport
