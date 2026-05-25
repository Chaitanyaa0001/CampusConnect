import { Request, Response }from "express";
import { catchAsync }from "../error/tryCatchAsync";
import { logoutService }from "../services/logout.service";
import { AppError }from "../error/AppError";

export const logoutController =catchAsync(async (req: Request,res: Response) => {
      // authorization header
      const authHeader =req.headers.authorization;
      if (!authHeader) {
        throw new AppError("Authorization header missing", 401);
      }

      // extract access token form this 
      const accessToken =authHeader.split(" ")[1];
      if (!accessToken) {
        throw new AppError("Access token missing",401);
      }

      // refresh token from cookie
      const refreshToken =req.cookies.refreshToken;
      if (!refreshToken) {
        throw new AppError("Refresh token missing",401);
      }

      // logout logic
      await logoutService(accessToken,refreshToken);
      // clear refresh cookie
      res.clearCookie("refreshToken",{
          httpOnly: true,
          secure:process.env.NODE_ENV ==="production",
          sameSite: "strict",
        }
      );
      return res.status(200).json({success: true,message: "Logout successful",});
    }
);