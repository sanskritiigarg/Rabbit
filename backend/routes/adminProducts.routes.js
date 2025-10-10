import express from "express";
import {auth, admin} from "../middlewares/auth.middlewares.js";
import { getProducts } from "../controllers/adminProduct.controllers.js";

const router = express.Router();

// @route GET /api/admin/products
// @desc Get all products
// @access Private/Admin
router.get("/", auth, admin, getProducts);

// @route POST /api/admin/products/add
// @desc Add new product
// @access Private/Admin


// @route POST /api/admin/products/edit
// @desc Edit existing product
// @access Private/Admin


export default router;