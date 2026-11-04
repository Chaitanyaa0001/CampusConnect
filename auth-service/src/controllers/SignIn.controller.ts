import { Request, Response } from "express";
import { catchAsync } from "../error/tryCatchAsync";
import { signinService } from "../services/SignIn.service";
import { REFRESH_COOKIE, refreshCookieOptions, REFRESH_MAX_AGE } from "../config/cookie";

export const signinController = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const { accessToken, refreshToken } = await signinService(email, password);
  res.cookie(REFRESH_COOKIE, refreshToken, {
    ...refreshCookieOptions, 
    maxAge: REFRESH_MAX_AGE });
    return res.status(200).json({ message: "Login successful", accessToken });
});