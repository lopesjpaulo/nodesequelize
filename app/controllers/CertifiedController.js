const models = require("./../models/index")
const { validationResult } = require('express-validator')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

class CertifiedController{
    static async index(req, res) {
        try {
            const certifieds = await models.Certified.findAll({
                attributes: ['id', 'title', 'path'],
                include: [
                    {
                        model: models.Teacher,
                        as: 'teachers',
                        attributes: ['id', 'name', 'type']
                    }
                ]
            });

            if(!certifieds) return res.status(204).json();

            return res.status(200).json(certifieds);
        } catch (error) {
            return res.status(500).json({error});
        }
    }

    static async show(req, res){
        try {
            if(!req.params.id) return res.status(400).json();

            const certified = await models.Certified.findByPk(req.params.id, {
                attributes: ['id', 'title', 'path'],
                include: [
                  {
                      model: models.Teacher,
                      as: 'teachers',
                      attributes: ['id', 'name', 'type']
                  }
              ]
            });

            if(!certified) return res.status(204).json();

            return res.status(200).json(certified)
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    static async store(req, res) {
        const errors = validationResult(req);

        if(!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });

        try{
            const certified = await models.Certified.bulkCreate(req.body);

            return res.status(200).json(certified);
        }catch (error){
            return res.status(500).json({error});
        }
    }

    static async update(req, res) {
        try {
            if(!req.params.id) return res.status(400).json();

            const certified = await models.Certified.update(
                req.body,
                { where: { id: req.params.id }}
            );

            if(!certified) return res.status(204).json();

            return res.status(200).json(certified);
        } catch (error) {
            return res.status(500).json({error});
        }
    }

    static async destroy(req, res) {
        try {
            const certified = await models.Certified.destroy({
                where:{
                    id: req.params.id
                }
            });

            if(!certified) return res.status(400).json();

            return res.status(200).json(certified);
        } catch (error) {
            return res.status(500).json({error});
        }
    }

    static async getTeacher(req, res) {
        if(!req.params.id) return res.status(400).json();

        try {
            const certifieds = await models.Certified.findAll({
                attributes: ['id', 'title', 'path', 'teacherId'],
                where: {
                  teacherId: req.params.id,
                }
            });

            if(!certifieds) return res.status(204).json();

            return res.status(200).json(certifieds);
        } catch (error) {
            return res.status(500).json({error});
        }
    }
}

module.exports = CertifiedController
