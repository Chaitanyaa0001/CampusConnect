import jwt from "jsonwebtoken";
import { TokenPayload } from "../interfaces/tokenPayload";
import { PRIVATE_KEY, PUBLIC_KEY } from "../config/keys";
import { AppError } from "../error/AppError";

// ✅ Access Token
export const generateAccessToken = (
  payload: Omit<TokenPayload, "type">
) => {
  try {
    return jwt.sign(
      { ...payload, type: "access" },
      PRIVATE_KEY,
      {
        algorithm: "RS256",
        expiresIn: "15m",
      }
    );
  } catch {
    throw new AppError("Generate Access Token error", 500);
  }
};

// ✅ Refresh Token
export const generateRefreshToken = (
  payload: Omit<TokenPayload, "type">
) => {
  try {
    return jwt.sign(
      { ...payload, type: "refresh" },
      PRIVATE_KEY,
      {
        algorithm: "RS256",
        expiresIn: "7d",
      }
    );
  } catch {
    throw new AppError("Generate Refresh Token error", 500);
  }
};

// ✅ Verify Access Token
export const verifyAccessToken = (token: string) => {
  try {
    const payload = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ["RS256"],
    }) as TokenPayload;

    if (payload.type !== "access") {
      throw new AppError("Invalid access token", 401);
    }

    return payload;
  } catch {
    throw new AppError("Invalid or expired access token", 401);
  }
};

// ✅ Verify Refresh Token
export const verifyRefreshToken = (token: string) => {
  try {
    const payload = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ["RS256"],
    }) as TokenPayload;

    if (payload.type !== "refresh") {
      throw new AppError("Invalid refresh token", 401);
    }

    return payload;
  } catch {
    throw new AppError("Invalid or expired refresh token", 401);
  }
};