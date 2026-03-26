import { catchAsync } from "../error/tryCatchAsync";
import { verifyEmailService } from "../services/VerifyEmail.service";
import { Request, Response } from "express";

export const verifyEmailController = catchAsync(async (req:Request, res: Response) => {
  const { token } = req.query;

  const result = await verifyEmailService(token as string);

  res.json({message: "Email verified successfully", result});
});