import jwksClient from "jwks-rsa";
import jwt from "jsonwebtoken";
import { AUTH_CONFIG } from "../config/auth.config.js";

export const jwks = jwksClient({
    jwksUri: AUTH_CONFIG.jwksUri,
    cache: true,
    cacheMaxEntries: 5,
    cacheMaxAge: 10 * 60 * 1000
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