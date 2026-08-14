import express from 'express';
import { authenticate } from 'auth-sdk/middleware';
import { getAllLostAndFoundController } from '../controllers/getAllLost&Found.controller.js';

const router = express.Router();

router.get('/rides', authenticate, getAllLostAndFoundController);

export default router;