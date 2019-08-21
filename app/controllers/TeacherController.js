const models = require("../models/index")
const { validationResult } = require("express-validator")

class TeacherController{
    static async index(req, res) {
        const teachers = await models.Teacher.findAll();

        if(!teachers) return res.status(204).json();
        
        return res.json(teachers);
    }
}

module.exports = TeacherController