export const AUTH_CONFIG = {
  // the auth service mounts JWKS at /api/v1/jwks (the old default /api/jwks returned 404)
  jwksUri: process.env.AUTH_JWKS_URI || "http://auth-service:3000/api/v1/jwks",
  issuer: process.env.JWT_ISSUER || "campusconnect",
  audience: process.env.JWT_AUDIENCE || "campusconnect-api",
};