const models = require("./../models/index")
const { validationResult } = require('express-validator')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

class CategoryController{
    static async index(req, res) {
        try {
            const categories = await models.Category.findAll({
                attributes: [ 'id', 'title']
            });

            if(!categories) return res.status(204).json();

            return res.status(200).json(categories);
        } catch (error) {
            return res.status(500).json({error});
        }
    }

    static async show(req, res){
        try {
            if(!req.params.id) return res.status(400).json();

            const category = await models.Category.findByPk(req.params.id, {
                attributes: ['id', 'title']
            });

            if(!category) return res.status(204).json();

            return res.status(200).json(category)
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    static async store(req, res) {
        const errors = validationResult(req);

        if(!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });

        try{
            const category = await models.Category.create(req.body);

            return res.status(200).json(category);
        }catch (error){
            return res.status(500).json({error});
        }
    }

    static async update(req, res) {
        try {
            if(!req.params.id) return res.status(400).json();

            const category = await models.Category.update(
                req.body,
                { where: { id: req.params.id }}
            );

            if(!category) return res.status(204).json();

            return res.status(200).json(category);
        } catch (error) {
            return res.status(500).json({error});
        }
    }

    static async destroy(req, res) {
        try {
            const category = await models.Category.destroy({
                where:{
                    id: req.params.id
                }
            });

            if(!category) return res.status(400).json();

            return res.status(200).json(category);
        } catch (error) {
            return res.status(500).json({error});
        }
    }
}

module.exports = CategoryController
