import express from 'express';
import { auth } from '../middlewares/auth.middlewares.js';
import { getOrder, getUserOrders } from '../controllers/order.controllers.js';

const router = express.Router();

// @route api/orders/my-orders
// @desc Get all the past orders of logged-in users
// @access Private
router.get('/my-orders', auth, getUserOrders);

// @route api/orders/:id
// @desc Get order details by id
// @access Private
router.get('/:id', auth, getOrder);

export default router;
