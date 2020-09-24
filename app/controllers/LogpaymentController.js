const models = require("../models/index");
require('dotenv-safe').config;
const { validationResult } = require("express-validator");

class LogpaymentController {
    static async index(req, res) {
        try {
            const logpayments = await models.Logpayment.findAll({
                attributes: ["id", "paidBalance", "paidTransaction", "balanceFinal"],
                include: [
                    {
                        model: models.Schedule,
                        as: "schedules",
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

            if (!logpayments) return res.status(204).json();

            return res.status(200).json(logpayments);
        } catch (err) {
            return res.status(500).json({ err });
        }
    }

    static async show(req, res) {
        try {
            if (!req.params.id) return res.status(400).json();

            const logpayment = await models.Logpayment.findByPk(req.params.id, {
                attributes: ["id", "paidBalance", "paidTransaction", "balanceFinal"],
                include: [
                    {
                        model: models.Schedule,
                        as: "schedules",
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

            if (!logpayment) return res.status(204).json();

            return res.status(200).json(logpayment);
        } catch (error) {
            return res.status(500);
        }
    }
    
    static async store(req, res) {
        const errors = validationResult(req);

        if(!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });

        try{
            const logpayment = await models.Logpayment.create(req.body);

            return res.status(200).json(logpayment);
        }catch (error){
            return res.status(500).json({error});
        }
    }

    static async update(req, res) {
        try {
            if(!req.params.id) return res.status(400).json();

            const logpayment = await models.Logpayment.update(
                req.body,
                { where: { id: req.params.id }}
            );

            if(!review) return res.status(204).json();

            return res.status(200).json(logpayment);
        } catch (error) {
            return res.status(500).json({error});
        }
    }

    static async destroy(req, res) {
        try {
            const logpayment = await models.Logpayment.destroy({
                where:{
                    id: req.params.id
                }
            });

            if(!logpayment) return res.status(400).json();

            return res.status(200).json(logpayment);
        } catch (error) {
            return res.status(500).json({error});
        }
    }
}

module.exports = LogpaymentController;
