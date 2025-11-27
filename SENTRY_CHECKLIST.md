# Sentry Migration Checklist

Use this checklist to ensure your Sentry setup is complete.

## ✅ Initial Setup

- [ ] Created Sentry account at [sentry.io](https://sentry.io)
- [ ] Created a new Next.js project in Sentry
- [ ] Copied DSN from project settings
- [ ] Created Sentry auth token with correct permissions
- [ ] Added `SENTRY_DSN` to `.env.local`
- [ ] Updated `.sentryclirc` with auth token, org, and project
- [ ] Updated `next.config.ts` with org and project slugs

## ✅ Local Development Testing

- [ ] Ran `npm install` successfully
- [ ] Started dev server without errors
- [ ] Triggered test error in browser console
- [ ] Verified error appears in Sentry dashboard
- [ ] Logged in and verified user identification works
- [ ] Logged out and verified user context is cleared
- [ ] Tested server action error (e.g., invalid login)
- [ ] Verified server errors appear in Sentry

## ✅ Code Review

- [ ] No references to `@highlight-run` in source code
- [ ] No references to `HIGHLIGHT_API_KEY` in code
- [ ] All imports use `@sentry/nextjs`
- [ ] `SentryProvider` is used in layout
- [ ] Server actions use `withSentryError` wrapper
- [ ] Manual error captures use `Sentry.captureException()`

## ✅ Documentation

- [ ] Read `DOCS/SENTRY_SETUP.md`
- [ ] Reviewed `MIGRATION_SUMMARY.md`
- [ ] Updated any custom documentation for your project

## ✅ GitHub/CI Setup

- [ ] Removed `HIGHLIGHT_API_KEY` from GitHub secrets
- [ ] Added `SENTRY_DSN` to GitHub secrets
- [ ] Added `SENTRY_AUTH_TOKEN` to GitHub secrets
- [ ] Verified `.github/workflows/sourcemaps.yml` is deleted
- [ ] Updated any custom CI/CD workflows

## ✅ Production/Deployment

- [ ] Updated environment variables in hosting platform:
  - [ ] Removed `HIGHLIGHT_API_KEY`
  - [ ] Added `SENTRY_DSN`
  - [ ] Added `SENTRY_AUTH_TOKEN`
- [ ] Deployed to staging/preview environment
- [ ] Tested error tracking in staging
- [ ] Verified sourcemaps are uploaded correctly
- [ ] Deployed to production
- [ ] Monitored production errors in Sentry

## ✅ Optional Enhancements

- [ ] Adjusted `tracesSampleRate` for production (recommend 0.1)
- [ ] Adjusted `replaysSessionSampleRate` for production (recommend 0.01)
- [ ] Set up Sentry alerts for critical errors
- [ ] Configured Sentry integrations (Slack, etc.)
- [ ] Set up performance monitoring thresholds
- [ ] Reviewed and customized CSP headers for Sentry

## 🎉 Migration Complete!

Once all items are checked, your migration from Highlight.io to Sentry.io is complete!

## Need Help?

- **Quick Setup**: [QUICK_START_SENTRY.md](QUICK_START_SENTRY.md)
- **Detailed Guide**: [DOCS/SENTRY_SETUP.md](DOCS/SENTRY_SETUP.md)
- **Migration Details**: [MIGRATION_SUMMARY.md](MIGRATION_SUMMARY.md)
- **Sentry Docs**: [docs.sentry.io](https://docs.sentry.io/platforms/javascript/guides/nextjs/)
