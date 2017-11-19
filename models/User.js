const mongoose = require('mongoose')
const validator = require('validator')
var bcrypt = require('bcrypt-nodejs')
const beautifyUnique = require('mongoose-beautiful-unique-validation')

const UserSchema = new mongoose.Schema({
  name: {
    required: 'Name is required',
    type: String
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, 'Email is invalid'],
    required: 'Please enter an email',
    chats: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chat'
      }
    ]
  },
  password: {
    type: String,
    required: 'Password is required'
  }
})

UserSchema.pre('save', function(next) {
  const user = this
  const shouldCare = this.isModified('password') || this.isNew
  shouldCare ? hashPassword(user, next) : next()
})

UserSchema.methods.comparePassword = function(password, cb) {
  bcrypt.compare(password, this.password, function(err, isMatch) {
    if (err) return cb(err)

    cb(null, isMatch)
  })
}

const hashPassword = (user, next) => {
  bcrypt.genSalt(10, function(err, salt) {
    if (err) return next(err)

    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) return next(err)

      user.password = hash

      next()
    })
  })
}

UserSchema.plugin(beautifyUnique)

module.exports = mongoose.model('User', UserSchema)
