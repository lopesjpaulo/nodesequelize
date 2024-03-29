const models = require("../models/index");
const { validationResult } = require("express-validator");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

class TeacherController{
    static async index(req, res) {
        const { page, term, instrument } = req.query;

        const pagination = page ? page : 1;
        const limit = 10;

        try {
            const teachers = await models.Teacher.findAll({
                attributes: ['id', 'birthday', 'state', 'city', 'phone', 'cpf', 'valueOne', 'type', 'status'],
                include: [
                    {
                        model: models.Instrument,
                        as: 'instruments',
                        attributes: ['id', 'title'],
                        required: true,
                        where : instrument ? {[Op.or] : {
                                'title': {[Op.like]: `%${instrument.toLowerCase()}%`},
                            }} : {},
                    },
                    {
                        model: models.User,
                        as: 'users',
                        required: true,
                        attributes: ['id', 'name', 'lastName', 'email', 'pathImage'],
                        where : term ? {[Op.or] : {
                                'name': {[Op.like]: `%${term.toLowerCase()}%`},
                                'lastName': {[Op.like]: `%${term.toLowerCase()}%`},
                            }} : {},
                    }
                ],
                where:{
                    status: 1
                },
                limit: limit,
                offset: ((pagination-1)*limit),
                subQuery: false
            });

            if(!teachers) return res.status(204).json();

            return res.status(200).json(teachers);
        } catch (err) {
            return res.status(500).json({err});
        }
    }

    static async show(req, res) {
        try {
            if(!req.params.id) return res.status(400).json();

            const teacher = await models.Teacher.findByPk(req.params.id, {
                attributes: ['id', 'birthday', 'state', 'city', 'phone', 'cpf', 'valueOne', 'about', 'status', 'type', 'codeInvite'],
                include: [
                    {
                        model: models.Instrument,
                        as: 'instruments',
                        attributes: ['id', 'title']
                    },
                    {
                        model: models.Certified,
                        as: 'certifieds',
                        attributes: ['id', 'title']
                    },
                    {
                        model: models.User,
                        required: true,
                        as: 'users',
                        attributes: ['id', 'name', 'lastName', 'email', 'pathImage']
                    }
                ],
                where:{
                    status: 1
                },
            });

            if(!teacher) return res.status(204).json();

            return res.status(200).json(teacher)
        } catch (error) {
            return res.status(500).json({error});
        }
    }

    static async store(req, res) {
        const errors = validationResult(req);

        if(!errors.isEmpty()) {
            await models.User.destroy({
                where:{
                    id: req.body.userId
                }
            });
            return res.status(422).json({ errors: errors.array() });
        }

        try{
            const teacher = await models.Teacher.create(req.body);

            return res.status(200).json(teacher);
        } catch (error){
            await models.User.destroy({
                where:{
                    id: req.body.userId
                }
            });
            return res.status(500).json({error});
        }
    }

    static async update(req, res) {
        if(!req.params.id) return res.status(400).json();

        try {
            const teacher = await models.Teacher.update(
                req.body,
                { where: { id: req.params.id }}
            );

            if(!teacher) return res.status(204).json();

            return res.status(200).json(teacher);
        } catch (error) {
            return res.status(500).json({error});
        }
    }

    static async updateLogged(req, res) {
        if(!req.userId) return res.status(400).json();

        try {
            const teacher = await models.Teacher.update(
                req.body,
                { where: { userId: req.userId }}
            );

            if(!teacher) return res.status(204).json();

            return res.status(200).json(teacher);
        } catch (error) {
            return res.status(500).json({error});
        }
    }

    static async updateInstruments(req, res) {
        try {
            const teacher = await models.Teacher.findOne(
                { where: { userId: req.userId }}
            );

            if(!teacher) return res.status(204).json();

            const instruments = req.body.instruments;

            let items = [];

            instruments.forEach(item => {
                const iu = {
                    teacherId: teacher.id,
                    instrumentId: item['id']
                };

                items.push(iu);
            });

            await models.InstrumentTeacher.destroy({
                where:{
                    teacherId: teacher.id
                }
            }).then(() => {
                models.InstrumentTeacher.bulkCreate(items)
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
            const teacher = await models.Teacher.destroy({
                where:{
                    id: req.params.id
                }
            });

            if(!teacher) return res.status(400).json();

            return res.status(200).json(teacher);
        } catch (error) {
            return res.status(500).json({error});
        }
    }

    static async countClasses(req, res) {
        const schedules = await models.Schedule.count({
            where: {
                finishedAt: {
                    [Op.ne]: null
                }
            },
            include: [
                {
                    model: models.Avaliability,
                    as: 'avaliabilities',
                    required: true,
                    where: {
                        teacherId: req.params.id,
                    }
                },
            ],
        });

        if(!schedules) return res.status(204).json();

        return res.status(200).json(schedules);
    }

    static async checkCode(req, res) {
        try {
            const teacher = await models.Teacher.findOne(
                { where: {
                    codeInvite: req.body.codigo
                }}
            );

            if(!teacher) return res.status(200).json({valid: false});

            return res.status(200).json({valid: true, teacher});
        } catch(error) {
            return res.status(500).json({error});
        }
    }

}

module.exports = TeacherController
