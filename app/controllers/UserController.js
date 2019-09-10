const models = require("./../models/index")
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

            /*if(instruments && instruments.length > 0) {
                user.setIntruments({instruments, logging: console.log});
            }*/

            return res.status(200).json(user);
        }catch (error){
            return res.status(500).json({error});
        }    
    }

    static async login(req, res) {
        const errors = validationResult(req);

        if(!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });

        try {
            const user = await models.User.findOne({
                where: {
                    email: req.body.email,
                    password: req.body.password
                }
            });

            if(!user) return res.status(204).json();

            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).json({error});
        }
    }

    static async update(req, res) {
        try {
            if(!req.params.id) return res.status(400).json();

            const user = await models.User.update(
                req.body,
                { where: { id: req.params.id }}
            );

            if(!user) return res.status(204).json();

            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).json({error});
        }
    }

    static async updateInstruments(req, res) {
        
            if(!req.params.id) return res.status(400).json();

            const instruments = req.body.instruments;

            instruments.forEach(instrument => {
                models.User.setIntruments(parseInt(instrument));
            });

            return res.status(200).json();
        
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