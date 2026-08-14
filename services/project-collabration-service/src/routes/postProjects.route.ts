import express from "express";
import { createProjectController } from "../controllers/postProjects.controller.js";
import { authenticate } from "auth-sdk";

const router = express.Router();

router.post("/post", authenticate, createProjectController);

export default router;