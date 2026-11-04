import "./types/express.js";
export { AUTH_CONFIG } from "./config/auth.config.js";
export { authenticate, optionalAuthenticate, requireUser } from "./middleware/authenticate.js";
export { authenticateSocket, disconnectOnExpiry } from "./middleware/authenticate-socket.js";
export { jwks, getKey } from "./jwks/client.js";
export { verifyAccessToken, setRevocationCheck, AuthError } from "./jwt/verify.js";
export type { RevocationCheck, AuthErrorCode } from "./jwt/verify.js";
export type { TokenPayload } from "./types/tokenpayload.js";