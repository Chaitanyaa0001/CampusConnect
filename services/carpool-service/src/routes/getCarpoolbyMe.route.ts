import express from "express";

import { authenticate } from "auth-sdk";

import { getcarpoolbyme } from "../controllers/getCarpool.me.controller.js";

const router = express.Router();

router.get("/me", authenticate, getcarpoolbyme);

export default router;
