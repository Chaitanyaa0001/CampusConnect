// controllers/logout.controller.ts
import { Request, Response } from "express";
import { logoutService } from "../services/logout.service";
import { catchAsync } from "../error/tryCatchAsync";

export const logoutController = catchAsync(async (req: Request, res: Response) => {
  const accessToken = req.headers.authorization?.split(" ")[1];
  const refreshToken = req.cookies.refreshToken;

  if (!accessToken || !refreshToken) {
    return res.status(400).json({ message: "Tokens missing" });
  }

  await logoutService(accessToken, refreshToken);

  res.clearCookie("refreshToken");

  res.json({ message: "Logout successful" });
});