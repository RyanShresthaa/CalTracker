import { Response } from 'express';
import { z } from 'zod';
import prisma from '../lib/prisma';
import { AuthRequest } from '../middleware/auth';
import { dayBounds, parseLogDate } from '../utils/dates';

const logSchema = z.object({
  foodId: z.string().optional(),
  customFoodId: z.string().optional(),
  recipeId: z.string().optional(),
  mealType: z.enum(['breakfast', 'lunch', 'dinner', 'snacks']),
  amount: z.number().positive(),
  logDate: z.string().optional(),
});

function calcNutrition(food: any, amount: number) {
  const ratio = amount / food.servingSize;
  return {
    calories: food.calories * ratio,
    protein: food.protein * ratio,
    carbs: food.carbs * ratio,
    fat: food.fat * ratio,
    fiber: (food.fiber || 0) * ratio,
  };
}

async function resolveLogFood(data: z.infer<typeof logSchema>, userId: string) {
  if (data.foodId) {
    const food = await prisma.food.findUnique({ where: { id: data.foodId } });
    if (!food) return null;
    return { type: 'food' as const, food, foodId: food.id, customFoodId: undefined, recipeId: undefined };
  }
  if (data.customFoodId) {
    const food = await prisma.customFood.findFirst({ where: { id: data.customFoodId, userId } });
    if (!food) return null;
    return { type: 'custom' as const, food, foodId: undefined, customFoodId: food.id, recipeId: undefined };
  }
  if (data.recipeId) {
    const food = await prisma.recipe.findFirst({ where: { id: data.recipeId, userId } });
    if (!food) return null;
    return { type: 'recipe' as const, food, foodId: undefined, customFoodId: undefined, recipeId: food.id };
  }
  return null;
}

export const addFoodLog = async (req: AuthRequest, res: Response) => {
  try {
    const data = logSchema.parse(req.body);
    if (!data.foodId && !data.customFoodId && !data.recipeId) {
      return res.status(400).json({ error: 'foodId, customFoodId, or recipeId is required' });
    }

    const resolved = await resolveLogFood(data, req.userId!);
    if (!resolved) return res.status(404).json({ error: 'Food not found' });

    const nutrition = calcNutrition(resolved.food, data.amount);
    const log = await prisma.foodLog.create({
      data: {
        userId: req.userId!,
        foodId: resolved.foodId,
        customFoodId: resolved.customFoodId,
        recipeId: resolved.recipeId,
        mealType: data.mealType,
        amount: data.amount,
        logDate: parseLogDate(data.logDate),
        ...nutrition,
      },
      include: { food: true, customFood: true, recipe: true },
    });

    return res.status(201).json(log);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Validation failed', details: error.errors });
    }
    return res.status(500).json({ error: 'Failed to log food' });
  }
};

export const getFoodLogs = async (req: AuthRequest, res: Response) => {
  try {
    const { date } = req.query as { date?: string };
    const { start, end } = dayBounds(date);

    const logs = await prisma.foodLog.findMany({
      where: {
        userId: req.userId,
        logDate: { gte: start, lt: end },
      },
      include: { food: true, customFood: true, recipe: true },
      orderBy: { createdAt: 'asc' },
    });

    const byMeal = {
      breakfast: logs.filter(l => l.mealType === 'breakfast'),
      lunch: logs.filter(l => l.mealType === 'lunch'),
      dinner: logs.filter(l => l.mealType === 'dinner'),
      snacks: logs.filter(l => l.mealType === 'snacks'),
    };

    const totals = logs.reduce(
      (acc, log) => ({
        calories: acc.calories + log.calories,
        protein: acc.protein + log.protein,
        carbs: acc.carbs + log.carbs,
        fat: acc.fat + log.fat,
      }),
      { calories: 0, protein: 0, carbs: 0, fat: 0 }
    );

    return res.json({ logs, byMeal, totals });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch logs' });
  }
};

export const updateFoodLog = async (req: AuthRequest, res: Response) => {
  try {
    const logEntry = await prisma.foodLog.findFirst({
      where: { id: req.params.id, userId: req.userId },
      include: { food: true, customFood: true, recipe: true },
    });
    if (!logEntry) return res.status(404).json({ error: 'Log not found' });

    const { amount, mealType } = req.body;
    const food = logEntry.food || logEntry.customFood || logEntry.recipe;

    const nutrition = calcNutrition(food, amount || logEntry.amount);
    const updated = await prisma.foodLog.update({
      where: { id: req.params.id },
      data: {
        amount: amount || logEntry.amount,
        mealType: mealType || logEntry.mealType,
        ...nutrition,
      },
      include: { food: true, customFood: true, recipe: true },
    });

    return res.json(updated);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to update log' });
  }
};

export const deleteFoodLog = async (req: AuthRequest, res: Response) => {
  try {
    const log = await prisma.foodLog.findFirst({
      where: { id: req.params.id, userId: req.userId },
    });
    if (!log) return res.status(404).json({ error: 'Log not found' });

    await prisma.foodLog.delete({ where: { id: req.params.id } });
    return res.json({ message: 'Log deleted' });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to delete log' });
  }
};
