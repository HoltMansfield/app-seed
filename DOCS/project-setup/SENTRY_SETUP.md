# Sentry Setup Guide

This project uses Sentry.io for error tracking and performance monitoring.

## Environment Variables

Add the following environment variable to your `.env.local` file:

```bash
SENTRY_DSN=your-sentry-dsn-here
```

You can find your DSN in your Sentry project settings.

## Configuration Files

The following Sentry configuration files have been set up:

- `sentry.client.config.ts` - Client-side Sentry configuration
- `sentry.server.config.ts` - Server-side Sentry configuration  
- `sentry.edge.config.ts` - Edge runtime Sentry configuration
- `.sentryclirc` - Sentry CLI configuration (gitignored)

## Sentry CLI Configuration

To upload source maps and enable better error tracking, you need to configure the Sentry CLI:

1. Create a Sentry auth token at: https://sentry.io/settings/account/api/auth-tokens/
2. Update `.sentryclirc` with your actual values:
   - Replace `YOUR_SENTRY_AUTH_TOKEN` with your auth token
   - Replace `your-sentry-org` with your Sentry organization slug
   - Replace `your-sentry-project` with your Sentry project slug

3. Also update `next.config.ts` with the same org and project values.

## Features Enabled

### Error Tracking
- Automatic error capture on both client and server
- Custom error wrapper: `withSentryError()` for server actions
- Manual error capture: `Sentry.captureException(error)`

### User Identification
- Automatic user identification via `SentryProvider` component
- Users are identified by email when logged in
- User context is cleared on logout

### Session Replay (Client-side only)
- Records user sessions when errors occur
- Sample rate: 10% of sessions, 100% of error sessions
- All text and media are masked for privacy

### Performance Monitoring
- Traces sample rate: 100% (adjust for production)
- Automatic instrumentation of Next.js routes
- Server-side performance tracking

## Usage Examples

### Wrapping Server Actions
```typescript
import { withSentryError } from "@/sentry-error";

async function myAction() {
  // Your action code
}

export const action = withSentryError(myAction);
```

### Manual Error Capture
```typescript
import * as Sentry from "@sentry/nextjs";

try {
  // Your code
} catch (error) {
  Sentry.captureException(error);
  // Handle error
}
```

### Setting User Context
```typescript
import * as Sentry from "@sentry/nextjs";

Sentry.setUser({ 
  email: "user@example.com",
  id: "user-id",
  username: "username"
});

// Clear user context
Sentry.setUser(null);
```

## Production Considerations

1. **Adjust Sample Rates**: In production, consider lowering:
   - `tracesSampleRate` to 0.1 or lower
   - `replaysSessionSampleRate` to 0.01 or lower

2. **Source Maps**: Source maps are automatically uploaded during build when:
   - `SENTRY_AUTH_TOKEN` is set in environment
   - `.sentryclirc` is properly configured

3. **Environment**: The `APP_ENV` variable is used to tag errors by environment

## Migration from Highlight.io

This project was migrated from Highlight.io to Sentry.io. Key changes:

- `@highlight-run/next` → `@sentry/nextjs`
- `@highlight-run/node` → `@sentry/nextjs`
- `H.init()` → Sentry config files
- `H.identify()` → `Sentry.setUser()`
- `H.consumeError()` → `Sentry.captureException()`
- `withHighlightError()` → `withSentryError()`

## Resources

- [Sentry Next.js Documentation](https://docs.sentry.io/platforms/javascript/guides/nextjs/)
- [Sentry Error Tracking](https://docs.sentry.io/product/issues/)
- [Sentry Performance Monitoring](https://docs.sentry.io/product/performance/)
- [Sentry Session Replay](https://docs.sentry.io/product/session-replay/)
