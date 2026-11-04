import jwt from "jsonwebtoken";
import crypto from "crypto";
import { TokenPayload, RefreshPayload } from "../interfaces/tokenPayload";
import { KEY_ID, PRIVATE_KEY, PUBLIC_KEY } from "../config/keys";
import { AppError } from "../error/AppError";
import { AUTH_CONFIG } from "auth-sdk";

const base = { algorithm: "RS256" as const, issuer: AUTH_CONFIG.issuer, audience: AUTH_CONFIG.audience };

export const generateAccessToken = (p: Omit<TokenPayload, "type">) =>
  jwt.sign({ ...p, type: "access" }, PRIVATE_KEY, { ...base, expiresIn: "15m", keyid: KEY_ID });

export const generateRefreshToken = (p: { userId: string }) =>
  jwt.sign({ userId: p.userId, type: "refresh" }, PRIVATE_KEY, {
    ...base,
    expiresIn: "7d",
    keyid: KEY_ID,
    jwtid: crypto.randomUUID(), // makes every refresh token unique, so no hash collisions
  });

export const verifyRefreshToken = (token: string): RefreshPayload => {
  try {
    const payload = jwt.verify(token, PUBLIC_KEY, base) as RefreshPayload;
    if (payload.type !== "refresh") throw new Error("wrong type");
    return payload;
  } catch {
    throw new AppError("Invalid or expired refresh token", 401);
  }
};
// verifyAccessToken stays the same

export const verifyAccessToken = (token: string) => {
  try {
    const payload =  jwt.verify(token, PUBLIC_KEY, {
    algorithms: ["RS256"],
    issuer: AUTH_CONFIG.issuer,
    audience: AUTH_CONFIG.audience
  }) as TokenPayload;

    if (payload.type !== "access") {
      throw new AppError("Invalid access token", 401);
    }

    return payload;
  } catch {
    throw new AppError("Invalid or expired access token", 401);
  }
};