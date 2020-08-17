const models = require("../models/index");
require('dotenv-safe').config;
const { validationResult } = require("express-validator");
const Sequelize = require("sequelize");
const pagarme = require("pagarme");
const moment = require('moment-timezone');
moment().tz("America/Recife").format();
const Op = Sequelize.Op;

class PaymentController {

    createClient() {
        return pagarme.client.connect({ api_key: process.env.PAGARME_API_KEY });
    }

    static async index(req, res) {
        try {
            const payments = await models.Payment.findAll({
                attributes: ["id", "paid_at", "transaction_id"],
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
                attributes: ["id", "paid_at", "transaction_id"],
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

            if (!payment) return res.status(204).json();

            return res.status(200).json(payment);
        } catch (error) {
            return res.status(500);
        }
    }

    static async saveAccount(req, res) {
        const client = await pagarme.client.connect({
            api_key: process.env.PAGARME_API_KEY
        });

        try{
            const account = await client.bankAccounts.create({
                bank_code: req.body.bank,
                agencia: req.body.agency,
                agencia_dv: req.body.agency_dig,
                conta: req.body.account,
                conta_dv: req.body.digit,
                legal_name: req.body.legal_name,
                document_number: req.body.cpf
            });

            return res.status(200).json(account);

        } catch (error) {
            return res.status(500).json({ error });
        }
    }

    static async saveReceiver(req, res) {
        const client = await pagarme.client.connect({
            api_key: process.env.PAGARME_API_KEY
        });

        try {
            const receiver = await client.recipients.create({
                transfer_enabled: true,
                transfer_interval: "weekly",
                transfer_day: 5,
                bank_account_id: req.body.bank_account_id
            });

            return res.status(200).json(receiver);
        } catch (error) {
            return res.status(500).json({error});
        }
    }

    static async saveCard(req, res) {
        const errors = validationResult(req);

        if (!errors.isEmpty())
            return res.status(422).json({ errors: errors.array() });

        try{
            const datacard = await models.Datacard.create({...req.body, userId: req.userId});

            return res.status(200).json(datacard);
        } catch (error) {
            return res.status(500).json({ error });
        }
    }

    static async listCards(req, res) {
        try {
            const cards = await models.Datacard.findAll({
                where: [{ userId: req.userId } ],
            });

            if(!cards) return res.status(204).json();

            return res.status(200).json(cards);
        } catch (error) {
            return res.status(500).json({error});
        }
    }

    static async destroyCard(req, res) {
        try {
            const card = await models.Datacard.destroy({
                where:{
                    id: req.params.id
                }
            });

            if(!card) return res.status(400).json();

            return res.status(200).json(card);
        } catch (error) {
            return res.status(500).json({error});
        }
    }

    static async saveCustomer(req, res) {
        const errors = validationResult(req);

        if (!errors.isEmpty())
            return res.status(422).json({ errors: errors.array() });

            const client = await pagarme.client.connect({
                api_key: process.env.PAGARME_API_KEY
            });

        try{
            const customer = await client.customers.create({
                external_id: req.body.id,
                name: req.body.name,
                type: 'individual',
                country: req.body.country ? req.body.country : 'br',
                email: req.body.email,
                documents: [
                    {
                    type: 'cpf',
                    number: req.body.cpf
                    }
                ],
                phone_numbers: [req.body.phone],
                birthday: req.body.birthday
                })

            return res.status(200).json(customer);
        } catch (error) {
            return res.status(500).json({ error });
        }
    }

    /*processPayment(amount, schedule, datauser, req) {
        try {
            const transaction = this.client.transactions.create({
                amount: amount,
                payment_method: "credit_card",
                card_id: req.body.card_id,
                postback_url: process.env.URL+'/postbackurl',
                customer: {
                    external_id: toString(schedule.userID),
                    name: schedule.users.name,
                    type: "individual",
                    country: "br",
                    email: schedule.users.email,
                    documents: [
                        {
                            type: 'cpf',
                            number: req.body.numberDocument ? req.body.numberDocument: datauser.cpf
                        }
                    ],
                    phone_numbers: [datauser.phone],
                    birthday: datauser.birthday
                },
                billing: {
                    name: req.body.billingName,
                    address: {
                        country: req.body.country ? req.body.country : datauser.country,
                        state: req.body.state ? req.body.state : datauser.state,
                        city: req.body.city ? req.body.city : datauser.city,
                        neighborhood: req.body.bairro ? req.body.bairro : datauser.bairro,
                        street: req.body.street ? req.body.street : datauser.street,
                        street_number: req.body.number ? req.body.number : datauser.number,
                        zipcode: req.body.zipcode ? req.body.zipcode : datauser.cep
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
                    const payment = models.Payment.create(req.body);
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
    }*/

    static async testStore(req, res) {
        const client = await pagarme.client.connect({
            api_key: process.env.PAGARME_API_KEY
        });
        let transaction;

        try{
            transaction = await client.transactions.create({
                amount: 1000,
                payment_method: "credit_card",
                card_id: "card_ckash57zh08np7x6dpujys9qr",
                customer_id: 3035867,
                //postback_url: process.env.URL+'/postbackurl',
                billing: {
                    name: 'João das Laranjas',
                    address: {
                        country: "br",
                        state: "sp",
                        city: "Cotia",
                        neighborhood: "Rio Cotia",
                        street: "Rua Matrix",
                        street_number: "9999",
                        zipcode: "06714360"
                      }
                },
                items: [
                    {
                        id: '1234',
                        title:
                            "Aula de música - " +
                            'Professor teste',
                        unit_price: 1000,
                        quantity: 1,
                        tangible: false
                    }
                ]
            });

            //return res.status(200).json(transaction);
        } catch(error) {
            return res.status(500).json({ error });
        }

        const payment = models.Payment.create({
            paid_at: new Date(transaction.date_created),
            scheduleId: 1,
            transaction_id: (transaction.id).toString()
        });

        return res.status(200).json(transaction);
    }

    static async store(req, res) {
        const errors = validationResult(req);
        let transaction;

        if (!errors.isEmpty())
            return res.status(422).json({ errors: errors.array() });

        const schedule = await models.Schedule.findByPk(req.body.scheduleId, {
            attributes: ["id", "userId", "finishedAt", "avaliabilityId"],
            include: [
                {
                    model: models.Avaliability,
                    as: "avaliabilities",
                    attributes: ["id", "date"],
                    include: [
                        {
                            model: models.Teacher,
                            as: "teachers",
                            attributes: ["id", "valueOne"],
                            include: [
                                {
                                    model: models.User,
                                    as: "users",
                                    attributes: ["id", "name", "email"]
                                }
                            ]
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

        const datauser = await models.Datauser.findOne({
            where: { userId: schedule.userId }
        });

        const user = await models.User.findByPk(schedule.userId);

        if (schedule.finishedAt !== null) {
            return res.status(409).json("Horário já ocupado!");
        } else {
            const amount = parseInt(schedule.avaliabilities.teachers.valueOne);

            try {
                const client = await pagarme.client.connect({
                    api_key: process.env.PAGARME_API_KEY
                });

                transaction = await client.transactions.create({
                    amount: amount,
                    async: false,
                    payment_method: "credit_card",
                    card_id: req.body.card_id,
                    customer: {
                        external_id: schedule.id.toString(),
                        name: user.name + ' ' + user.lastname,
                        type: "individual",
                        country: 'br',
                        email: req.body.email ? req.body.email : user.email,
                        documents: [
                          {
                            type: "cpf",
                            number: req.body.cpf ? req.body.cpf : datauser.cpf
                          }
                        ],
                        phone_numbers: req.body.phone ? ['+55' + req.body.phone] : ['+55' + datauser.phone],
                      },
                    items: [
                        {
                            id: schedule.id.toString(),
                            title:
                                "Aula de música - " +
                                schedule.avaliabilities.teachers.users.name,
                            unit_price: amount,
                            quantity: 1,
                            tangible: false
                        }
                    ]
                });

            } catch (error) {
                const avaliabilityCancel = await models.Avaliability.update(
                    {
                        busy: 0,
                    },
                    { where: { id: schedule.avaliabilityId }}
                );

                const scheduleCancel = await models.Schedule.destroy({
                    where:{
                        id: schedule.id
                    }
                });
                return res.status(500).json({error});
            }

            if (transaction.status == "paid") {
                try {
                    const payment = models.Payment.create({
                        paid_at: transaction.date_created,
                        scheduleId: schedule.id,
                        transaction_id: transaction.id
                    });
                    return res.status(200).json({ paid: true, transaction, schedule });
                } catch (error) {
                    const avaliabilityCancel = await models.Avaliability.update(
                        {
                            busy: 0,
                        },
                        { where: { id: schedule.avaliabilityId }}
                    );

                    const scheduleCancel = await models.Schedule.destroy({
                        where:{
                            id: schedule.id
                        }
                    });
                    return res.status(500).json({ error });
                }
            } else {
                const avaliabilityCancel = await models.Avaliability.update(
                    {
                        busy: 0,
                    },
                    { where: { id: schedule.avaliabilityId }}
                );

                const scheduleCancel = await models.Schedule.destroy({
                    where:{
                        id: schedule.id
                    }
                });
                return res.status(200).json({ paid: false, transaction });
            }
        }
    }
}

module.exports = PaymentController;
