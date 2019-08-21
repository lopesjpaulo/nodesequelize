const models = require("./../models/index")
const { validationResult } = require('express-validator')

class UserController{
    static async index(req, res) {
        const users = await models.User.findAll();

        if(!users) return res.status(204).json();
        
        return res.json(users);
    }

    static async show(req, res) {
        if(!req.params.id) return res.status(400).json();

        const user = await models.User.findByPk(req.params.id);

        if(!user) return res.status(204).json();

        return res.json(user)
    }

    static async store(req, res) {
        const errors = validationResult(req);

        if(!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });
        
        try{
            const user = await models.User.create({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                createdAt: req.body.createdAt,
                updatedAt: req.body.updatedAt
            });

            return res.json(user);
        }catch{
            return res.status(400).json();
        }    
    }

    static async destroy(req, res) {
        const user = await models.User.destroy({
            where:{
                id: req.params.id
            }
        });

        if(!user) return res.status(400).json();

        return res.json(user);
    }
}

module.exports = UserController