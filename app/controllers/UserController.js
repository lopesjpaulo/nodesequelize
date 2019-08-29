const models = require("./../models/index")
const { Instrument } = require('../models')
const { validationResult } = require('express-validator')

class UserController{
    static async index(req, res) {
        try {
            const users = await models.User.findAll({
                include: [
                    {
                        model: models.Instrument,
                        as: 'instruments',
                        through: { attributes: [] }
                    }
                ]
            });

            if(!users) return res.status(204).json();
        
            return res.status(200).json(users);
        } catch (error) {
            return res.status(500).json({error});
        }
        
    }

    static async show(req, res) {
        try {
            if(!req.params.id) return res.status(400).json();

            const user = await models.User.findByPk(req.params.id);

            if(!user) return res.status(204).json();

            return res.status(200).json(user)
        } catch (error) {
            return res.status(500).json({error})
        }
        
    }

    static async store(req, res) {
        const errors = validationResult(req);

        if(!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });
        
        try{
            const { instruments, ...data } = req.body;
            const user = await models.User.create(data);

            if(instruments && instruments.length > 0) {
                user.setIntruments({instruments, logging: console.log});
            }

            return res.status(200).json(user);
        }catch (error){
            return res.status(500).json({error});
        }    
    }

    static async destroy(req, res) {
        try {
            const user = await models.User.destroy({
                where:{
                    id: req.params.id
                }
            });
    
            if(!user) return res.status(400).json();
    
            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).json({error});
        }
        
    }
}

module.exports = UserController