exports.start = function() {
  const app = require('./app')

  // start the websocket
  var server = require('http').createServer(app)
  var io = require('socket.io')(server)

  server.listen(process.env.PORT || 3333)
  console.log(`Express running on → PORT ${server.address().port}`)

  io.on('connection', () => console.log('started websocket connection'))
}
