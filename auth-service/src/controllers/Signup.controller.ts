import { Request, Response } from "express";
import { catchAsync } from "../error/tryCatchAsync";
import { signupService } from "../services/signUp.service";
// import { sendEmailService } from "../services/sendEmail.service";
import { publishEvent,ROUTING_KEY } from "events-sdk";

export const signupController = catchAsync(async (req: Request, res: Response) => {
  const { email, username, password} = req.body;
  const { user, verificationToken } = await signupService(email,username,password);
  
   await publishEvent(ROUTING_KEY.EMAIL_VERIFICATION, {
    email: user.email,
    token: verificationToken
   });
   
  return res.status(201).json({
    message: "User created. Please verify email.",
    user: {
        id: user.id,
        email: user.email,
        username: user.username,
        isVerified: user.isVerified
    }
});
});