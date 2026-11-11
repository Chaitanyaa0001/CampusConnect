import rateLimit from "express-rate-limit";

// Load testing: RATE_LIMIT_DISABLED=true. Refused in production on purpose.
const disabled = process.env.RATE_LIMIT_DISABLED === "true";
if (disabled && process.env.NODE_ENV === "production") {
  throw new Error("RATE_LIMIT_DISABLED must not be set in production");
}

// Stops one account from flooding the ride list. Must run AFTER authenticate (needs req.user).
export const createRideLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: Number(process.env.CREATE_RIDE_RATE_LIMIT) || 10,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  keyGenerator: (req) => req.user?.userId ?? "anonymous",
  message: { success: false, message: "Too many rides posted, try again later" },
  skip: () => disabled,
});