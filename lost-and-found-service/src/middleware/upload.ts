import multer from "multer";
import { Request, Response, NextFunction } from "express";
import { isSupportedImage } from "cloudinary-sdk";
import { AppError } from "../error/AppError.js";

const ALLOWED = new Set(["image/jpeg", "image/png", "image/webp"]);

export const upload = multer({
  storage: multer.memoryStorage(), // memory use = size limit x concurrent uploads, so keep the limit low
  limits: { fileSize: 2 * 1024 * 1024, files: 1, fields: 10, fieldSize: 10 * 1024 },
  fileFilter: (_req, file, cb) => {
    // cheap first check on the declared type (the client controls this value)
    if (!ALLOWED.has(file.mimetype)) {
      return cb(new AppError("Only JPEG, PNG or WebP images are allowed", 400));
    }
    cb(null, true);
  },
});

// real check on the bytes. The image is OPTIONAL for lost/found posts: no file is fine.
export const validateImage = (req: Request, _res: Response, next: NextFunction) => {
  if (!req.file) return next();
  if (!isSupportedImage(req.file.buffer)) {
    return next(new AppError("Only JPEG, PNG or WebP images are allowed", 400));
  }
  next();
};