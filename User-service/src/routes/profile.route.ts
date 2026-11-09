import express from "express";
import { authenticate } from "auth-sdk";
import { upload, validateImage } from "../middleware/upload.js";
import { uploadLimiter } from "../middleware/rateLimiter.js";
import { getMyProfileController, updateMyProfilePhotoController } from "../controllers/profile.controller.js";

const router = express.Router();

router.get("/me", authenticate, getMyProfileController);

// order matters: authenticate (who) -> limiter (how often) -> multer (parse) -> validateImage (real bytes)
router.patch(
  "/me/photo",
  authenticate,
  uploadLimiter,
  upload.single("image"),
  validateImage,
  updateMyProfilePhotoController
);

export default router;