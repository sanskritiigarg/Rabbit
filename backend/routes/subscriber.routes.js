import express from 'express';
import { subscribe } from '../controllers/subscriber.controllers.js';

const router = express.Router();

// @route POST /api/subscribe
// @desc Handle newsletter subscriptions
// @access Public
router.post('/subscribe', subscribe);

export default router;
