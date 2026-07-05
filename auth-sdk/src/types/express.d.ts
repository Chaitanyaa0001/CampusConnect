import "express";
import { TokenPayload } from "./types/tokenpayload";

declare global {

    namespace Express {

        interface Request {

            user: TokenPayload;

        }

    }

}