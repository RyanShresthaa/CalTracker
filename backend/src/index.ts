import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import { registerRoutes } from './registerRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

if (process.env.VERCEL) {
  app.set('trust proxy', 1);
}

app.use(helmet());

const corsOrigins = (process.env.FRONTEND_URL || 'http://localhost:5173')
  .split(',')
  .map((o) => o.trim())
  .filter(Boolean);

app.use(cors({
  origin(origin, callback) {
    if (!origin) {
      callback(null, true);
      return;
    }
    if (corsOrigins.includes(origin)) {
      callback(null, true);
      return;
    }
    if (/^https:\/\/[\w.-]+\.vercel\.app$/.test(origin)) {
      callback(null, true);
      return;
    }
    const vercelAppOrigin = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : null;
    if (vercelAppOrigin && origin === vercelAppOrigin) {
      callback(null, true);
      return;
    }
    if (
      process.env.NODE_ENV !== 'production'
      && /^https?:\/\/(localhost|127\.0\.0\.1|192\.168\.\d+\.\d+|10\.\d+\.\d+\.\d+)(:\d+)?$/.test(origin)
    ) {
      callback(null, true);
      return;
    }
    callback(null, false);
  },
  credentials: true,
}));

if (!process.env.VERCEL) {
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 500,
    message: 'Too many requests from this IP, please try again later.',
  });
  app.use(limiter);
}

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

if (!process.env.VERCEL) {
  app.use(morgan('dev'));
}

app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    database: process.env.DATABASE_URL ? 'configured' : 'missing',
  });
});

try {
  registerRoutes(app);
} catch (err) {
  console.error('Failed to register API routes:', err);
}

app.use((_req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error', message: err.message });
});

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}

export default app;
