import express from 'express';
import {getAllProjectsController} from '../controllers/getAllProjects.controller.js';
import { authenticate } from 'auth-sdk/middleware';

const router = express.Router();

router.get("/", authenticate, getAllProjectsController);

export default router;