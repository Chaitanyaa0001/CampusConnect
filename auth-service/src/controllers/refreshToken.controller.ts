import { Request, Response } from "express";

import { catchAsync } from "../error/tryCatchAsync";
import { AppError } from "../error/AppError";
import { refreshTokenService } from "../services/refreshToken.service";
import { REFRESH_COOKIE, refreshCookieOptions, REFRESH_MAX_AGE } from "../config/cookie";

export const refreshTokenController = catchAsync(async (req: Request, res: Response) => {
  const old = req.cookies[REFRESH_COOKIE];
  if (!old) throw new AppError("Refresh token missing", 401);
  
  try {
    const { accessToken, refreshToken } = await refreshTokenService(old);
    res.cookie(REFRESH_COOKIE, refreshToken, { ...refreshCookieOptions, maxAge: REFRESH_MAX_AGE });
    return res.json({ accessToken }); // object, same shape as signin
  } catch (e) {
    res.clearCookie(REFRESH_COOKIE, refreshCookieOptions); // dead token, drop it
    throw e;
  }
});