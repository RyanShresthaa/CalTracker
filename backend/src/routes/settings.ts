import { Router } from 'express';
import { getSettings, updateSettings } from '../controllers/userController';
import { authenticate } from '../middleware/auth';
const router = Router();
router.get('/', authenticate, getSettings);
router.put('/', authenticate, updateSettings);
export default router;
