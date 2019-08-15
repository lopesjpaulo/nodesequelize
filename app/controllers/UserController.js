const models = require("./../models/index")

class UserController{
    static async index(req, res) {
        const users = await models.User.findAll()

        if(!users) return res.status(204).json()
        
        return res.json(users)
    }

    static async store(req, res) {
        const user = await models.User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            createdAt: req.body.createdAt,
            updatedAt: req.body.updatedAt
        })
        
        if(!user) return res.status(400).json()
        
        return res.json(user)
    }
}

module.exports = UserController