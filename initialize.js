// set ENV
require('./setupENV').setup()

// connect to the DB
require('./connectToDB').connect()

// require models to make them available
require('./models/injector').inject()

// start express app
require('./server').start();
