import express from 'express';
import { getAllRidesController } from '../controllers/getAllrides.controller';
import { authenticate } from 'auth-sdk/middleware';

const router = express.Router();

router.get('/',authenticate,getAllRidesController);

export default router;