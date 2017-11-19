const mongoose = require('mongoose')
const User = mongoose.model('User')

exports.jwt = passport => {
  const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt

  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
    secretOrKey: process.env.SECRET
  }

  const strategy = new JwtStrategy(opts, function(jwt_payload, done) {
    console.log('payload received', jwt_payload)
    User.findOne({ _id: jwt_payload.id })
      .select('-password')
      .exec()
      .then(user => {
        return user ? done(null, user) : done(null, false)
      })
      .catch(err => {
        return done(err, false)
      })
  })

  passport.use(strategy)
}
