const passport = require('passport')
const mongoose = require('mongoose')
const User = mongoose.model('User')
const jwt = require('jsonwebtoken')

exports.signIn = async (req, res, next) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (!user) {
    next({
      status: 401,
      message: 'No such user exist'
    })

    return
  }

  user.comparePassword(password, function(err, match) {
    if (err) {
      next({ status: 400, message: 'invalid email or password' })
      return
    }

    const payload = { name: user.name, email: user.email, id: user._id }

    res.json({
      message: 'ok',
      token: jwt.sign(payload, process.env.SECRET),
      user: { name: user.name, id: user._id }
    })
  })
}

function runUserSignInValidations(req) {
  req
    .checkBody('email', 'You must provide an email address')
    .notEmpty()
    .isEmail()

  req.sanitizeBody('email').normalizeEmail({
    remove_dots: false,
    remove_extension: false,
    gmail_remove_subaddress: false
  })

  req.checkBody('password', 'Password can not be blank').notEmpty()

  return req.validationErrors()
}

exports.validateSingIn = (req, res, next) => {
  errors = runUserSignInValidations(req)
  if (errors) errors.status = 400
  errors ? next(errors) : next()
}
