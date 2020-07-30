const models = require("./../models/index");
const { validationResult } = require('express-validator');
const Sequelize = require('sequelize');
const moment = require('moment-timezone');
moment().tz("America/Recife").format();
const Op = Sequelize.Op;

class ScheduleController{
    static async index(req, res) {
        try {
            const schedules = await models.Schedule.findAll({
                attributes: ['id', 'canceled', 'rescheduled', 'canceledAt', 'finishedAt', 'userId'],
                order: [
                    [ 'avaliabilities', 'date', 'ASC' ]
                ],
                include: [
                    {
                        model: models.Avaliability,
                        as: 'avaliabilities',
                        required: true,
                        attributes: ['id', 'date', 'busy', 'teacherId'],
                        include: [
                            {
                                model: models.Teacher,
                                as: 'teachers',
                                attributes: ['id'],
                                include: [
                                    {
                                        model: models.User,
                                        as: 'users',
                                        attributes: ['id', 'name', 'lastname', 'email']
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        model: models.User,
                        as: 'users',
                        attributes: ['id', 'name', 'lastname', 'email']
                    },
                    {
                        model: models.Instrument,
                        as: 'instruments',
                        attributes: ['id', 'title']
                    }
                ],
            });

            if(!schedules) return res.status(204).json();

            return res.status(200).json(schedules);
        } catch (error) {
            return res.status(500).json({error});
        }
    }

    static async getUser(req, res) {
        try {
            const schedules = await models.Schedule.findAll({
                attributes: ['id', 'canceled', 'rescheduled', 'canceledAt', 'finishedAt', 'userId'],
                order: [
                    [ 'avaliabilities', 'date', 'ASC' ]
                ],
                where: [{ userId: req.userId } ],
                include: [
                    {
                        model: models.Avaliability,
                        as: 'avaliabilities',
                        required: true,
                        attributes: ['id', 'date', 'busy', 'teacherId'],
                        include: [
                            {
                                model: models.Teacher,
                                as: 'teachers',
                                attributes: ['id'],
                                include: [
                                    {
                                        model: models.Instrument,
                                        as: 'instruments',
                                        attributes: ['id', 'title']
                                    },
                                    {
                                        model: models.User,
                                        as: 'users',
                                        required: true,
                                        attributes: ['id', 'name', 'lastName', 'email', 'pathImage'],
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        model: models.User,
                        as: 'users',
                        attributes: ['id', 'name', 'lastname', 'email']
                    },
                    {
                        model: models.Instrument,
                        as: 'instruments',
                        attributes: ['id', 'title']
                    }
                ],
            });

            if(!schedules) return res.status(204).json();

            return res.status(200).json(schedules);
        } catch (error) {
            return res.status(500).json({error});
        }
    }

    static async getTeacher(req, res) {
        try {
            const schedules = await models.Schedule.findAll({
                attributes: ['id', 'canceled', 'rescheduled', 'canceledAt', 'finishedAt', 'userId'],
                order: [
                    [ 'avaliabilities', 'date', 'ASC' ]
                ],
                include: [
                    {
                        model: models.Avaliability,
                        as: 'avaliabilities',
                        required: true,
                        attributes: ['id', 'date', 'busy', 'teacherId'],
                        include: [
                            {
                                model: models.Teacher,
                                as: 'teachers',
                                attributes: ['id'],
                                required: true,
                                include: [
                                    {
                                        model: models.User,
                                        as: 'users',
                                        attributes: ['id', 'name', 'lastName', 'email', 'pathImage'],
                                    }
                                ],
                                where: [{
                                    userId: req.userId
                                } ],
                            }
                        ]
                    },
                    {
                        model: models.User,
                        as: 'users',
                        attributes: ['id', 'name', 'lastname', 'email']
                    },
                    {
                        model: models.Instrument,
                        as: 'instruments',
                        attributes: ['id', 'title']
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
                                attributes: ['id'],
                                include : [
                                    {
                                        model: models.User,
                                        as: 'users',
                                        required: true,
                                        attributes: ['id', 'name', 'lastName', 'email', 'pathImage'],
                                    }
                                ]
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

            const scheduleObj = {};

            let reschedule = 1;

            if(req.body['scheduleId']){
                const scheduleObj = await models.Schedule.findByPk(req.body['scheduleId']);
                const scheduleDeleted = await models.Schedule.destroy({
                    where:{
                        id: req.body['scheduleId']
                    }
                });

                if(!scheduleDeleted && !scheduleObj) return res.status(400).json();

                if(scheduleObj.canceled == 2) {
                    reschedule = 0;
                }
            }

            const schedule = await models.Schedule.create({
                avaliabilityId: req.body.avaliabilityId,
                userId: req.userId,
                instrumentId: req.body.instrumentId,
                rescheduled: req.body['scheduleId'] ? reschedule : 0
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

    static async cancel(req, res) {
        try {
            if(!req.params.id) return res.status(400).json();

            const scheduleObject = await models.Schedule.findByPk(req.params.id, {attributes: ['id', 'avaliabilityId']});

            if(!scheduleObject) return res.status(404).json();

            const avaliabilityObject = await models.Avaliability.findOne({
                where: { id: scheduleObject.avaliabilityId, date: { [Op.gt]: moment().utc(true).add(req.body.incall ? 0 : 6, 'hours').toDate() } }
            });

            if(!avaliabilityObject) return res.status(404).json({ msg: 'Não disponivel para cancelamento' });

            const schedule = await models.Schedule.update(
                {
                    canceled: req.body.isteacher ? 2 : 1,
                    canceledAt: moment().utc(true),
                },
                { where: { id: req.params.id }}
            );

            const avaliability = await models.Avaliability.update(
                {
                    busy: 0,
                },
                { where: { id: scheduleObject.avaliabilityId }}
            );

            if(!schedule || !avaliability) return res.status(204).json();

            return res.status(200).json(schedule);
        } catch (error) {
            return res.status(500).json({error});
        }
    }


    static async check(req, res) {
        try {
            if(!req.params.id) return res.status(400).json();

            const scheduleObject = await models.Schedule.findByPk(req.params.id, {attributes: ['id', 'avaliabilityId', 'finishedAt']});

            if(!scheduleObject) return res.status(404).json();

            const avaliabilityObject = await models.Avaliability.findOne({
                where: { id: scheduleObject.avaliabilityId, date: { [Op.lte]: moment().utc(true).add(15, 'minutes').toDate() } }
            });

            if(!avaliabilityObject) return res.status(200).json({ valid: false,  msg: 'Aula perdida' });

            const remaining = moment(avaliabilityObject['date']).diff(moment().utc(true), 'minutes');

            return res.status(200).json({ valid: true, remaining });
        } catch (error) {
            return res.status(500).json({error});
        }
    }

    static async checkClassTime(req, res) {
        try {
            if(!req.params.id) return res.status(400).json();

            const scheduleObject = await models.Schedule.findByPk(req.params.id, {attributes: ['id', 'avaliabilityId', 'finishedAt']});

            if(!scheduleObject) return res.status(404).json();

            const avaliabilityObject = await models.Avaliability.findOne({
                where: { id: scheduleObject.avaliabilityId, date: { [Op.lte]: moment().utc(true).add(15, 'minutes').toDate() } }
            });

            if(!avaliabilityObject) return res.status(200).json({ valid: false,  msg: 'Aula perdida' });

            const remaining = moment(avaliabilityObject['date']).add(51, 'minutes').diff(moment().utc(true), 'minutes');

            return res.status(200).json({ valid: true, remaining });
        } catch (error) {
            return res.status(500).json({error});
        }
    }

    static async finish(req, res) {
        try {
            if(!req.params.id) return res.status(400).json();

            const scheduleObject = await models.Schedule.findByPk(req.params.id, {attributes: ['id', 'avaliabilityId', 'finishedAt']});

            if(!scheduleObject) return res.status(404).json();

            const schedule = await models.Schedule.update(
                {
                    finishedAt: moment().utc(true),
                },
                { where: { id: req.params.id }}
            );

            return res.status(200).json(schedule);
        } catch (error) {
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
