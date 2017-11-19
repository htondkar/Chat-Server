const mongoose = require('mongoose')

exports.connect = function() {
  mongoose.connect(process.env.DATABASE, {
    useMongoClient: true
  })

  // Tell Mongoose to use ES6 promises
  mongoose.Promise = global.Promise

  mongoose.connection.on('error', err => {
    console.error(`Error Connecting to the db ${err.message}`)
  })
}
