import express from "express";
import { authenticate } from "auth-sdk";
import { upload } from "../middleware/upload.js";

import {getMyProfileController,updateMyProfilePhotoController,} from "../controllers/profile.controller.js";

const router = express.Router();
router.get("/me",authenticate,getMyProfileController);

router.patch("/me/photo",authenticate,upload.single("image"),updateMyProfilePhotoController);

export default router;