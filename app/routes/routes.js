const express = require("express");
const UserController = require("./../controllers/UserController");
const TeacherController = require("./../controllers/TeacherController");
const InstrumentController = require("./../controllers/InstrumentController");
const AvaliabilityController = require("./../controllers/AvaliabilityController");
const ScheduleController = require("../controllers/ScheduleController");
const ReviewController = require("../controllers/ReviewController");
const PaymentController = require("../controllers/PaymentController");
const CertifiedController = require("../controllers/CertifiedController");
const DatabankController = require("../controllers/DatabankController");
const validate = require("../helpers/validate");
const verifyJWT = require("../middlewares/verifyJWT");

const routes = express.Router();

//routes.use(verifyJWT);

/* Rotas de usuários */

routes.get("/users", UserController.index);
routes.get("/users/:id", UserController.show);
routes.post("/users", [validate("create-user")], UserController.store);
routes.post("/users/login", [validate("login")], UserController.login);
routes.put("/users", UserController.update);
routes.put("/users/instruments", UserController.updateInstruments);
routes.delete("/users/:id", UserController.destroy);

/* Rotas de professores */

routes.get("/teachers", TeacherController.index);
routes.get("/teachers/:id", TeacherController.show);
routes.post("/teachers", [validate("teacher")], TeacherController.store);

/* Rotas de instrumentos */

routes.get("/instruments", InstrumentController.index);
routes.get("/instruments/:id", InstrumentController.show);
routes.get("/instruments/:id/teachers", InstrumentController.getTeacher);

/* Rotas de disponibilidades */

routes.get("/avaliabilities/:teacherId", AvaliabilityController.index);
routes.get("/avaliabilities/:id", AvaliabilityController.show);
routes.post("/avaliabilities", validate("avaliability"), AvaliabilityController.store);
routes.post("/avaliabilities/available", AvaliabilityController.available);
routes.put("/avaliabilities/:id", AvaliabilityController.update);
routes.delete("/avaliabilities/:id", AvaliabilityController.destroy);

/* Rotas de agendamento */

routes.get("/schedules", ScheduleController.index);
routes.get("/schedules/:id", ScheduleController.show);
routes.post("/schedules", validate("schedule"), ScheduleController.store);
routes.put("/schedules/:id", ScheduleController.update);
routes.delete("/schedules/:id", ScheduleController.destroy);

/* Rotas de avaliações */

routes.get("/reviews", ReviewController.index);
routes.get("/reviews/:id", ReviewController.show);
routes.get("/reviews/:id/teachers", ReviewController.getTeacher);
routes.post("/reviews", validate("review"), ReviewController.store);
routes.put("/reviews/:id", ReviewController.update);
routes.delete("/reviews/:id", ReviewController.destroy);

/* Rotas de pagamento */

routes.get("/payments", PaymentController.index);
routes.get("/payments/:id", PaymentController.show);
routes.post("/payments", validate("payment"), PaymentController.store);

/* Rotas de certificados */

routes.get("/certifieds", CertifiedController.index);
routes.get("/certifieds/:id", CertifiedController.show);
routes.get("/certifieds/:id/teachers", CertifiedController.getTeacher);
routes.post("/certifieds", validate("certified"), CertifiedController.store);
routes.put("/certifieds/:id", CertifiedController.update);
routes.delete("/certifieds/:id", CertifiedController.destroy);

/* Rotas de dados bancários */

routes.get("/databanks", DatabankController.index);
routes.get("/databanks/:id", DatabankController.show);
routes.get("/databanks/:id/teachers", DatabankController.getTeacher);
routes.post("/databanks", validate("databank"), DatabankController.store);
routes.put("/databanks/:id", DatabankController.update);
routes.delete("/databanks/:id", DatabankController.destroy);

module.exports = routes;
