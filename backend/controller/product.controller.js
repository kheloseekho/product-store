import Product from "../models/Product.js";
import mongoose from "mongoose";

// Create Product
export const createProduct = async (req, res) => {
    const {name, price, image} = req.body;

    if(!name || !price || !image)
    {         
        return res.status(400).json({message: "Fields cannot be empty"})
    }

    const newProduct = new Product({name, price, image})
    
    try {
        await newProduct.save()
        return res.status(201).json({success: true, data:newProduct})
    } catch (error) {
        console.log("Error in create product ", error.message)
        return res.status(500).json({success:false, message: "Server Error"});
    }
}

// Get Product
export const getProduct = async (req, res) => {
    try {
        const products = await Product.find({})
        return res.status(200).json({success: true, data:products})
    } catch (error) {
        console.log("Error Message", error.message);
        
        return res.status(500).json({success: false, message: "Server Error"})
    }
}

// Delete Product
export const deleteProduct =  async (req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(req.params.id))
    {
        return res.status(404).json({success: false, message:"Invalid Product Id"})
    }

    try {
        await Product.findByIdAndDelete(id);
        return res.status(201).json({success: true, message: "Product Deleted"})
    } catch (error) {
        return res.status(404).json({success: false, message: "Product not found"})
    }  
}

// Update Product
export const updateProduct = async (req, res) => {

    const {id} = req.params;
    const {name, price, image} = req.body;
    
    if(!mongoose.Types.ObjectId.isValid(req.params.id))
    {
        return res.status(404).json({success: false, message:"Invalid Product Id"})
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, {name, price, image}, {new: true})
        return res.status(200).json({success: true, data: updatedProduct})
    } catch (error) {
        console.log("Error", error.message);
        
        res.status(500).json({success: false, message: "Server Error"})
    }

}