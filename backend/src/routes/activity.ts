import { Router } from 'express';
import { addActivity, getActivities, getActivityHistory, deleteActivity } from '../controllers/trackerControllers';
import { authenticate } from '../middleware/auth';
const router = Router();
router.get('/', authenticate, getActivities);
router.get('/history', authenticate, getActivityHistory);
router.post('/', authenticate, addActivity);
router.delete('/:id', authenticate, deleteActivity);
export default router;
