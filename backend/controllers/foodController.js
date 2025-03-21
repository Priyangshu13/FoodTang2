import foodModel from "../models/foodModel.js";
import fs from 'fs'; // Import fs for file system operations
import path from 'path'; // Import path for path operations

// Add food item
const addFood = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    const image_filename = req.file.filename;

    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename
    });

    try {
        await food.save();
        res.json({ success: true, message: "Food Added" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error" });
    }
};

// List all food items
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.json({ success: true, data: foods });
    } catch (error) {
        console.error(error); // Changed to console.error for consistency
        res.status(500).json({ success: false, message: "Error" });
    }
};

// Remove food item
const removeFood = async (req, res) => {
    if (!req.body.id) {
        return res.status(400).json({ success: false, message: "No ID provided" });
    }

    try {
        const food = await foodModel.findById(req.body.id);
        if (!food) {
            return res.status(404).json({ success: false, message: "Food not found" });
        }

        // Construct file path
        const filePath = path.join('uploads', food.image);

        // Delete the file
        fs.unlink(filePath, (err) => {
            if (err) {
                console.error("File deletion error:", err);
                return res.status(500).json({ success: false, message: "Error deleting file" });
            }
        });

        await foodModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Food Removed" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error" });
    }
};

export { addFood, listFood, removeFood };
