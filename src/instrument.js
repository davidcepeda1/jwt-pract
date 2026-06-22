import dotenv from 'dotenv';
import * as Sentry from '@sentry/node';

// Debe cargarse aquí porque instrument.js corre antes que config/env.js
dotenv.config();

Sentry.init({
    dsn: process.env.SENTRY_DSN,
    environment: process.env.SENTRY_ENVIRONMENT,
    tracesSampleRate: 1.0,
    debug: true,
});
