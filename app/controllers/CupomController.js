const models = require("../models/index");
require('dotenv-safe').config;
const { validationResult } = require("express-validator");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const moment = require('moment-timezone');
moment().tz("America/Recife").format();

class CupomController {
    static async index(req, res) {
        try {
            const cupoms = await models.Cupom.findAll({
                attributes: ["id", "code", "value", "type", "expiresAt"],
                include: [
                    {
                        model: models.Schedule, 
                        as: "schedule",
                        attributes: [
                            "id",
                            "avaliabilityId",
                            "userId",
                            "finishedAt"
                        ],
                        include: [
                            {
                                model: models.User,
                                as: 'users',
                                attributes: ['id', 'name', 'lastname', 'email']
                            }
                        ]
                    }
                ]
            });

            if (!cupoms) return res.status(204).json();

            return res.status(200).json(cupoms);
        } catch (err) {
            return res.status(500).json({ err });
        }
    }

    static async show(req, res) {
        try {
            if (!req.params.id) return res.status(400).json();

            const cupom = await models.Cupom.findByPk(req.params.id, {
                attributes: ["id", "code", "value", "type", "expiresAt"],
                include: [
                    {
                        model: models.Schedule,
                        as: "schedule",
                        attributes: [
                            "id",
                            "avaliabilityId",
                            "userId",
                            "finishedAt"
                        ],
                        include: [
                            {
                                model: models.User,
                                as: 'users',
                                attributes: ['id', 'name', 'lastname', 'email']
                            }
                        ]
                    }
                ]
            });

            if (!cupom) return res.status(204).json();

            return res.status(200).json(cupom);
        } catch (error) {
            return res.status(500);
        }
    }

    static async showFreeCode(req, res) {
        try {
            if (!req.params.code) return res.status(400).json();

            const cupom = await models.Cupom.findOne({
                where: {
                    code: req.params.code,
                    scheduleId: null,
                    expiresAt: { [Op.gte]: moment().utc(true) }
                },
                attributes: ["id", "code", "value", "type", "expiresAt"]
            });

            if (!cupom) return res.status(204).json();

            return res.status(200).json(cupom);
        } catch (error) {
            return res.status(500);
        }
    }
    
    static async store(req, res) {
        const errors = validationResult(req);

        if(!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });

        try{
            const cupom = await models.Cupom.create(req.body);

            return res.status(200).json(cupom);
        }catch (error){
            return res.status(500).json({error});
        }
    }

    static async update(req, res) {
        try {
            if(!req.params.id) return res.status(400).json();

            const cupom = await models.Cupom.update(
                req.body,
                { where: { id: req.params.id }}
            );

            if(!review) return res.status(204).json();

            return res.status(200).json(cupom);
        } catch (error) {
            return res.status(500).json({error});
        }
    }

    static async destroy(req, res) {
        try {
            const cupom = await models.Cupom.destroy({
                where:{
                    id: req.params.id
                }
            });

            if(!cupom) return res.status(400).json();

            return res.status(200).json(cupom);
        } catch (error) {
            return res.status(500).json({error});
        }
    }
}

module.exports = CupomController;
