const express = require("express")
const UserController = require("./../controllers/UserController")
const TeacherController = require("./../controllers/TeacherController")
const InstrumentController = require("./../controllers/InstrumentController")
const AvaliabilityController = require("./../controllers/AvaliabilityController")
const ScheduleController = require("../controllers/ScheduleController")
const ReviewController = require("../controllers/ReviewController")
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
routes.get('/instruments/:id/teachers', InstrumentController.getTeacher);

/* Rotas de disponibilidades */

routes.get('/avaliabilities', AvaliabilityController.index);
routes.get('/avaliabilities/:id', AvaliabilityController.show);
routes.post('/avaliabilities/', validate('avaliability'), AvaliabilityController.store);
routes.post('/avaliabilities/available', AvaliabilityController.available);
routes.put('/avaliabilities/:id', AvaliabilityController.update);
routes.delete('/avaliabilities/:id', AvaliabilityController.destroy);

/* Rotas de agendamento */

routes.get('/schedules', ScheduleController.index);
routes.get('/schedules/:id', ScheduleController.show);
routes.post('/schedules', validate('schedule'), ScheduleController.store);
routes.put('/schedules/:id', ScheduleController.update);
routes.delete('/schedules/:id', ScheduleController.destroy);

/* Rotas de avaliações */

routes.get('/reviews', ReviewController.index);
routes.get('/reviews/:id', ReviewController.show);
routes.get('/reviews/:id/getTeacher', ReviewController.getTeacher);
routes.post('/reviews', validate('review'), ReviewController.store);
routes.put('/reviews/:id', ReviewController.update);
routes.delete('/reviews/:id', ReviewController.destroy);

module.exports = routes