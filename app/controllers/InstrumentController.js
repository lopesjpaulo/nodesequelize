const models = require('../models/index')
const { validationResult } = require('express-validator')

class InstrumentController{
    static async index(req, res){
        const instruments = await models.Instrument.findAll();

        if(!instruments) return res.status(204).json();

        return res.json(instruments);
    }
}

module.exports = InstrumentController