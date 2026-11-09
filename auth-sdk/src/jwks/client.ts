import jwksClient from "jwks-rsa";
import jwt from "jsonwebtoken";
import { AUTH_CONFIG } from "../config/auth.config.js";

export const jwks = jwksClient({
  jwksUri: AUTH_CONFIG.jwksUri,
  cache: true,
  cacheMaxEntries: 5,
  cacheMaxAge: 60 * 60 * 1000,
  rateLimit: true,
  jwksRequestsPerMinute: 10,
  timeout: 5000,
});

// last successfully fetched keys, used only if the auth service is unreachable
const lastGood = new Map<string, string>();

export const getKey: jwt.GetPublicKeyOrSecret = (header, callback) => {
  const kid = header.kid;
  if (!kid) return callback(new Error("Missing kid"));

  jwks.getSigningKey(kid, (err, key) => {
    if (err || !key) {
      // Key was removed from JWKS on purpose: never fall back to the stale copy.
      // Any other failure (timeout, auth-service down): serve the last known good key.
      const removed = err?.name === "SigningKeyNotFoundError";
      const stale = lastGood.get(kid);
      if (!removed && stale) return callback(null, stale);
      return callback(err ?? new Error("Signing key not found"));
    }
    const pub = key.getPublicKey();
    lastGood.set(kid, pub);
    callback(null, pub);
  });
};