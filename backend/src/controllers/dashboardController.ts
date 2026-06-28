import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import prisma from '../lib/prisma';
import { calculateMacros, resolveCalorieBudget, effectiveGoal } from '../utils/calculations';
import { todayBounds, lastNDaysStart, localDateKey } from '../utils/dates';

export const getDashboard = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId!;
    const { start: today, end: tomorrow } = todayBounds();

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { settings: true },
    });
    if (!user) return res.status(404).json({ error: 'User not found' });

    // Today's food logs
    const foodLogs = await prisma.foodLog.findMany({
      where: {
        userId,
        logDate: { gte: today, lt: tomorrow },
      },
      include: { food: true, customFood: true, recipe: true },
    });

    // Today's water
    const waterLogs = await prisma.waterLog.findMany({
      where: {
        userId,
        logDate: { gte: today, lt: tomorrow },
      },
    });

    // Today's activities
    const activityLogs = await prisma.activityLog.findMany({
      where: {
        userId,
        logDate: { gte: today, lt: tomorrow },
      },
    });

    // Latest weight
    const latestWeight = await prisma.weightLog.findFirst({
      where: { userId },
      orderBy: { logDate: 'desc' },
    });

    // Weekly food logs for charts
    const weekStart = lastNDaysStart(7);
    const weeklyLogs = await prisma.foodLog.findMany({
      where: {
        userId,
        logDate: { gte: weekStart, lt: tomorrow },
      },
    });

    // Streak calculation
    const streak = await calculateStreak(userId);

    // Calculate totals
    const consumed = foodLogs.reduce(
      (acc, log) => ({
        calories: acc.calories + log.calories,
        protein: acc.protein + log.protein,
        carbs: acc.carbs + log.carbs,
        fat: acc.fat + log.fat,
      }),
      { calories: 0, protein: 0, carbs: 0, fat: 0 }
    );

    const burned = activityLogs.reduce((acc, a) => acc + a.caloriesBurned, 0);
    const waterIntake = waterLogs.reduce((acc, w) => acc + w.amount, 0);

    // Calorie budget: profile activity + weight goal + logged exercise today
    let calorieGoal = user.settings?.calorieGoal || 2000;
    let baseGoal = calorieGoal;
    let exerciseBonus = 0;
    let macroGoals = { protein: 150, carbs: 250, fat: 65 };

    const budget = resolveCalorieBudget(user, burned);
    if (budget != null) {
      calorieGoal = budget.dailyBudget;
      baseGoal = budget.baseGoal;
      exerciseBonus = budget.exerciseBonus;
      const goalForMacros = effectiveGoal(user.currentWeight, user.goalWeight, user.goal);
      macroGoals = calculateMacros(calorieGoal, goalForMacros);
    }

    // Meals breakdown
    const meals = {
      breakfast: foodLogs.filter(l => l.mealType === 'breakfast'),
      lunch: foodLogs.filter(l => l.mealType === 'lunch'),
      dinner: foodLogs.filter(l => l.mealType === 'dinner'),
      snacks: foodLogs.filter(l => l.mealType === 'snacks'),
    };

    // Weekly data grouped by day
    const weeklyData = groupByDay(weeklyLogs, weekStart, 7);

    return res.json({
      date: today,
      user: {
        name: user.name,
        currentWeight: latestWeight?.weight || user.currentWeight,
        goalWeight: user.goalWeight,
        goal: user.goal,
      },
      calories: {
        baseGoal: Math.round(baseGoal),
        exerciseBonus: Math.round(exerciseBonus),
        goal: Math.round(calorieGoal),
        consumed: Math.round(consumed.calories),
        burned: Math.round(burned),
        remaining: Math.round(calorieGoal - consumed.calories),
      },
      macros: {
        protein: { consumed: Math.round(consumed.protein), goal: macroGoals.protein },
        carbs: { consumed: Math.round(consumed.carbs), goal: macroGoals.carbs },
        fat: { consumed: Math.round(consumed.fat), goal: macroGoals.fat },
      },
      water: {
        consumed: waterIntake,
        goal: user.settings?.waterGoal || 2000,
      },
      meals,
      activities: activityLogs,
      streak,
      weeklyData,
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    return res.status(500).json({ error: 'Failed to load dashboard' });
  }
};

async function calculateStreak(userId: string): Promise<number> {
  const logs = await prisma.foodLog.findMany({
    where: { userId },
    select: { logDate: true },
    orderBy: { logDate: 'desc' },
    distinct: ['logDate'],
  });

  if (!logs.length) return 0;

  let streak = 0;
  let currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  for (const log of logs) {
    const logDay = new Date(log.logDate);
    logDay.setHours(0, 0, 0, 0);

    const diff = (currentDate.getTime() - logDay.getTime()) / (1000 * 60 * 60 * 24);
    if (diff <= 1) {
      streak++;
      currentDate = logDay;
    } else {
      break;
    }
  }

  return streak;
}

function groupByDay(logs: any[], from: Date, days = 7) {
  const result: Record<string, { calories: number; protein: number; carbs: number; fat: number }> = {};

  for (let i = 0; i < days; i++) {
    const d = new Date(from);
    d.setDate(d.getDate() + i);
    result[localDateKey(d)] = { calories: 0, protein: 0, carbs: 0, fat: 0 };
  }

  for (const log of logs) {
    const key = localDateKey(new Date(log.logDate));
    if (result[key]) {
      result[key].calories += log.calories;
      result[key].protein += log.protein;
      result[key].carbs += log.carbs;
      result[key].fat += log.fat;
    }
  }

  return Object.entries(result)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, data]) => ({
      date,
      calories: Math.round(data.calories),
      protein: Math.round(data.protein),
      carbs: Math.round(data.carbs),
      fat: Math.round(data.fat),
    }));
}
