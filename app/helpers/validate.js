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
                check("userId")
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
                check("paidAt")
                    .exists()
                    .isISO8601(),
                check("scheduleId")
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

/*class Validate{
    constructor(method){
        this.method = method;
    }

    static validInput(){
        switch(this.method){
            case 'create-user': {
                return [
                    check('name').exists().not().isEmpty(),
                    check('email').exists().isEmail(),
                    check('password').exists().not().isEmpty()
                ]
            }
        }
    }
}

module.exports = Validate*/
