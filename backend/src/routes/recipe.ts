import { Router } from 'express';
import {
  getRecipes, getRecipeById, createRecipe, updateRecipe, deleteRecipe, previewRecipe,
} from '../controllers/recipeController';
import { authenticate } from '../middleware/auth';

const router = Router();

router.get('/', authenticate, getRecipes);
router.post('/preview', authenticate, previewRecipe);
router.get('/:id', authenticate, getRecipeById);
router.post('/', authenticate, createRecipe);
router.put('/:id', authenticate, updateRecipe);
router.delete('/:id', authenticate, deleteRecipe);

export default router;
