import { withSentryConfig } from "@sentry/nextjs";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Your existing Next.js configuration
};

// Sentry options type is not strictly required, but you can type it if you want
const sentryOptions = {
  org: "holt-mansfield-2h",
  project: "class-a-camp-w",

  // Only print logs for uploading source maps in CI
  // Set to `true` to suppress logs
  silent: !process.env.CI,

  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: true,
};

export default withSentryConfig(nextConfig, sentryOptions);
