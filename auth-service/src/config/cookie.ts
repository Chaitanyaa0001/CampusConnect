import { env } from "./env.config";

export const REFRESH_COOKIE = "refreshToken";
export const refreshCookieOptions = {
  httpOnly: true,
  secure: env.NODE_ENV === "production",
  sameSite: "strict" as const, // use "none" + secure only if frontend and API are on different sites
  // MUST match the public path of the refresh/logout routes. Routes are mounted at /api/v1/auth,
  // so the old "/api/auth" meant the browser never sent the cookie. If your gateway rewrites the
  // path, use the path the browser sees.
  path: "/api/v1/auth",
};
export const REFRESH_MAX_AGE = 7 * 24 * 60 * 60 * 1000;