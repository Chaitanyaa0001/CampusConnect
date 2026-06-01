import { Request, Response, NextFunction } from "express";
import { AppError } from "./AppError";


export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("ERROR :", err);

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }
  // unknown error
  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
};