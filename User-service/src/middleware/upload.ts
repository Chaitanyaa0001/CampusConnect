import multer from "multer";
import { Request, Response, NextFunction } from "express";
import { isSupportedImage } from "cloudinary-sdk";
import { AppError } from "../error/AppError.js";

const ALLOWED = new Set(["image/jpeg", "image/png", "image/webp"]);

export const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 2 * 1024 * 1024, files: 1 }, // removed fields: 0, so an extra form field no longer breaks uploads
  fileFilter: (_req, file, cb) => {
    if (!ALLOWED.has(file.mimetype)) {
      return cb(new AppError("Only JPEG, PNG or WebP images are allowed", 400));
    }
    cb(null, true);
  },
});

export const validateImage = (req: Request, _res: Response, next: NextFunction) => {
  if (!req.file) return next(new AppError("Profile image is required", 400));
  if (!isSupportedImage(req.file.buffer)) {
    return next(new AppError("Only JPEG, PNG or WebP images are allowed", 400));
  }
  next();
};