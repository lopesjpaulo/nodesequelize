const express = require('express');
const router = express.Router();
const { User } = require('../models/user');

router.get('/users', async (req, res) => {
    const users = await User.findAll({
        attributes: ['name', 'email']
    });
    res.send(users);
});

module.exports = router;