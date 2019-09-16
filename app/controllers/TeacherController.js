const models = require("../models/index")
const { validationResult } = require("express-validator")

class TeacherController{
    static async index(req, res) {
        try {
            const teachers = await models.Teacher.findAll({
                attributes: ['id', 'name', 'email', 'birthday', 'state', 'city', 'phone', 'cpf', 'valueOne', 'valueFive', 'valueTen'],
                include: [
                    {
                        model: models.Instrument,
                        as: 'instruments',
                        attributes: ['id', 'title']
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

            const teacher = await models.Teacher.findByPk(req.params.id, {
                attributes: ['id', 'name', 'email', 'birthday', 'state', 'city', 'phone', 'cpf', 'valueOne', 'valueFive', 'valueTen'],
                include: [
                    {
                        model: models.Instrument,
                        as: 'instruments',
                        attributes: ['id', 'title']
                    }
                ]
            });

            if(!teacher) return res.status(204).json();

            return res.status(200).json(teacher)
        } catch (error) {
            return res.status(500).json({error});
        }
    }
}

module.exports = TeacherController