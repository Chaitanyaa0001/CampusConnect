import { Request, Response } from "express";;
import { catchAsync } from "../error/tryCatchAsync";
import { signupService } from "../services/signUp.service";

export const signupController = catchAsync(async (req: Request, res: Response) => {
  const { email, username, password } = req.body;

  const { user, verificationToken } = await signupService(
    email,
    username,
    password
  );

  //  send email here (important)
  console.log("Verification Token:", verificationToken);

  res.status(201).json({
    message: "User created. Please verify email.",
    user,
  });
});