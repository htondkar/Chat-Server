const mongoose = require('mongoose')
const User = mongoose.model('User')

exports.createUser = async (req, res) => {
  try {
    const newUser = await new User(req.body).save()
    res.json({
      data: {
        user: {
          name: newUser.name,
          email: newUser.email,
          id: newUser._id
        }
      }
    })
  } catch (error) {
    error.status = 400
    throw error
  }
}

exports.getAllUsers = async (req, res) => {
  const users = await User.find(null, { password: 0, __v: 0 })
  if (users) {
    res.json({
      data: {
        users
      },
      status: 200
    })
  } else {
    res.json({
      data: {
        users: []
      },
      status: 200
    })
  }
}

exports.validate = (req, res, next) => {
  errors = runUserValidations(req)
  if (errors) errors.status = 400
  errors ? next(errors) : next()
}

function runUserValidations(req) {
  req.checkBody('name', 'You must provide a name').notEmpty()
  req.sanitizeBody('name')
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
  req
    .checkBody('passwordConfirmation', 'Confirm password can not be blank')
    .notEmpty()
  req
    .checkBody('passwordConfirmation', 'Passwords should match')
    .equals(req.body.password)

  return req.validationErrors()
}
