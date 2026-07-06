import express from "express";
import { createRidecontroller } from "../controllers/createRide.controller";
import { authenticate } from "auth-sdk";

const router = express.Router();

router.post("/create", authenticate, createRidecontroller);

export default router;