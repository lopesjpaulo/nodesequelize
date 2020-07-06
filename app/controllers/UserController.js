const models = require("./../models/index")
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken');
require('dotenv-safe').config();

class UserController{
    static async index(req, res) {
        try {
            const users = await models.User.findAll({
                attributes: ['id', 'name', 'lastname', 'email', 'pathimage'],
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

        if(!errors.isEmpty()) return res.status(422).json({ errors: errors.array(), data: req.body });

        try{
            const { instruments, ...data } = req.body;
            const user = await models.User.create(data);

            if(!user) return res.status(200).json({ auth: false });

            let token = jwt.sign({id: user.id}, process.env.SECRET, {
                expiresIn: "30 days"
            });

            return res.status(200).json({ auth: true, token: token , user: user});
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

            if(!user) return res.status(200).json({ auth: false });

            const password = user.isPassword(user.password, req.body.password);

            if(!password) return res.status(200).json({ auth: false });

            let dataLogged = null;

            const dataUser = await models.Datauser.findOne({
                where: {
                    userId: user.id
                }
            });

            if (dataUser) {
               dataLogged = dataUser;
                user['teacher'] = false;
            } else {
                dataLogged = await models.Teacher.findOne({
                    where: {
                        userId: user.id
                    }
                });

                user['teacher'] = true;
            }

            var token = jwt.sign({id: user.id}, process.env.SECRET, {
                expiresIn: "30 days"
            });

            return res.status(200).json({ auth: true, token: token , user: user, data: dataLogged});
        } catch (error) {
            return res.status(500).json({error});
        }
    }

    static async update(req, res) {
        try {
            const user = await models.User.findByPk(req.userId);

            const result = user.update(req.body);

            if(!result) return res.status(204).json();

            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({error});
        }
    }

    static async updateInstruments(req, res) {
        try {
            const instruments = req.body.instruments;

            let items = [];

            instruments.forEach(item => {
                const iu = {
                    userId: req.userId,
                    instrumentId: item['id']
                };

                items.push(iu);
            });

            await models.InstrumentUser.destroy({
                where:{
                    userId: req.userId
                }
            }).then(() => {
                models.InstrumentUser.bulkCreate(items)
                    .then(function(events) {
                        console.log('salvou')
                    }).catch(function(err) {
                        console.log(err)
                    });
            }).catch(function(err) {
                console.log(err)
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
