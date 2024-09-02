/**
 * An Array or routes that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes = [
  "/",
  "/auth/verify-email",
  "/auth/verify-email/feedback",
];

/**
 * An Array of auth routes used for authentication
 * @type {string[]}
 */
export const authRoutes = [
  "/auth/login",
  "/auth/register",
  "/auth/error",
  "/auth/expired-token",
];

/**
 * The prefix for API routes for authentication routes
 * Routes that start with this prefix are used for authentication purposes
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect URL after a successful login
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT_URL = "/settings";
