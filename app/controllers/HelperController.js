const AWS = require('aws-sdk');
const models = require("./../models/index");
require('dotenv-safe').config();
const { isValid }  = require("../helpers/cpf");

class HelperController{
    static async url(req, res){
        try {
            const s3 = new AWS.S3({
              accessKeyId: process.env.ID,
              secretAccessKey: process.env.SECRET
            });

            const params = {
              Bucket: process.env.BUCKETNAME,
              Key: req.body.archive
            };

            s3.getSignedUrl('getObject', params, function (err, url) {
              return res.status(200).json(url)
            });
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    static async validEmail(req, res){
        try {
            const user = await models.User.findOne({
                where: {
                    email: req.body.email
                }
            });

            if(!user) return res.status(200).json({ used: false });

            return res.status(200).json({ used: true });
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    static async validCPF(req, res){
        try {
            const user = await models.Datauser.findOne({
                where: {
                    cpf: req.body.cpf
                }
            });

            if(user) return res.status(200).json({
                used: true,
                valid: false
            });


            const teacher = await models.Teacher.findOne({
                where: {
                    cpf: req.body.cpf
                }
            });

            if(teacher) return res.status(200).json({
                used: true,
                valid: false
            });

            if (isValid(req.body.cpf)) {
                return  res.status(200).json({
                    used: false,
                    valid: true
                });
            }

            return res.status(400).json({
                used: false,
                valid: false
            });
        } catch (error) {
            return res.status(500).json(error);
        }
    }
}

module.exports = HelperController;
