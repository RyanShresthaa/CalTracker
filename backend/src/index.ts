import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';

import authRoutes from './routes/auth';
import userRoutes from './routes/user';
import foodRoutes from './routes/food';
import foodLogRoutes from './routes/foodLog';
import waterRoutes from './routes/water';
import weightRoutes from './routes/weight';
import activityRoutes from './routes/activity';
import settingsRoutes from './routes/settings';
import notificationRoutes from './routes/notification';
import adminRoutes from './routes/admin';
import dashboardRoutes from './routes/dashboard';
import recipeRoutes from './routes/recipe';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

if (process.env.VERCEL) {
  app.set('trust proxy', 1);
}

// Security middleware
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
    // Vercel preview/production frontends (*.vercel.app)
    if (/^https:\/\/[\w.-]+\.vercel\.app$/.test(origin)) {
      callback(null, true);
      return;
    }
    // Vercel sets VERCEL_URL on each service (supports custom domains too)
    const vercelAppOrigin = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : null;
    if (vercelAppOrigin && origin === vercelAppOrigin) {
      callback(null, true);
      return;
    }
    // Allow phone/LAN access during local development (e.g. http://192.168.x.x:4173)
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

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 500,
  message: 'Too many requests from this IP, please try again later.',
});
app.use(limiter);

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Logging
app.use(morgan('dev'));

// Health check (no database — use to verify the function is alive)
app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    database: process.env.DATABASE_URL ? 'configured' : 'missing',
  });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/foods', foodRoutes);
app.use('/api/food-logs', foodLogRoutes);
app.use('/api/water', waterRoutes);
app.use('/api/weight', weightRoutes);
app.use('/api/activities', activityRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/recipes', recipeRoutes);

// 404 handler
app.use((_req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Global error handler
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error', message: err.message });
});

// app.listen only runs locally; Vercel Services mounts the exported app at /_/backend
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}

export default app;
