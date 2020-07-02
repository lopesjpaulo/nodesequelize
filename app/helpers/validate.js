const { check } = require("express-validator");

module.exports = method => {
    switch (method) {
        case "create-user": {
            return [
                check("name")
                    .exists()
                    .not()
                    .isEmpty(),
                check("lastname")
                    .exists()
                    .not()
                    .isEmpty(),
                check("email")
                    .exists()
                    .isEmail(),
                check("password")
                    .exists()
                    .not()
                    .isEmpty()
            ];
        }
        case "teacher": {
            return [
                check("name")
                    .exists()
                    .not()
                    .isEmpty(),
                check("cpf")
                    .exists()
                    .not()
                    .isEmpty(),
                check("email")
                    .exists()
                    .isEmail(),
                check("phone")
                    .not()
                    .isEmpty(),
                check("cep")
                    .exists()
                    .not()
                    .isEmpty(),
                check("type")
                    .exists()
                    .not()
                    .isEmpty(),
                check("valueOne")
                    .exists()
                    .not()
                    .isEmpty(),
            ];
        }
        case "login": {
            return [
                check("email")
                    .exists()
                    .isEmail(),
                check("password")
                    .exists()
                    .not()
                    .isEmpty()
            ];
        }
        case "avaliability": {
            return [
                check("date")
                    .exists()
                    .isISO8601(),
                check("teacherId")
                    .exists()
                    .not()
                    .isEmpty()
            ];
        }
        case "schedule": {
            return [
                check("avaliabilityId")
                    .exists()
                    .not()
                    .isEmpty(),
                check("instrumentId")
                    .exists()
                    .not()
                    .isEmpty()
            ];
        }
        case "review": {
            return [
                check("scheduleId")
                    .exists()
                    .not()
                    .isEmpty(),
                check("rating")
                    .exists()
                    .not()
                    .isEmpty(),
                check("comment")
                    .exists()
                    .not()
                    .isEmpty()
            ];
        }
        case "payment": {
            return [
                check("scheduleId")
                    .exists()
                    .not()
                    .isEmpty(),
                check("card_id")
                    .exists()
                    .not()
                    .isEmpty(),
            ];
        }
        case "saveCard": {
            return [
                check("card_id")
                    .exists()
                    .not()
                    .isEmpty(),
                check("digits")
                    .exists()
                    .not()
                    .isEmpty(),
                check("expiration")
                    .exists()
                    .not()
                    .isEmpty(),
                check("brand")
                    .exists()
                    .not()
                    .isEmpty(),
            ];
        }
        case "saveAccount": {
            return [
                check("bank")
                    .exists()
                    .not()
                    .isEmpty(),
                check("agency")
                    .exists()
                    .not()
                    .isEmpty(),
                check("account")
                    .exists()
                    .not()
                    .isEmpty(),
                check("legal_name")
                    .exists()
                    .not()
                    .isEmpty(),
                check("cpf")
                    .exists()
                    .not()
                    .isEmpty()
            ];
        }
        case "saveReceiver": {
            return [
                check("bank_account_id")
                    .exists()
                    .not()
                    .isEmpty()
            ];
        }
        case "saveCustomer": {
            return [
                check("id")
                    .exists()
                    .not()
                    .isEmpty(),
                check("name")
                    .exists()
                    .not()
                    .isEmpty(),
                check("email")
                    .exists()
                    .not()
                    .isEmpty(),
                check("cpf")
                    .exists()
                    .not()
                    .isEmpty(),
                check("phone")
                    .exists()
                    .not()
                    .isEmpty(),
                check("birthday")
                    .exists()
                    .not()
                    .isEmpty()
            ];
        }
        case "certified": {
            return [
                check("title")
                    .exists()
                    .not()
                    .isEmpty(),
                check("path")
                    .exists()
                    .not()
                    .isEmpty(),
                check("teacherId")
                    .exists()
                    .not()
                    .isEmpty()
            ];
        }
        case "document": {
            return [
                check("title")
                    .exists()
                    .not()
                    .isEmpty(),
                check("path")
                    .exists()
                    .not()
                    .isEmpty(),
                check("userId")
                    .exists()
                    .not()
                    .isEmpty()
            ];
        }
        case "databank": {
            return [
                check("bank")
                    .exists()
                    .not()
                    .isEmpty(),
                check("agency")
                    .exists()
                    .not()
                    .isEmpty(),
                check("account")
                    .exists()
                    .not()
                    .isEmpty(),
                check("digit")
                    .exists()
                    .not()
                    .isEmpty(),
                check("teacherId")
                    .exists()
                    .not()
                    .isEmpty()
            ];
        }
    }
};