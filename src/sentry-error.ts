import * as Sentry from "@sentry/nextjs";

/**
 * Server-side wrapper for error handling with Sentry
 * Skips Sentry in E2E environment
 */
export function withSentryError<Args extends unknown[], R>(
  fn: (...args: Args) => Promise<R>
): (...args: Args) => Promise<R> {
  return async (...args: Args): Promise<R> => {
    const isE2E =
      typeof process !== "undefined" &&
      process.env?.NEXT_PUBLIC_APP_ENV === "E2E";

    if (isE2E) {
      return fn(...args);
    }
    try {
      return await fn(...args);
    } catch (error) {
      Sentry.captureException(error);
      throw error;
    }
  };
}

/**
 * Client-side wrapper for error handling with Sentry
 * Skips Sentry in E2E environment (checks via process.env since env is server-only)
 */
export function withSentryErrorClient<Args extends unknown[], R>(
  fn: (...args: Args) => Promise<R>
): (...args: Args) => Promise<R> {
  return async (...args: Args): Promise<R> => {
    const isE2E =
      typeof process !== "undefined" &&
      process.env?.NEXT_PUBLIC_APP_ENV === "E2E";

    if (isE2E) {
      return fn(...args);
    }
    try {
      return await fn(...args);
    } catch (error) {
      Sentry.captureException(error);
      throw error;
    }
  };
}
