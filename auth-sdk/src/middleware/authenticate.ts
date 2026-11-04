import { NextFunction, Request, Response } from "express";
import { verifyAccessToken, AuthError } from "../jwt/verify.js";
import { TokenPayload } from "../types/tokenpayload.js";

const extractBearer = (header?: string) =>
  header?.startsWith("Bearer ") ? header.slice(7).trim() || undefined : undefined;

const reject = (res: Response, err: unknown) => {
  const e = err instanceof AuthError ? err : new AuthError("Invalid token", "TOKEN_INVALID");
  return res.status(401).json({ success: false, code: e.code, message: e.message });
};

// Blocks the request unless a valid access token is present.
export async function authenticate(req: Request, res: Response, next: NextFunction) {
  const token = extractBearer(req.headers.authorization);
  if (!token) {
    return res.status(401).json({ success: false, code: "TOKEN_MISSING", message: "Unauthorized" });
  }
  try {
    req.user = await verifyAccessToken(token);
    next();
  } catch (err) {
    reject(res, err);
  }
}

// For public pages: no token = anonymous, a present-but-bad token = 401 so the client refreshes.
export async function optionalAuthenticate(req: Request, res: Response, next: NextFunction) {
  const token = extractBearer(req.headers.authorization);
  if (!token) return next();
  try {
    req.user = await verifyAccessToken(token);
    next();
  } catch (err) {
    reject(res, err);
  }
}

// Use inside handlers behind `authenticate` instead of req.user!
export const requireUser = (req: Request): TokenPayload => {
  if (!req.user) throw new AuthError("Unauthorized", "TOKEN_MISSING");
  return req.user;
};