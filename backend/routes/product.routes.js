import express from "express";
import { createProduct, deleteProduct, updateProduct } from "../controllers/product.controllers.js";
import { admin, auth } from "../middlewares/auth.middlewares.js";

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

export default router;