import express from "express";
import { authenticate } from "auth-sdk";
import { postLostAndFoundController} from "../controllers/postLost&Found.controller.js";
import  upload  from "../middleware/upload.js";

const router = express.Router();

router.post(
    "/",
    authenticate,
    upload.single("image"),
    postLostAndFoundController
);
export default router;