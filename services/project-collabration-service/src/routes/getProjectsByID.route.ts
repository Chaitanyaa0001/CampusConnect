import express from "express";
import { authenticate } from "auth-sdk";

import { getCarpoolbyIdController } from "../controllers/getCarpoolbyId.controller";

const router = express.Router();

router.get("/:id", authenticate, getCarpoolbyIdController);

export default router;