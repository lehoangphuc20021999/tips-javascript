const express = require('express')
const route = express.Router()

const { verifyAccessToken } = require('../helpers/jwt_service')
const UserController = require('../Controllers/User.controller')

route.post('/register', UserController.register)

route.post('/refresh-token', UserController.refreshToken)

route.post('/login', UserController.login)

route.delete('/logout', UserController.logout)

// Login check successfully!
route.get('/getlists', verifyAccessToken, UserController.getlists)

module.exports = route