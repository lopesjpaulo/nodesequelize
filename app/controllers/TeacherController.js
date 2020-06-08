const models = require("../models/index");
const { validationResult } = require("express-validator");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

class TeacherController{
    static async index(req, res) {
        const { page } = req.query;

        const pagination = page ? page : 1;
        const limit = 10;

        try {
            const teachers = await models.Teacher.findAll({
                attributes: ['id', 'name', 'email', 'birthday', 'state', 'city', 'phone', 'cpf', 'valueOne', 'valueFive', 'valueTen', 'type'],
                include: [
                    {
                        model: models.Instrument,
                        as: 'instruments',
                        attributes: ['id', 'title']
                    }
                ],
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
                attributes: ['id', 'name', 'email', 'birthday', 'state', 'city', 'phone', 'cpf', 'valueOne', 'valueFive', 'valueTen', 'about'],
                include: [
                    {
                        model: models.Instrument,
                        as: 'instruments',
                        attributes: ['id', 'title']
                    }
                ]
            });

            if(!teacher) return res.status(204).json();

            return res.status(200).json(teacher)
        } catch (error) {
            return res.status(500).json({error});
        }
    }

    static async store(req, res) {
        const errors = validationResult(req);

        if(!errors.isEmpty()) return res.status(422).json({ errors: errors.array(), data: req.body });

        try{
            const teacher = await models.Teacher.create(req.body);

            if(!teacher) return res.status(200).json({ auth: false });

            return res.status(200).json({ auth: true, teacher: teacher });
        }catch (error){
            return res.status(500).json({error});
        }
    }

    static async update(req, res) {
        try {
            if(!req.params.id) return res.status(400).json();

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

}

module.exports = TeacherController
