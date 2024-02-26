const express = require('express');
const router = express.Router();
const addItemController = require('../controllers/addItemController');

router.use('/items', addItemController);

module.exports = router;