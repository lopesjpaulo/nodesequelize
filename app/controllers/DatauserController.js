const models = require("./../models/index")
const { validationResult } = require('express-validator')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

class DatauserController{
    static async index(req, res) {
        try {
            const datausers = await models.Datauser.findAll({
                include: [
                    {
                        model: models.User,
                        as: 'users',
                        attributes: ['id', 'name', 'lastname', 'email', 'pathImage']
                    }
                ]
            });

            if(!datausers) return res.status(204).json();

            return res.status(200).json(datausers);
        } catch (error) {
            return res.status(500).json({error});
        }
    }

    static async show(req, res){
        try {
            if(!req.params.id) return res.status(400).json();

            const datauser = await models.Datauser.findByPk(req.params.id, {
                include: [
                  {
                      model: models.User,
                      as: 'users',
                      attributes: ['id', 'name', 'lastname', 'email', 'pathImage']
                  }
                ]   
            });

            if(!datauser) return res.status(204).json();

            return res.status(200).json(datauser)
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    static async store(req, res) {
        const errors = validationResult(req);

        if(!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });

        try{
            const datauser = await models.Datauser.create(req.body);

            return res.status(200).json(datauser);
        }catch (error){
            return res.status(500).json({error});
        }
    }

    static async update(req, res) {
        try {
            if(!req.params.id) return res.status(400).json();

            const datauser = await models.Datauser.update(
                req.body,
                { where: { id: req.params.id }}
            );

            if(!datauser) return res.status(204).json();

            return res.status(200).json(datauser);
        } catch (error) {
            return res.status(500).json({error});
        }
    }

    static async destroy(req, res) {
        try {
            const datauser = await models.Datauser.destroy({
                where:{
                    id: req.params.id
                }
            });

            if(!datauser) return res.status(400).json();

            return res.status(200).json(datauser);
        } catch (error) {
            return res.status(500).json({error});
        }
    }

    static async getUser(req, res) {
        if(!req.params.id) return res.status(400).json();

        try {
            const datauser = await models.Datauser.findAll({
                where: {
                  userId: req.params.id,
                }
            });

            if(!datauser) return res.status(204).json();

            return res.status(200).json(datauser);
        } catch (error) {
            return res.status(500).json({error});
        }
    }
}

module.exports = DatauserController
