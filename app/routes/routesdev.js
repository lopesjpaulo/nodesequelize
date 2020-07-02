const express = require("express");
const UserController = require("./../controllers/UserController");
const TeacherController = require("./../controllers/TeacherController");
const InstrumentController = require("./../controllers/InstrumentController");
const CategoryController = require("./../controllers/CategoryController");
const AvaliabilityController = require("./../controllers/AvaliabilityController");
const ScheduleController = require("../controllers/ScheduleController");
const ReviewController = require("../controllers/ReviewController");
const PaymentController = require("../controllers/PaymentController");
const CertifiedController = require("../controllers/CertifiedController");
const DocumentController = require("../controllers/DocumentController");
const DatabankController = require("../controllers/DatabankController");
const DatauserController = require("../controllers/DatauserController");
const validate = require("../helpers/validate");

const routes = express.Router();

/* Rotas de usuários */

routes.get("/users", UserController.index);
routes.get("/users/:id", UserController.show);
routes.post("/users", validate("create-user"), UserController.store);
routes.post("/users/login", validate("login"), UserController.login);
routes.put("/users", UserController.update);
routes.put("/users/instruments", UserController.updateInstruments);
routes.delete("/users/:id", UserController.destroy);

/* Rotas de professores */

routes.get("/teachers", TeacherController.index);
routes.get("/teachers/:id", TeacherController.show);
routes.post("/teachers", [validate("teacher")], TeacherController.store);
routes.get("/teachers/classes/:id", TeacherController.countClasses);

/* Rotas de Categorias */

routes.get("/categories", CategoryController.index);
routes.get("/categories/:id", CategoryController.show);
routes.post("/categories", CategoryController.store);
routes.put("/categories/:id", CategoryController.update);
routes.delete("/categories/:id", CategoryController.destroy);

/* Rotas de instrumentos */

routes.get("/instruments", InstrumentController.index);
routes.get("/instruments/:id", InstrumentController.show);
routes.get("/instruments/:id/teachers", InstrumentController.getTeacher);

/* Rotas de disponibilidades */

routes.get("/avaliabilities/", AvaliabilityController.index);
routes.get("/avaliabilities/:teacherId/teachers", AvaliabilityController.getTeacher);
routes.get("/avaliabilities/:id", AvaliabilityController.show);
routes.get("/avaliabilities/date/:date", AvaliabilityController.getDate);
routes.post("/avaliabilities", [validate("avaliability")], AvaliabilityController.store);
routes.post("/avaliabilities/available", AvaliabilityController.available);
routes.put("/avaliabilities/:id", AvaliabilityController.update);
routes.delete("/avaliabilities/:id", AvaliabilityController.destroy);

/* Rotas de agendamento */

routes.get("/schedules", ScheduleController.index);
routes.get("/schedules/:id", ScheduleController.show);
routes.get("/schedules/:id/users", ScheduleController.getUser);
routes.post("/schedules", [validate("schedule")], ScheduleController.store);
routes.put("/schedules/:id", ScheduleController.update);
routes.put("/schedules/cancel/:id", ScheduleController.cancel);
routes.get("/schedules/check/:id", ScheduleController.check);
routes.get("/schedules/checktime/:id", ScheduleController.checkClassTime);
routes.put("/schedules/finish/:id", ScheduleController.finish);
routes.delete("/schedules/:id", ScheduleController.destroy);

/* Rotas de avaliações */

routes.get("/reviews", ReviewController.index);
routes.get("/reviews/:id", ReviewController.show);
routes.get("/reviews/:id/teachers", ReviewController.getTeacher);
routes.post("/reviews", [validate("review")], ReviewController.store);
routes.put("/reviews/:id", ReviewController.update);
routes.delete("/reviews/:id", ReviewController.destroy);

/* Rotas de pagamento */

routes.get("/payments", PaymentController.index);
routes.get("/payments/listCards", PaymentController.listCards);
routes.delete("/payments/deleteCard/:id", PaymentController.destroyCard);
routes.get("/payments/:id", PaymentController.show);
routes.post("/payments", [validate("payment")], PaymentController.store);
routes.post("/payments/saveCard", [validate("saveCard")], PaymentController.saveCard);
routes.post("/payments/saveAccount", [validate("saveAccount")], PaymentController.saveAccount);
routes.post("/payments/saveReceiver", [validate("saveReceiver")], PaymentController.saveReceiver);
routes.post("/payments/saveCustomer", [validate("saveCustomer")], PaymentController.saveCustomer);
//routes.post("/payments/testStore", PaymentController.testStore);

/* Rotas de certificados */

routes.get("/certifieds", CertifiedController.index);
routes.get("/certifieds/:id", CertifiedController.show);
routes.get("/certifieds/:id/teachers", CertifiedController.getTeacher);
routes.post("/certifieds", [validate("certified")], CertifiedController.store);
routes.put("/certifieds/:id", CertifiedController.update);
routes.delete("/certifieds/:id", CertifiedController.destroy);

/* Rotas de documentos*/

routes.get("/documents", DocumentController.index);
routes.get("/documents/:id", DocumentController.show);
routes.get("/documents/:id/users", DocumentController.getUser);
routes.post("/documents", [validate("document")], DocumentController.store);
routes.put("/documents/:id", DocumentController.update);
routes.delete("/documents/:id", DocumentController.destroy);

/* Rotas de dados bancários */

routes.get("/databanks", DatabankController.index);
routes.get("/databanks/:id", DatabankController.show);
routes.get("/databanks/:id/teachers", DatabankController.getTeacher);
routes.post("/databanks", [validate("databank")], DatabankController.store);
routes.put("/databanks/:id", DatabankController.update);
routes.delete("/databanks/:id", DatabankController.destroy);

/* Rotas de dados dos usuários*/

routes.get("/datausers", DatauserController.index);
routes.get("/datausers/:id", DatauserController.show);
routes.get("/datausers/:id/teachers", DatauserController.getUser);
routes.post("/datausers", DatauserController.store);
routes.put("/datausers", DatauserController.update);
routes.delete("/datausers/:id", DatauserController.destroy);

module.exports = routes;
