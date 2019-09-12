const express = require("express")
const UserController = require("./../controllers/UserController")
const TeacherController = require("./../controllers/TeacherController")
const InstrumentController = require("./../controllers/InstrumentController")
const AvaliabilityController = require("./../controllers/AvaliabilityController")
const validate = require('../helpers/validate')

const routes = express.Router()

/* Rotas de usuários */

routes.get('/users', UserController.index)
routes.get('/users/:id', UserController.show)
routes.post('/users', validate('create-user'), UserController.store)
routes.post('/users/login', validate('login'), UserController.login)
routes.put('/users/:id', UserController.update)
routes.put('/users/:id/instruments', UserController.updateInstruments)
routes.delete('/users/:id', UserController.destroy)

/* Rotas de professores */

routes.get('/teachers', TeacherController.index);
routes.get('/teachers/:id', TeacherController.show);

/* Rotas de instrumentos */

routes.get('/instruments', InstrumentController.index);
routes.get('/instruments/:id', InstrumentController.show);

/* Rotas de disponibilidades */

routes.get('/avaliabilities', AvaliabilityController.index);
routes.get('/avaliabilities/:id', AvaliabilityController.show);
routes.post('/avaliabilities/', validate('avaliability'), AvaliabilityController.store);
routes.post('/avaliabilities/available', AvaliabilityController.available);
routes.put('/avaliabilities/:id', AvaliabilityController.update);
routes.delete('/avaliabilities/:id', AvaliabilityController.destroy);

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