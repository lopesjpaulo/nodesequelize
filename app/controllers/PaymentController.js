const models = require("../models/index");
const { validationResult } = require("express-validator");
const Sequelize = require("sequelize");
const pagarme = require("pagarme");
const Op = Sequelize.Op;

class PaymentController {
    static async index(req, res) {
        try {
            const payments = await models.Payment.findAll({
                attributes: ["id", "paidAt"],
                include: [
                    {
                        model: models.Schedule,
                        as: "schedules",
                        attributes: [
                            "id",
                            "avaliabilityId",
                            "userId",
                            "finishedAt"
                        ]
                    }
                ]
            });

            if (!payments) return res.status(204).json();

            return res.status(200).json(payments);
        } catch (err) {
            return res.status(500).json({ err });
        }
    }

    static async show(req, res) {
        try {
            if (!req.params.id) return res.status(400).json();

            const payment = await models.Payment.findByPk(req.params.id, {
                attributes: ["id", "paidAt"],
                include: [
                    {
                        model: models.Schedule,
                        as: "schedules",
                        attributes: [
                            "id",
                            "avaliabilityId",
                            "userId",
                            "finishedAt"
                        ]
                    }
                ]
            });

            if (!payment) return res.status(204).json();

            return res.status(200).json(payment);
        } catch (error) {
            return res.status(500);
        }
    }

    static async store(req, res) {
        const errors = validationResult(req);

        if (!errors.isEmpty())
            return res.status(422).json({ errors: errors.array() });

        const schedule = await models.Schedule.findByPk(req.body.scheduleId, {
            attributes: ["id", "finishedAt"],
            include: [
                {
                    model: models.Avaliability,
                    as: "avaliabilities",
                    attributes: ["id"],
                    include: [
                        {
                            model: models.Teacher,
                            as: "teachers",
                            attributes: ["name", "valueOne"]
                        }
                    ]
                },
                {
                    model: models.User,
                    as: "users",
                    attributes: ["id", "name", "email"]
                }
            ]
        });

        if (schedule.finishedAt !== null) {
            return res.status(409).json("Horário já ocupado!");
        } else {
            const amount = parseInt(schedule.avaliabilities.teachers.valueOne);

            const client = await pagarme.client.connect({
                api_key: process.env.PAGARME_API_KEY
            });

            try {
                const transaction = await client.transactions.create({
                    amount: amount,
                    payment_method: "credit_card",
                    card_number: "4111111111111111",
                    card_cvv: "123",
                    card_expiration_date: "0922",
                    card_holder_name: "Morpheus Fishburne",
                    customer: {
                        external_id: toString(schedule.users.id),
                        name: schedule.users.name,
                        type: "individual",
                        country: "br",
                        email: schedule.users.email,
                        documents: [
                            {
                                type: req.body.typeDocument,
                                number: req.body.numberDocument
                            }
                        ],
                        phone_numbers: ["+5511999998888", "+5511888889999"],
                        birthday: "1985-01-01"
                    },
                    billing: {
                        name: req.body.billingName,
                        address: {
                            country: req.body.country,
                            state: req.body.state,
                            city: req.body.city,
                            neighborhood: req.body.bairro,
                            street: req.body.street,
                            street_number: req.body.number,
                            zipcode: req.body.zipcode
                        }
                    },
                    items: [
                        {
                            id: schedule.id.toString(),
                            title:
                                "Aula de música - " +
                                schedule.avaliabilities.teachers.name,
                            unit_price: amount,
                            quantity: 1,
                            tangible: false
                        }
                    ]
                });

                if (transaction.status == "paid") {
                    try {
                        const payment = await models.Payment.create(req.body);
                        return res.status(200).json(payment);
                    } catch (error) {
                        return res.status(500).json({ error });
                    }
                } else {
                    return res.status(400).json(transaction);
                }
            } catch (error) {
                return res.status(500).json(error);
            }
        }
    }
}

module.exports = PaymentController;
