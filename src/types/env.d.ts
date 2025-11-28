declare namespace NodeJS {
  interface ProcessEnv {
    APP_ENV?:
      | "LOCAL"          // Dev on laptop
      | "E2E"            // E2E tests
      | "DEV"            // Dev environment
      | "QA"             // QA environment
      | "DEPLOY_PREVIEW" // Netlify deploy preview
      | "BRANCH_PREVIEW" // Netlify branch preview
      | "PREVIEW_SERVER" // Netlify preview server
      | "PRODUCTION"     // Production
      | "CI";            // GitHub Actions
    PORT?: string;
    DB_URL?: string;
    MIGRATIONS_PATH?: string;
    RESEND_API_KEY?: string;
    SENTRY_DSN?: string;
    E2E_URL?: string;
    DEBUG?: string;
    LOG_LEVEL?: "trace" | "debug" | "info" | "warn" | "error" | "fatal";
  }
}
