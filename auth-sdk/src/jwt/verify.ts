import jwt from "jsonwebtoken";
import { AUTH_CONFIG } from "../config/auth.config.js";
import { getKey } from "../jwks/client.js";
import { TokenPayload } from "../types/tokenpayload.js";

export type AuthErrorCode = "TOKEN_MISSING" | "TOKEN_EXPIRED" | "TOKEN_INVALID" | "TOKEN_REVOKED";

export class AuthError extends Error {
  constructor(message: string, public code: AuthErrorCode) {
    super(message);
    this.name = "AuthError";
  }
}

// Optional hook: a service can plug in a denylist (Redis etc.) without the SDK knowing about Redis.
export type RevocationCheck = (payload: TokenPayload) => boolean | Promise<boolean>;
let revocationCheck: RevocationCheck | undefined;
export const setRevocationCheck = (fn: RevocationCheck) => {
  revocationCheck = fn;
};

const verifySignature = (token: string): Promise<TokenPayload> =>
  new Promise((resolve, reject) => {
    jwt.verify(
      token,
      getKey,
      {
        algorithms: ["RS256"],
        issuer: AUTH_CONFIG.issuer,
        audience: AUTH_CONFIG.audience,
        clockTolerance: 5, // seconds of drift allowed between containers
      },
      (err, decoded) => {
        if (err) {
          return reject(
            err.name === "TokenExpiredError"
              ? new AuthError("Token expired", "TOKEN_EXPIRED")
              : new AuthError("Invalid token", "TOKEN_INVALID")
          );
        }
        if (!decoded || typeof decoded !== "object" || (decoded as TokenPayload).type !== "access") {
          return reject(new AuthError("Invalid access token", "TOKEN_INVALID"));
        }
        resolve(decoded as TokenPayload);
      }
    );
  });

export const verifyAccessToken = async (token: string): Promise<TokenPayload> => {
  const payload = await verifySignature(token);

  if (revocationCheck) {
    try {
      if (await revocationCheck(payload)) throw new AuthError("Token revoked", "TOKEN_REVOKED");
    } catch (e) {
      if (e instanceof AuthError) throw e;
      // denylist store down: fail open so Redis trouble doesn't log everyone out
      console.error("[auth-sdk] revocation check failed, allowing request", e);
    }
  }
  return payload;
};