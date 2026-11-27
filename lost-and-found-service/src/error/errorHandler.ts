import { Request, Response, NextFunction } from "express";
import multer from "multer";
import { ZodError } from "zod";
import { AuthError } from "auth-sdk";
import { AppError } from "./AppError.js";

export const globalErrorHandler = (err: any, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ success: false, message: err.message });
  }
  if (err instanceof AuthError) {
    return res.status(401).json({ success: false, code: err.code, message: err.message });
  }
  if (err instanceof ZodError) {
    return res.status(400).json({ success: false, message: err.issues[0].message });
  }
  // multer: file too large, too many fields, a file under the wrong field name
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(413).json({ success: false, message: "Image must be 2 MB or smaller" });
    }
    if (err.code === "LIMIT_UNEXPECTED_FILE") {
      return res.status(400).json({ success: false, message: 'Send the image in the "image" field' });
    }
    return res.status(400).json({ success: false, message: "Invalid upload" });
  }
  // body-parser errors: malformed JSON, body over the limit
  if (err?.type === "entity.parse.failed") {
    return res.status(400).json({ success: false, message: "Invalid JSON body" });
  }
  if (err?.type === "entity.too.large") {
    return res.status(413).json({ success: false, message: "Request body too large" });
  }

  console.error("UNEXPECTED ERROR:", err);
  return res.status(500).json({ success: false, message: "Internal Server Error" });
};