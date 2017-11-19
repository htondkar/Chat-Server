const router = require('express').Router()
const userController = require('../controllers/userController')
const authController = require('../controllers/authController')
const handleError = require('../handlers/errorHandlers').catch
const passport = require('passport')

router.get('/', (req, res) => {
  res.json({ apiVersion: 1 })
})

router.post(
  '/sign-up',
  userController.validate,
  handleError(userController.createUser)
)

router.post(
  '/sign-in',
  authController.validateSingIn,
  handleError(authController.signIn)
)

router.get(
  '/protected-route',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({ url: req.url, user: req.user })
  }
)

module.exports = router
