const mongoose = require('mongoose');

// Category schema
const categorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    subcategories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subcategory' }]
});

// Subcategory schema
const subcategorySchema = new mongoose.Schema({
    name: { type: String, required: true }
});

// Item schema
const itemSchema = new mongoose.Schema({
    itemName: { type: String, required: true },
    itemDescription: { type: String },
    itemPrice: { type: Number, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    subcategory: { type: mongoose.Schema.Types.ObjectId, ref: 'Subcategory' },
    itemImageUrl: { type: String, required: true },
    itemTags: [{type: String, required: true}]
});

// Define models
const Category = mongoose.model('Category', categorySchema);
const Subcategory = mongoose.model('Subcategory', subcategorySchema);
const Item = mongoose.model('Item', itemSchema);

module.exports = { Category, Subcategory, Item };
