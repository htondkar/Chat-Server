const mongoose = require('mongoose')
const Chat = mongoose.model('Chat')

exports.getUsersChats = async (req, res, next) => {
  const user = req.user
  if (user) {
    const chats = await Chat.find({
      $or: [{ sender: user._id }, { receiver: user._id }]
    })

    if (chats) {
      res.json({ data: { chats }, status: 200 })
    } else {
      res.json({
        data: {
          chats: []
        },
        status: 200
      })
    }
  } else {
    next(new Error({ status: 400, message: 'User is not found' }))
  }
}
