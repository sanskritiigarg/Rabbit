import express from 'express';
import { auth, admin } from '../middlewares/auth.middlewares.js';
import {
  getProducts,
  deleteProduct,
  updateProduct,
  createProduct,
} from '../controllers/adminProduct.controllers.js';

const router = express.Router();

// @route GET /api/admin/products
// @desc Get all products
// @access Private/Admin
router.get('/', auth, admin, getProducts);

// @route DELETE /api/admin/products/:id
// @desc Delelte a product
// @access Private/Admin
router.delete('/:id', auth, admin, deleteProduct);

// @route POST /api/admin/products/add
// @desc Add new product
// @access Private/Admin
router.post('/', auth, admin, createProduct);

// @route PUT /api/admin/products/edit
// @desc Edit existing product
// @access Private/Admin
router.put('/:id', auth, admin, updateProduct);

export default router;
