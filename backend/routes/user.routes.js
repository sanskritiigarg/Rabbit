import express from "express";
import { registerUser, loginUser, getProfile } from "../controllers/user.controllers.js";
import {auth} from "../middlewares/auth.middlewares.js";

const router = express.Router();

// @route POST /api/users/register
// @desc Register a new user
// @access public
router.post("/register", registerUser);

// @route POST /api/users/login
// @desc Authenticate user
// @access public
router.post("/login", loginUser);

// @route GET /api/users/profile
// @desc logged-in user's profile
// @access private
router.get("/profile", auth, getProfile);

export default router;
