import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { AppError } from "./AppError";

export const globalErrorHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ success: false, message: err.message });
  }
  if (err instanceof ZodError) {
    return res.status(400).json({ success: false, message: err.issues[0].message });
  }
  // body-parser errors: malformed JSON, body over the 10kb limit
  if (err?.type === "entity.parse.failed") {
    return res.status(400).json({ success: false, message: "Invalid JSON body" });
  }
  if (err?.type === "entity.too.large") {
    return res.status(413).json({ success: false, message: "Request body too large" });
  }

  // only unexpected errors get logged with a stack
  console.error("UNEXPECTED ERROR:", err);
  return res.status(500).json({ success: false, message: "Internal Server Error" });
};