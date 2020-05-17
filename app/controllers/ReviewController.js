const models = require("./../models/index")
const { validationResult } = require('express-validator')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

class ReviewController{
    static async index(req, res) {
        try {
            const reviews = await models.Review.findAll({
                attributes: ['id', 'rating', 'comment'],
                include: [
                    {
                        model: models.Schedule,
                        as: 'schedules',
                        attributes: ['id', 'userId', 'finishedAt'],
                        include: [
                            {
                                model: models.Avaliability,
                                as: 'avaliabilities',
                                attributes: ['id', 'date'],
                                include: [
                                    {
                                        model: models.Teacher,
                                        as: 'teachers',
                                        attributes: ['id', 'name', 'email']
                                    }
                                ]
                            }
                        ]
                    }
                ]
            });

            if(!reviews) return res.status(204).json();

            return res.status(200).json(reviews);
        } catch (error) {
            return res.status(500).json({error});
        }
    }

    static async show(req, res) {
        try {
            if(!req.params.id) return res.status(400).json();

            const review = await models.Review.findByPk(req.params.id, {
                attributes: ['id', 'rating', 'comment'],
                include: [
                    {
                        model: models.Schedule,
                        as: 'schedules',
                        attributes: ['id', 'userId', 'finishedAt'],
                        include: [
                            {
                                model: models.Avaliability,
                                as: 'avaliabilities',
                                attributes: ['id', 'date'],
                                include: [
                                    {
                                        model: models.Teacher,
                                        as: 'teachers',
                                        attributes: ['id', 'name', 'email']
                                    }
                                ]
                            }
                        ]
                    }
                ]
            });

            if(!review) return res.status(204).json();

            return res.status(200).json(review);
        } catch (error) {
            return res.status(500).json({error});
        }
    }

    static async getTeacher(req, res) {
        if(!req.params.id) return res.status(400).json();

        try {
            const reviews = await models.Review.findAll({
                attributes: ['id', 'rating', 'comment'],
                include: [
                    {
                        model: models.Schedule,
                        as: 'schedules',
                        attributes: ['id', 'userId', 'finishedAt'],
                        required: true,
                        include: [
                            {
                                model: models.Avaliability,
                                as: 'avaliabilities',
                                attributes: ['id', 'date'],
                                required: true,
                                include: [
                                    {
                                        model: models.Teacher,
                                        as: 'teachers',
                                        attributes: ['id', 'name', 'email'],
                                        required: true
                                    }
                                ],
                                where: {
                                    teacherId: req.params.id
                                }
                            }
                        ]
                    }
                ]
            });

            if(!reviews) return res.status(204).json();

            return res.status(200).json(reviews);
        } catch (error) {
            return res.status(500).json({error});
        }
    }

    static async store(req, res) {
        const errors = validationResult(req);

        if(!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });

        try{
            const review = await models.Review.create(req.body);

            return res.status(200).json(review);
        }catch (error){
            return res.status(500).json({error});
        }
    }

    static async update(req, res) {
        try {
            if(!req.params.id) return res.status(400).json();

            const review = await models.Review.update(
                req.body,
                { where: { id: req.params.id }}
            );

            if(!review) return res.status(204).json();

            return res.status(200).json(review);
        } catch (error) {
            return res.status(500).json({error});
        }
    }

    static async destroy(req, res) {
        try {
            const review = await models.Review.destroy({
                where:{
                    id: req.params.id
                }
            });

            if(!review) return res.status(400).json();

            return res.status(200).json(review);
        } catch (error) {
            return res.status(500).json({error});
        }
    }
}

module.exports = ReviewController
