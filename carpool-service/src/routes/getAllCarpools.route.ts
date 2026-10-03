import express from 'express';
import { getAllRidesController } from '../controllers/getAllrides.controller.js';
import { authenticate } from 'auth-sdk/middleware';

const router = express.Router();

router.get('/rides', authenticate, getAllRidesController);

export default router;