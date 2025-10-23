import express from 'express';
import {
  getProductsByCategory,
  getProductByID,
  getSimilarProducts,
  getBestSeller,
  getNewArrivals,
} from '../controllers/product.controllers.js';

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

export default router;
