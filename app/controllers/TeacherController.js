const models = require("../models/index")
const { validationResult } = require("express-validator")

class TeacherController{
    static async index(req, res) {
        try {
            const teachers = await models.Teacher.findAll();

            if(!teachers) return res.status(204).json();
            
            return res.status(200).json(teachers);
        } catch (err) {
            return res.status(500).json({err});
        }
    }

    static async show(req, res) {
        try {
            if(!req.params.id) return res.status(400).json();

            const instrument = await models.Instrument.findByPk(req.params.id);

            if(!instrument) return res.status(204).json();

            return res.status(200).json(instrument)
        } catch (error) {
            return res.status(500).json({error});
        }
    }
}

module.exports = TeacherController