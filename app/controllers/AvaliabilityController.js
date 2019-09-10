const models = require("./../models/index")
const { validationResult } = require('express-validator')

class AvaliabilityController{
    static async index(req, res) {
        try {
            const avaliabilites = await models.Avaliability.findAll({
                include: [
                    {
                        model: models.Teacher,
                        as: 'teachers',
                        attributes: ['name', 'valueOne', 'valueFive', 'valueTen']
                    }
                ]
            });

            if(!avaliabilites) return res.status(204).json();
        
            return res.status(200).json(avaliabilites);
        } catch (error) {
            return res.status(500).json({error});
        }
    }

    static async show(req, res) {
        try {
            if(!req.params.id) return res.status(400).json();

            const avaliability = await models.Avaliability.findByPk(req.params.id, {
                include: [
                    {
                        model: models.Teacher,
                        as: 'teachers',
                        attributes: ['name', 'valueOne', 'valueFive', 'valueTen']
                    }
                ]
            });

            if(!avaliability) return res.status(204).json();

            return res.status(200).json(avaliability)
        } catch (error) {
            return res.status(500).json({error})
        }
    }

    static async store(req, res) {
        const errors = validationResult(req);

        if(!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });
        
        try{
            const avaliability = await models.Avaliability.create(req.body);
            return res.status(200).json(avaliability);
        }catch (error){
            return res.status(500).json({error});
        }    
    }

    static async available(req, res) {
        try {
            let params = req.body;
            params.busy = 0;
            const avaliability = await models.Avaliability.findAll({
                where: params,
                include: [
                    {
                        model: models.Teacher,
                        as: 'teachers',
                        attributes: ['name', 'valueOne', 'valueFive', 'valueTen']
                    }
                ]
            });

            if(!avaliability) return res.status(204).json();

            return res.status(200).json(avaliability);
        } catch (error) {
            return res.status(500).json({error});
        }
    }

    static async update(req, res) {
        try {
            if(!req.params.id) return res.status(400).json();

            const user = await models.User.update(
                req.body,
                { where: { id: req.params.id }}
            );

            if(!user) return res.status(204).json();

            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).json({error});
        }
    }

    static async destroy(req, res) {
        try {
            const user = await models.User.destroy({
                where:{
                    id: req.params.id
                }
            });
    
            if(!user) return res.status(400).json();
    
            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).json({error});
        }
        
    }
}

module.exports = AvaliabilityController