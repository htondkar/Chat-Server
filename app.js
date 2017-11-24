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

// set the view engine
app.set('view engine', 'pug')

// Takes the raw requests and turns them into usable properties on req.body
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Exposes a bunch of methods for validating data.
// Used heavily on validateRegister
app.use(expressValidator())

// Passport JS is what we use to handle our logins
configPassport.jwt(passport)
app.use(passport.initialize())

app.use('/', routes)

app.use(errorHandlers.notFound)

// Otherwise this was a really bad error we didn't expect! Shoot eh
if (app.get('env') === 'development') {
  /* Development Error Handler - Prints stack trace */
  app.use(errorHandlers.developmentErrors)
}

// production error handler
app.use(errorHandlers.productionErrors)

module.exports = app
