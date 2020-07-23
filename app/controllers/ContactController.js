const models = require("./../models/index")
const { validationResult } = require('express-validator')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

class ContactController{
    static async index(req, res) {
        try {
            const contacts = await models.Contact.findAll({
                attributes: ['id', 'subject', 'text'],
                include: [
                    {
                        model: models.User,
                        as: 'users',
                        attributes: ['id', 'name', 'lastname']
                    },
                    {
                        model: models.Schedule,
                        as: 'schedules',
                        attributes: ['id']
                    }
                ]
            });

            if(!contacts) return res.status(204).json();

            return res.status(200).json(contacts);
        } catch (error) {
            return res.status(500).json({error});
        }
    }

    static async show(req, res){
        try {
            if(!req.params.id) return res.status(400).json();

            const contact = await models.Contact.findByPk(req.params.id, {
                attributes: ['id', 'subject', 'text'],
                include: [
                    {
                        model: models.User,
                        as: 'users',
                        attributes: ['id', 'name', 'lastname']
                    },
                    {
                        model: models.Schedule,
                        as: 'schedules',
                        attributes: ['id']
                    }
                ]
            });

            if(!contact) return res.status(204).json();

            return res.status(200).json(contact)
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    static async store(req, res) {
        const errors = validationResult(req);

        if(!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });

        try{
            const contact = await models.Contact.create({...req.body, userId: req.userId});

            return res.status(200).json(contact);
        }catch (error){
            return res.status(500).json({error});
        }
    }

    static async update(req, res) {
        try {
            if(!req.params.id) return res.status(400).json();

            const contact = await models.Contact.update(
                req.body,
                { where: { id: req.params.id }}
            );

            if(!contact) return res.status(204).json();

            return res.status(200).json(contact);
        } catch (error) {
            return res.status(500).json({error});
        }
    }

    static async destroy(req, res) {
        try {
            const contact = await models.Contact.destroy({
                where:{
                    id: req.params.id
                }
            });

            if(!contact) return res.status(400).json();

            return res.status(200).json(contact);
        } catch (error) {
            return res.status(500).json({error});
        }
    }

    static async getUser(req, res) {
        if(!req.params.id) return res.status(400).json();

        try {
            const contacts = await models.Contact.findAll({
                where: {
                  userId: req.params.id,
                }
            });

            if(!contacts) return res.status(204).json();

            return res.status(200).json(contacts);
        } catch (error) {
            return res.status(500).json({error});
        }
    }

    static async getSchedule(req, res) {
      if(!req.params.id) return res.status(400).json();

      try {
          const contacts = await models.Contact.findAll({
              where: {
                scheduleId: req.params.id,
              }
          });

          if(!contacts) return res.status(204).json();

          return res.status(200).json(contacts);
      } catch (error) {
          return res.status(500).json({error});
      }
  }
}

module.exports = ContactController
