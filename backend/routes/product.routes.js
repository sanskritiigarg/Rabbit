import express from "express";
import { createProduct, deleteProduct, updateProduct, getProductsByCategory, getProductByID, getSimilarProducts, getBestSeller, getNewArrivals } from "../controllers/product.controllers.js";
import { admin, auth } from "../middlewares/auth.middlewares.js";
import { get } from "mongoose";

const router = express.Router();

// @route POST .api.products
// @desc Create a new Product
// @access Private/Admin
router.post("/", auth, admin,createProduct);


//@route PUT /api/products/:id
// @desc Update an existing product
// @access Private/Admin
router.put("/:id", auth, admin, updateProduct);


// @route DELETE /api/products/:id
// @desc Delelte a product
// @access Private/Admin
router.delete("/:id", auth, admin, deleteProduct);


// @route GET /api/products
// @desc Get all products with optimal query filters
// @access Public
router.get("/", getProductsByCategory);

// @route GET /api/products/best-seller
// @desc Get best selling products
// @access Public
router.get("/best-seller", getBestSeller);

// @route GET /api/products/new-arrivals
// @desc Get first 8 new products by creation date
// @access Public
router.get("/new-arrivals", getNewArrivals);

// @route GET /api/products/:id
// @desc Get product by ID
// @access Public
router.get("/:id", getProductByID);

// @route GET /api/products/similar/:id
// @desc Get similar products to current product
// @access Public
router.get("/similar/:id", getSimilarProducts);

export default router;