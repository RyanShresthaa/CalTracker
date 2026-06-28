import { Router } from 'express';
import {
  searchFoods, getFoodById, getFoodByBarcode, getFoodCategories,
  createCustomFood, getCustomFoods, updateCustomFood, deleteCustomFood,
  importExternalFoodHandler,
} from '../controllers/foodController';
import { authenticate } from '../middleware/auth';
const router = Router();
router.get('/', authenticate, searchFoods);
router.post('/import', authenticate, importExternalFoodHandler);
router.get('/categories', getFoodCategories);
router.get('/barcode/:barcode', authenticate, getFoodByBarcode);
router.get('/custom', authenticate, getCustomFoods);
router.post('/custom', authenticate, createCustomFood);
router.put('/custom/:id', authenticate, updateCustomFood);
router.delete('/custom/:id', authenticate, deleteCustomFood);
router.get('/:id', getFoodById);
export default router;
