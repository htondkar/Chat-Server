const router = require('express').Router()
const userController = require('../controllers/userController')
const authController = require('../controllers/authController')
const chatController = require('../controllers/chatController')
const handleError = require('../handlers/errorHandlers').catch
const passport = require('passport')

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
  '/users/list',
  passport.authenticate('jwt', { session: false }),
  handleError(userController.getAllUsers)
)

router.get(
  '/chats/list',
  passport.authenticate('jwt', { session: false }),
  handleError(chatController.getUsersChats)
)

// create new chat session

module.exports = router
