const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    res.render('capacity', {
        layout: false
    });
  });

module.exports = router;