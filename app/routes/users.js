const express = require('express')
const validate = require('express-validator')

const UserController = require('../controllers/UserController')

const user = express.Router()

user.get('/users', UserController.index)
user.get('/users/:id', UserController.show)
user.post('/users', validate('create-user'), UserController.store)
user.delete('/users/:id', UserController.destroy)
