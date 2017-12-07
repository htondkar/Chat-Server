const jsonWebToken = require('jsonwebtoken')

const socketHandler = require('./socketHandlers/index')

exports.start = function() {
  const app = require('./app')

  // create http Server
  const server = require('http').createServer(app)

  // start the websocket
  const io = require('socket.io')(server)

  io.on('connection', socket => {
    const { token } = socket.handshake.query
    console.log('new socket connection')

    if (token) {
      const { id } = jsonWebToken.decode(token)
      socket.join(id)
    }

    socket.on('disconnect', function() {
      console.log('user disconnected')
    })

    socketHandler.use(socket, io)
  })

  io.listen(process.env.SOCKET_PORT || 3334)
  server.listen(process.env.PORT || 3333)

  console.log(`Express running on → PORT ${server.address().port}`)
  return io
}
