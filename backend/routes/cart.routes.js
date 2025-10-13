import express from 'express';
import { auth } from '../middlewares/auth.middlewares.js';
import {
  addCartItem,
  deleteCartItem,
  getUserCart,
  mergeCart,
  updateCartItem,
} from '../controllers/cart.controllers.js';

const router = express.Router();

// @route POST /api/cart
// @desc Add a product to the cart for a guest or logged in user
// @access Public
router.post('/', addCartItem);

// @route PUT /api/cart
// @desc Update product quantity in the cart for a guest or user
// @access Public
router.put('/', updateCartItem);

// @route DELETE /api/cart
// @desc Remove a product from the cart
// @router Public
router.delete('/', deleteCartItem);

// @router GET /api/cart
// @desc Get user's cart
// @access Public
router.get('/', getUserCart);

// @route POST /api/cart/merge
// @desc Merge guest cart into user cart on login
// @access Private
router.post('/merge', auth, mergeCart);

export default router;
