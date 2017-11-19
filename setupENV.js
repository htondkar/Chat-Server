const envConfig = require('dotenv')

exports.setup = () => envConfig.config({ path: 'env-vars.env' })
