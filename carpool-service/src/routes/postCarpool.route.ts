import express from "express";
import { createRideController } from "../controllers/createRide.controller.js";
import { authenticate } from "auth-sdk";

const router = express.Router();

router.post("/post", authenticate, createRideController);

export default router;