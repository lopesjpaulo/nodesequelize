const models = require("./../models/index")
const Sequelize = require('sequelize')

class BankController{
    static async index(req, res) {
        try {
            const banks = await models.Bank.findAll({
                attributes: ['id', 'value', 'label']
            });

            if(!banks) return res.status(204).json();

            return res.status(200).json(banks);
        } catch (error) {
            return res.status(500).json({error});
        }
    }

    static async show(req, res){
        try {
            if(!req.params.id) return res.status(400).json();

            const databank = await models.Bank.findByPk(req.params.id, {
                attributes: ['id', 'value', 'label']
            });

            if(!databank) return res.status(204).json();

            return res.status(200).json(databank)
        } catch (error) {
            return res.status(500).json(error);
        }
    }
}

module.exports = BankController
