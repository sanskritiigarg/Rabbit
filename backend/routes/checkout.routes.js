import express from "express";
import {auth} from "../middlewares/auth.middlewares.js";
import { createCheckoutSession, finalizeCheckout, updatePayment } from "../controllers/checkout.controllers.js";

const router = express.Router();

// @route POST /api/checkout
// @desc Create a new checkout session
// @access Private
router.post("/", auth, createCheckoutSession);

// @route PUT /api/checkout/:id/pay
// @desc Update payment status after succesful payment
// @access Private
router.put("/:id/pay", auth, updatePayment);

// @route POST /api/checkout/:id/finalize
// @desc Finalize checkout and convert it into order
// @access Private
router.post("/:id/finalize", auth, finalizeCheckout);

export default router;