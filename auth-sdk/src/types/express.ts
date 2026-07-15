import "express";
import { TokenPayload } from "./tokenpayload.js";

declare global {
    namespace Express {
        interface Request {
            user: TokenPayload;
        }
    }
}

export{};