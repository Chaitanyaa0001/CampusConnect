import jwt from "jsonwebtoken";

import { AUTH_CONFIG } from "../config/auth.config.js";
import { getKey } from "../jwks/client.js";
import { TokenPayload } from "../types/tokenpayload.js";

type SocketLike = {
    handshake: {
        auth?: {
            token?: unknown;
        };
        headers: {
            authorization?: string;
        };
    };
    data: {
        user?: TokenPayload;
    };
};

const getSocketToken = (socket: SocketLike) => {
    const authToken = socket.handshake.auth?.token;
    const authHeader = socket.handshake.headers.authorization;

    if (typeof authToken === "string") {
        return authToken;
    }

    if (authHeader?.startsWith("Bearer ")) {
        return authHeader.slice("Bearer ".length);
    }

    return undefined;
};

export function authenticateSocket(socket: SocketLike, next: (error?: Error) => void) {
    const token = getSocketToken(socket);

    if (!token) {
        next(new Error("Unauthorized"));
        return;
    }

    jwt.verify(
        token,
        getKey,
        {
            algorithms: ["RS256"],
            issuer: AUTH_CONFIG.issuer,
            audience: AUTH_CONFIG.audience,
        },
        (err, decoded) => {
            if (err) {
                next(new Error("Invalid or expired token"));
                return;
            }

            const payload = decoded as TokenPayload;

            if (payload.type !== "access") {
                next(new Error("Invalid access token"));
                return;
            }

            socket.data.user = payload;
            next();
        },
    );
}
