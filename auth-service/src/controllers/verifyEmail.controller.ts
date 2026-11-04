import { catchAsync } from "../error/tryCatchAsync";
import { verifyEmailService } from "../services/VerifyEmail.service";
import { verifyEmailSchema } from "../validator/auth.vaidator";
import { Request, Response } from "express";

export const verifyEmailController = catchAsync(async (req: Request, res: Response) => {
  const { token } = verifyEmailSchema.parse(req.query); // ZodError is handled by errorHandler
  await verifyEmailService(token);
  res.json({ message: "Email verified successfully" });
});