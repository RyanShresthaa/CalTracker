import { Router } from 'express';
import { addWater, getWaterLogs, deleteWaterLog } from '../controllers/trackerControllers';
import { authenticate } from '../middleware/auth';
const router = Router();
router.get('/', authenticate, getWaterLogs);
router.post('/', authenticate, addWater);
router.delete('/:id', authenticate, deleteWaterLog);
export default router;
