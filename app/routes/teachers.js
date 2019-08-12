const express = require('express');
const router = express.Router();
const { Teacher } = require('../models/teacher');

router.get('/teachers', (req, res) => {
    const teachers = Teacher.findAll();
    res.send(teachers);
});

module.exports = router;