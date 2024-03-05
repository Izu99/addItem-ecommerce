const express = require("express");
const router = express.Router();
const { Item, Category, Subcategory } = require("../models/addItemModel");

// Handle a POST request to save an item
router.post("/", async (req, res) => {
    try {
        const {
            itemName,
            itemDescription,
            itemPrice,
            itemCategory,
            itemSubCategory,
            itemTags,
            itemImageUrl,
        } = req.body;

        const tagArray = itemTags.split(",").map((tag) => tag.trim());

        const newItem = new Item({
            itemName: itemName,
            itemDescription: itemDescription,
            itemPrice: itemPrice,
            itemCategory: itemCategory,
            itemSubCategory: itemSubCategory,
            itemTags: tagArray,
            itemImageUrl: itemImageUrl,
        });

        const savedItem = await newItem.save();
        res.status(201).json({ message: "Item saved successfully", item: savedItem });
    } catch (error) {
        res.status(400).json({ message: "Error saving item", error: error });
    }
});

// Handle a GET request to retrieve all items
router.get("/", (req, res) => {
    Item.find()
        .then((items) => res.json(items))
        .catch((error) => res.status(400).json({ message: "Error: " + error }));
});

// Handle a GET request to retrieve a single item by ID
router.get("/:id", (req, res) => {
    const itemId = req.params.id; // Extract the item ID from the URL

    Item.findById(itemId)
        .then((item) => {
            if (!item) {
                return res.status(404).json({ message: "Item not found" });
            }
            res.json(item); // Return the item details
        })
        .catch((error) => res.status(400).json({ message: "Error: " + error }));
});

// Handle a PUT request to update an item by ID
router.put("/:id", async (req, res) => {
    try {
        const itemId = req.params.id; // Extract the item ID from the URL
        const {
            itemName,
            itemDescription,
            itemPrice,
            itemCategory,
            itemSubCategory,
            itemImageUrl,
        } = req.body;

        const updatedItem = await Image.findByIdAndUpdate(
            itemId,
            {
                itemName: itemName,
                itemDescription: itemDescription,
                itemPrice: itemPrice,
                itemCategory: itemCategory,
                itemSubCategory: itemSubCategory,
                itemImageUrl: itemImageUrl,
            },
            { new: true }
        );

        if (!updatedItem) {
            return res.status(404).json({ message: "Item not found" });
        }

        res.json({ message: "Item updated successfully", item: updatedItem });
    } catch (error) {
        res.status(400).json({ message: "Error updating item", error: error });
    }
});

// Handle a DELETE request to delete an item by ID
router.delete("/:id", async (req, res) => {
    try {
        const itemId = req.params.id; // Extract the item ID from the URL

        const deletedItem = await Image.findByIdAndDelete(itemId);

        if (!deletedItem) {
            return res.status(404).json({ message: "Item not found" });
        }

        res.json({ message: "Item deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: "Error deleting item", error: error });
    }
});

// Create a new category
router.post('/categories', async (req, res) => {
    try {
        const { name } = req.body;
        const category = new Category({ name });
        await category.save();
        res.status(201).json({ message: 'Category created successfully', category });
    } catch (error) {
        res.status(400).json({ message: 'Error creating category', error: error.message });
    }
});

// Get all categories
router.get('/categories', async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving categories', error: error.message });
    }
});

// Create a new subcategory
router.post('/subcategories', async (req, res) => {
    try {
        const { name, categoryId } = req.body;
        const subcategory = new Subcategory({ name, category: categoryId });
        await subcategory.save();
        res.status(201).json({ message: 'Subcategory created successfully', subcategory });
    } catch (error) {
        res.status(400).json({ message: 'Error creating subcategory', error: error.message });
    }
});

// Get all subcategories for a specific category
router.get('/subcategories/:categoryId', async (req, res) => {
    try {
        const { categoryId } = req.params;
        const subcategories = await Subcategory.find({ category: categoryId });
        res.json(subcategories);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving subcategories', error: error.message });
    }
});

module.exports = router;
