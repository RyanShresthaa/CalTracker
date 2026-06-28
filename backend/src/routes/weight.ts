import { Router } from 'express';
import { addWeight, getWeightLogs, deleteWeightLog } from '../controllers/trackerControllers';
import { authenticate } from '../middleware/auth';
const router = Router();
router.get('/', authenticate, getWeightLogs);
router.post('/', authenticate, addWeight);
router.delete('/:id', authenticate, deleteWeightLog);
export default router;
