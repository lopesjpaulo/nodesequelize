const { check } = require("express-validator");

module.exports = method => {
    switch (method) {
        case "create-user": {
            return [
                check("name")
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
