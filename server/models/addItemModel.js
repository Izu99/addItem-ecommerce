const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const addItemSchema = new Schema({
  itemName: {
    type: String,
    // required: true,
  },
  itemDescription: {
    type: String,
    // required: true,
  },
  itemPrice: {
    type: Number,
  },
  itemCategory: {
    type: String,
    // required: true,
  },
  itemSubCategory: {
    type: String,
    // required: true,
  },

  itemImageUrl: {
    type: String,
  }
});

module.exports = mongoose.model('addItem', addItemSchema);
