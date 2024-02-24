const express = require('express');
const router = express.Router();
const imageController = require('../controllers/addItemController');

router.use('/images', imageController);

module.exports = router;