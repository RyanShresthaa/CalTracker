import { Response } from 'express';
import { z } from 'zod';
import prisma from '../lib/prisma';
import { AuthRequest } from '../middleware/auth';

const foodSchema = z.object({
  name: z.string().min(1),
  category: z.string(),
  servingSize: z.number().positive(),
  servingUnit: z.string().default('g'),
  calories: z.number().min(0),
  protein: z.number().min(0),
  carbs: z.number().min(0),
  fat: z.number().min(0),
  fiber: z.number().min(0).default(0),
  sugar: z.number().min(0).default(0),
  sodium: z.number().min(0).default(0),
  barcode: z.string().optional(),
});

export const getAdminStats = async (_req: AuthRequest, res: Response) => {
  try {
    const [users, foods, foodLogs, activities] = await Promise.all([
      prisma.user.count(),
      prisma.food.count(),
      prisma.foodLog.count(),
      prisma.activityLog.count(),
    ]);

    const recentUsers = await prisma.user.findMany({
      take: 10,
      orderBy: { createdAt: 'desc' },
      select: { id: true, name: true, email: true, createdAt: true, profileCompleted: true },
    });

    return res.json({ stats: { users, foods, foodLogs, activities }, recentUsers });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch stats' });
  }
};

export const adminGetUsers = async (req: AuthRequest, res: Response) => {
  try {
    const { page = '1', limit = '20', q } = req.query as Record<string, string>;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const where: any = {};
    if (q) {
      where.OR = [
        { name: { contains: q, mode: 'insensitive' } },
        { email: { contains: q, mode: 'insensitive' } },
      ];
    }

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        skip,
        take: parseInt(limit),
        select: { id: true, name: true, email: true, isAdmin: true, createdAt: true, profileCompleted: true },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.user.count({ where }),
    ]);

    return res.json({ users, total, page: parseInt(page), pages: Math.ceil(total / parseInt(limit)) });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch users' });
  }
};

export const adminDeleteUser = async (req: AuthRequest, res: Response) => {
  try {
    await prisma.user.delete({ where: { id: req.params.id } });
    return res.json({ message: 'User deleted' });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to delete user' });
  }
};

export const adminGetFoods = async (req: AuthRequest, res: Response) => {
  try {
    const { page = '1', limit = '20', q, category } = req.query as Record<string, string>;
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const where: any = {};
    if (q) where.name = { contains: q, mode: 'insensitive' };
    if (category) where.category = category;

    const [foods, total] = await Promise.all([
      prisma.food.findMany({ where, skip, take: parseInt(limit), orderBy: { name: 'asc' } }),
      prisma.food.count({ where }),
    ]);

    return res.json({ foods, total, page: parseInt(page), pages: Math.ceil(total / parseInt(limit)) });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch foods' });
  }
};

export const adminCreateFood = async (req: AuthRequest, res: Response) => {
  try {
    const data = foodSchema.parse(req.body);
    const food = await prisma.food.create({ data });
    return res.status(201).json(food);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Validation failed', details: error.errors });
    }
    return res.status(500).json({ error: 'Failed to create food' });
  }
};

export const adminUpdateFood = async (req: AuthRequest, res: Response) => {
  try {
    const data = foodSchema.partial().parse(req.body);
    const food = await prisma.food.update({ where: { id: req.params.id }, data });
    return res.json(food);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to update food' });
  }
};

export const adminDeleteFood = async (req: AuthRequest, res: Response) => {
  try {
    await prisma.food.delete({ where: { id: req.params.id } });
    return res.json({ message: 'Food deleted' });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to delete food' });
  }
};
