import passport from "passport"

/*
## JWT Authentication Middleware
*/

const authMiddleware = (req, res, next) => {
passport.authenticate("jwt", { session: false }, (err, user, info) => {
if (err) {
return next(err)
}

if (!user) {
  return res.status(401).json({
    success: false,
    message: "Unauthorized"
  })
}

req.user = user
next()

})(req, res, next)
}

export default authMiddleware
