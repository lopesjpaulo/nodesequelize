const models = require("./../models/index")
const { validationResult } = require('express-validator')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

class DatabankController{
    static async index(req, res) {
        try {
            const databanks = await models.Databank.findAll({
                attributes: ['id', 'agency', 'account', 'digit'],
                include: [
                    {
                        model: models.Teacher,
                        as: 'teachers',
                        attributes: ['id', 'type'],
                        include: [
                            {
                                model: models.User,
                                as: 'users',
                                required: true,
                                attributes: ['id', 'name', 'lastName', 'email', 'pathImage'],
                            }
                        ]
                    },
                    {
                        model: models.Bank,
                        as: 'banks',
                        attributes: ['id', 'value', 'label']
                    }
                ]
            });

            if(!databanks) return res.status(204).json();

            return res.status(200).json(databanks);
        } catch (error) {
            return res.status(500).json({error});
        }
    }

    static async show(req, res){
        try {
            if(!req.params.id) return res.status(400).json();

            const databank = await models.Databank.findByPk(req.params.id, {
                attributes: ['id', 'agency', 'account', 'digit'],
                include: [
                    {
                        model: models.Teacher,
                        as: 'teachers',
                        attributes: ['id']
                    },
                    {
                        model: models.Bank,
                        as: 'banks',
                        attributes: ['id', 'value', 'label']
                    }
                ]
            });

            if(!databank) return res.status(204).json();

            return res.status(200).json(databank)
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    static async store(req, res) {
        const errors = validationResult(req);

        if(!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });

        try{
            const databank = await models.Databank.create(req.body);

            return res.status(200).json(databank);
        }catch (error){
            return res.status(500).json({error});
        }
    }

    static async update(req, res) {
        try {
            if(!req.params.id) return res.status(400).json();

            const databank = await models.Databank.update(
                req.body,
                { where: { id: req.params.id }}
            );

            if(!databank) return res.status(204).json();

            return res.status(200).json(databank);
        } catch (error) {
            return res.status(500).json({error});
        }
    }

    static async destroy(req, res) {
        try {
            const databank = await models.Databank.destroy({
                where:{
                    id: req.params.id
                }
            });

            if(!databank) return res.status(400).json();

            return res.status(200).json(databank);
        } catch (error) {
            return res.status(500).json({error});
        }
    }

    static async getTeacher(req, res) {
        if(!req.params.id) return res.status(400).json();

        try {
            const databanks = await models.Databank.findAll({
                attributes: ['id', 'agency', 'account', 'digit'],
                where: {
                  teacherId: req.params.id,
                },
                include: {
                    model: models.Bank,
                    as: 'banks',
                    attributes: ['id', 'value', 'label']
                }
            });

            if(!databanks) return res.status(204).json();

            return res.status(200).json(databanks);
        } catch (error) {
            return res.status(500).json({error});
        }
    }
}

module.exports = DatabankController
