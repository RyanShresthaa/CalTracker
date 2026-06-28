import { Response } from 'express';
import { z } from 'zod';
import prisma from '../lib/prisma';
import { AuthRequest } from '../middleware/auth';
import {
  calcNutritionFromFood, calcNutritionFromPer100, perServing, sumNutrition,
} from '../services/recipeNutrition';
import { upsertManualCustomFood } from '../services/customFoodService';

const ingredientSchema = z.object({
  name: z.string().min(1),
  foodId: z.string().optional(),
  customFoodId: z.string().optional(),
  amount: z.number().positive(),
  caloriesPer100: z.number().min(0).optional(),
  proteinPer100: z.number().min(0).optional(),
  carbsPer100: z.number().min(0).optional(),
  fatPer100: z.number().min(0).optional(),
  fiberPer100: z.number().min(0).optional(),
});

const recipeSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  servings: z.number().positive().default(1),
  ingredients: z.array(ingredientSchema).min(1),
});

async function resolveIngredient(ing: z.infer<typeof ingredientSchema>, userId: string) {
  if (ing.foodId) {
    const food = await prisma.food.findUnique({ where: { id: ing.foodId } });
    if (!food) throw new Error(`Food not found: ${ing.name}`);
    const nutrition = calcNutritionFromFood(food, ing.amount);
    return { name: food.name, foodId: food.id, customFoodId: null as string | null, amount: ing.amount, ...nutrition };
  }

  if (ing.customFoodId) {
    const food = await prisma.customFood.findFirst({ where: { id: ing.customFoodId, userId } });
    if (!food) throw new Error(`Custom food not found: ${ing.name}`);
    const nutrition = calcNutritionFromFood(food, ing.amount);
    return { name: food.name, foodId: null as string | null, customFoodId: food.id, amount: ing.amount, ...nutrition };
  }

  const nutrition = calcNutritionFromPer100(
    {
      calories: ing.caloriesPer100 ?? 0,
      protein: ing.proteinPer100 ?? 0,
      carbs: ing.carbsPer100 ?? 0,
      fat: ing.fatPer100 ?? 0,
      fiber: ing.fiberPer100 ?? 0,
    },
    ing.amount,
  );
  const customFoodId = await upsertManualCustomFood(userId, {
    name: ing.name,
    caloriesPer100: ing.caloriesPer100,
    proteinPer100: ing.proteinPer100,
    carbsPer100: ing.carbsPer100,
    fatPer100: ing.fatPer100,
    fiberPer100: ing.fiberPer100,
  });
  return {
    name: ing.name,
    foodId: null as string | null,
    customFoodId,
    amount: ing.amount,
    ...nutrition,
  };
}

async function buildRecipeData(data: z.infer<typeof recipeSchema>, userId: string) {
  const resolved = await Promise.all(data.ingredients.map((ing, i) =>
    resolveIngredient(ing, userId).then(r => ({ ...r, sortOrder: i })),
  ));

  const totals = sumNutrition(resolved);
  const totalWeight = resolved.reduce((sum, ing) => sum + ing.amount, 0);
  const serving = perServing(totals, totalWeight, data.servings);

  return { resolved, serving, totals, totalWeight };
}

export const getRecipes = async (req: AuthRequest, res: Response) => {
  try {
    const { q } = req.query as { q?: string };
    const recipes = await prisma.recipe.findMany({
      where: {
        userId: req.userId,
        ...(q ? { name: { contains: q, mode: 'insensitive' } } : {}),
      },
      include: {
        ingredients: { orderBy: { sortOrder: 'asc' }, include: { food: true, customFood: true } },
        _count: { select: { ingredients: true } },
      },
      orderBy: { updatedAt: 'desc' },
    });
    return res.json(recipes);
  } catch {
    return res.status(500).json({ error: 'Failed to fetch recipes' });
  }
};

export const getRecipeById = async (req: AuthRequest, res: Response) => {
  try {
    const recipe = await prisma.recipe.findFirst({
      where: { id: req.params.id, userId: req.userId },
      include: {
        ingredients: { orderBy: { sortOrder: 'asc' }, include: { food: true, customFood: true } },
      },
    });
    if (!recipe) return res.status(404).json({ error: 'Recipe not found' });
    return res.json(recipe);
  } catch {
    return res.status(500).json({ error: 'Failed to fetch recipe' });
  }
};

export const createRecipe = async (req: AuthRequest, res: Response) => {
  try {
    const data = recipeSchema.parse(req.body);
    const { resolved, serving } = await buildRecipeData(data, req.userId!);

    const recipe = await prisma.recipe.create({
      data: {
        userId: req.userId!,
        name: data.name,
        description: data.description,
        servings: data.servings,
        servingSize: serving.servingSize,
        servingUnit: 'serving',
        calories: serving.calories,
        protein: serving.protein,
        carbs: serving.carbs,
        fat: serving.fat,
        fiber: serving.fiber,
        sugar: serving.sugar,
        sodium: serving.sodium,
        totalWeight: serving.totalWeight,
        ingredients: {
          create: resolved.map(({ sortOrder, ...ing }) => ({
            name: ing.name,
            foodId: ing.foodId,
            customFoodId: ing.customFoodId,
            amount: ing.amount,
            calories: ing.calories,
            protein: ing.protein,
            carbs: ing.carbs,
            fat: ing.fat,
            fiber: ing.fiber,
            sortOrder,
          })),
        },
      },
      include: {
        ingredients: { orderBy: { sortOrder: 'asc' }, include: { food: true, customFood: true } },
      },
    });

    return res.status(201).json(recipe);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Validation failed', details: error.errors });
    }
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Failed to create recipe' });
  }
};

export const updateRecipe = async (req: AuthRequest, res: Response) => {
  try {
    const existing = await prisma.recipe.findFirst({
      where: { id: req.params.id, userId: req.userId },
    });
    if (!existing) return res.status(404).json({ error: 'Recipe not found' });

    const data = recipeSchema.parse(req.body);
    const { resolved, serving } = await buildRecipeData(data, req.userId!);

    await prisma.recipeIngredient.deleteMany({ where: { recipeId: existing.id } });

    const recipe = await prisma.recipe.update({
      where: { id: existing.id },
      data: {
        name: data.name,
        description: data.description,
        servings: data.servings,
        servingSize: serving.servingSize,
        calories: serving.calories,
        protein: serving.protein,
        carbs: serving.carbs,
        fat: serving.fat,
        fiber: serving.fiber,
        sugar: serving.sugar,
        sodium: serving.sodium,
        totalWeight: serving.totalWeight,
        ingredients: {
          create: resolved.map(({ sortOrder, ...ing }) => ({
            name: ing.name,
            foodId: ing.foodId,
            customFoodId: ing.customFoodId,
            amount: ing.amount,
            calories: ing.calories,
            protein: ing.protein,
            carbs: ing.carbs,
            fat: ing.fat,
            fiber: ing.fiber,
            sortOrder,
          })),
        },
      },
      include: {
        ingredients: { orderBy: { sortOrder: 'asc' }, include: { food: true, customFood: true } },
      },
    });

    return res.json(recipe);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Validation failed', details: error.errors });
    }
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Failed to update recipe' });
  }
};

export const deleteRecipe = async (req: AuthRequest, res: Response) => {
  try {
    const recipe = await prisma.recipe.findFirst({
      where: { id: req.params.id, userId: req.userId },
    });
    if (!recipe) return res.status(404).json({ error: 'Recipe not found' });

    await prisma.recipe.delete({ where: { id: recipe.id } });
    return res.json({ message: 'Recipe deleted' });
  } catch {
    return res.status(500).json({ error: 'Failed to delete recipe' });
  }
};

export const previewRecipe = async (req: AuthRequest, res: Response) => {
  try {
    const data = recipeSchema.parse(req.body);
    const { resolved, serving, totals, totalWeight } = await buildRecipeData(data, req.userId!);
    return res.json({
      ingredients: resolved,
      totals,
      totalWeight,
      perServing: serving,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Validation failed', details: error.errors });
    }
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Failed to preview recipe' });
  }
};
