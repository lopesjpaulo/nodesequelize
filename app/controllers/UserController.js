const models = require("./../models/index")
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken');
const { sendMail } = require('../helpers/nodemail');
const Sequelize = require('sequelize');
const { genSaltSync, hashSync } = require("bcryptjs");
const Op = Sequelize.Op;
const moment = require('moment');
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
                expiresIn: 3600
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

            if(!user) return res.status(200).json({ auth: false, message: 'email incorreto' });

            if(!user.password) return res.status(200).json({ auth: false, message: 'senha não definida' });

            const password = user.isPassword(user.password, req.body.password);

            if(!password) return res.status(200).json({ auth: false, message: 'senha incorreta' });

            const data = await models.Datauser.findOne({
                where: {
                    userId: user.id
                }
            });

            let isTeacher = false;
            let teacher = {};

            if (!data) {
                teacher = await models.Teacher.findOne({
                    where: {
                        userId: user.id
                    }
                });

                isTeacher = true;
            }

            var token = jwt.sign({id: user.id}, process.env.SECRET, {
                expiresIn: 3600
            });

            return res.status(200).json({ auth: true, token: token , user: user, data, teacher, isTeacher});
        } catch (error) {
            return res.status(500).json({error});
        }
    }

    static async googleLogin(req, res) {
        try {
            const user = await models.User.findOne({
                where: {
                    email: req.body.email
                }
            });

            if(!user) {
                const userCreated = await models.User.create(req.body);

                let token = jwt.sign({id: userCreated.id}, process.env.SECRET, {
                    expiresIn: 3600
                });

                return res.status(200).json({ auth: true, token: token , user: userCreated});
            }

            const data = await models.Datauser.findOne({
                where: {
                    userId: user.id
                }
            });

            let isTeacher = false;
            let teacher = {};

            if (!data) {
                teacher = await models.Teacher.findOne({
                    where: {
                        userId: user.id
                    }
                });

                isTeacher = true;
            }

            var token = jwt.sign({id: user.id}, process.env.SECRET, {
                expiresIn: 3600
            });

            return res.status(200).json({ auth: true, token: token , user: user, data, teacher, isTeacher});
        } catch (error) {
            return res.status(500).json({error});
        }
    }

    static async logout(req, res) {
        res.status(200).json({ auth: false, token: null});
    }

    static async update(req, res) {
        try {
            const user = await models.User.findByPk(req.userId ? req.userId : req.params.userId);

            if (req.body['password']) {
                let data = req.body;

                const salt = genSaltSync();

                data['password'] = hashSync(data['password'], salt);

                const result = user.update(req.body);

                if(!result) return res.status(204).json();

                return res.status(200).json(result);
            }

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

    static async createRecovery(req, res) {
        try {
            const user = await models.User.findOne(
                { where: { email: req.body.email }}
            );

            if(!user) return res.status(200).json({ sent: 0 });

            const data = {
                userId: user.id
            };

            const recovery = await models.Recovery.create(data);

            if(!recovery) return res.status(400).json();

            if(sendMail(user.email, recovery.codigo)) {
                return res.status(200).json({ sent: 1 });
            };

            return res.status(400).json();
        } catch (error) {
            return res.status(500).json({error});
        }
    }

    static async checkRecovery(req, res) {
        try {
            const recovery = await models.Recovery.findOne(
                { where: {
                    codigo: req.body.codigo,
                    used: 0,
                    expiresAt: { [Op.gte]: moment().utc(true) }
                }}
            )

            if(!recovery) return res.status(400).json({valid: false});

            recovery.update({
                used: 1
            });

            return res.status(200).json({valid: recovery.userId});
        } catch(error) {
            return res.status(500).json({error});
        }
    }
}

module.exports = UserController
