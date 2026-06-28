import type { Express } from 'express';
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

export function registerRoutes(app: Express) {
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
}
