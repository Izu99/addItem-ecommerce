// addItemController.js

const express = require('express');
const router = express.Router();
const Image = require('../models/addItemModel');

// Handle a POST request to save an item
router.post('/', (req, res) => {
  const { itemName, itemDescription, itemPrice, itemCategory, itemSubCategory, itemImageUrl } = req.body;

  const newItem = new Image({ 
    itemName: itemName,
    itemDescription: itemDescription,
    itemPrice: itemPrice,
    itemCategory: itemCategory,
    itemSubCategory: itemSubCategory,
    itemImageUrl: itemImageUrl
  });

  newItem.save()
    .then(() => res.json('Item saved to database'))
    .catch((error) => res.status(400).json('Error: ' + error));
});

// Handle a GET request to retrieve all items
router.get('/', (req, res) => {
  Image.find()
    .then((items) => res.json(items))
    .catch((error) => res.status(400).json('Error: ' + error));
});

module.exports = router;
