const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')
const routes = require('./routes/routes')
const errorHandlers = require('./handlers/errorHandlers')
const passport = require('passport')
const configPassport = require('./handlers/passport')
const app = express()

// serves up static files from the public folder.
// Anything in public/ will just be served up as the file it is
app.use(express.static(path.join(__dirname, 'public')))

// Takes the raw requests and turns them into usable properties on req.body
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Exposes a bunch of methods for validating data.
// Used heavily on validateRegister
app.use(expressValidator())

// Passport JS is what we use to handle our logins
configPassport.jwt(passport)
app.use(passport.initialize())

// allow CORS
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  )
  next()
})

// do routing
app.use('/', routes)

// handle 404
app.use(errorHandlers.notFound)

// dev error handler
if (app.get('env') === 'development') {
  /* Development Error Handler - Prints stack trace */
  app.use(errorHandlers.developmentErrors)
}

// production error handler
app.use(errorHandlers.productionErrors)

module.exports = app
