import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { AUTH_CONFIG } from "../config/auth.config.js";
import { getKey } from "../jwks/client.js";
import { TokenPayload } from "../types/tokenpayload.js";

export function authenticate(req: Request,res: Response,next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized"
        });
    }
    const token = authHeader.split(" ")[1];
    jwt.verify(
        token,
        getKey,
        {
            algorithms: ["RS256"],
            issuer: AUTH_CONFIG.issuer,
            audience: AUTH_CONFIG.audience
        },
        (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    success: false,
                    message: "Invalid or expired token"
                });
            }
            req.user = decoded as TokenPayload;
            next();
        }
    );

}