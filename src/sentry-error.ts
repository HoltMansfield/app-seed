import * as Sentry from "@sentry/nextjs";
import { env } from "@/env";

export function withSentryError<Args extends unknown[], R>(
  fn: (...params: Args) => Promise<R>
):
  (..._params: Args) => Promise<R> {
  return async (...params: Args): Promise<R> => {
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
