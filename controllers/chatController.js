const mongoose = require('mongoose')
const Chat = mongoose.model('Chat')
const jwt = require('jsonwebtoken')

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

actions = (socket, io) => ({
  CREATE_NEW_CHAT: async data => {
    const { id: senderId } = jwt.decode(data.token)

    const existingChat = await Chat.findOne({
      sender: senderId,
      receiver: data.with
    })

    if (existingChat) {
      socket.emit('NEW_CHAT', existingChat)
    } else {
      const newChat = await new Chat({
        sender: senderId,
        receiver: data.with,
        messages: [],
        date: Date.now()
      }).save()

      socket.emit('NEW_CHAT', newChat)
    }
  },
  SEND_MESSAGE: ({ token, to, message }) => {
    const user = jwt.decode(token),
      receiverId = to,
      senderId = user.id

    const payload = {
      message,
      senderId
    }

    io.sockets.in(receiverId).emit('RECEIVED_MESSAGE', payload)
  }
})

exports.handleSocket = (socket, io, { actionType, data }) => {
  actions(socket, io)[actionType](data)
}
