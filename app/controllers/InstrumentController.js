const models = require('../models/index')
const { validationResult } = require('express-validator')

class InstrumentController{
    static async index(req, res){
        try {
            const instruments = await models.Instrument.findAll({
                include: [
                    {
                        model: models.Category,
                        as: 'categories'
                    }
                ]
            });
    
            if(!instruments) return res.status(204).json();
    
            return res.status(200).json(instruments);
        } catch (err) {
            return res.status(500).json({ err });
        }
    }

    static async show(req, res){
        try {
            if(!req.params.id) return res.status(400).json();

            const instrument = await models.Instrument.findByPk(req.params.id, {
                include: [
                    {
                        model: models.Category,
                        as: 'categories'
                    }
                ]
            });

            if(!instrument) return res.status(204).json();

            return res.status(200).json(instrument)
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    static async getTeacher(req, res){
        if (!req.params.id) return res.status(400).json();

        const teachers = await models.InstrumentTeacher.findAll({
            attributes: ['id'],
            include: [
                {
                    model: models.Teacher,
                    attributes: ['name', 'valueOne', 'valueFive', 'valueTen']
                },
                {
                    model: models.Instrument,
                    attributes: ['title']
                }
            ],
            where: {
                instrumentId: req.params.id,
            }
        });

        if(!teachers) return res.status(204).json();

        return res.status(200).json(teachers);
    }
}

module.exports = InstrumentController