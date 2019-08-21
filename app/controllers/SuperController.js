const models = require("../models/index")
const { validationResult } = require("express-validator")

class SuperController{
    constructor(model){
        this.model = model;
    }

    static async index(req, res){
        const model = this.model;
        const item = await models.model.findAll();

        if(!item) return res.status(204).json();
        
        return res.json(item);
    }
}

module.exports = SuperController