const models = require("./../models/index")
const { validationResult } = require('express-validator')
const Sequelize = require('sequelize')
const moment = require('moment');
const Op = Sequelize.Op

class AvaliabilityController{
    static async index(req, res) {
        try {
            var avaliabilites = await models.Avaliability.findAll({
                include: [
                    {
                        model: models.Teacher,
                        as: 'teachers',
                        attributes: ['name', 'valueOne', 'valueFive', 'valueTen']
                    }
                ]
            });

            for (var i = 0; i < avaliabilites.length; i++) {
                var date = new Date(avaliabilites[i].date);
                var datefull = date.getFullYear() + '-' + ('0' + (date.getMonth()+1)).slice(-2) + '-'+ ('0' + date.getDate()).slice(-2);
                var time = date.getUTCHours()+':'+date.getUTCMinutes();

                avaliabilites[i]['dataValues']['date'] = datefull;
                avaliabilites[i]['dataValues']['time'] = time;

                avaliabilites[i]['dataValues']['dateFull'] = date;
            };

            if(!avaliabilites) return res.status(204).json();

            return res.status(200).json(avaliabilites);
        } catch (error) {
            return res.status(500).json({error});
        }
    }

    static async getTeacher(req, res) {
        try {
            var avaliabilites = await models.Avaliability.findAll({
                where: {
                    busy: 0,
                    teacherId: req.params.teacherId,
                    date: {
                        [Op.gte]: moment().utc(true).toDate()
                    }
                }
            });

            for (var i = 0; i < avaliabilites.length; i++) {
                var date = new Date(avaliabilites[i].date);
                var datefull = date.getFullYear() + '-' + ('0' + (date.getMonth()+1)).slice(-2) + '-'+ ('0' + date.getDate()).slice(-2);
                var time = date.getUTCHours()+':'+date.getUTCMinutes();

                avaliabilites[i]['dataValues']['date'] = datefull;
                avaliabilites[i]['dataValues']['time'] = time;

                avaliabilites[i]['dataValues']['dateFull'] = date;
            };

            if(!avaliabilites) return res.status(204).json();

            return res.status(200).json(avaliabilites);
        } catch (error) {
            return res.status(500).json({error});
        }
    }

    static async show(req, res) {
        try {
            if(!req.params.id) return res.status(400).json();

            const avaliability = await models.Avaliability.findByPk(req.params.id, {
                include: [
                    {
                        model: models.Teacher,
                        as: 'teachers',
                        attributes: ['name', 'valueOne', 'valueFive', 'valueTen']
                    }
                ]
            });

            if(!avaliability) return res.status(204).json();

            return res.status(200).json(avaliability)
        } catch (error) {
            return res.status(500).json({error})
        }
    }

    static async store(req, res) {
        const errors = validationResult(req);

        if(!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });

        try{
            const avaliability = await models.Avaliability.create(req.body);
            return res.status(200).json(avaliability);
        }catch (error){
            return res.status(500).json({error});
        }
    }

    static async available(req, res) {
        try {
            let params = req.body;
            params.busy = 0;
            params.date = { [Op.gt]: Date.now() };

            const avaliability = await models.Avaliability.findAll({
                where: params,
                include: [
                    {
                        model: models.Teacher,
                        as: 'teachers',
                        attributes: ['name', 'valueOne', 'valueFive', 'valueTen']
                    }
                ],
                order: [
                    ['date', 'ASC']
                ]
            });

            if(!avaliability) return res.status(204).json();

            return res.status(200).json(avaliability);
        } catch (error) {
            return res.status(500).json({error});
        }
    }

    static async update(req, res) {
        try {
            if(!req.params.id) return res.status(400).json();

            const avaliability = await models.Avaliability.update(
                req.body,
                { where: { id: req.params.id }}
            );

            if(!avaliability) return res.status(204).json();

            return res.status(200).json(avaliability);
        } catch (error) {
            return res.status(500).json({error});
        }
    }

    static async destroy(req, res) {
        try {
            const avaliability = await models.Avaliability.destroy({
                where:{
                    id: req.params.id
                }
            });

            if(!avaliability) return res.status(400).json();

            return res.status(200).json(avaliability);
        } catch (error) {
            return res.status(500).json({error});
        }
    }
}

module.exports = AvaliabilityController
