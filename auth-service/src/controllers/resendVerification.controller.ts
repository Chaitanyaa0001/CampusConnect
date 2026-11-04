import { catchAsync } from "../error/tryCatchAsync";
import { resendVerificationService } from "../services/resendVerification.service";
import { publishEvent, ROUTING_KEY } from "events-sdk";
import {Request, Response} from "express";

export const resendVerificationController = catchAsync(async (req:Request, res:Response) => {
  const result = await resendVerificationService(req.body.email);
  if (result) {
    await publishEvent(ROUTING_KEY.EMAIL_VERIFICATION, { email: result.email, token: result.verificationToken });
  }
  // same answer whether or not the account exists
  return res.json({ message: "If the account exists and is unverified, a new email has been sent." });
});