const express = require('express')
const router = express.Router()

// Add your routes here - above the module.exports line

require('./views/signin/v1/signin_validation')(router)
require('./views/signin/v1/code_validation')(router)

module.exports = router
