import express from "express";
import { authenticate } from "auth-sdk";

import { getProjectByIdController } from "../controllers/getProjectsbyId.controller.js";

const router = express.Router();

router.get("/:id", authenticate, getProjectByIdController);

export default router;