import { Request, Response } from "express";;
import { catchAsync } from "../error/tryCatchAsync";
import { signupService } from "../services/signUp.service";
import { sendEmailService } from "../services/sendEmail.service";
import { publishEvent } from "../events/publisher";
import { ROUTING_KEY } from "../events/routingKey";

export const signupController = catchAsync(async (req: Request, res: Response) => {
  const { email, username, password } = req.body;
  const { user, verificationToken } = await signupService(
    email,
    username,
    password
  );
   await publishEvent(ROUTING_KEY.AUTH_SIGNUP, {
    email: user.email,
    token: verificationToken
   })
  res.status(201).json({
    message: "User created. Please verify email.",
    user,
  });
});