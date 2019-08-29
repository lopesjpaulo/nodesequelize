const express = require("express")
const UserController = require("./../controllers/UserController")
const TeacherController = require("./../controllers/TeacherController")
const InstrumentController = require("./../controllers/InstrumentController")
const validate = require('../helpers/validate')

const routes = express.Router()

routes.get('/users', UserController.index)
routes.get('/users/:id', UserController.show)
routes.post('/users', validate('create-user'), UserController.store)
routes.delete('/users/:id', UserController.destroy)

routes.get('/teachers', TeacherController.index);
routes.get('/teachers/:id', TeacherController.show);

routes.get('/instruments', InstrumentController.index);
routes.get('/instruments/:id', InstrumentController.show);

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