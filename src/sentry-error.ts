import * as Sentry from "@sentry/nextjs";

/**
 * Server-side wrapper for error handling with Sentry
 * Skips Sentry in E2E environment
 */
export function withSentryError<Args extends unknown[], R>(
  fn: (...params: Args) => Promise<R>
):
  (..._params: Args) => Promise<R> {
  return async (...params: Args): Promise<R> => {
    // Import env only when actually needed (server-side)
    const { env } = await import("@/env");
    if (env.APP_ENV === "E2E") {
      return await fn(...params);
    }
    try {
      const result = await fn(...params);
      return result;
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
  fn: (...params: Args) => Promise<R>
): (..._params: Args) => Promise<R> {
  return async (...params: Args): Promise<R> => {
    if (process.env.NEXT_PUBLIC_APP_ENV === "E2E") {
      return await fn(...params);
    }
    try {
      const result = await fn(...params);
      return result;
    } catch (error) {
      Sentry.captureException(error);
      throw error;
    }
  };
}
