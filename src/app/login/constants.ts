// Constants for rate limiting and account lockout
const MAX_ATTEMPTS = 1; // Max attempts per IP address within time window
const TIME_WINDOW_MS = 15 * 60 * 1000; // 15 minutes for IP-based rate limiting
const MAX_FAILED_ATTEMPTS = 3; // Max failed attempts per account before lockout
const LOCKOUT_DURATION_MS = 30 * 60 * 1000; // 30 minutes account lockout duration

// Export these constants for testing
export { MAX_ATTEMPTS, TIME_WINDOW_MS, MAX_FAILED_ATTEMPTS, LOCKOUT_DURATION_MS };