import "express";
import type { TokenPayload } from "auth-sdk/types";

declare global {
    namespace Express {
        interface Request {
            user: TokenPayload;
        }
    }
}

export{};