import { Request, Response } from 'express';
import { z } from 'zod';
import prisma from '../lib/prisma';
import { AuthRequest } from '../middleware/auth';
import { searchUsdaFoods } from '../services/usdaFoodService';
import { searchOffFoods, fetchOffProductByBarcode } from '../services/openFoodFactsService';
import { importExternalFood, resolveExternalSearchResults } from '../services/foodImportService';
import { normalizeFoodServing } from '../services/servingUnits';
import {
  mapRecipeToSearchItem,
  syncManualRecipeIngredients,
} from '../services/customFoodService';

const customFoodSchema = z.object({
  name: z.string().min(1),
  category: z.string().default('custom'),
  servingSize: z.number().positive(),
  servingUnit: z.string().default('g'),
  calories: z.number().min(0),
  protein: z.number().min(0),
  carbs: z.number().min(0),
  fat: z.number().min(0),
  fiber: z.number().min(0).default(0),
  sugar: z.number().min(0).default(0),
  sodium: z.number().min(0).default(0),
});

const importSchema = z.object({
  source: z.enum(['usda', 'off']),
  externalId: z.string().min(1),
});

function dedupeFoods<T extends { name: string; externalId?: string; id?: string }>(items: T[]): T[] {
  const seen = new Set<string>();
  return items.filter(item => {
    const key = item.id ?? `${item.externalId ?? item.name}`.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export const searchFoods = async (req: AuthRequest, res: Response) => {
  try {
    const { q = '', category, page = '1', limit = '20' } = req.query as Record<string, string>;
    const take = parseInt(limit);
    const skip = (parseInt(page) - 1) * take;
    const query = q.trim();

    const where: any = {};
    if (query) {
      where.name = { contains: query, mode: 'insensitive' };
    }
    if (category) {
      where.category = category;
    }

    if (req.userId) {
      await syncManualRecipeIngredients(req.userId);
    }

    const recipeWhere = req.userId
      ? {
          userId: req.userId,
          ...(query ? { name: { contains: query, mode: 'insensitive' } } : {}),
        }
      : null;

    const customWhere = req.userId
      ? {
          userId: req.userId,
          ...(query ? { name: { contains: query, mode: 'insensitive' } } : {}),
        }
      : null;

    const [localFoods, localTotal, customFoods, userRecipes, usdaFoods, offFoods] = await Promise.all([
      query
        ? prisma.food.findMany({ where, take: 5, orderBy: { name: 'asc' } })
        : prisma.food.findMany({ where, skip, take, orderBy: { name: 'asc' } }),
      prisma.food.count({ where }),
      customWhere
        ? prisma.customFood.findMany({
            where: customWhere,
            take: query ? 10 : 15,
            orderBy: { name: 'asc' },
          })
        : Promise.resolve([]),
      recipeWhere
        ? prisma.recipe.findMany({
            where: recipeWhere,
            take: query ? 10 : 15,
            orderBy: { updatedAt: 'desc' },
            include: { _count: { select: { ingredients: true } } },
          })
        : Promise.resolve([]),
      query ? searchUsdaFoods(query, 10) : Promise.resolve([]),
      query ? searchOffFoods(query, 5) : Promise.resolve([]),
    ]);

    let externalFoods = [...usdaFoods, ...offFoods];
    if (externalFoods.length) {
      externalFoods = await resolveExternalSearchResults(externalFoods) as typeof externalFoods;
    }

    const myItems = [
      ...userRecipes.map(r => mapRecipeToSearchItem(r)),
      ...customFoods.map(f => normalizeFoodServing({ ...f, isCustom: true, source: 'custom' as const })),
    ];

    const foods = dedupeFoods([
      ...myItems,
      ...(query ? localFoods.map(f => normalizeFoodServing({ ...f, source: f.externalSource ?? 'local' as const })) : []),
      ...(query ? externalFoods.map(f => normalizeFoodServing(f)) : []),
    ]).slice(0, take);

    return res.json({
      foods,
      total: localTotal + customFoods.length + userRecipes.length + externalFoods.length,
      page: parseInt(page),
      pages: Math.ceil(localTotal / take),
      sources: {
        usda: Boolean(process.env.USDA_API_KEY || 'DEMO_KEY'),
        openFoodFacts: true,
        myRecipes: userRecipes.length,
        myCustomFoods: customFoods.length,
      },
    });
  } catch (error) {
    console.error('Food search error:', error);
    return res.status(500).json({ error: 'Search failed' });
  }
};

export const importExternalFoodHandler = async (req: AuthRequest, res: Response) => {
  try {
    const { source, externalId } = importSchema.parse(req.body);
    const food = await importExternalFood(source, externalId);
    return res.status(201).json(food);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Validation failed', details: error.errors });
    }
    if (error instanceof Error && error.message.includes('not found')) {
      return res.status(404).json({ error: error.message });
    }
    console.error('Import food error:', error);
    return res.status(500).json({ error: 'Failed to import food' });
  }
};

export const getFoodById = async (req: Request, res: Response) => {
  try {
    const food = await prisma.food.findUnique({ where: { id: req.params.id } });
    if (!food) return res.status(404).json({ error: 'Food not found' });
    return res.json(food);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch food' });
  }
};

export const getFoodByBarcode = async (req: Request, res: Response) => {
  try {
    const { barcode } = req.params;

    const local = await prisma.food.findUnique({ where: { barcode } });
    if (local) return res.json(local);

    const offProduct = await fetchOffProductByBarcode(barcode);
    if (!offProduct) {
      return res.status(404).json({ error: 'Product not found. Try searching by name instead.' });
    }

    const food = await importExternalFood('off', barcode);
    return res.json(food);
  } catch (error) {
    console.error('Barcode lookup error:', error);
    return res.status(500).json({ error: 'Failed to fetch food by barcode' });
  }
};

export const getFoodCategories = async (_req: Request, res: Response) => {
  try {
    const categories = await prisma.food.findMany({
      select: { category: true },
      distinct: ['category'],
      orderBy: { category: 'asc' },
    });
    return res.json(categories.map(c => c.category));
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch categories' });
  }
};

export const createCustomFood = async (req: AuthRequest, res: Response) => {
  try {
    const data = customFoodSchema.parse(req.body);
    const food = await prisma.customFood.create({
      data: { ...data, userId: req.userId! },
    });
    return res.status(201).json(food);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Validation failed', details: error.errors });
    }
    return res.status(500).json({ error: 'Failed to create food' });
  }
};

export const getCustomFoods = async (req: AuthRequest, res: Response) => {
  try {
    const foods = await prisma.customFood.findMany({
      where: { userId: req.userId },
      orderBy: { name: 'asc' },
    });
    return res.json(foods);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch custom foods' });
  }
};

export const updateCustomFood = async (req: AuthRequest, res: Response) => {
  try {
    const food = await prisma.customFood.findFirst({
      where: { id: req.params.id, userId: req.userId },
    });
    if (!food) return res.status(404).json({ error: 'Food not found' });

    const data = customFoodSchema.partial().parse(req.body);
    const updated = await prisma.customFood.update({ where: { id: req.params.id }, data });
    return res.json(updated);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to update food' });
  }
};

export const deleteCustomFood = async (req: AuthRequest, res: Response) => {
  try {
    const food = await prisma.customFood.findFirst({
      where: { id: req.params.id, userId: req.userId },
    });
    if (!food) return res.status(404).json({ error: 'Food not found' });

    await prisma.customFood.delete({ where: { id: req.params.id } });
    return res.json({ message: 'Food deleted' });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to delete food' });
  }
};
