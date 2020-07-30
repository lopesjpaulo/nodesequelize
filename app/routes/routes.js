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
const ContactController = require("../controllers/ContactController");
const HelperController = require("../controllers/HelperController");
const validate = require("../helpers/validate");
const verifyJWT = require("../middlewares/verifyJWT");

const routes = express.Router();

//Verificação de autenticação não pode ser em todas as rotas
//routes.use(verifyJWT);

routes.get("/ping", (req, res) => {
    return res.status(200).json({ message: 'Success' });
});

/* Rotas de usuários */

routes.get("/users", verifyJWT, UserController.index);
routes.get("/users/:id", verifyJWT, UserController.show);
routes.post("/users", validate("create-user"), UserController.store);
routes.post("/users/login", validate("login"), UserController.login);
routes.post("/users/googlelogin", UserController.googleLogin);
routes.post("/users/logout", UserController.logout);
routes.post("/users/createRecovery", UserController.createRecovery);
routes.post("/users/checkRecovery", UserController.checkRecovery);
routes.put("/users", verifyJWT, UserController.update);
routes.put("/users/:userId", UserController.update);
routes.put("/users/instruments", verifyJWT, UserController.updateInstruments);
routes.delete("/users/:id", verifyJWT, UserController.destroy);

/* Rotas de professores */

routes.get("/teachers", verifyJWT, TeacherController.index);
routes.get("/teachers/:id", verifyJWT, TeacherController.show);
routes.post("/teachers", [verifyJWT, validate("teacher")], TeacherController.store);
routes.put("/teachers/:id", verifyJWT, TeacherController.update);
routes.delete("/teachers/:id", verifyJWT, TeacherController.destroy);
routes.put("/teachers", verifyJWT, TeacherController.updateLogged);
routes.put("/teachers/instruments", verifyJWT, TeacherController.updateInstruments);
routes.get("/teachers/classes/:id", verifyJWT, TeacherController.countClasses);

/* Rotas de Categorias */

routes.get("/categories", verifyJWT, CategoryController.index);
routes.get("/categories/:id", verifyJWT, CategoryController.show);
routes.post("/categories", verifyJWT, CategoryController.store);
routes.put("/categories/:id", verifyJWT, CategoryController.update);
routes.delete("/categories/:id", verifyJWT, CategoryController.destroy);

/* Rotas de instrumentos */

routes.get("/instruments", verifyJWT, InstrumentController.index);
routes.get("/instruments/:id", verifyJWT, InstrumentController.show);
routes.get("/instruments/:id/teachers", verifyJWT, InstrumentController.getTeacher);

/* Rotas de disponibilidades */

routes.get("/avaliabilities/", verifyJWT,AvaliabilityController.index);
routes.get("/avaliabilities/:id", verifyJWT,AvaliabilityController.show);
routes.post("/avaliabilities/update", verifyJWT,AvaliabilityController.updateMany);
routes.post("/avaliabilities/set", verifyJWT,AvaliabilityController.setMany);
routes.get("/avaliabilities/:teacherId/teachers", verifyJWT,AvaliabilityController.getTeacher);
routes.post("/avaliabilities", [verifyJWT, validate("avaliability")], AvaliabilityController.store);
routes.post("/avaliabilities/available", verifyJWT, AvaliabilityController.available);
routes.put("/avaliabilities/:id", verifyJWT, AvaliabilityController.update);
routes.delete("/avaliabilities/:id", verifyJWT, AvaliabilityController.destroy);

/* Rotas de agendamento */

routes.get("/schedules", verifyJWT, ScheduleController.index);
routes.get("/schedules/:id", verifyJWT, ScheduleController.show);
routes.get("/schedules/:id/users", verifyJWT, ScheduleController.getUser);
routes.get("/schedules/:id/teachers", verifyJWT, ScheduleController.getTeacher);
routes.post("/schedules", [verifyJWT, validate("schedule")], ScheduleController.store);
routes.put("/schedules/:id", verifyJWT, ScheduleController.update);
routes.put("/schedules/cancel/:id", verifyJWT, ScheduleController.cancel);
routes.get("/schedules/check/:id", verifyJWT, ScheduleController.check);
routes.get("/schedules/checktime/:id", verifyJWT, ScheduleController.checkClassTime);
routes.put("/schedules/finish/:id", verifyJWT, ScheduleController.finish);
routes.delete("/schedules/:id", verifyJWT, ScheduleController.destroy);

/* Rotas de avaliações */

routes.get("/reviews", verifyJWT, ReviewController.index);
routes.get("/reviews/:id", verifyJWT, ReviewController.show);
routes.get("/reviews/:id/teachers", verifyJWT, ReviewController.getTeacher);
routes.post("/reviews", [verifyJWT, validate("review")], ReviewController.store);
routes.put("/reviews/:id", verifyJWT, ReviewController.update);
routes.delete("/reviews/:id", verifyJWT, ReviewController.destroy);

/* Rotas de pagamento */

routes.get("/payments", verifyJWT, PaymentController.index);
routes.get("/payments/listCards", [verifyJWT], PaymentController.listCards);
routes.delete("/payments/deleteCard/:id", verifyJWT, PaymentController.destroyCard);
routes.get("/payments/:id", verifyJWT, PaymentController.show);
routes.post("/payments", [verifyJWT, validate("payment")], PaymentController.store);
routes.post("/payments/saveCard", [verifyJWT, validate("saveCard")], PaymentController.saveCard);
routes.post("/payments/saveAccount", [verifyJWT, validate("saveAccount")], PaymentController.saveAccount);
routes.post("/payments/saveReceiver", [verifyJWT, validate("saveReceiver")], PaymentController.saveReceiver);
routes.post("/payments/saveCustomer", [verifyJWT, validate("saveCustomer")], PaymentController.saveCustomer);
//routes.post("/payments/testStore", verifyJWT, PaymentController.testStore);

/* Rotas de certificados */

routes.get("/certifieds", verifyJWT, CertifiedController.index);
routes.get("/certifieds/:id", verifyJWT, CertifiedController.show);
routes.get("/certifieds/:id/teachers", verifyJWT, CertifiedController.getTeacher);
routes.post("/certifieds", [verifyJWT], CertifiedController.store);
routes.put("/certifieds/:id", verifyJWT, CertifiedController.update);
routes.delete("/certifieds/:id", verifyJWT, CertifiedController.destroy);

/* Rotas de documentos*/

routes.get("/documents", verifyJWT, DocumentController.index);
routes.get("/documents/:id", verifyJWT, DocumentController.show);
routes.get("/documents/:id/users", verifyJWT, DocumentController.getUser);
routes.post("/documents", [verifyJWT], DocumentController.store);
routes.put("/documents/:id", verifyJWT, DocumentController.update);
routes.delete("/documents/:id", verifyJWT, DocumentController.destroy);

/* Rotas de dados bancários */

routes.get("/databanks", verifyJWT, DatabankController.index);
routes.get("/databanks/:id", verifyJWT, DatabankController.show);
routes.get("/databanks/:id/teachers", verifyJWT, DatabankController.getTeacher);
routes.post("/databanks", [verifyJWT, validate("databank")], DatabankController.store);
routes.put("/databanks/:id", verifyJWT, DatabankController.update);
routes.delete("/databanks/:id", verifyJWT, DatabankController.destroy);

/* Rotas de dados dos usuários*/

routes.get("/datausers", verifyJWT, DatauserController.index);
routes.get("/datausers/:id", verifyJWT, DatauserController.show);
routes.get("/datausers/:id/users", verifyJWT, DatauserController.getUser);
routes.post("/datausers", verifyJWT, DatauserController.store);
routes.put("/datausers", verifyJWT, DatauserController.update);
routes.delete("/datausers/:id", verifyJWT, DatauserController.destroy);

/* Rotas de contato*/

routes.get("/contacts", verifyJWT, ContactController.index);
routes.get("/contacts/:id", verifyJWT, ContactController.show);
routes.get("/contacts/:id/users", verifyJWT, ContactController.getUser);
routes.get("/contacts/:id/schedules", verifyJWT, ContactController.getSchedule);
routes.post("/contacts", verifyJWT, ContactController.store);
routes.put("/contacts", verifyJWT, ContactController.update);
routes.delete("/contacts/:id", verifyJWT, ContactController.destroy);

/* Rotas do S3 */

routes.post("/url", HelperController.url);

/* Validação */

routes.post("/validEmail", HelperController.validEmail);
routes.post("/validCpf", HelperController.validCPF);


module.exports = routes;
