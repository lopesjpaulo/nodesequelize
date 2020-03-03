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
            attributes: ["id"],
            include: [
                {
                    model: models.Avaliability,
                    as: "avaliabilities",
                    attributes: ["id"],
                    include: [
                        {
                            model: models.Teacher,
                            as: "teachers",
                            attributes: ["valueOne"]
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

        const amount = parseInt(schedule.avaliabilities.teachers.valueOne);

        const client = await pagarme.client.connect({
            api_key: "ak_test_lPm9JeybSi8HZqYYIEZmwkJGMf8JIi"
        });

        try {
            const transaction = await client.transactions.create({
                amount: amount,
                payment_method: "credit_card",
                card_number: "4111111111111111",
                card_cvv: "623",
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
                            type: "cpf",
                            number: "71404665560"
                        }
                    ],
                    phone_numbers: ["+5511999998888", "+5511888889999"],
                    birthday: "1985-01-01"
                },
                billing: {
                    name: "Ciclano de Tal",
                    address: {
                        country: "br",
                        state: "SP",
                        city: "São Paulo",
                        neighborhood: "Fulanos bairro",
                        street: "Rua dos fulanos",
                        street_number: "123",
                        zipcode: "05170060"
                    }
                },
                items: [
                    {
                        id: "2",
                        title: "Aula de música",
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

module.exports = PaymentController;
