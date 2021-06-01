const express = require('express');
const router = express.Router();

router.get('', (req, res) => {
    res.send('Welcome to Didly :)');
    //res.render('index', { title: "Didly App", message: "Welcome to Didly :)" });
});

module.exports = router;