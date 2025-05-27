import { H } from "@highlight-run/node";

H.init({
  projectID: "ney02ovd",
  serviceName: "nextjs-server",
  environment: process.env.NODE_ENV,
});

export function withHighlightError<A extends any[], R>(
  fn: (...args: A) => Promise<R>
): (...args: A) => Promise<R> {
  return async (...args: A): Promise<R> => {
    if (process.env.APP_ENV === "E2E") {
      return await fn(...args);
    }
    try {
      const result = await fn(...args);
      return result;
    } catch (error) {
      H.consumeError(error as Error);
      throw error;
    }
  };
}

export { H };
