const fs = require('fs')

exports.inject = function() {
  const files = fs
    .readdirSync(__dirname, { encoding: 'utf8' })
    .filter(file => file !== 'injector.js')
    .map(fileName => `./${fileName}`)

  for (const file of files) {
    require(file)
  }
}
