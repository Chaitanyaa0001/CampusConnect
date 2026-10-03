import { catchAsync } from "../error/tryCatchAsync";
import { Request, Response } from "express";
import { refreshTokenService } from "../services/refreshToken.service";

export const refreshTokenController = catchAsync(async (req: Request, res: Response) => {
    const oldRefreshToken = req.cookies.refreshToken;
    if (!oldRefreshToken) {
      return res.status(401).json({ message: "Refresh token missing" });
    }
    const { accessToken, refreshToken } =await refreshTokenService(oldRefreshToken);

    // update cookie with NEW refresh token
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    
    return res.json( accessToken );
  }
);