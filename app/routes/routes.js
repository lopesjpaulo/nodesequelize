const express = require("express")
const UserController = require("./../controllers/UserController")

const routes = express.Router()

routes.get('/users', UserController.index)
routes.get('/users/:id', UserController.show)
routes.post('/users', UserController.validate('create'), UserController.store)
routes.delete('/users/:id', UserController.destroy)

module.exports = routes

/**
 * 
 * [
    check('name').not().isEmpty().withMessage('Insira um nome válido'),
    check('email').not().isEmpty().isEmail().withMessage('Insira um email válido'),
    check('password').not().isLength({ min: 5 }).withMessage('Insir')
    ]
 * 
 */