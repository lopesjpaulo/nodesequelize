const AWS = require('aws-sdk');
require('dotenv-safe').config();

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
}

module.exports = HelperController
