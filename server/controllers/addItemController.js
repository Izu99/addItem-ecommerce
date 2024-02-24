const express = require('express');
const router = express.Router();
const Image = require('../models/addItem');

// Handle a POST request to save an image URL
router.post('/', (req, res) => {
  const newImage = new Image({ itemImageUrl: req.body.itemImageUrl });
  newImage.save()
    .then(() => res.json('Image URL saved to database'))
    .catch((error) => res.status(400).json('Error: ' + error));
});

// Handle a GET request to retrieve all image URLs
router.get('/', (req, res) => {
  Image.find()
    .then((images) => res.json(images))
    .catch((error) => res.status(400).json('Error: ' + error));
});

module.exports = router;
