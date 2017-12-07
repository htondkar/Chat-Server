const chatController = require('../controllers/chatController')

exports.use = (socket, io) => {
  socket.on('CREATE_NEW_CHAT', data => {
    chatController.handleSocket(socket, io, {
      actionType: 'CREATE_NEW_CHAT',
      data
    })
  })

  socket.on('SEND_MESSAGE', data => {
    chatController.handleSocket(socket, io, {
      actionType: 'SEND_MESSAGE',
      data
    })
  })
}
