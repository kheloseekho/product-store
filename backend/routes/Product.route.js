import express from "express"
import Product from "../models/Product.js";
import mongoose from "mongoose";
import { createProduct, deleteProduct, getProduct, updateProduct } from "../controller/product.controller.js";

const router = express.Router()

// Add Product
router.post("/product", createProduct)

// Delete Product
router.delete("/delete/:id", deleteProduct)

// Get Product
router.get("/allproduct", getProduct)

// Edit Product
router.put("/edit/:id", updateProduct)

export default router;