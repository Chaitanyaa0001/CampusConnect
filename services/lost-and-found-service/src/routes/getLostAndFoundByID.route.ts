import express from "express";
import { authenticate } from "auth-sdk";

import { getLostAndFoundByIdController } from "../controllers/getLost&FoundbyId.controller.js";

const router = express.Router();

router.get("/:id", authenticate, getLostAndFoundByIdController);

export default router;