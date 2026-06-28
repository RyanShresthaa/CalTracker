import { Router } from 'express';
import { getUserProfile, updateUserProfile, changePassword } from '../controllers/userController';
import { authenticate } from '../middleware/auth';
const router = Router();
router.get('/profile', authenticate, getUserProfile);
router.put('/profile', authenticate, updateUserProfile);
router.put('/password', authenticate, changePassword);
export default router;
