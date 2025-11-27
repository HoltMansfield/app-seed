import * as Sentry from "@sentry/nextjs";
import { env } from "@/env";

Sentry.init({
  dsn: env.SENTRY_DSN,

  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 1.0,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,

  environment: env.APP_ENV,
});
