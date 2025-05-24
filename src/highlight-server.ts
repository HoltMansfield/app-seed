import { H } from "@highlight-run/node";

const highlight = H.init({
  projectID: "ney02ovd",
  serviceName: "nextjs-server",
  environment: process.env.NODE_ENV,
});

if (process.env.APP_ENV !== "E2E") {
  if (typeof process !== "undefined") {
    process.on("uncaughtException", (error) => {
      H.consumeError?.(error);
    });

    process.on("unhandledRejection", (reason: any) => {
      H.consumeError?.(
        reason instanceof Error ? reason : new Error(String(reason))
      );
    });
  }
}

export { H };
