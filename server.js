exports.start = function() {
  const app = require('./app')

  // create http Server
  const server = require('http').createServer(app)

  // start the websocket
  const io = require('socket.io')(server)

  io.on('connection', socket => {
    console.log('new socket connection')

    socket.on('disconnect', function() {
      console.log('user disconnected')
    })

    socket.on('CREATE_NEW_CHAT', data => {
      console.log('new chat request', data)
      socket.emit('NEW_CHAT', { hello: 'world' })
    })
  })

  io.listen(process.env.SOCKET_PORT || 3334)
  server.listen(process.env.PORT || 3333)

  console.log(`Express running on → PORT ${server.address().port}`)
  return io
}
