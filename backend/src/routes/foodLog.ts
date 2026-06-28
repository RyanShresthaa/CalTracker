import { Router } from 'express';
import { addFoodLog, getFoodLogs, updateFoodLog, deleteFoodLog } from '../controllers/foodLogController';
import { authenticate } from '../middleware/auth';
const router = Router();
router.get('/', authenticate, getFoodLogs);
router.post('/', authenticate, addFoodLog);
router.put('/:id', authenticate, updateFoodLog);
router.delete('/:id', authenticate, deleteFoodLog);
export default router;
