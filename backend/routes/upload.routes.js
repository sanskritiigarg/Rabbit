import express from 'express';
import multer from 'multer';

import { uploadFile } from '../controllers/upload.controllers.js';

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/', upload.single('image'), uploadFile);

export default router;
