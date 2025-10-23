import express from 'express';
import multer from 'multer';

import { deleteFile, uploadFile } from '../controllers/upload.controllers.js';

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/upload', upload.single('image'), uploadFile);

router.post('/delete', deleteFile);

export default router;
