const express = require("express");
const UserController = require("./../controllers/UserController");
const TeacherController = require("./../controllers/TeacherController");
const InstrumentController = require("./../controllers/InstrumentController");
const AvaliabilityController = require("./../controllers/AvaliabilityController");
const ScheduleController = require("../controllers/ScheduleController");
const ReviewController = require("../controllers/ReviewController");
const PaymentController = require("../controllers/PaymentController");
const validate = require("../helpers/validate");
const jwt = require('jsonwebtoken');

function verifyJWT(req, res, next){
    let token = req.headers['authorization'];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

    jwt.verify(token, process.env.SECRET, function(err, decoded) {
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

        req.userId = decoded.id;
        next();
    });
}

const routes = express.Router();

/* Rotas de usuários */

routes.get("/users", verifyJWT, UserController.index);
routes.get("/users/:id", verifyJWT, UserController.show);
routes.post("/users", [validate("create-user")], UserController.store);
routes.post("/users/login", [validate("login")], UserController.login);
routes.put("/users", verifyJWT, UserController.update);
routes.put("/users/instruments", verifyJWT, UserController.updateInstruments);
routes.delete("/users/:id", verifyJWT, UserController.destroy);

/* Rotas de professores */

routes.get("/teachers", verifyJWT, TeacherController.index);
routes.get("/teachers/:id", verifyJWT, TeacherController.show);

/* Rotas de instrumentos */

routes.get("/instruments", verifyJWT, InstrumentController.index);
routes.get("/instruments/:id", verifyJWT, InstrumentController.show);
routes.get("/instruments/:id/teachers", verifyJWT, InstrumentController.getTeacher);

/* Rotas de disponibilidades */

routes.get("/avaliabilities/:teacherId", verifyJWT, AvaliabilityController.index);
routes.get("/avaliabilities/:id", verifyJWT, AvaliabilityController.show);
routes.post(
    "/avaliabilities",
    validate("avaliability"),
    AvaliabilityController.store
);
routes.post("/avaliabilities/available", verifyJWT, AvaliabilityController.available);
routes.put("/avaliabilities/:id", verifyJWT, AvaliabilityController.update);
routes.delete("/avaliabilities/:id", verifyJWT, AvaliabilityController.destroy);

/* Rotas de agendamento */

routes.get("/schedules", verifyJWT, ScheduleController.index);
routes.get("/schedules/:id", verifyJWT, ScheduleController.show);
routes.post("/schedules", [verifyJWT, validate("schedule")], ScheduleController.store);
routes.put("/schedules/:id", verifyJWT, ScheduleController.update);
routes.delete("/schedules/:id", verifyJWT, ScheduleController.destroy);

/* Rotas de avaliações */

routes.get("/reviews", verifyJWT, ReviewController.index);
routes.get("/reviews/:id", verifyJWT, ReviewController.show);
routes.get("/reviews/:id/getTeacher", verifyJWT, ReviewController.getTeacher);
routes.post("/reviews", [verifyJWT, validate("review")], ReviewController.store);
routes.put("/reviews/:id", verifyJWT, ReviewController.update);
routes.delete("/reviews/:id", verifyJWT, ReviewController.destroy);

routes.get("/payments", verifyJWT, PaymentController.index);
routes.get("/payments/:id", verifyJWT, PaymentController.show);
routes.post("/payments", [verifyJWT, validate("payment")], PaymentController.store);

module.exports = routes;
