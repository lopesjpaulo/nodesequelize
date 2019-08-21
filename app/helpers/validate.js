const { check } = require('express-validator')

module.exports = (method) => {
    switch(method){
        case 'create-user': {
            return [
                check('name').exists().not().isEmpty(),
                check('email').exists().isEmail(),
                check('password').exists().not().isEmpty()
            ]
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