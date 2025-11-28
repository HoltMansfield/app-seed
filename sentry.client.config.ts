import * as Sentry from "@sentry/nextjs";
import { env } from "@/env";

// Only initialize if SENTRY_DSN is provided
if (env.SENTRY_DSN) {
  Sentry.init({
    dsn: env.SENTRY_DSN,
    
    // Adjust this value in production, or use tracesSampler for greater control
    tracesSampleRate: 1.0,

    // Setting this option to true will print useful information to the console while you're setting up Sentry.
    debug: false,

    environment: env.APP_ENV,

    // Link errors to releases for sourcemap resolution
    release: process.env.NEXT_PUBLIC_SENTRY_RELEASE,

    // You can remove this option if you're not planning to use the Sentry Session Replay feature:
    replaysOnErrorSampleRate: 1.0,

    // This sets the sample rate to be 10%. You may want this to be 100% while
    // in development and sample at a lower rate in production
    replaysSessionSampleRate: 0.1,

    // You can remove this option if you're not planning to use the Sentry Session Replay feature:
    integrations: [
      Sentry.replayIntegration({
        // Additional Replay configuration goes in here, for example:
        maskAllText: true,
        blockAllMedia: true,
      }),
    ],
  });
}
