import express from "express";

import { authenticate } from "auth-sdk";

import { getProjectByMeController } from "../controllers/getProjectsByme.controller.js";

const router = express.Router();

router.get("/me", authenticate, getProjectByMeController);

export default router;
