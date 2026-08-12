import express from "express";
import { createRideController } from "../controllers/createRide.controller";
import { authenticate } from "auth-sdk";

const router = express.Router();

router.post("/create", authenticate, createRideController);

export default router;