import { Router } from 'express';
import { getNotifications, markNotificationRead, markAllNotificationsRead } from '../controllers/userController';
import { authenticate } from '../middleware/auth';
const router = Router();
router.get('/', authenticate, getNotifications);
router.put('/read-all', authenticate, markAllNotificationsRead);
router.put('/:id/read', authenticate, markNotificationRead);
export default router;
