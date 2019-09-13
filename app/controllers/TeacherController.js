const models = require("../models/index")
const { validationResult } = require("express-validator")

class TeacherController{
    static async index(req, res) {
        try {
            const teachers = await models.Teacher.findAll({
                include: [
                    {
                        model: models.Instrument,
                        as: 'instruments',
                        through: { attributes: [] }
                    }
                ]
            });

            if(!teachers) return res.status(204).json();
            
            return res.status(200).json(teachers);
        } catch (err) {
            return res.status(500).json({err});
        }
    }

    static async show(req, res) {
        try {
            if(!req.params.id) return res.status(400).json();

            const teacher = await models.Teacher.findByPk(req.params.id);

            if(!teacher) return res.status(204).json();

            return res.status(200).json(teacher)
        } catch (error) {
            return res.status(500).json({error});
        }
    }

    static async getIntruments(req, res) {
        
            if(!req.params.instrument) return res.status(400).json();

            const teachers = await models.Teacher.findAll({
                include: [
                    {
                        model: models.Instrument,
                        as: 'instruments',
                        through: { attributes: [] }
                    }
                ],
                where: {
                    title: req.params.instrument,
                }
            });

            if(!teachers) return res.status(204).json();

            return res.status(200).json(teachers);
        
    }
}

module.exports = TeacherController