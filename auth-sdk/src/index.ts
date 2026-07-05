// Core exports
export * from "./config/auth.config.js";
export * from "./middleware/authenticate.js";
export * from "./jwks/client.js";
export * from "./types/tokenpayload.js";
export * from "./types/express.js";

// Also export as named exports for better DX
export { authenticate } from "./middleware/authenticate.js";
export { jwks, getKey } from "./jwks/client.js";
export { AUTH_CONFIG } from "./config/auth.config.js";