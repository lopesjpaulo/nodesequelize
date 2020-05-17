const models = require("./../models/index")
const { validationResult } = require('express-validator')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

class ScheduleController{
    static async index(req, res) {
        try {
            const schedules = await models.Schedule.findAll({
                attributes: ['id'],
                order: [
                    [ 'avaliabilities', 'date', 'ASC' ]
                ],
                include: [
                    {
                        model: models.Avaliability,
                        as: 'avaliabilities',
                        attributes: ['id', 'date', 'busy', 'teacherId'],
                        include: [
                            {
                                model: models.Teacher,
                                as: 'teachers',
                                attributes: ['id', 'name', 'email']
                            }
                        ]
                    },
                    {
                        model: models.User,
                        as: 'users',
                        attributes: ['id', 'name', 'email']
                    }
                ],
            });

            if(!schedules) return res.status(204).json();

            return res.status(200).json(schedules);
        } catch (error) {
            return res.status(500).json({error});
        }
    }

    static async show(req, res) {
        try {
            if(!req.params.id) return res.status(400).json();

            const schedule = await models.Schedule.findByPk(req.params.id, {
                attributes: ['id'],
                include: [
                    {
                        model: models.Avaliability,
                        as: 'avaliabilities',
                        attributes: ['id', 'date', 'busy', 'teacherId'],
                        include: [
                            {
                                model: models.Teacher,
                                as: 'teachers',
                                attributes: ['id', 'name', 'email']
                            }
                        ]
                    },
                    {
                        model: models.User,
                        as: 'users',
                        attributes: ['id', 'name', 'email']
                    }
                ]
            });

            if(!schedule) return res.status(204).json();

            return res.status(200).json(schedule);
        } catch (error) {
            return res.status(500).json({error});
        }
    }

    static async store(req, res) {
        const errors = validationResult(req);

        if(!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });

        try{
            const avaliability = await models.Avaliability.findOne({
                where: { id: req.body.avaliabilityId, busy: 0, date: { [Op.gt]: Date.now() } }
            });

            if(!avaliability) return res.status(204).json({ msg: 'Horário não disponível' });

            const schedule = await models.Schedule.create({
                avaliabilityId: req.body.avaliabilityId,
                userId: req.userId,
            });
            await models.Avaliability.update(
                { busy: 1},
                { where: { id: req.body.avaliabilityId }}
            );

            return res.status(200).json(schedule);
        }catch (error){
            return res.status(500).json({error});
        }
    }

    static async update(req, res) {
        try {
            if(!req.params.id) return res.status(400).json();

            const schedule = await models.Schedule.update(
                req.body,
                { where: { id: req.params.id }}
            );

            if(!schedule) return res.status(204).json();

            return res.status(200).json(schedule);
        } catch (error) {
            return res.status(500).json({error});
        }
    }

    static async destroy(req, res) {
        try {
            const schedule = await models.Schedule.destroy({
                where:{
                    id: req.params.id
                }
            });

            if(!schedule) return res.status(400).json();

            return res.status(200).json(schedule);
        } catch (error) {
            return res.status(500).json({error});
        }
    }
}

module.exports = ScheduleController
