import express from 'express';
import {
  deleteOrder,
  getOrders,
  updateOrderStatus,
} from '../controllers/adminOrder.controllers.js';
import { admin, auth } from '../middlewares/auth.middlewares.js';

const router = express.Router();

// @route GET /api/admin/orders
// @desc Get all orders
// @access Private/admin
router.get('/', auth, admin, getOrders);

// @route PUT /api/admin/orders/:id
// @desc Update order status
// @access Private/admin
router.put('/:id', auth, admin, updateOrderStatus);

// @route DELETE /api/admin/orders/:id
// @desc Delete an order
// @access Private/admin
router.delete('/:id', auth, admin, deleteOrder);

export default router;
