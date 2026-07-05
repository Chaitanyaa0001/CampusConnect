import dotenv from "dotenv";

dotenv.config();

export const AUTH_CONFIG = {
  // Use environment variable with fallback to service name for Docker
  jwksUri: process.env.AUTH_JWKS_URI || "http://auth-service:3000/api/jwks",
  issuer: process.env.JWT_ISSUER || "campusconnect",
  audience: process.env.JWT_AUDIENCE || "campusconnect-api"
};