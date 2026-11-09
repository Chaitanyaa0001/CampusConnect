import { Request, Response, NextFunction } from "express";
import { AppError } from "./AppError";
import multer from "multer";
import { CloudinaryError } from "cloudinary-sdk";




export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("ERROR :", err);

  if (err instanceof multer.MulterError) {
  const message =
    err.code === "LIMIT_FILE_SIZE" ? "Image cannot exceed 2MB" : "Invalid upload";
  return res.status(400).json({ success: false, message });
}
if (err instanceof CloudinaryError) {
  console.error("Cloudinary error:", err.message, err.httpCode);
  return res.status(502).json({ success: false, message: "Image upload failed, try again" });
}
};