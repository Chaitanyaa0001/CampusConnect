import jwksClient from "jwks-rsa";
import jwt from "jsonwebtoken";
import { AUTH_CONFIG } from "../config/auth.config.js";

export const jwks = jwksClient({
    jwksUri: AUTH_CONFIG.jwksUri,
    cache: true,
    cacheMaxEntries: 5,
    cacheMaxAge: 60 * 60 * 1000,   // keys rotate rarely; survive short auth-service downtime
    rateLimit: true,               // a random `kid` can no longer flood auth-service
    jwksRequestsPerMinute: 10,
    timeout: 5000,
});
export const getKey: jwt.GetPublicKeyOrSecret = (header, callback) => {

    if (!header.kid) {
        return callback(new Error("Missing kid"));
    }
    jwks.getSigningKey(header.kid, (err, key) => {
        if (err) {
            return callback(err);
        }
        callback(null, key?.getPublicKey());
    });
};