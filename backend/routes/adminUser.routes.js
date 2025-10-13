import express from 'express';
import { auth, admin } from '../middlewares/auth.middlewares.js';
import { addUser, deleteUser, getUsers, updateUser } from '../controllers/adminUser.controllers.js';

const router = express.Router();

// @route GET /api/admin/users
// @desc Get all users
// @access Private/Admin
router.get('/', auth, admin, getUsers);

// @route POST api/admin/users
// @desc Add a new user
// @access Private/Admin
router.post('/', auth, admin, addUser);

// @route PUT /api/admin/user/:id
// @desc Update user info - Name, email, role
// @access Private/Admin
router.put('/:id', auth, admin, updateUser);

// @route DELETE /api/admin/users/:id
// @desc Delete a user
// @access Private/Admin
router.delete('/:id', auth, admin, deleteUser);

export default router;
