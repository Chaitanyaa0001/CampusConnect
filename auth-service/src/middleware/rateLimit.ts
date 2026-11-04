import rateLimit from "express-rate-limit";

const message = { success: false, message: "Too many attempts, try again later" };

// Load testing: set RATE_LIMIT_DISABLED=true. Refused in production on purpose.
const disabled = process.env.RATE_LIMIT_DISABLED === "true";
if (disabled && process.env.NODE_ENV === "production") {
  throw new Error("RATE_LIMIT_DISABLED must not be set in production");
}
if (disabled) console.warn("[rate-limit] DISABLED (load test mode)");

const skip = () => disabled;

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: Number(process.env.AUTH_RATE_LIMIT) || 10,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message,
  skip,
});

export const refreshLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: Number(process.env.REFRESH_RATE_LIMIT) || 60,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message,
  skip,
});