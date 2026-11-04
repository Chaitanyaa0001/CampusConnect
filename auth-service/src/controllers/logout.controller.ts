import { Request, Response }from "express";
import { catchAsync } from "../error/tryCatchAsync";
import { logoutService } from "../services/logout.service";
import { REFRESH_COOKIE, refreshCookieOptions } from "../config/cookie";

export const logoutController = catchAsync(async (req: Request, res: Response) => {
  const token = req.cookies[REFRESH_COOKIE];
  if (token) await logoutService(token);
  res.clearCookie(REFRESH_COOKIE, refreshCookieOptions);
  return res.status(200).json({ success: true, message: "Logout successful" });
});