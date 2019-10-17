const models = require("./../models/index")
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken');
require('dotenv-safe').config();

class UserController{
    static async index(req, res) {
        try {
            const users = await models.User.findAll({
                attributes: ['id', 'name', 'email', 'birthday', 'state', 'city'],
                include: [
                    {
                        model: models.Instrument,
                        as: 'instruments',
                        attributes: ['id', 'title']
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
                    email: req.body.email
                }
            });

            const password = user.isPassword(user.password, req.body.password);

            if(!password) return res.status(204).json();

            var token = jwt.sign({id: user.id}, process.env.SECRET, {
                expiresIn: 300
            });

            return res.status(200).json({ auth: true, token: token });
        } catch (error) {
            return res.status(500).json({error});
        }
    }

    static async update(req, res) {
        try {
            if(!req.params.id) return res.status(400).json();

            const user = await models.User.findByPk(req.params.id);

            const result = user.update(req.body);

            if(!result) return res.status(204).json();

            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({error});
        }
    }

    static async updateInstruments(req, res) {
        try {
            if(!req.params.id) return res.status(400).json();

            const instruments = req.body.instruments;

            instruments.forEach(item => {
                const instrument = models.Instrument.findByPk(item.id);

                if(!instrument) return res.status(400).json();

                const iu = {
                    userId: req.params.id,
                    instrumentId: item
                }

                models.InstrumentUser.create(iu);
            });

            return res.status(200).json();
        } catch (error) {
            res.status(500).json({error});
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