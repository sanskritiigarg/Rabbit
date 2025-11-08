import express from 'express';
import {
  getProductsByCategory,
  getProductByID,
  getSimilarProducts,
  getBestSeller,
  getNewArrivals,
  addUserReview,
  updateUserReview,
  deleteUserReview,
} from '../controllers/product.controllers.js';
import { auth } from '../middlewares/auth.middlewares.js';

const router = express.Router();

// @route GET /api/products
// @desc Get all products with optimal query filters
// @access Public
router.get('/', getProductsByCategory);

// @route GET /api/products/best-seller
// @desc Get best selling products
// @access Public
router.get('/best-seller', getBestSeller);

// @route GET /api/products/new-arrivals
// @desc Get first 8 new products by creation date
// @access Public
router.get('/new-arrivals', getNewArrivals);

// @route GET /api/products/:id
// @desc Get product by ID
// @access Public
router.get('/:id', getProductByID);

// @route GET /api/products/similar/:id
// @desc Get similar products to current product
// @access Public
router.get('/similar/:id', getSimilarProducts);

// @ route POST /api/products/:id/review
// @desc Post a review for a product by a logged-in user
// @access Private
router.post('/:id/review', auth, addUserReview);

// @ route PUT /api/products/:id/review/:reviewId
// @desc Update existing review for a product by a logged-in user
// @access Private
router.put('/:id/review/:reviewId', auth, updateUserReview);

// @ route DELETE /api/products/:id/review/:reviewId
// @desc Delete a users review
// @access Private
router.delete('/:id/review/:reviewId', auth, deleteUserReview);

export default router;
