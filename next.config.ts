import type { NextConfig } from "next";
// import { withSentryConfig } from "@sentry/nextjs";

const nextConfig: NextConfig = {
  experimental: {
    serverSourceMaps: true,
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "img-src * data:",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
              "style-src 'self' 'unsafe-inline'",
              "font-src 'self' data: https://fonts.gstatic.com",
              "connect-src *",
              "worker-src 'self' blob: data:",
            ].join("; ")
          },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

// TODO: Re-enable Sentry webpack plugin after fixing E2E test issues
// Only apply Sentry config if not in E2E mode
// const isE2E = process.env.APP_ENV === "E2E";

export default nextConfig;
// export default isE2E
//   ? nextConfig
//   : withSentryConfig(nextConfig, {
//       org: "holt-mansfield-2h",
//       project: "deal-decoder",
//       silent: !process.env.CI,
//       widenClientFileUpload: true,
//       reactComponentAnnotation: {
//         enabled: true,
//       },
//       tunnelRoute: "/monitoring",
//       hideSourceMaps: true,
//       disableLogger: true,
//       automaticVercelMonitors: true,
//     });
