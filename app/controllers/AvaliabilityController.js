const models = require("./../models/index")
const { validationResult } = require('express-validator')
const Sequelize = require('sequelize')
const moment = require('moment-timezone');
moment().tz("America/Recife").format();
const Op = Sequelize.Op

class AvaliabilityController{
    static async index(req, res) {
        try {
            var avaliabilites = await models.Avaliability.findAll({
                include: [
                    {
                        model: models.Teacher,
                        as: 'teachers',
                        attributes: ['valueOne']
                    }
                ]
            });

            for (var i = 0; i < avaliabilites.length; i++) {
                var date = new Date(avaliabilites[i].date);
                var datefull = date.getUTCFullYear() + '-' + ('0' + (date.getUTCMonth()+1)).slice(-2) + '-'+ ('0' + date.getUTCMonth()).slice(-2);
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

    static async updateMany(req, res) {
        try {
            await models.Avaliability.destroy({
                where: {
                    busy: 0,
                    [Op.and]: [
                        Sequelize.where(Sequelize.fn('date', Sequelize.col('date')), '=', req.body.date)
                    ]
                },
            });

            try{
                const avaliability = await models.Avaliability.bulkCreate(req.body.list);
                return res.status(200).json(true);
            }catch (error){
                return res.status(500).json({error});
            }
        } catch (error) {
            return res.status(500).json({error});
        }
    }

    static async setMany(req, res) {
        try{
            const avaliability = await models.Avaliability.bulkCreate(req.body.list);
            return res.status(200).json(true);
        }catch (error){
            return res.status(500).json({error});
        }
    }

    static async getTeacher(req, res) {
        try {

            const teacher = await models.Teacher.findOne({
                where: {
                    userId: req.userId
                }
            });

            var avaliabilites = await models.Avaliability.findAll({
                where: {
                    busy: teacher ? [0,1] : 0,
                    teacherId: req.params.teacherId,
                    date: {
                        // TODO adicionar logica quando for pra produção
                        //[Op.gt]: teacher ? moment().utc(true) : moment().add(1, 'hours').utc(true)
                        [Op.gt]: moment().utc(true)
                    }
                }
            });

            for (var i = 0; i < avaliabilites.length; i++) {
                var date = new Date(avaliabilites[i].date);
                var datefull = date.getUTCFullYear() + '-' + ('0' + (date.getUTCMonth()+1)).slice(-2) + '-'+ ('0' + date.getUTCDate().toString()).slice(-2);
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
                        attributes: ['valueOne']
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
                        attributes: ['valueOne']
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
