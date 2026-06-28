import { Response } from 'express';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import prisma from '../lib/prisma';
import { AuthRequest } from '../middleware/auth';
import { calculateBMR, calculateTDEE, calculateCalorieTargets, calculateBMI, getBMICategory, estimateBodyFat, resolveCalorieBudget, effectiveGoal } from '../utils/calculations';
import { DEFAULT_SETTINGS, toAuthUser } from '../utils/userSerializer';

export const getUserProfile = async (req: AuthRequest, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
      include: { settings: true },
    });
    if (!user) return res.status(404).json({ error: 'Not found' });

    let calculated = null;
    if (user.height && user.currentWeight && user.age && user.sex && user.activityLevel && user.goal) {
      const bmr = calculateBMR(user.currentWeight, user.height, user.age, user.sex);
      const tdee = calculateTDEE(bmr, user.activityLevel);
      const targets = calculateCalorieTargets(tdee);
      const bmi = calculateBMI(user.currentWeight, user.height);
      const bodyFat = estimateBodyFat(bmi, user.age, user.sex);
      const goalForMacros = effectiveGoal(user.currentWeight, user.goalWeight, user.goal);
      const budget = resolveCalorieBudget(user, 0);

      calculated = {
        bmr: Math.round(bmr),
        tdee: budget?.maintenanceCalories ?? Math.round(tdee),
        ...targets,
        dailyGoal: budget?.dailyBudget ?? null,
        baseGoal: budget?.baseGoal ?? null,
        effectiveGoal: goalForMacros,
        bmi,
        bmiCategory: getBMICategory(bmi),
        estimatedBodyFat: Math.round(bodyFat * 10) / 10,
      };
    }

    const { password, resetToken, resetTokenExpiry, ...safeUser } = user as any;
    return res.json({ ...safeUser, calculated });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch profile' });
  }
};

export const updateUserProfile = async (req: AuthRequest, res: Response) => {
  try {
    const allowed = ['name', 'age', 'height', 'currentWeight', 'goalWeight', 'activityLevel', 'gymDaysPerWeek', 'dailyWalkKm', 'gymMinutesPerSession', 'goal', 'goalDate'];
    const data: any = {};
    for (const key of allowed) {
      if (req.body[key] !== undefined) data[key] = req.body[key];
    }

    if (data.goalDate) data.goalDate = new Date(data.goalDate);

    if (data.currentWeight != null && data.goalWeight != null && data.goal !== 'maintain_weight') {
      data.goal = effectiveGoal(data.currentWeight, data.goalWeight, data.goal);
    }

    const user = await prisma.user.update({
      where: { id: req.userId },
      data,
      include: { settings: true },
    });

    return res.json(toAuthUser(user));
  } catch (error) {
    return res.status(500).json({ error: 'Failed to update profile' });
  }
};

export const changePassword = async (req: AuthRequest, res: Response) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!newPassword || newPassword.length < 8) {
      return res.status(400).json({ error: 'New password must be at least 8 characters' });
    }

    const user = await prisma.user.findUnique({ where: { id: req.userId } });
    if (!user) return res.status(404).json({ error: 'Not found' });

    const isValid = await bcrypt.compare(currentPassword, user.password);
    if (!isValid) return res.status(400).json({ error: 'Current password is incorrect' });

    const hashed = await bcrypt.hash(newPassword, 12);
    await prisma.user.update({ where: { id: req.userId }, data: { password: hashed } });

    return res.json({ message: 'Password changed successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to change password' });
  }
};

export const getSettings = async (req: AuthRequest, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
      include: { settings: true },
    });

    const budget = user ? resolveCalorieBudget(user, 0) : null;
    const suggestedCalorieGoal = budget?.dailyBudget ?? null;

    if (!user?.settings) {
      return res.json({ ...DEFAULT_SETTINGS, suggestedCalorieGoal });
    }
    const { id, userId, createdAt, updatedAt, ...prefs } = user.settings;
    return res.json({ ...prefs, suggestedCalorieGoal });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch settings' });
  }
};

const SETTINGS_FIELDS = [
  'darkMode', 'units', 'waterGoal', 'calorieGoal', 'proteinGoal',
  'carbsGoal', 'fatGoal', 'notifWater', 'notifMeals', 'notifWorkout', 'notifWeight',
] as const;

export const updateSettings = async (req: AuthRequest, res: Response) => {
  try {
    const data: Record<string, unknown> = {};
    for (const key of SETTINGS_FIELDS) {
      if (req.body[key] !== undefined) data[key] = req.body[key];
    }

    if (data.calorieGoal !== undefined && data.calorieGoal !== null) {
      const goal = Number(data.calorieGoal);
      if (Number.isNaN(goal) || goal < 800 || goal > 10000) {
        return res.status(400).json({ error: 'Calorie goal must be between 800 and 10,000 kcal' });
      }
      data.calorieGoal = goal;
    }

    const settings = await prisma.settings.upsert({
      where: { userId: req.userId },
      update: data,
      create: { userId: req.userId!, ...data },
    });

    const user = await prisma.user.findUnique({ where: { id: req.userId } });
    const budget = user ? resolveCalorieBudget(user, 0) : null;

    const { id, userId, createdAt, updatedAt, ...prefs } = settings;
    return res.json({ ...prefs, suggestedCalorieGoal: budget?.dailyBudget ?? null });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to update settings' });
  }
};

export const getNotifications = async (req: AuthRequest, res: Response) => {
  try {
    const notifications = await prisma.notification.findMany({
      where: { userId: req.userId },
      orderBy: { createdAt: 'desc' },
      take: 50,
    });
    return res.json(notifications);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch notifications' });
  }
};

export const markNotificationRead = async (req: AuthRequest, res: Response) => {
  try {
    await prisma.notification.updateMany({
      where: { userId: req.userId, id: req.params.id },
      data: { read: true },
    });
    return res.json({ message: 'Marked as read' });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to update notification' });
  }
};

export const markAllNotificationsRead = async (req: AuthRequest, res: Response) => {
  try {
    await prisma.notification.updateMany({
      where: { userId: req.userId, read: false },
      data: { read: true },
    });
    return res.json({ message: 'All marked as read' });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to update notifications' });
  }
};
