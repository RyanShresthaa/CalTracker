import { Response } from 'express';
import { z } from 'zod';
import prisma from '../lib/prisma';
import { AuthRequest } from '../middleware/auth';
import { calculateCaloriesBurned } from '../utils/calculations';

// ============ WATER ============
export const addWater = async (req: AuthRequest, res: Response) => {
  try {
    const { amount, logDate } = req.body;
    if (!amount || amount <= 0) return res.status(400).json({ error: 'Invalid amount' });

    const log = await prisma.waterLog.create({
      data: {
        userId: req.userId!,
        amount,
        logDate: logDate ? new Date(logDate) : new Date(),
      },
    });
    return res.status(201).json(log);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to log water' });
  }
};

export const getWaterLogs = async (req: AuthRequest, res: Response) => {
  try {
    const { date } = req.query as { date?: string };
    const targetDate = date ? new Date(date) : new Date();
    targetDate.setHours(0, 0, 0, 0);
    const nextDay = new Date(targetDate);
    nextDay.setDate(nextDay.getDate() + 1);

    const logs = await prisma.waterLog.findMany({
      where: {
        userId: req.userId,
        logDate: { gte: targetDate, lt: nextDay },
      },
      orderBy: { logDate: 'asc' },
    });

    const total = logs.reduce((acc, l) => acc + l.amount, 0);

    // History - last 7 days
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    const history = await prisma.waterLog.groupBy({
      by: ['logDate'],
      where: { userId: req.userId, logDate: { gte: weekAgo } },
      _sum: { amount: true },
      orderBy: { logDate: 'asc' },
    });

    return res.json({ logs, total, history });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch water logs' });
  }
};

export const deleteWaterLog = async (req: AuthRequest, res: Response) => {
  try {
    const log = await prisma.waterLog.findFirst({
      where: { id: req.params.id, userId: req.userId },
    });
    if (!log) return res.status(404).json({ error: 'Log not found' });
    await prisma.waterLog.delete({ where: { id: req.params.id } });
    return res.json({ message: 'Deleted' });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to delete' });
  }
};

// ============ WEIGHT ============
export const addWeight = async (req: AuthRequest, res: Response) => {
  try {
    const { weight, note, logDate } = req.body;
    if (!weight || weight < 30 || weight > 300) {
      return res.status(400).json({ error: 'Weight must be between 30 and 300 kg' });
    }

    const log = await prisma.weightLog.create({
      data: {
        userId: req.userId!,
        weight,
        note,
        logDate: logDate ? new Date(logDate) : new Date(),
      },
    });

    // Update user's current weight
    await prisma.user.update({
      where: { id: req.userId },
      data: { currentWeight: weight },
    });

    return res.status(201).json(log);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to log weight' });
  }
};

export const getWeightLogs = async (req: AuthRequest, res: Response) => {
  try {
    const { period = '30' } = req.query as { period?: string };
    const from = new Date();
    from.setDate(from.getDate() - parseInt(period));

    const logs = await prisma.weightLog.findMany({
      where: { userId: req.userId, logDate: { gte: from } },
      orderBy: { logDate: 'asc' },
    });

    const user = await prisma.user.findUnique({ where: { id: req.userId } });

    return res.json({
      logs,
      currentWeight: user?.currentWeight,
      goalWeight: user?.goalWeight,
    });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch weight logs' });
  }
};

export const deleteWeightLog = async (req: AuthRequest, res: Response) => {
  try {
    const log = await prisma.weightLog.findFirst({
      where: { id: req.params.id, userId: req.userId },
    });
    if (!log) return res.status(404).json({ error: 'Not found' });
    await prisma.weightLog.delete({ where: { id: req.params.id } });
    return res.json({ message: 'Deleted' });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to delete' });
  }
};

// ============ ACTIVITIES ============
const activitySchema = z.object({
  activityType: z.string(),
  name: z.string(),
  duration: z.number().positive(),
  caloriesBurned: z.number().min(0).optional(),
  notes: z.string().optional(),
  sets: z.number().int().optional(),
  reps: z.number().int().optional(),
  weightUsed: z.number().optional(),
  muscleGroup: z.string().optional(),
  startWeight: z.number().optional(),
  startReps: z.number().int().optional(),
  endWeight: z.number().optional(),
  endReps: z.number().int().optional(),
  totalVolume: z.number().optional(),
  distance: z.number().optional(),
  speed: z.number().optional(),
  pace: z.number().optional(),
  stroke: z.string().optional(),
  logDate: z.string().optional(),
});

export const addActivity = async (req: AuthRequest, res: Response) => {
  try {
    const data = activitySchema.parse(req.body);

    const user = await prisma.user.findUnique({ where: { id: req.userId } });
    let caloriesBurned = data.caloriesBurned;

    if (!caloriesBurned && user?.currentWeight) {
      caloriesBurned = calculateCaloriesBurned(
        data.activityType,
        data.duration,
        user.currentWeight
      );
    }

    const log = await prisma.activityLog.create({
      data: {
        userId: req.userId!,
        ...data,
        caloriesBurned: caloriesBurned || 0,
        logDate: data.logDate ? new Date(data.logDate) : new Date(),
      },
    });

    return res.status(201).json(log);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Validation failed', details: error.errors });
    }
    return res.status(500).json({ error: 'Failed to log activity' });
  }
};

export const getActivities = async (req: AuthRequest, res: Response) => {
  try {
    const { date } = req.query as { date?: string };
    const targetDate = date ? new Date(date) : new Date();
    targetDate.setHours(0, 0, 0, 0);
    const nextDay = new Date(targetDate);
    nextDay.setDate(nextDay.getDate() + 1);

    const logs = await prisma.activityLog.findMany({
      where: {
        userId: req.userId,
        logDate: { gte: targetDate, lt: nextDay },
      },
      orderBy: { logDate: 'asc' },
    });

    const totalCaloriesBurned = logs.reduce((acc, l) => acc + l.caloriesBurned, 0);
    const totalDuration = logs.reduce((acc, l) => acc + l.duration, 0);

    return res.json({ logs, totalCaloriesBurned, totalDuration });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch activities' });
  }
};

export const getActivityHistory = async (req: AuthRequest, res: Response) => {
  try {
    const { period = '30' } = req.query as { period?: string };
    const from = new Date();
    from.setDate(from.getDate() - parseInt(period));

    const logs = await prisma.activityLog.findMany({
      where: { userId: req.userId, logDate: { gte: from } },
      orderBy: { logDate: 'desc' },
    });

    return res.json(logs);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch history' });
  }
};

export const deleteActivity = async (req: AuthRequest, res: Response) => {
  try {
    const log = await prisma.activityLog.findFirst({
      where: { id: req.params.id, userId: req.userId },
    });
    if (!log) return res.status(404).json({ error: 'Not found' });
    await prisma.activityLog.delete({ where: { id: req.params.id } });
    return res.json({ message: 'Deleted' });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to delete' });
  }
};
