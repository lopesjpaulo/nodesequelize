const models = require("./../models/index")
const { validationResult } = require('express-validator')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

class DocumentController{
    static async index(req, res) {
        try {
            const documents = await models.Document.findAll({
                attributes: ['id', 'title', 'path'],
                include: [
                    {
                        model: models.User,
                        as: 'users',
                        attributes: ['id', 'name', 'lastname']
                    }
                ]
            });

            if(!documents) return res.status(204).json();

            return res.status(200).json(documents);
        } catch (error) {
            return res.status(500).json({error});
        }
    }

    static async show(req, res){
        try {
            if(!req.params.id) return res.status(400).json();

            const document = await models.Document.findByPk(req.params.id, {
                attributes: ['id', 'title', 'path'],
                include: [
                  {
                      model: models.User,
                      as: 'users',
                      attributes: ['id', 'name', 'lastname']
                  }
              ]
            });

            if(!document) return res.status(204).json();

            return res.status(200).json(document)
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    static async store(req, res) {
        const errors = validationResult(req);

        if(!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });

        try{
            const document = await models.Document.create(req.body);

            return res.status(200).json(document);
        }catch (error){
            return res.status(500).json({error});
        }
    }

    static async update(req, res) {
        try {
            if(!req.params.id) return res.status(400).json();

            const document = await models.Document.update(
                req.body,
                { where: { id: req.params.id }}
            );

            if(!document) return res.status(204).json();

            return res.status(200).json(document);
        } catch (error) {
            return res.status(500).json({error});
        }
    }

    static async destroy(req, res) {
        try {
            const document = await models.Document.destroy({
                where:{
                    id: req.params.id
                }
            });

            if(!document) return res.status(400).json();

            return res.status(200).json(document);
        } catch (error) {
            return res.status(500).json({error});
        }
    }

    static async getUser(req, res) {
        if(!req.params.id) return res.status(400).json();

        try {
            const documents = await models.Document.findAll({
                attributes: ['id', 'title', 'path', 'userId'],
                where: {
                  userId: req.params.id,
                },
                include: [
                  {
                      model: models.User,
                      as: 'users',
                      attributes: ['id', 'name', 'lastname']
                  }
              ]
            });

            if(!documents) return res.status(204).json();

            return res.status(200).json(documents);
        } catch (error) {
            return res.status(500).json({error});
        }
    }
}

module.exports = DocumentController
