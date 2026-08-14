import express from "express";

import { authenticate } from "auth-sdk";

import { getLostAndFoundByMeController } from "../controllers/getLost&FoundByme.controller.js";

const router = express.Router();

router.get("/me", authenticate, getLostAndFoundByMeController);

export default router;
